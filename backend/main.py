from typing import List

from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

from db.main import create_db_and_tables, get_session
from db.models import (
    User,
    UserRead,
    UserCreate,
    UserUpdate,
    UserLogin,
    Date, 
    DateRead, 
    DateCreate,
    DateUpdate,
    Task, 
    TaskRead, 
    TaskCreate,
    TaskUpdate, 
)

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/")
def read_root():
    return {"Hello": "World"}


"""
USERS
"""

@app.post("/users/", response_model=UserRead)
def create_user(*, session: Session = Depends(get_session), task: UserCreate):
    db_user = User.from_orm(task)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


@app.get("/users/", response_model=List[UserRead])
def read_users(
    *,
    session: Session = Depends(get_session),
    offset: int = 0,
    limit: int = Query(default=100, lte=100),
):
    users = session.exec(select(User).offset(offset).limit(limit)).all()
    return users


@app.patch("/users/{user_id}", response_model=UserRead)
def update_user(
    *, session: Session = Depends(get_session), user_id: int, user: UserUpdate
):
    db_user = session.get(User, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    user_data = user.dict(exclude_unset=True)
    for key, value in user_data.items():
        setattr(db_user, key, value)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


@app.delete("/users/{user_id}")
def delete_user(*, session: Session = Depends(get_session), user_id: int):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Task not found")
    session.delete(user)
    session.commit()
    return {"ok": True}


@app.post("/users/login", response_model=int)
def login_user(*, session: Session = Depends(get_session), user: UserLogin):
    db_user: User = session.exec(select(User).where(User.email == user.email)).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    if db_user.password != user.password:
        raise HTTPException(status_code=401, detail="Incorrect password")
    return db_user.id


"""
TASKS
"""

@app.post("/tasks/", response_model=TaskRead)
def create_task(*, session: Session = Depends(get_session), task: TaskCreate):
    db_task = Task.from_orm(task)
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


@app.get("/tasks/", response_model=List[TaskRead])
def read_tasks(
    *,
    session: Session = Depends(get_session),
    offset: int = 0,
    limit: int = Query(default=100, lte=100),
):
    tasks = session.exec(select(Task).offset(offset).limit(limit)).all()
    return tasks


@app.patch("/tasks/{task_id}", response_model=TaskRead)
def update_task(
    *, session: Session = Depends(get_session), task_id: int, task: TaskUpdate
):
    db_task = session.get(Task, task_id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    task_data = task.dict(exclude_unset=True)
    for key, value in task_data.items():
        setattr(db_task, key, value)
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task


@app.delete("/tasks/{task_id}")
def delete_task(*, session: Session = Depends(get_session), task_id: int):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    session.delete(task)
    session.commit()
    return {"ok": True}


"""
DATES
"""

@app.post("/dates/", response_model=DateRead)
def create_date(*, session: Session = Depends(get_session), date: DateCreate):
    db_date = Date.from_orm(date)
    session.add(db_date)
    session.commit()
    session.refresh(db_date)
    return db_date


@app.get("/dates/", response_model=List[DateRead])
def read_dates(
    *,
    session: Session = Depends(get_session),
    offset: int = 0,
    limit: int = Query(default=100, lte=100),
):
    dates = session.exec(select(Date).offset(offset).limit(limit)).all()
    return dates


@app.patch("/dates/{date_id}", response_model=DateRead)
def update_date(
    *,
    session: Session = Depends(get_session),
    date_id: int,
    date: DateUpdate,
):
    db_date = session.get(Date, date_id)
    if not db_date:
        raise HTTPException(status_code=404, detail="Date not found")
    date_data = date.dict(exclude_unset=True)
    for key, value in date_data.items():
        setattr(db_date, key, value)
    session.add(db_date)
    session.commit()
    session.refresh(db_date)
    return db_date


@app.delete("/dates/{date_id}")
def delete_date(*, session: Session = Depends(get_session), date_id: int):
    date = session.get(Date, date_id)
    if not date:
        raise HTTPException(status_code=404, detail="Date not found")
    session.delete(date)
    session.commit()
    return {"ok": True}

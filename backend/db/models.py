from datetime import date
from typing import Optional, Tuple

from sqlmodel import SQLModel, Field


"""
USERS
"""

class UserBase(SQLModel):
    name: str
    email: str
    password: str


class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class UserCreate(UserBase):
    pass


class UserRead(UserBase):
    id: int


class UserUpdate(UserBase):
    schedule: Optional[Tuple[float, float, float, float, float, float, float]] = None


class UserLogin(SQLModel):
    email: str
    password: str


"""
DATES
"""

class DateBase(SQLModel):
    user_id: int
    date: date
    hours: float


class Date(DateBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class DateCreate(DateBase):
    pass


class DateRead(DateBase):
    id: int


class DateUpdate(SQLModel):
    hours: Optional[float] = None


"""
TASKS
"""

class TaskBase(SQLModel):
    user_id: int
    name: str
    description: str
    start_date: Optional[date]
    due_date: Optional[date]
    completed: bool
    hours_estimated: Optional[float]
    hours_spent: Optional[float]


class Task(TaskBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)


class TaskRead(TaskBase):
    id: int


class TaskCreate(TaskBase):
    pass


class TaskUpdate(TaskBase):
    start_date: Optional[date] = None
    due_date: Optional[date] = None
    completed: Optional[bool] = None
    hours_estimated: Optional[float] = None
    hours_spent: Optional[float] = None

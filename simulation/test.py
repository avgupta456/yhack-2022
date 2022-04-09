from datetime import date

print("hello world")

class Assignment: 
    def __init__(self, name, description, start_date, end_date, hours_total, hours_left):
        self.name = name
        self.description = description
        self.start_date = start_date
        self.end_date = end_date
        self.hours_total = hours_total
        self.hours_left = hours_left

t1 = Assignment("181 pset", "physics pset", 0, 7, 3, 3)
t2 = Assignment("quiz", "physics quiz", 5, 7, 1, 1)
t3 = Assignment("lab report", "fluids lab report", 2, 9, 15, 15)
t4 = Assignment("389 pset", "heat transfer pset", 4, 11, 2, 2)
t5 = Assignment("research", "research", 0, 13, 16, 16)

tasks = [t1, t2, t3, t4 ,t5]


times = [6, 3, 3, 3, 3, 4, 6, 6, 3, 3, 3, 3, 4, 6]

#prints the task that has the nearest due date with most amount of time left
def todo(tasks):
    for x in tasks:
        if x.hours_left <= 0:
            tasks.remove(x)
    if len(tasks) == 0:
        return None
    do_next = tasks[0]
    for i in tasks: 
        if i.end_date < do_next.end_date:
            do_next = i
        elif i.end_date == do_next.end_date and i.hours_left > do_next.hours_left:
            do_next = i
    return do_next

#
def schedule(tasks, times):
    numHours = 0
    for i in times:
        numHours = numHours + i
    print(numHours)
    
    for j in range(numHours):
        do_next = todo(tasks)
        if do_next is None:
            print(j, "Free Time")
        else:
            do_next.hours_left -= 1
            print(j, do_next.name)

schedule(tasks, times)
from datetime import date

print("hello world")


def f(x):
    return x + 5

print(f(10))
 
class Assignment: 
    def __init__(self, name, description, start_date, end_date, hours_estimated):
        self.name = name
        self.description = description
        self.start_date = start_date
        self.end_date = end_date
        self.hours_estimated = hours_estimated

t1 = Assignment("181 pset", "physics pset", 1, 8, 3)
t2 = Assignment("quiz", "physics quiz", 6, 8, 0.1)
t3 = Assignment("lab report", "fluids lab report", 3, 10, 15)
t4 = Assignment("389 pset", "heat transfer pset", 5, 12, 2)
t5 = Assignment("research", "research", 1, 14, 16)

print(t3.end_date)




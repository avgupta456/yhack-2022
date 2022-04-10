from collections import defaultdict
import matplotlib.pyplot as plt

class Task:
    def __init__(self, name, start, end, hours, curr_hours):
        self.name = name
        self.start = start
        self.end = end
        self.total_hours = hours
        self.hours = hours
        self.curr_hours = curr_hours
    

    def __repr__(self):
        return f"{self.name} ({self.curr_hours}/{self.hours})"

    def end_date(self):
        return [x for x in self.end if isinstance(x, int)][0]

    def available(self, date, finished_tasks):
        if self.curr_hours >= self.hours:
            return False
        for x in self.start:
            if isinstance(x, int):
                if x > date:
                    return False
            elif x not in finished_tasks:
                return False
        return True


readings = [
    Task("Readings 1", [1], [3], 2, 0),
    Task("Readings 2", [3], [8], 2, 0),
    Task("Readings 3", [8], [10], 2, 0),
    Task("Readings 4", [10], [13], 2, 0),
]

outline_essay = Task("Outline Essay", [1], [], 2, 0)
rough_draft = Task("Rough Draft", [outline_essay], [], 10, 0)
office_hours = Task("Office Hours", [rough_draft, 5], [5], 1, 0)
edit_essay = Task("Edit Essay", [office_hours], [10], 4, 0)

tasks = readings + [outline_essay, rough_draft, office_hours, edit_essay]

# supplement task end criteria
finished = False
while not finished:
    finished = True
    for t1 in tasks:
        if t1.end == []:
            for t2 in tasks:
                if t1 in t2.start:
                    temp = False
                    for e in t2.end:
                        if isinstance(e, int):
                            t1.end.append(e)
                            t1.total_hours += t2.total_hours
                            temp = True
                    finished = finished and temp

# print(outline_essay.total_hours)
# print(outline_essay.end)

def run_experiment(hours_per_day, breaks, plot=False):
    error = False
    finished_tasks = []
    for t in tasks:
        t.curr_hours = 0

    hours_worked = defaultdict(lambda: [0 for _ in range(14)])
    for d in range(14):
        for t in range(hours_per_day - breaks.get(d, 0)):
            available_tasks = [x for x in tasks if x.available(d, finished_tasks)]
            task_queue = sorted(available_tasks, key=lambda x: (x.end_date(), x.total_hours))
            if task_queue == []:
                # print(d, t, "\t", "Free time!")
                pass
            else:
                task = task_queue[0]
                task.curr_hours += 1
                hours_worked[task.name][d] += 1
                # print(d, t, "\t", task)
                if task.curr_hours == task.hours:
                    finished_tasks.append(task)
                    # print(f"Finished {task}")
                    if task.end_date() < d:
                        error = True
        # print()

    if plot:
        fig, ax = plt.subplots()
        days = ["Sunday", "", "", "Wednesday", "", "", "Saturday", "", "", "Tuesday", "", "", "Friday", ""]
        curr = [0 for _ in range(14)]
        for t in hours_worked:
            ax.bar(list(range(14)), hours_worked[t], bottom=curr, label=t, tick_label=days)
            for task in tasks:
                if task.name == t:
                    ax.plot([task.end_date() + 0.5, task.end_date() + 0.5], [0, hours_per_day], "--")
            curr = [x + y for x, y in zip(curr, hours_worked[t])]
        ax.legend()
        plt.show()
    
    return error

print(run_experiment(4, {}, True))
print(run_experiment(4, {1: 1, 2: 1, 3:1, 4:1, 5:1, 6:3, 7:3, 8:2, 9:2, 10:2, 11:3, 12:4}, True))

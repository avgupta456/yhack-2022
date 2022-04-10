# Clockwork

## Inspiration

College students are busy, juggling classes, research, extracurriculars and more. On top of that, creating a todo list and schedule can be overwhelming and stressful. Personally, we used Google Keep and Google Calendar to manage our tasks, but these tools require constant maintenance and force the scheduling and planning onto the user.

Several tools such as Motion and Reclaim help business executives to optimize their time and maximize productivity. After talking to our peers, we realized college students are not solely concerned with maximizing output. Instead, we value our social lives, mental health, and work-life balance. With so many scheduling applications centered around productivity, we wanted to create a tool that works **with** users to maximize happiness and health.

## What it does

Clockwork consists of a scheduling algorithm and full-stack application. The scheduling algorithm takes in a list of tasks and events, as well as individual user preferences, and outputs a balanced and doable schedule. Tasks include a name, description, estimated workload, dependencies (either a start date or previous task), and deadline.

The algorithm first traverses the graph to augment nodes with additional information, such as the eventual due date and total hours needed for linked sub-tasks. Then, using a greedy algorithm, Clockwork matches your availability with the closest task sorted by due date. After creating an initial schedule, Clockwork finds how much free time is available, and creates modified schedules that satisfy user preferences such as workload distribution and weekend activity.

The website allows users to create an account and log in to their dashboard. On the dashboard, users can quickly create tasks using both a form and a graphical user interface. Due dates and dependencies between tasks can be easily specified. Finally, users can view tasks due on a particular day, abstracting away the scheduling process and reducing stress.

## How we built it

The scheduling algorithm uses a greedy algorithm and is implemented with Python, Object Oriented Programming, and MatPlotLib. The backend server is built with Python, FastAPI, SQLModel, and SQLite, and tested using Postman. It can accept asynchronous requests and uses a type system to safely interface with the SQL database. The website is built using functional ReactJS, TailwindCSS, React Redux, and the uber/react-digraph GitHub library. In total, we wrote about 2,000 lines of code, split 2/1 between JavaScript and Python.

## Challenges we ran into

The uber/react-digraph library, while popular on GitHub with ~2k stars, has little documentation and some broken examples, making development of the website GUI more difficult. We used an iterative approach to incrementally add features and debug various bugs that arose. We initially struggled setting up CORS between the frontend and backend for the authentication workflow. We also spent several hours formulating the best approach for the scheduling algorithm and pivoted a couple times before reaching the greedy algorithm solution presented here.

## Accomplishments that we're proud of

We are proud of finishing several aspects of the project. The algorithm required complex operations to traverse the task graph and augment nodes with downstream due dates. The backend required learning several new frameworks and creating a robust API service. The frontend is highly functional and supports multiple methods of creating new tasks. We also feel strongly that this product has real-world usability, and are proud of validating the idea during YHack.

## What we learned

We both learned more about Python and Object Oriented Programming while working on the scheduling algorithm. Using the react-digraph package also was a good exercise in reading documentation and source code to leverage an existing product in an unconventional way. Finally, thinking about the applications of Clockwork helped us better understand our own needs within the scheduling space.

## What's next for Clockwork

Aside from polishing the several components worked on during the hackathon, we hope to integrate Clockwork with Google Calendar to allow for time blocking and a more seamless user interaction. We also hope to increase personalization and allow all users to create schedules that work best with their own preferences. Finally, we could add a metrics component to the project that helps users improve their time blocking and more effectively manage their time and energy.

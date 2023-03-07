import { useState, useRef } from "react";
import { useOnClickOutside } from "./hooks/useOnClickOutside"
import { v4 as uuidv4 } from "uuid";

import Timer from "./Timer";

interface TaskType {
    _id?: string,
    actPomodoro?: number,
    done?: boolean,
    id: string,
    userId?: string,
    title: string,
    estPomodoro?: number,
    order?: number,
    note?: string,
    projectName?: string,
    created?: Date, // handled by database
    __v?: number, // handled by database
}

export default function App() {
  // const initialTasks = [
  //   {
  //     _id: "6406163d3d0f0e3f4c033267",
  //     actPomodoro: 2,
  //     done: false,
  //     id: "16781205090335",
  //     userId: "60f981944a991342e4c8d7bb",
  //     title: "Pomodoro code",
  //     estPomodoro: 3,
  //     order: 4,
  //     note: "",
  //     projectName: "",
  //     created: "2023-03-06T16:35:09.838Z",
  //     __v: 0,
  //   },
  // ];
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);

  const newTaskForm = useRef<HTMLFormElement>(null);
  useOnClickOutside(newTaskForm, cancelAddTask)

  function handleTaskSubmit(taskId: string, event: React.SyntheticEvent) {
    event.preventDefault();
    if(!newTaskTitle) return;

    let taskToEdit = tasks.find((task) => task.id === taskId) as undefined | TaskType;

    // if task exists edit task, else create a new task 
    if (taskToEdit) {
      // TODO: edit more than just the name field 
      const updatedTask = {
        id: taskId,
        order: 1,
        estimate: 1,
        title: newTaskTitle,
        finished: false,
      };

      const updatedTasks = tasks.map(task => {
        if(task.id === taskId) {
          return {...task, title: newTaskTitle}
        } else {
          return task
        }
      });


      setTasks(updatedTasks);
      setEditTaskId(null);
      setNewTaskTitle("");

    } else {
      let newTask = {
        id: taskId,
        title: newTaskTitle,
      };
  
      setTasks((prevTasks) => [...prevTasks, newTask])
      setNewTaskTitle("");
    }

  }

  function handleDeleteTask(taskId: string) {
    const updatedTasks = tasks.filter(task => task.id !== taskId)
    setTasks(updatedTasks);
    setEditTaskId(null);
  }

  function cancelAddTask() {
    if(newTaskTitle === "") {
      setShowForm(false);
      setEditTaskId(null);
    } else if (confirm("The input data will be lost. Are you sure you want to close it?")) {
      setNewTaskTitle("");
      setShowForm(false);
      setEditTaskId(null);
    } 
  }


  return (
    <div className="max-w-[620px] mx-auto px-3">
      <nav className="py-3 flex justify-between items-center">
        <h1 className="py-5">Pomofocus</h1>
        <span className="flex items-center gap-2">
          <button className="p-2 border">Report</button>
          <button className="p-2 border">Settings</button>
          <div className="p-2 border">
            <span>image filler</span>
          </div>
        </span>
      </nav>

      {/* progressBar */}

      <Timer timeLeft={timeLeft} isRunning={isRunning} setTimeLeft={setTimeLeft} setIsRunning={setIsRunning} />

      <div className="text-center my-5">
        <span># of Pomodoros</span>
        <h2>Current Task</h2>
      </div>
      <div>
        <div className="flex justify-between py-4">
          <h3 className="p-3">Tasks</h3>
          <button className="p-3 border">Task Settings</button>
        </div>
        <div className="flex flex-col gap-3">
          {tasks.map((task) => {
            return editTaskId === task.id ? (
              <form ref={newTaskForm} key={task.id} onSubmit={(event) => handleTaskSubmit(task.id, event)} className="p-3 border">
                <div>
                  <input
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    value={newTaskTitle || task.title}
                    type="text"
                    placeholder="What are you working on?"
                    className="black w-full"
                  />
                </div>
                <div className="my-5">
                  <span className="block mb-2">Est Pomodoros</span>
                  <input placeholder="1" type="number" min="0" step="1" className="w-1/12" />

                  <button type="button" className="ml-2 p-1 border">
                    Up
                  </button>
                  <button type="button" className="ml-2 p-1 border">
                    Down
                  </button>
                </div>
                <div className="flex justify-end">
                  <button onClick={() => handleDeleteTask(task.id)} type="button" className="ml-2 mr-auto p-3 border">
                    delete
                  </button>
                  <button onClick={cancelAddTask} type="button" className="mr-2 p-3 border">
                    cancel
                  </button>
                  <button type="submit" className="mr-2 p-3 border">
                    save
                  </button>
                </div>
              </form>
            ) : (
              <div key={task.id} className="p-5 flex justify-between items-center border border-black">
                <span>{task.title}</span>
                <button onClick={() => setEditTaskId(task.id)} className="p-1 border">
                  Edit
                </button>
              </div>
            );
          })}
          {showForm ? (
            <form ref={newTaskForm} onSubmit={(event) => handleTaskSubmit(uuidv4(), event)} className="p-3 border">
              <div>
                <input
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  value={newTaskTitle}
                  type="text"
                  placeholder="What are you working on?"
                  className="black w-full"
                />
              </div>
              <div className="my-5">
                <span className="block mb-2">Est Pomodoros</span>
                <input placeholder="1" type="number" min="0" step="1" className="w-1/12" />

                <button type="button" className="ml-2 p-1 border">
                  Up
                </button>
                <button type="button" className="ml-2 p-1 border">
                  Down
                </button>
              </div>
              <div className="flex justify-end">
                <button onClick={cancelAddTask} type="button" className="mr-2 p-3 border">
                  cancel
                </button>
                <button type="submit" className="mr-2 p-3 border">
                  save
                </button>
              </div>
            </form>
          ) : (
            <button onClick={() => setShowForm(true)} className="p-5 border outline-dashed text-center">
              add task
            </button>
          )}
        </div>
      </div>
      <div className="p-5 mt-10 border text-center">Stats finish</div>
    </div>
  );
}

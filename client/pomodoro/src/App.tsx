import { useState, useMemo } from "react";
import { useInterval } from "./hooks/useInterval";

import Timer from "./Timer";

export default function App() {
  const initialTasks = [
    {
      id: 1,
      order: 1,
      estimate: 1,
      name: "task A",
      finished: false
    }
  ]
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskName, setNewTaskName] = useState("");
  const [showForm, setShowForm] = useState(false);

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    let newTask = {
      id: (tasks[tasks.length - 1]).id + 1,
      order: 1,
      estimate: 1,
      name: newTaskName,
      finished: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask])
    setNewTaskName("");
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
            return (
              <div key={task.id} className="p-5 border border-black">
                {task.name}
              </div>
            );
          })}
          {showForm ? 
            <form onSubmit={handleSubmit} className="p-3 border">
              <div>
                <input
                  onChange={(e) => setNewTaskName(e.target.value)}
                  value={newTaskName}
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
                <button onClick={() => setShowForm(false)} type="button" className="mr-2 p-3 border">
                  cancel
                </button>
                <button type="submit" className="mr-2 p-3 border">
                  save
                </button>
              </div>
            </form>
            :
            <button onClick={() => setShowForm(true)} className="p-5 border outline-dashed text-center">
              add task
            </button>
          }
        </div>
      </div>
      <div className="p-5 mt-10 border text-center">Stats finish</div>
    </div>
  );
}

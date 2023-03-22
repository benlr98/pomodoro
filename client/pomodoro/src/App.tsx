import { useState, useRef } from "react";

import { TaskType } from "./types";

import Navbar from "./Navbar";
import Timer from "./Timer";
import TaskList from "./TaskList";

export default function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [selectedTask, setSelectedTask] = useState("");
  const [timeLeft, setTimeLeft] = useState(7);
  const [numberOfPomos, setNumberOfPomos] = useState(0);


  const [selectedTaskObject] = tasks.filter((task) => selectedTask === task.id);

  function increaseDailyPomos() {
    setNumberOfPomos((prevNum) => prevNum + 1);
  }

  function resetDailyPomodoros() {
    setNumberOfPomos(0);
  }

  return (
    <div className="max-w-[620px] mx-auto px-3">
      <Navbar />

      {/* progressBar */}

      <Timer
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        increaseDailyPomos={increaseDailyPomos}
      />

      <div className="text-center my-5">
        <h3>Today's pomodoro count: {numberOfPomos}</h3>
        {selectedTaskObject ? (
          <h2>{selectedTaskObject.title}</h2>
        ) : (
          <h2>No Task Selected</h2>
        )}
      </div>

      <TaskList
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        tasks={tasks}
        setTasks={setTasks}
      />

      <div className="p-5 mt-10 border text-center">Stats finish</div>
    </div>
  );
}

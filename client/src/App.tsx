import { useState, useRef } from "react";

import { TaskType, SettingsType } from "./types";

import Navbar from "./Navbar";
import Timer from "./Timer";
import TaskList from "./TaskList";
import Settings from "./Settings";

let defaultSettings: SettingsType = {
  timer: {
    pomodoro: 7,
    shortBreak: 3,
    longBreak: 5,
  }
}

export default function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [selectedTask, setSelectedTask] = useState("");
  const [numberOfPomos, setNumberOfPomos] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);
  const [timeUsed, setTimeUsed] = useState(0)



  const [selectedTaskObject] = tasks.filter((task) => selectedTask === task.id);

  function increaseDailyPomos() {
    setNumberOfPomos((prevNum) => prevNum + 1);
  }

  function resetDailyPomodoros() {
    setNumberOfPomos(0);
  }

  return (
    <div className="max-w-[620px] mx-auto px-3">
      <Navbar setShowSettings={setShowSettings} />
      
      <Settings showSettings={showSettings} setShowSettings={setShowSettings} settings={settings} setSettings={setSettings} />

      {/* progressBar */}


      <Timer
        timeUsed={timeUsed}
        setTimeUsed={setTimeUsed}
        timeSettings={settings.timer}
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

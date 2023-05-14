import { useState, useRef } from "react";

import { TaskType, SettingsType } from "./types";

import Navbar from "./components/Navbar";
import Timer from "./components/Timer";
import TaskList from "./components/TaskList";
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
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [dailyPomos, setDailyPomos] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);
  const [timeUsed, setTimeUsed] = useState(0)
  const [detailReport, setDetailReport] = useState<{}[]>([])



  const [selectedTaskObject] = tasks.filter((task) => selectedTaskId === task.id);

  function increaseDailyPomos() {
    setDailyPomos((prevNum) => prevNum + 1);
  }

  function resetDailyPomodoros() {
    setDailyPomos(0);
  }

  function updateDetailReport(taskId: string) {
    let today = new Date().toISOString().slice(0,10); // ie. 2023-03-24
    let detailReportItem: { id: string; title: string; date: string } = { id: "NO_TASK", title: "NO_TASK", date: today };
    // get task details
    let [ task ] = tasks.filter(task => task.id === taskId);
    // create an object with taskID, taskName, project, date, minutes
    if (task) {
      detailReportItem = {
        id: task.id,
        title: task.title,
        date: today
      }
    }

    setDetailReport((prevDetail) => [...prevDetail, detailReportItem])
    console.log(detailReport);
  }


  return (
    <div className="max-w-[620px] mx-auto px-3">
      <Navbar setShowSettings={setShowSettings} />
      
      <Settings showSettings={showSettings} setShowSettings={setShowSettings} settings={settings} setSettings={setSettings} />

      {/* progressBar */}


      <div>
        Time worked on task:
        <div>
          {/* Listing of tasks with time */}
        </div>
      </div>

      <Timer
        timeUsed={timeUsed}
        setTimeUsed={setTimeUsed}
        settings={settings}
        increaseDailyPomos={increaseDailyPomos}
        updateDetailReport={() => updateDetailReport(selectedTaskId)}
      />

      <div className="text-center my-5">
        <h3>Today's pomodoro count: {dailyPomos}</h3>
        {selectedTaskObject ? (
          <h2>{selectedTaskObject.title}</h2>
        ) : (
          <h2>No Task Selected</h2>
        )}
      </div>

      <TaskList
        selectedTaskId={selectedTaskId}
        setSelectedTaskId={setSelectedTaskId}
        tasks={tasks}
        setTasks={setTasks}
      />

      <div className="p-5 mt-10 border text-center">Stats finish</div>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";

import { TaskType, SettingsType } from "./types";

import { getAllTasks } from "./api/apiTasks";
import { createTracking } from "./api/apiTrackTime";

import Navbar from "./components/Navbar";
import Timer from "./components/Timer";
import TaskList from "./components/TaskList";
import Settings from "./components/Settings";

let defaultSettings: SettingsType = {
  // in seconds
  timer: {
    pomodoro: 60,
    shortBreak: 10,
    longBreak: 15,
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

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data);
      } catch (error) {
        console.log(error);
      }
    };

    getTasks();
  }, []);


  function increaseDailyPomos() {
    setDailyPomos((prevNum) => prevNum + 1);
  }

  function resetDailyPomodoros() {
    setDailyPomos(0);
  }

  function updateDetailReport(taskId: string) {
    let today = new Date().toISOString().slice(0,10); // ie. 2023-03-24
    let defaultItem: { taskId: string; userId: string | undefined; projectId: string }= {taskId: "", userId: "", projectId: ""};
    // get task details
    let [ task ] = tasks.filter(task => task._id === taskId);
    // create an object with taskID, taskName, project, date, minutes
    if (task) {
      defaultItem = {
        taskId: task._id,
        userId: task.userId,
        projectId: "-1"
      }
    }

    createTracking(defaultItem.taskId, defaultItem.userId, defaultItem.projectId)
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

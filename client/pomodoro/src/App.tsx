import { useState, useMemo } from "react";
import { useInterval } from "./hooks/useInterval";

export default function App() {
  const [timeLeft, setTimeLeft] = useState(10);
  const [isRunning, setIsRunning] = useState(true);

  const formattedTime = formatTime(timeLeft);

  useInterval(() => {
    setTimeLeft(timeLeft - 1);
  }, isRunning ? 1000 : null);

  function formatTime(seconds: number) {
    if(seconds <= 0) {
      setIsRunning(false);
      setTimeLeft(1500);
      return { min: "00", sec: "00" };
    }
    let minDisplay = Math.floor(seconds / 60).toString();
    let secDisplay = (seconds % 60).toString();

    if (minDisplay === "0") {minDisplay = "00"};
    if ((seconds % 60) < 10 ) {secDisplay = "0" + secDisplay};

    return {min: minDisplay, sec: secDisplay}
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

      <div className="py-6 px-6 mx-8 border rounded-md">
        <div className="mb-3 flex justify-center gap-2">
          <button className="p-3 border">Pomodoro</button>
          <button className="p-3 border">Short Break</button>
          <button className="p-3 border">Long Break</button>
        </div>
        <h1 className="text-9xl font-bold text-center my-14">
          {formattedTime?.min}:{formattedTime?.sec}
        </h1>
        <div className="flex justify-center gap-3">
          <button className="p-3 border">Pause</button>
          <button className="p-3 border">Start</button>
          <button className="p-3 border">Fast Track</button>
        </div>
      </div>
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
          <div className="p-5 border">task</div>
          <div className="p-5 border">add task</div>
        </div>
      </div>
      <div className="p-5 mt-10 border text-center">Stats finish</div>
    </div>
  );
}

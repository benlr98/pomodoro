import { useState, useRef } from "react";

import Navbar from "./Navbar";
import Timer from "./Timer";
import TaskList from "./TaskList";

export default function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="max-w-[620px] mx-auto px-3">
      <Navbar />

      {/* progressBar */}

      <Timer timeLeft={timeLeft} isRunning={isRunning} setTimeLeft={setTimeLeft} setIsRunning={setIsRunning} />

      <div className="text-center my-5">
        <span># of Pomodoros</span>
        <h2>Current Task</h2>
      </div>

      <TaskList />

      <div className="p-5 mt-10 border text-center">Stats finish</div>
    </div>
  );
}

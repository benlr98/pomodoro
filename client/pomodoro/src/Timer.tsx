import { useState, useMemo } from "react";
import { useInterval } from "./hooks/useInterval";

type TimerProps = {
  timeLeft: number,
  isRunning: boolean,
  setTimeLeft: Function,
  setIsRunning: Function,
}

export default function Timer({ timeLeft, isRunning, setTimeLeft, setIsRunning } : TimerProps) {
  const formattedTime = formatTime(timeLeft);

  useInterval(
    () => {
      setTimeLeft(timeLeft - 1);
    },
    isRunning ? 1000 : null
  );

  function formatTime(seconds: number) {
    if (seconds <= 0) {
      // handle whether short break or long break
      setIsRunning(false);
      setTimeLeft(1500);
      return { min: "00", sec: "00" };
    }
    let minDisplay = Math.floor(seconds / 60).toString();
    let secDisplay = (seconds % 60).toString();

    if (minDisplay === "0") {
      minDisplay = "00";
    }
    if (seconds % 60 < 10) {
      secDisplay = "0" + secDisplay;
    }

    return { min: minDisplay, sec: secDisplay };
  }

  return (
    <div className="py-6 px-6 mx-8 border rounded-md">
      <div className="mb-3 flex justify-center gap-2">
        <button
          onClick={() => {
            setTimeLeft(25 * 60);
            setIsRunning(false);
          }}
          className="p-3 border"
        >
          Pomodoro
        </button>
        <button
          onClick={() => {
            setTimeLeft(5 * 60);
            setIsRunning(false);
          }}
          className="p-3 border"
        >
          Short Break
        </button>
        <button
          onClick={() => {
            setTimeLeft(15 * 60);
            setIsRunning(false);
          }}
          className="p-3 border"
        >
          Long Break
        </button>
      </div>
      <h1 className="text-9xl font-bold text-center my-14">
        {formattedTime?.min}:{formattedTime?.sec}
      </h1>
      <div className="flex justify-center gap-3">
        <button onClick={() => setIsRunning(false)} className="p-3 border">
          Pause
        </button>
        <button onClick={() => setIsRunning(true)} className="p-3 border">
          Start
        </button>
        <button className="p-3 border">Fast Track</button>
      </div>
    </div>
  );
}

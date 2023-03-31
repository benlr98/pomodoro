import { useState, useEffect } from "react";
import { useInterval } from "./hooks/useInterval";

import { SettingsType } from "./types";

import Button from "./components/Button";

interface TimerProps {
  settings: SettingsType;
  timeUsed: number,
  setTimeUsed: Function,
  increaseDailyPomos: Function,
  updateDetailReport: Function,
}
export default function Timer({ settings, increaseDailyPomos, timeUsed, setTimeUsed, updateDetailReport } : TimerProps) {
  const [selectedTimer, setSelectedTimer] = useState<"pomodoro" | "shortBreak" | "longBreak">("pomodoro");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(settings.timer[selectedTimer]);
  const formattedTime = formatTime(timeLeft);

  // when settings change, make sure timeLeft is updated 
  useEffect(() => {
    let isPositive = (settings.timer[selectedTimer] - timeUsed) > 0;
    if (isPositive) {
      setTimeLeft(settings.timer[selectedTimer] - timeUsed);
    }
  }, [settings]);

  const timeSettings = settings.timer;

  const updateReportFrequency = 59;

  useInterval(
    () => {
      setTimeLeft(timeLeft - 1);
      setTimeUsed(timeUsed + 1);
      if(timeUsed % updateReportFrequency === 0) {
        updateDetailReport();
      }
      if (timeLeft === 0) {
        handleTimerEnd();
      }


    },
    isRunning ? 1000 : null
  );

  function handleTimerEnd() {
    setIsRunning(false);

    // TODO: only increase Pomos if pomodoro timer ends, not breaks 
    increaseDailyPomos();

    //TODO: handle whether short break or long break
    // handleResetTimer()
    setTimeLeft(timeSettings[selectedTimer])
    setTimeUsed(0);

    alert("Time has ended!")
  }

  function handleSkipToEnd() {
    handleTimerEnd();
  }

  function formatTime(totalSeconds: number) {
    
    if (totalSeconds <= 0) {
      return { min: "00", sec: "00" };
    }
    
    // type numbers
    let minutes:number = Math.floor(totalSeconds / 60);
    let seconds:number = totalSeconds % 60;
    let minDisplay:string = minutes.toString();
    let secDisplay:string = seconds.toString();

    // handle making 0 into 00
    if (minutes < 10) {
      minDisplay = "0" + minDisplay;
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
            setSelectedTimer("pomodoro");
            setTimeLeft(timeSettings.pomodoro);
            setIsRunning(false);
          }}
          className="p-3 border"
          >
          Pomodoro
        </button>
        <button
          onClick={() => {
            setSelectedTimer("shortBreak");
            setTimeLeft(timeSettings.shortBreak);
            setIsRunning(false);
          }}
          className="p-3 border"
          >
          Short Break
        </button>
        <button
          onClick={() => {
            setSelectedTimer("longBreak");
            setTimeLeft(timeSettings.longBreak);
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
        {isRunning ? (
          <>
            <Button onClick={() => setIsRunning(false)}>Pause</Button>
            <Button onClick={handleSkipToEnd}>Skip To End</Button>
          </>
        ) : (
          <Button onClick={() => setIsRunning(true)}>Start</Button>
        )}
      </div>
    </div>
  );
}

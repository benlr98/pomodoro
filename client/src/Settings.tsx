import { SettingsType } from "./types";

import Button from "./components/Button";

interface SettingsProps {
  showSettings: boolean;
  setShowSettings: Function;
  settings: SettingsType; //TODO: setting type
  setSettings: Function;
}
export default function Settings({
  showSettings,
  setShowSettings,
  settings,
  setSettings,
}: SettingsProps) {

  function handleSettingsChange(field: string, value: string) {
    setSettings((prevSettings: SettingsType) => {
      const prevTimer = prevSettings.timer;
      return {
        ...prevSettings,
        timer: {
          ...prevTimer,
          [field]: value
        }
      }
    })
  }

  function saveSettings() {

  }

  return (
    <div
      className={`${
        showSettings ? "" : "hidden"
      } fixed z-40 inset-0 bg-gray-400 bg-opacity-75 pt-24 overflow-auto`}
    >
      <div className="mx-auto border rounded-lg p-5 mb-20 max-w-md bg-white">
        <div className="flex justify-between items-center">
          <h4>Settings</h4>
          <Button onClick={() => setShowSettings(false)}>&times;</Button>
        </div>
        <div className="flex gap-8">
          <div className="">
            <label htmlFor="pomodoro">Pomodoro</label>
            <input
              className="w-full"
              name="pomodoro"
              type="number"
              onChange={(e) =>
                handleSettingsChange(e.target.name, e.target.value)
              }
              value={settings.timer.pomodoro}
            />
          </div>
          <div className="">
            <label htmlFor="pomodoro">Short Break</label>
            <input
              className="w-full"
              name="shortBreak"
              type="number"
              onChange={(e) =>
                handleSettingsChange(e.target.name, e.target.value)
              }
              value={settings.timer.shortBreak}
            />
          </div>
          <div className="">
            <label htmlFor="pomodoro">Long Break</label>
            <input
              className="w-full"
              name="longBreak"
              type="number"
              onChange={(e) =>
                handleSettingsChange(e.target.name, e.target.value)
              }
              value={settings.timer.longBreak}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

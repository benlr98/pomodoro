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
      } fixed z-40 inset-0 bg-slate-700 pt-24 overflow-auto`}
    >
      <div className="mx-auto border p-5 mb-20 max-w-md  border-black bg-white">
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

        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora
          architecto impedit tenetur laborum at similique provident incidunt
          molestiae. Voluptatibus earum natus hic pariatur vitae recusandae
          error suscipit assumenda tenetur voluptates.
        </p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
        <p>Some text in the Modal..</p>
      </div>
    </div>
  );
}

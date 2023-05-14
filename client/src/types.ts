

export interface TaskType  {
  _id?: string,
  actPomodoro?: number,
  done?: boolean,
  id: string,
  userId?: string,
  title: string,
  estPomodoro?: number,
  order?: number,
  note?: string,
  projectName?: string,
  created?: Date, // handled by database
  __v?: number, // handled by database
};

export interface SettingsType  {
  timer: {
    pomodoro: number,
    shortBreak: number,
    longBreak: number,
  };
};
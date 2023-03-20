interface TaskType {
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
}

type TaskFormProps = {
  task: TaskType,
  setTaskTitle: Function,
  taskTitle: string,
  editTask: Function,
};

export default function TaskForm({ task, taskTitle, setTaskTitle, editTask}: TaskFormProps) {
  return (
    <form className="p-3 border">
      <div>
        <input
          onChange={(e) => setTaskTitle(e.target.value)}
          value={taskTitle || task.title}
          type="text"
          placeholder="What are you working on?"
          className="black w-full"
        />
      </div>
      <div className="my-5">
        <span className="block mb-2">Est Pomodoros</span>
        <input placeholder="1" type="number" min="0" step="1" className="w-1/12" />

        <button type="button" className="ml-2 p-1 border">
          Up
        </button>
        <button type="button" className="ml-2 p-1 border">
          Down
        </button>
      </div>
      <div className="flex justify-end">
        {/* <button onClick={() => handleDeleteTask(task.id)} type="button" className="ml-2 mr-auto p-3 border">
          delete
        </button> */}
        {/* <button onClick={cancelAddTask} type="button" className="mr-2 p-3 border">
          cancel
        </button> */}
        <button type="button" onClick={() => editTask(task.id)} className="mr-2 p-3 border">
          save
        </button>
      </div>
    </form>
  );
}

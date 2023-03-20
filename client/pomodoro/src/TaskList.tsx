import { useState, useRef } from "react";
import { useOnClickOutside } from "./hooks/useOnClickOutside"
import { v4 as uuidv4 } from "uuid";


type TaskType = {
  _id?: string;
  actPomodoro?: number;
  done?: boolean;
  id: string;
  userId?: string;
  title: string;
  estPomodoro?: number;
  order?: number;
  note?: string;
  projectName?: string;
  created?: Date; // handled by database
  __v?: number; // handled by database
}



interface TaskFormProps {
  editTaskId?: string,
  setShowForm: Function,
  setTasks: Function,
  tasks: TaskType[],
  title?: string,
  removeEditForm?: Function,
}
export function TaskForm({ editTaskId, title, setShowForm, setTasks, tasks, removeEditForm }: TaskFormProps) {
  const [taskTitle, setTaskTitle] = useState(title || "");
  
  // will be [] if no given taskId in handleSave params
  const [ editTask ] = tasks.filter(task => task.id === editTaskId);
  
  // handle canceling when clicking outside the form element
  const taskForm = useRef<HTMLFormElement>(null);
  useOnClickOutside(taskForm, handleCancel);
  
  function handleCancel() {
    if (taskTitle === "" || taskTitle === editTask?.title) {
      setShowForm(false);
      // if this is an editForm, clear taskId from editForm
      removeEditForm ? removeEditForm() : "";
    } else if (confirm("The input data will be lost. Are you sure you want to close it?")) {
      setTaskTitle("");
      setShowForm(false);
      // if this is an editForm, clear taskId from editForm
      removeEditForm ? removeEditForm() : "";
    }
  }

  function handleDelete(taskId: string) {
    const updatedTaskList = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTaskList);
    // if this is an editForm, clear taskId from editForm
    removeEditForm ? removeEditForm() : "";
  }


  // handle creating new task or editing existing task 
  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    // cancel adding task no given title
    if (taskTitle === "") {
      handleCancel();
      return
    }


    // if form includes an editTaskId, edit existing task 
    if (editTask) {
      // update and post edited task
      const updatedTaskList = tasks.map(task => {
        if (task.id === editTask.id) {
          return {
            ...task,
            title: taskTitle
          }
        } else {
          return task
        }
      })
      setTasks(updatedTaskList);
      setShowForm(false);
      removeEditForm ? removeEditForm() : "";
    } else {
      // add new task to taskList
      setTasks((prevTasks: TaskType[]) => [
        ...prevTasks,
        { title: taskTitle, id: uuidv4() }
      ])
    }
    
    
    // reset Form
    setTaskTitle("");
  }
  
  return (
    <form ref={taskForm} onSubmit={(e) => handleSave(e)} className="p-3 border">
      <div>
        <input
          onChange={(e) => setTaskTitle(e.target.value)}
          value={taskTitle}
          type="text"
          placeholder="What are you working on?"
          className="black w-full"
          autoFocus
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
        {
          editTaskId ?
            <button onClick={() => handleDelete(editTaskId)} type="button" className="mr-auto p-3 border">
              delete
            </button>
          :
          ""
        }
        <button onClick={handleCancel} type="button" className="mr-2 p-3 border">
          cancel
        </button>
        <button type="submit" className="mr-2 p-3 border">
          save
        </button>
      </div>
    </form>
  );
}

interface TaskProps {
  id: string,
  title: string;
  setEditTaskId: Function,
}
export function Task({ id, title, setEditTaskId }: TaskProps) {

  return (
    <div className="p-5 flex justify-between items-center border border-black">
      <span>{title}</span>
      <button onClick={() => setEditTaskId(id)} className="p-1 border">Edit</button>
    </div>
  );
}

export default function TaskList() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editTaskId, setEditTaskId] = useState("");
  
  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => {
        if (editTaskId === task.id) {
          return <TaskForm key={task.id} editTaskId={task.id} title={task.title} setShowForm={setShowTaskForm} tasks={tasks} setTasks={setTasks} removeEditForm={() => setEditTaskId("")} />;
        }
        else {
          return (
            <Task key={task.id} id={task.id} title={task.title} setEditTaskId={setEditTaskId}/>
          );
        }
      })}

      {showTaskForm ?
        <TaskForm setShowForm={setShowTaskForm} tasks={tasks} setTasks={setTasks} />
      :
        <button onClick={() => setShowTaskForm(true)} className="p-5 border outline-dashed text-center">
          add task
        </button>
      }
    </div>
  );
}
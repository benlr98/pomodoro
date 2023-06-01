import { useState, useRef } from "react";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { v4 as uuidv4 } from "uuid";

import { TaskType } from "../types"
import { createTask, updateTask, deleteTask } from "../api/apiTasks";

import Button from "./shared/Button";

interface TaskFormProps {
  editTaskId?: string;
  setShowForm: Function;
  setTasks: Function;
  tasks: TaskType[];
  title?: string;
  removeEditForm?: Function;
}
export function TaskForm({ editTaskId, title, setShowForm, setTasks, tasks, removeEditForm }: TaskFormProps) {
  const [taskTitle, setTaskTitle] = useState(title || "");

  // will be [] if no given taskId in handleSave params
  const [editTask] = tasks.filter((task) => task._id === editTaskId);

  // handle canceling when clicking outside the form element
  const taskForm = useRef<HTMLFormElement>(null);
  useOnClickOutside(taskForm, handleCancel);

  // CRUD Operations =====================
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
    const updatedTaskList = tasks.filter((task) => task._id !== taskId);
    setTasks(updatedTaskList);

    // TODO: error check task deletion 
    deleteTask(taskId);

    // if this is an editForm, clear taskId from editForm
    removeEditForm ? removeEditForm() : "";
  }

  // handle creating new task or editing existing task
  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // cancel adding task no given title
    if (taskTitle === "") {
      handleCancel();
      return;
    }

    // if form includes an editTaskId, edit existing task
    if (editTask) {
      // TODO: separate this function? 
      let updatedTask = await updateTask(editTask._id, { title: taskTitle });
      if (!updatedTask) return alert('This task may have been deleted. Please refresh.')

      // update and post edited task
      const updatedTaskList = tasks.map((task) => {


        // TODO: handle if error 
        if (updatedTask && task._id === updatedTask._id) {
          return {
            ...task,
            title: taskTitle,
          };
        } else {
          return task;
        }
      });
      setTasks(updatedTaskList);
      setShowForm(false);
      removeEditForm ? removeEditForm() : "";
    } else {

      // call create task api
      const setNewTask = async () => {
        const task = await createTask({
          title: taskTitle,
          userId: "64604ad71dd8a7dbbd6f4b51", // default "Ben" user for testing
          projectId: "-1" // default "no project"
        });

        //TODO: add error checking

        // set tasks with response data
        setTasks((prevTasks: TaskType[]) => [...prevTasks, task]);
      }
      
      // call async function to set task 
      setNewTask()
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
        <Button size="sm">+</Button>
        <Button size="sm">-</Button>
      </div>
      <div className="flex justify-end">
        {editTaskId ? (
          <Button onClick={() => handleDelete(editTaskId)} placeleft="true">
            Delete
          </Button>
        ) : (
          ""
        )}
        <Button onClick={handleCancel}>Cancel</Button>
        <Button type={"submit"}>Save</Button>
      </div>
    </form>
  );
}

interface TaskProps {
  id: string,
  title: string,
  setEditTaskId: Function,
  isSelected: boolean,
  setSelectedTaskId: Function,
}
export function Task({ id, title, setEditTaskId, isSelected, setSelectedTaskId }: TaskProps) {
  return (
    <div
      onClick={() => setSelectedTaskId(id)}
      className={`p-5 flex justify-between items-center border border-black ${isSelected ? "border-4" : ""}`}
    >
      <span>{title}</span>
      <button onClick={() => setEditTaskId(id)} className="p-1 border">
        Edit
      </button>
    </div>
  );
}

interface TaskListProps {
  tasks: TaskType[],
  setTasks: Function,
  selectedTaskId: string,
  setSelectedTaskId: Function,
}
export default function TaskList({ tasks, setTasks, selectedTaskId, setSelectedTaskId }: TaskListProps) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editTaskId, setEditTaskId] = useState("");
  // const [selectedTaskId, setSelectedTaskId] = useState("");

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => {
        // check to see if this task is selected
        const isSelected = task._id === selectedTaskId;
        if (editTaskId === task._id) {
          return (
            <TaskForm
              key={task._id}
              editTaskId={task._id}
              title={task.title}
              setShowForm={setShowTaskForm}
              tasks={tasks}
              setTasks={setTasks}
              removeEditForm={() => setEditTaskId("")}
            />
          );
        } else {
          return (
            <Task
              key={task._id}
              setSelectedTaskId={setSelectedTaskId}
              id={task._id}
              title={task.title}
              isSelected={isSelected}
              setEditTaskId={setEditTaskId}
            />
          );
        }
      })}

      {showTaskForm ? (
        <TaskForm setShowForm={setShowTaskForm} tasks={tasks} setTasks={setTasks} />
      ) : (
        <button onClick={() => setShowTaskForm(true)} className="p-5 border outline-dashed text-center">
          add task
        </button>
      )}
    </div>
  );
}

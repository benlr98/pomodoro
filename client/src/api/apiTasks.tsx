import axios from "axios";
import { TaskType } from "../types";

const BASE_URL = 'http://localhost:3000';

export async function getAllTasks() {
    try {
        const response = await axios.get(`${BASE_URL}/tasks`);
        const tasks = await response.data;
        
        return tasks
    } catch (error) {
        console.log(error)
    }
}


interface ITask {
  title: string;
  userId: string;
  projectId: string;
  estPomodoro?: number;
  actPomodoro?: number;
  createdAt?: Date;
  notes?: string;
  completed?: boolean;
  priority?: number;
  order?: number;
}
export async function createTask(taskData: ITask) {
    try {
        const response = await axios.post(
            `${BASE_URL}/tasks/new`,
            taskData
        );
        const tasks = await response.data;
        return tasks
    } catch (error) {
        console.log(error);
    }
}

export function updateTask(taskId: string, updateObject: object): Promise<TaskType>
export async function updateTask(taskId: string, updateObject: object ) {
    try {
        const response = await axios.put(
            `${BASE_URL}/tasks/${taskId}/update`,
            updateObject    
        );
        const updatedTask: TaskType = response.data;
        return updatedTask
        
    } catch (error) {
        console.log(error)
        return "error"
    }
}

export async function deleteTask(taskId: string) {
    try {
        const response = await axios.delete(`${BASE_URL}/tasks/${taskId}/delete`);
        const deletedTask = response.data;
        
    } catch (error) {
        console.log(error)
    }
}


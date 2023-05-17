import axios from "axios";

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


import axios from "axios";

const BASE_URL = "http://localhost:3000";


export async function createTracking(taskId: string, userId: string | undefined, projectId: string) {
  try {
    let body = {
        taskId,
        userId,
        projectId
    }
    let response = await axios.post(`${BASE_URL}/tracking/new`, taskId ? body : {});
    const tasks = await response.data;
    return tasks;
  } catch (error) {
    console.log(error);
  }
}


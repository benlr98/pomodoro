import axios from "axios";

const BASE_URL = 'http://localhost:3000';

export async function getAllTasks() {
    try {
        const response = await axios.get(`${BASE_URL}/tasks`);
        console.log(response);
    } catch (error) {
        console.log(error)
    }
}


import { Router } from 'express';
const router = Router();
import { 
    createTask,
    getAllTasks
} from '../controllers/taskController.js';

// Route for getting all users
router.get('/', getAllTasks);

// Route to create task
router.post('/new', createTask)

export default router;

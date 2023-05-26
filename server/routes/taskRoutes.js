import { Router } from 'express';
const router = Router();
import { 
    createTask,
    readTasks,
    deleteTask,
} from '../controllers/taskController.js';

// Route for getting all users
router.get('/', readTasks);

// Route to create task
router.post('/new', createTask)

// Route to delete Task
router.delete('/:id/delete', deleteTask)

export default router;

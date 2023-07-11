import { Router } from 'express';
const router = Router();
import { 
    createTracking
} from '../controllers/timeTrackingController.js';

// Route to create task
router.post('/new', createTracking)


/** 
// Route for getting all users
router.get('/', readTasks);

// Route to update task
router.put('/:id/update', updateTask)

// Route to delete Task
router.delete('/:id/delete', deleteTask)
*/

export default router;

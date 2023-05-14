import { Router } from 'express';
const router = Router();
import { 
    getAllUsers, 
    getUserByName, 
    createUser
} from '../controllers/userController.js';

// Route for getting all users
router.get('/', getAllUsers);

// // Route for getting a specific user by ID
router.get('/:name', getUserByName);

// // Route for creating a new user
router.post('/new', createUser);

// // Route for updating an existing user
// router.put('/:id', updateUser);

// // Route for deleting a user
// router.delete('/:id', deleteUser);

export default router;

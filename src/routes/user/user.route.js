import { Router } from 'express';
import * as userController from '../../controller/user/user.controller.js';
import { validateUser, verifyRole } from '../../middleware/userMiddleware/user.middleware.js';

const router = Router();

router.post('/register', userController.createUser);
router.get('/users', validateUser, verifyRole('admin'), userController.getUsers);
router.post('/login', userController.loginUser);
router.get('/users/:id', validateUser, userController.getUserById);
router.delete('/users/:id', validateUser, userController.deleteUserById);
router.put('/users/:id', validateUser, userController.updateUserById);

export default router;
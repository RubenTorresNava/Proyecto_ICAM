import { Router } from 'express';
import * as userController from '../../controller/user/user.controller.js';

const router = Router();

router.post('/register', userController.createUser);
router.get('/users', userController.getUsers);
router.post('/login', userController.loginUser);
router.get('/users/:id', userController.getUserById);
router.delete('/users/:id', userController.deleteUserById);
router.put('/users/:id', userController.updateUserById);

export default router;
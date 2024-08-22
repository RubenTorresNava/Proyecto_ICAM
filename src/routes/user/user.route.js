import { Router } from 'express';
import * as userController from '../../controller/user/user.controller.js';

const router = Router();

router.post('/register', userController.createUser);
router.get('/users', userController.getUsers);
router.post('/login', userController.login);

export default router;
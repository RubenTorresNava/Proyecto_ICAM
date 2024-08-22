import { Router } from 'express';
import * as userController from '../../controller/user/user.controller.js';

const router = Router();

router.post('/register', userController.createUser);
router.get('/users', userController.getUsers);

export default router;
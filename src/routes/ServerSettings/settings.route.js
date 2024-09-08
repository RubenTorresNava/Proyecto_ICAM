import { Router } from 'express';
import * as SettingsController from '../../controller/server_settings/settings.controller.js';
import { validateUser, verifyRole } from '../../middleware/userMiddleware/user.middleware.js';

const router = Router();

router.get('/settings', validateUser, verifyRole('admin'), SettingsController.getServerSettings);
router.put('/settings', validateUser, verifyRole('admin'), SettingsController.updateServerSettingsFromFile);

export default router;
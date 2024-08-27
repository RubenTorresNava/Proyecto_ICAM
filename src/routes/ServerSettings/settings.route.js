import { Router } from 'express';
import * as SettingsController from '../../controller/server_settings/settings.controller.js';

const router = Router();

router.get('/settings', SettingsController.getServerSettings);
router.put('/settings', SettingsController.updateServerSettingsFromFile);

export default router;
import express from 'express';
import morgan from 'morgan';
import corse from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import UserRoutes from './routes/user/user.route.js';
import SettingsRoutes from './routes/ServerSettings/settings.route.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan('dev'));
app.use(corse());
app.use(express.json());

app.use(express.static(path.join(__dirname, './public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
    });

    app.use("/api/user", UserRoutes);
    app.use("/api/server", SettingsRoutes);

export default app;
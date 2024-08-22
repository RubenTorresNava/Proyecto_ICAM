import express from 'express';
import morgan from 'morgan';
import corse from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(morgan('dev'));
app.use(corse());

app.use(express.static(path.join(__dirname, './public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
    });

export default app;
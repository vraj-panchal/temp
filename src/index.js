import express from 'express';
import studentRouter from './routes/StudentRouter.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Routes
app.use('/api', studentRouter);

app.get('/', (req, res) => {
    res.send('Student API is running.');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

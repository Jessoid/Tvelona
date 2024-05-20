//import jwt from 'jsonwebtoken';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import db from './config/database.js';
import userRouter from './routes/userRouter.js';
import appointmentRouter from './routes/appointmentRouter.js';
import reviewsRouter from './routes/reviewsRouter.js';


//------------------------------------------------------------------
const app = express();
//соединение с бд
try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}

//-----------------------------------------------------------------
//передавать данные в FRONTEND
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello, Tvelona!!!');
});

//-----------------------------------------------------------------

app.use('/appointments', appointmentRouter);
app.use('/reviews', reviewsRouter);
app.use('/users', userRouter);

//-----------------------------------------------------------------
app.listen(5000, () => console.log('Server OK, running at port 5000'));
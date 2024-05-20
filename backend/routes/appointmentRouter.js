import express from 'express';
import {bookAppointment, getAppointments} from '../controllers/appointment.js';
import {checkAuth} from "../validations/checkAuth.js";

const appointmentRouter = express.Router();

// Маршрут для записи на процедуру
appointmentRouter.post('/book', bookAppointment);

// Список всех записей
appointmentRouter.get('/all', checkAuth, getAppointments);
appointmentRouter.get('/admin-all', checkAuth, getAppointments);

export default appointmentRouter;
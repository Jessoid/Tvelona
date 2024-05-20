import {sendEmail} from '../email/emailService.js';
import Appointment from '../models/appointment.js';
import Users from "../models/user.js";

export const bookAppointment = async (req, res) => {
    try {
        const {userId, firstName, lastName, email, phone, procedure, date} = req.body;

        // Проверка наличия всех обязательных данных
        if (!firstName || !lastName || !email || !phone || !procedure || !date) {
            return res.status(400).json({msg: 'Пожалуйста, заполните все поля'});
        }

        // Запись клиента на процедуру в обе таблицы
        const newAppointment = await Appointment.create({
            user_id: userId ? userId : null,
            name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            procedure: procedure,
            date: date
        });

        // Отправка электронного письма клиенту
        //sendEmail(email, 'Запись на процедуру', `Здравствуйте, вы записаны на процедуру на ${appointmentDate}`);

        res.status(201).json({msg: 'Вы успешно записаны на процедуру!', appointment: newAppointment});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Произошла ошибка при записи на процедуру'});
    }
};

export const getAppointments = async (req, res) => {
    try {
        const path = req.path;
        const appointments = await Appointment.findAll({
            attributes: req.role === "admin" && path === "/admin-all" ? null : ['name', 'last_name', 'email', 'phone', 'procedure', 'date', 'status', 'date_created', 'date_updated'],
            where: {user_id: req.id},
            order: [['date_created', 'DESC']]
        });

        res.json(appointments);
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            msg: 'Запрос без прав доступа'
        });
    }
};
import nodemailer from 'nodemailer';
import User from '../models/user.js'; // Импортируйте модель пользователя

// Создание транспортера для отправки почты
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tvelona.info@gmail.com', // Ваш адрес электронной почты
        pass: 'Aljonatverskaja77' // Ваш пароль от электронной почты
    }
});

// Функция для отправки электронной почты
export const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: 'tvelona.info@gmail.com', // Адрес отправителя
            to: to, // Адрес получателя
            subject: subject, // Тема письма
            text: text // Текст письма
        };

        // Отправка письма
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
};

// Функция для записи в базу данных и отправки электронной почты
export const bookAppointment = async (req, res) => {
    try {
        const { appointmentDate, email } = req.body;

        // Проверка наличия всех обязательных данных
        if (!appointmentDate || !email) {
            return res.status(400).json({ msg: 'Пожалуйста, заполните все поля' });
        }

        // Находим пользователя по его электронной почте
        const user = await User.findOne({ where: { Email: email } });

        // Проверяем, найден ли пользователь
        if (!user) {
            return res.status(404).json({ msg: 'Пользователь с такой электронной почтой не найден' });
        }

        // Запись клиента на процедуру с указанием его id
        const newAppointment = await AvailableSlot.create({
            AppointmentDate: appointmentDate,
            UserID: user.id, // Присваиваем UserID пользователя
            Status: 'booked',
        });

        // Отправка электронного письма клиенту
        sendEmail(email, 'Запись на процедуру', `Здравствуйте, вы записаны на процедуру на ${appointmentDate}`);

        res.status(201).json({ msg: 'Вы успешно записаны на процедуру', appointment: newAppointment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Произошла ошибка при записи на процедуру' });
    }
};
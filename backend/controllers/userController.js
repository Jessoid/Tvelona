import Users from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const Register = async (req, res) => {
    try {
        //читаем данные, переданные для регистрации (из формы)
        const {name, email, phone, password, confPassword} = req.body;

        //проверка пароля и подтверждение
        if (password.length === 0 || password !== confPassword) {
            return res.status(400).json({msg: 'Пароли не совпадают'});
        }

        //проверяем не занят ли уже электронный адрес
        const existingUser = await Users.findOne({
            where: {email: email}
        });
        if (existingUser) {
            return res.status(400).json({msg: 'Этот электронный адрес уже используется'});
        }

        //шифруем пароль
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        //запрос INSERT INTO
        Users.create({
            name: name,
            email: email,
            phone: phone ? phone : null,
            password: hashPassword
        }).then((response) => {
            //jwt -создаем токен
            const token = jwt.sign({
                id: response.id,
                name: response.name,
                email: response.email,
                phone: response.phone,
                role: response.role
            }, 'secretword123', {
                //no valid 30d
                expiresIn: '30d',
            });
            res.json({token});
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Ошибка при регистрации пользователя'});
    }
};

export const Login = async (req, res) => {
    try {
        // Проверяем, существует ли пользователь с указанным адресом электронной почты
        const user = await Users.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!user) {
            return res.status(400).json({msg: 'Пользователь с указанным адресом электронной почты не найден'});
        }

        // Проверяем пароль
        const isValidPass = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPass) {
            return res.status(400).json({msg: 'Неверный пароль'});
        }

        // Создаем JWT токен
        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
        }, 'secretword123', {
            expiresIn: '30d',
        });

        // Устанавливаем токен в куки
        res.cookie('token', token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});

        // Возвращаем данные пользователя и токен
        res.json({id: user.id, name: user.name, token});
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Произошла ошибка при попытке войти в систему'});
    }
};

export const getMe = async (req, res) => {
    try {
        //читаем переданное из checkAuth - redq.id
        const user = await Users.findAll({
            where: {
                id: req.id,
            },
        });

        if (!user) {
            return res.status(400).json({
                msg: 'Пользователь не найден',
            });
        }
        const id = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const phone = user[0].phone;
        const role = user[0].role;
        res.json({id, name, email, phone, role});
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            msg: 'Запрос без прав доступа'
        });
    }
};

export const getUsers = async (req, res) => {
    try {
        let users = [];
        if (req.role === "admin") {
            users = await Users.findAll({
                attributes: ['id', 'name', 'email', 'phone', 'role', 'date_created', 'date_updated'],
                order: [['date_created', 'DESC']]
            });
        }
        res.json(users);
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            msg: 'Запрос без прав доступа'
        });
    }
};
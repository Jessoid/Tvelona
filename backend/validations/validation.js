import {body} from 'express-validator';

export const registerValidation = [
    body('name', 'Минимальное количество символов в имени: 3').isLength({min: 3, max: 100}),
    body('email', 'Неверная электронная почта').isEmail(),
    body('password', 'Минимальное количество символов в пароле: 6').isLength({min: 6, max: 100}),
];

export const loginValidation = [
    body('email', 'Неверная электронная почта').isEmail(),
    body('password', 'Неверный пароль').isLength({min: 6, max: 100}),
];
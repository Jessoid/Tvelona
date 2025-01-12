import { validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
    //если ошибка запрос не выполняется
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    //если всё ок -> далее
    next();
};
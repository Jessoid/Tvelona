import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/,'');
    if (token) {
        try {
            //расшифровываем токен
            const decoded = jwt.verify(token, 'secretword123');
            req.id= decoded.id;
            req.role= decoded.role;
            next();
        } catch (e) {
            return res.status(403).json({
                msg: 'Пользователь не имеет доступа'
            });
        }
    } else {
        return res.status(403).json({
            msg: 'Нет доступа',
        });
    }
};
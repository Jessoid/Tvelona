import Review from "../models/review.js";
import User from "../models/user.js";

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            attributes: ['id', 'rating', 'comment', 'date_created'], // Только эти безопасные поля из Review
            include: [{
                model: User,
                as: 'user',
                attributes: ['name'], // Только эти безопасные поля из User
            }],
            where: {},
            order: [['date_created', 'DESC']],
        });
        res.json(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error.message});
    }
};

export const createReview = async (req, res) => {
    try {
        const {user_id, rating, comment} = req.body;
        // Проверяем, присутствует ли идентификатор пользователя в запросе
        if (!user_id) {
            return res.status(400).json({msg: 'Идентификатор пользователя отсутствует'});
        } else if (!rating) {
            return res.status(400).json({msg: 'Рейтинг отсутствует'});
        } else if (!comment) {
            return res.status(400).json({msg: 'Комментарий отсутствует'});
        }

        // Создаем отзыв, используя данные из запроса
        const createdReview = await Review.create({user_id, rating, comment});

        res.status(201).json({
            msg: 'Отзыв успешно добавлен!',
            review: createdReview,
        });
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const updateReview = async (req, res) => {
    try {
        await Review.update(req.body, {
            where: {id: req.params.id},
        });
        res.json({msg: 'Review Updated'});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const deleteReview = async (req, res) => {
    try {
        await Review.destroy({
            where: {id: req.params.id},
        });
        res.json({msg: 'Review deleted'});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
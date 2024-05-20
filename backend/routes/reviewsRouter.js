import express from 'express';
import { checkAuth } from '../validations/checkAuth.js';
import {
    getAllReviews,
    createReview,
    updateReview,
    deleteReview,
} from '../controllers/reviewsController.js';

const reviewsRouter = express.Router();

reviewsRouter.get('/', getAllReviews);
reviewsRouter.post('/create', checkAuth, createReview);
reviewsRouter.patch('/:id', checkAuth, updateReview);
reviewsRouter.delete('/:id', checkAuth, deleteReview);

export default reviewsRouter;
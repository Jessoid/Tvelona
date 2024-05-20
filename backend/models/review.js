import {DataTypes, Model} from 'sequelize';
import db from '../config/database.js';
import User from "./user.js";

class Review extends Model {
}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date_created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize: db,
        modelName: 'Review',
        tableName: 'reviews',
        timestamps: false,
    }
);

Review.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export default Review;
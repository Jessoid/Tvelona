import {Model, DataTypes} from 'sequelize';
import db from '../config/database.js';

class User extends Model {
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {type: DataTypes.STRING},
        password: {type: DataTypes.TEXT},
        email: {type: DataTypes.STRING},
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {type: DataTypes.STRING, defaultValue: "user"},
        date_created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        date_updated: {type: DataTypes.DATE}
    },
    {
        sequelize: db,
        tableName: 'users',
        freezeTableName: true,
        modelName: 'User',
        timestamps: false, // Указываем здесь false
    },
);

export default User;
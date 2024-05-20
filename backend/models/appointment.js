import { DataTypes, Model } from 'sequelize';
import db from '../config/database.js';
import User from "./user.js";

class Appointment extends Model {}

Appointment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        procedure: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('booked', 'cancelled', 'completed'),
            defaultValue: 'booked'
        },
        date_created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        date_updated: {type: DataTypes.DATE}
    },
    {
        sequelize: db,
        modelName: 'Appointment',
        tableName: 'appointments',
        timestamps: false, // Предполагается, что нет временных меток в таблице
    }
);

Appointment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export default Appointment;
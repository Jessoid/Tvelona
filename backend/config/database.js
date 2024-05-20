import { Sequelize } from 'sequelize';

const db = new Sequelize('tvelona', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

export default db;
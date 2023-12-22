"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// Database configuration
const dbName = 'flashcard_db';
const dbUser = 'flashcard_user';
const dbPassword = 'onepiece';
const dbHost = 'localhost';
// Create a Sequelize instance
exports.sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'postgres',
    // Optional settings
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000 // The maximum time, in milliseconds, that a connection can be idle before being released
    }
});
// Test the connection
exports.sequelize.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
    // Sync all models
    return exports.sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables
})
    .then(() => {
    console.log('Database synchronized');
})
    .catch(err => {
    console.error('Unable to connect to the database:', err);
});
// Export the sequelize instance
exports.default = exports.sequelize;
//# sourceMappingURL=database.js.map
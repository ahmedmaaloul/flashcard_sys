import { Sequelize } from 'sequelize';
// Database configuration
const dbName = 'flashcard_db';
const dbUser = 'flashcard_user';
const dbPassword = 'onepiece';
const dbHost = 'localhost';

// Create a Sequelize instance
export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'postgres',

    // Optional settings
    pool: {
        max: 5, // Maximum number of connection in pool
        min: 0, // Minimum number of connection in pool
        acquire: 30000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000 // The maximum time, in milliseconds, that a connection can be idle before being released
    }
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        // Sync all models
        return sequelize.sync({ alter: true }); // Use { force: true } to drop and recreate tables
    })
    .then(() => {
        console.log('Database synchronized');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Export the sequelize instance
export default sequelize;
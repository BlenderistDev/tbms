const Sequelize = require('sequelize');

/**
 * database connection singleton
 */
class DatabaseConnection {

    /**
     * @returns database connection 
     */
    static getConnection() {

        if (DatabaseConnection._connection === undefined) {
            DatabaseConnection._connection = new Sequelize({
                dialect: 'sqlite',
                storage: './database.db',
                logging: false,
                define: {
                    timestamps: false,
                },
            });
        }
        return DatabaseConnection._connection;
    }
}

module.exports = DatabaseConnection.getConnection();

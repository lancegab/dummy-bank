const Sequelize = require('sequelize');

const connectionUrl = 'postgres://bankuser:bankpassword@localhost:5432/bankdb';
const database = new Sequelize(connectionUrl);

module.exports = database;

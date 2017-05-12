'use strict';

const database = require('../database');
const models = require('../models');

module.exports = {
    up: function (migration, Sequelize) {
        return database.sync();
    },

    down: function (migration, Sequelize) {
        return database.drop();
    }
};

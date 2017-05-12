'use strict';

module.exports = {
    up: function (migration, Sequelize) {
        return migration.createTable('accounts', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            balance: {
                type: Sequelize.FLOAT,
                defaultValue: 0
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            }
        });
    },

    down: function (migration, Sequelize) {
        return migration.dropTable('accounts');
    }
};

const Sequelize = require('sequelize');

const sequelize = new Sequelize('expensetracker','root','Abhay@123', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
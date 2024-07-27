const env = require("dotenv")
const Sequelize = require("sequelize");

env.config()

const sequelize = new Sequelize("teste", "root", "root", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = sequelize;
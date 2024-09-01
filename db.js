const env = require("dotenv")
const Sequelize = require("sequelize");

 env.config()

const sequelize = new Sequelize("iforum", "root", "12345", {
    host: "127.0.0.1",
    dialect: "mysql"
});

module.exports = sequelize;
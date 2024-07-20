// const env = require("dotenv")
const Sequelize = require("sequelize");

// env.config()

const sequelize = new Sequelize("iforum", "root", "12345", {
    host: "mysql_db",
    dialect: "mysql"
});

module.exports = sequelize;
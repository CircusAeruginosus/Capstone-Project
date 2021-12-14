require("dotenv").config();

const { DB_KEY } = process.env;

const Sequelize = require("sequelize");

const sequelize = new Sequelize(DB_KEY, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    saveToDb: (req, res) => {

    }

}




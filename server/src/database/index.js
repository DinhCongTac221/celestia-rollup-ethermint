require("module-alias/register");
const { Sequelize, Op } = require("sequelize");
const config = require("@config");
const { initModels } = require("@mysql/models/init-models");
const mysql = require("mysql2");

const sequelize = new Sequelize(
    config.mysql.database,
    config.mysql.username,
    config.mysql.password,
    {
        ...config.mysql,
        dialectOptions: { decimalNumbers: true },
    }
);

exports.mySqlConnect = async () => {
    await sequelize.authenticate();
    console.log("MYSQL DB connected");
};

const models = initModels(sequelize);
exports.models = models;

const dbPool = mysql
    .createPool({
        host: config.mysql.host,
        user: config.mysql.username,
        password: config.mysql.password,
        database: config.mysql.database,
        waitForConnections: true,
        connectionLimit: 500,
        queueLimit: 0,
    })
    .promise();

exports.sequelize = sequelize;
exports.dbPool = dbPool;
exports.Op = Op;
exports.Sequelize = Sequelize;

require("module-alias/register");
const dotEnv = require("dotenv");
const SequelizeAuto = require("sequelize-auto");
const path = require("path");
const { Sequelize } = require("sequelize");

dotEnv.config({});

const config = {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: +process.env.MYSQL_PORT,
    dialect: "mysql",
};

const main = async () => {
    const sequelize = new Sequelize(config.database, config.username, config.password, config);

    const options = {
        caseFile: "c",
        caseModel: "c",
        caseProp: "c",
        directory: path.resolve(process.cwd(), "src", "database", "models"),
        additional: {
            timestamps: false,
        },
    };

    const auto = new SequelizeAuto(sequelize, null, null, options);

    auto.run();
};

main();

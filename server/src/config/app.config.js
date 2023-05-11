require("module-alias/register");
require("dotenv").config();

const config = {};

config.app = {
    port: process.env.PORT_APP,
};

config.redis = {
    host: process.env.REDIS_CONFIG_HOST,
    port: process.env.REDIS_CONFIG_PORT,
};

config.mysql = {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USERNAME,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: +process.env.MYSQL_PORT,
    dialect: "mysql",
};

config.celestia = {
    nodeWallet: process.env.NODE_WALLET,
    nodeId: process.env.NODE_ID,
}

module.exports = config;

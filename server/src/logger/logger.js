var winston = require("winston");
const path = require("path");
const moment = require("moment");
require("winston-daily-rotate-file");

var transport1 = new winston.transports.DailyRotateFile({
    level: "info",
    filename: path.join(__dirname, "../../logs/info/", `Celestia-api-info_%DATE%.log`),
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "50m",
    maxFiles: "14d",
});

var transport2 = new winston.transports.DailyRotateFile({
    level: "warn", //for both error and warn log
    filename: path.join(__dirname, "../../logs/warn/", `Celestia-api-warning_%DATE%.log`),
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "50m",
    maxFiles: "14d",
});

const customFormat = winston.format.printf((info) => {
    return `${moment(info.timestamp).utc().utcOffset("+0700").format()}: ${info.message}`;
});

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
        customFormat
    ),
    transports: [
        transport1, // will be used on info level
        transport2, // will be used on warn + error level
    ],
});

module.exports = logger;

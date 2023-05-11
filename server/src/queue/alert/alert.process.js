require("module-alias/register");
const logger = require("@logger");
const alertNodeUptime = require("@telegram/alertNodeUptime");

const alertProcess = async (alert) => {
    try {
        await alertNodeUptime(alert);
    } catch (error) {
        logger.warn("alert.process exception: " + error);
    }
};

module.exports = alertProcess;

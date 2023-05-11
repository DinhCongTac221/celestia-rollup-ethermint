require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getFailedAlerts = async () => {
    try {
        const failedAlerts = await models.alerts.findAll({
            where: {
                status: "failed",
            },
            raw: true,
        });
        if (!failedAlerts?.length > 0) {
            logger.info("getFailedAlerts not found any unconverted record");
            return [];
        } else {
            return failedAlerts;
        }
    } catch (exception) {
        logger.warn("getFailedAlerts got exception:" + exception);
        return [];
    }
};

module.exports = getFailedAlerts;

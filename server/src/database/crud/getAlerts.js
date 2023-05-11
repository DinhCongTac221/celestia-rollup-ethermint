require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getAlerts = async () => {
    try {
        const alerts = await models.alerts.findAll({
            where: {
                status: "failed",
            },
            raw: true,
        });
        if (alerts?.length > 0) {
            return alerts;
        } else {
            logger.info(`getAlerts cannot find any address as request`);
            return [];
        }
    } catch (exception) {
        logger.warn("getAlerts got exception:" + exception);
        return [];
    }
};
module.exports = getAlerts;

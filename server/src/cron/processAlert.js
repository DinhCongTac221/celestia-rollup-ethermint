require("module-alias/register");
const logger = require("@logger");
const getAlerts = require("@mysql/crud/getAlerts");
const alertQueue = require("@queue/alert/alert.queue");

processAlert = async () => {
    try {
        const alerts = await getAlerts();
        const jobOptions = {
            removeOnComplete: true,
            attempts: 1,
        };
        for (let index = 0; index < alerts.length; index++) {
            const thisAlert = alerts[index];
            await alertQueue.add(
                {
                    alert: thisAlert,
                },
                jobOptions
            );
        }
    } catch (error) {
        logger.warn("processAlert got exception:", error);
    }
};

module.exports = processAlert;

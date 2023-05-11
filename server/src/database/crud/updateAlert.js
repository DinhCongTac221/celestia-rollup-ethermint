require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");
const dayjs = require("dayjs");

const updateAlert = async (alert) => {
    try {
        const { id, status } = alert;
        if (!id) return;
        await models.alerts.update(
            {
                status: status,
                updatedAt: +dayjs(),
            },
            {
                where: {
                    id: +id,
                },
            }
        );
    } catch (exception) {
        logger.warn("updateAlert got exception:" + exception);
        return false;
    }
};
module.exports = updateAlert;

require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");
const dayjs = require("dayjs");

const insertAlert = async (alert) => {
    try {
        const { address_id, message, chat_id, bot_token_id } = alert;
        if (!address_id || !message || !chat_id || !bot_token_id) return;
        await models.alerts.create({
            addressId: address_id,
            chatId: chat_id,
            botTokenId: bot_token_id,
            message: message,
            createdAt: +dayjs(),
        });
    } catch (exception) {
        logger.warn("insertAlert got exception:" + exception);
        return false;
    }
};
module.exports = insertAlert;

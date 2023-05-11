require("module-alias/register");
const botSendMessage = require("@telegram/botSendMessage");
const logger = require("@logger");

const alertNodeUptime = async (alert) => {
    try {
        if (alert.botToken && alert.chatId && alert.message) {
            await botSendMessage({
                botToken: alert.botToken,
                chatId: alert.chatId,
                message: alert.message,
            });
        } else {
            logger.warn(`alertNodeUptime got invalid require: ${alert}`);
        }

        return true;
    } catch (e) {
        return false;
    }
};

module.exports = alertNodeUptime;

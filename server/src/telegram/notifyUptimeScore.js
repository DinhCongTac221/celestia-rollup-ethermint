require("module-alias/register");
const botSendMessage = require("@telegram/botSendMessage");
const logger = require("@logger");

const notifyUptimeScore = async (alert) => {
    try {
        if (alert.botToken && alert.chatId && alert.message) {
            await botSendMessage({
                botToken: alert.botToken,
                chatId: alert.chatId,
                message: alert.message,
            });
        } else {
            logger.warn(`notifyUptimeScore got invalid require: ${JSON.stringify(alert, null, 4)}`);
        }

        return true;
    } catch (e) {
        return false;
    }
};

module.exports = notifyUptimeScore;

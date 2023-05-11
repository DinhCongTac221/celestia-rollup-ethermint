require("module-alias/register");
const axios = require("axios");
const logger = require("@logger");

const botSendMessage = async ({ botToken, chatId, message }) => {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const request = {
        chat_id: chatId,
        text: message,
    };

    try {
        const { data: resp } = await axios.post(url, request);
        return resp;
    } catch (error) {
        logger.error(`Lib telegram bot message error: ${error}`);
        return null;
    }
};

module.exports = botSendMessage;

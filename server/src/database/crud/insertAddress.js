require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");
const dayjs = require("dayjs");

const insertAddress = async (address) => {
    try {
        const { ip, node_id, wallet_address, chat_id, bot_token_id } = address;
        if (!node_id && !wallet_address) return;
        await models.addresses.create({
            ip: ip,
            nodeId: node_id,
            walletAddress: wallet_address,
            chatId: chat_id,
            botTokenId: bot_token_id,
            createdAt: +dayjs(),
        });
    } catch (exception) {
        logger.warn("insertAddress got exception:" + exception);
        return false;
    }
};
module.exports = insertAddress;

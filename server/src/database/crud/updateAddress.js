require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");
const dayjs = require("dayjs");

const updateAddress = async (address) => {
    try {
        let {
            id,
            ip,
            node_id,
            wallet_address,
            chat_id,
            bot_token_id,
            last_uptime_score,
            quality_index,
            wallet_balance,
            status,
        } = address;
        const addressInfo = await models.addresses.findOne({
            where: {
                id: +id,
            },
        });
        if (!id || !addressInfo) return;
        if (!ip) ip = addressInfo.ip;
        if (!node_id) node_id = addressInfo.nodeId;
        if (!wallet_address) wallet_address = addressInfo.walletAddress;
        if (!chat_id) chat_id = addressInfo.chatId;
        if (!bot_token_id) bot_token_id = addressInfo.botTokenId;
        if (!last_uptime_score) last_uptime_score = addressInfo.lastUptimeScore;
        if (!quality_index) quality_index = addressInfo.qualityIndex;
        if (!wallet_balance) wallet_balance = addressInfo.walletBalance;
        if (!status) status = addressInfo.status;

        await models.addresses.update(
            {
                ip: ip,
                nodeId: node_id,
                walletAddress: wallet_address,
                chatId: chat_id,
                botTokenId: bot_token_id,
                lastUptimeScore: last_uptime_score,
                qualityIndex: quality_index,
                walletBalance: wallet_balance,
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
        logger.warn("updateAddress got exception:" + exception);
        return false;
    }
};
module.exports = updateAddress;

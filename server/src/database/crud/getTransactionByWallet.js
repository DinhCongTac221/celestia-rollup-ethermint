require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getTransactionByWallet = async (walletAddress) => {
    try {
        const transactions = await models.transactions.findAll({
            where: {
                walletAddress: walletAddress,
            },
            raw: true,
            limit: 50,
            order: [["id", "DESC"]],
        });
        if (transactions?.length > 0) {
            return transactions;
        } else {
            logger.warn(`getTransactionByWallet cannot find any address as request`);
            return [];
        }
    } catch (exception) {
        logger.warn("getTransactionByWallet got exception:" + exception);
        return [];
    }
};
module.exports = getTransactionByWallet;

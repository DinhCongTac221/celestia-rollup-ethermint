require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");
const dayjs = require("dayjs");

const insertTransaction = async (transaction) => {
    try {        
        const { wallet_address, height, txhash, raw_log, gas_wanted, gas_used, namespace_id } = transaction;       

        if (!txhash || !namespace_id) return;

        await models.transactions.create({
            walletAddress: wallet_address,
            namespaceId: namespace_id,
            height: height,
            txhash: txhash,
            rawLog: raw_log,
            gasWanted: gas_wanted,
            gasUsed: gas_used,
            createdAt: +dayjs(),
        });        
        return true;
        
    } catch (exception) {
        logger.warn("insertTransaction got exception:" + exception);
        return false;
    }
};
module.exports = insertTransaction;

require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getAddressByWallet = async (walletAddress) => {
    try {
        const address = await models.addresses.findAll({
            where: {
                walletAddress: walletAddress,
            },
            raw: true,
        });
        if (address) {
            return address;
        } else {
            logger.warn(`getAddressByWallet cannot find any address as request`);
            return null;
        }
    } catch (exception) {
        logger.warn("getAddressByWallet got exception:" + exception);
        return null;
    }
};
module.exports = getAddressByWallet;

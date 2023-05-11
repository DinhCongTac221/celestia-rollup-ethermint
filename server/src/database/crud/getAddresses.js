require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getAddresses = async () => {
    try {
        const addresses = await models.addresses.findAll({
            where: {
                status: "enable",
            },
            raw: true,
        });
        if (addresses?.length > 0) {
            return addresses;
        } else {
            logger.warn(`getAddresses cannot find any address as request`);
            return [];
        }
    } catch (exception) {
        logger.warn("getAddresses got exception:" + exception);
        return [];
    }
};
module.exports = getAddresses;

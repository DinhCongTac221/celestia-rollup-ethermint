require("module-alias/register");
const logger = require("@logger");
const { models } = require("@mysql/index");

const getAddressByNodeId = async (nodeId) => {
    try {
        const address = await models.addresses.findAll({
            where: {
                nodeId: nodeId,
            },
            raw: true,
        });
        if (address) {
            return address;
        } else {
            logger.warn(`getAddressByNodeId cannot find any address as request`);
            return null;
        }
    } catch (exception) {
        logger.warn("getAddressByNodeId got exception:" + exception);
        return null;
    }
};
module.exports = getAddressByNodeId;

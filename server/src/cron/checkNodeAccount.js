require("module-alias/register");
const logger = require("@logger");
const getAddresses = require("@mysql/crud/getAddresses");
const nodeQueue = require("@queue/node/node.queue");
const accountQueue = require("@queue/account/account.queue");

checkNodeAccount = async () => {
    try {
        const addresses = await getAddresses();
        const jobOptions = {
            removeOnComplete: true,
            attempts: 1,
        };
        for (let index = 0; index < addresses.length; index++) {
            const thisAddress = addresses[index];
            await accountQueue.add(
                {
                    account: thisAddress,
                },
                jobOptions
            );
            if (thisAddress.nodeId) {
                await nodeQueue.add(
                    {
                        node: thisAddress,
                    },
                    jobOptions
                );
            }
        }
    } catch (error) {
        logger.warn("checkNodeAccount got exception:", error);
    }
};

module.exports = checkNodeAccount;

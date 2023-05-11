require("module-alias/register");
const logger = require("@logger");
const getTransactionByWallet = require("@mysql/crud/getTransactionByWallet");

const transactionController = async (req, res) => {
    try {
        const urlParams = new URLSearchParams(req.query);
        const walletAddress = urlParams.get("wallet");
        if (!walletAddress) {
            return res.status(404).json({
                code: "NOK",
                data: {
                    message: "invalid wallet",
                },
            });
        } else {
            const transactions = await getTransactionByWallet(walletAddress);
            return res.status(200).json({
                code: "OK",
                data: {
                    message: transactions,
                },
            });
        }
    } catch (exception) {
        logger.warn(`transactionController got exception:${exception}`);
        return res.status(500).json({
            code: "NOK",
            data: {
                message: String(exception),
            },
        });
    }
};
module.exports = transactionController;

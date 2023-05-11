require("module-alias/register");
const logger = require("@logger");
const axios = require("axios");

const balanceController = async (req, res) => {
    try {
        const urlParams = new URLSearchParams(req.query);
        const walletAddress = urlParams.get("wallet");
        if (!walletAddress) {
            return res.status(404).json({
                code: "NOK",
                data: {
                    message: "invalid params",
                },
            });
        } else {
            //send POST
            const queryBalance = await axios({
                method: "GET",
                url: `http://localhost:26659/balance/${walletAddress}`,
                headers: {
                    "Accept-Encoding": "application/json",
                },
                maxContentLength: 100000000,
            });
            logger.info(JSON.stringify(queryBalance.data, null, 4));
            if (queryBalance.status === 200) {
                // response was successful, do something
                const response = queryBalance.data;
                return res.status(200).json({
                    code: "OK",
                    data: {
                        message: (+response.amount / 1000000).toFixed(6),
                    },
                });
            } else {
                logger.warn(
                    `balanceController fail to query balance wallet ${walletAddress} with status=${sendPfbTx.status}`
                );
                return res.status(queryBalance.status).json({
                    code: "NOK",
                    data: {
                        message: queryBalance.data,
                    },
                });
            }
        }
    } catch (exception) {
        logger.warn(`balanceController got exception:${exception}`);
        return res.status(500).json({
            code: "NOK",
            data: {
                message: String(exception),
            },
        });
    }
};
module.exports = balanceController;

require("module-alias/register");
const logger = require("@logger");
const updateAddress = require("@mysql/crud/updateAddress");
const axios = require("axios");

const accountProcess = async (data) => {
    try {
        const { id, walletAddress } = data.account;
        const queryBalance = await axios({
            method: "GET",
            url: `http://127.0.0.1:26659/balance/${walletAddress}`,
            headers: {
                "Accept-Encoding": "application/json",
            },
            maxContentLength: 100000000,
        });
        const balance = queryBalance.data;
        // {
        //     "denom":"utia",
        //     "amount":"49990000"
        // }
        if (balance) {
            let currentBalance = +balance.amount / 1000000;
            await updateAddress({
                id: +id,
                wallet_balance: +currentBalance.toFixed(6),
            });
        } else {
            logger.warn("account.process exception: cannot get wallet balance!");
        }
    } catch (error) {
        logger.warn("account.process exception: " + error);
    }
};

module.exports = accountProcess;

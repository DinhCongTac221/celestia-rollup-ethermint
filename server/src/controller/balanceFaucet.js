require("module-alias/register");
const logger = require("@logger");
const { ethers } = require("ethers");
const config = require("@config");

async function getBalanceFaucet() {
    const provider = new ethers.providers.JsonRpcProvider(config.ethermint.rpc);
    const balance = await provider.getBalance(config.ethermint.faucetWallet);
    return ethers.utils.formatEther(balance);
  }

const balanceFaucetController = async (req, res) => {
    try {
        const balance = await getBalanceFaucet();
        return res.status(200).send(balance);
    } catch (exception) {
        logger.warn(`balanceFaucetController got exception:${exception}`);
        return res.status(500).json("system fail");
    }
};
module.exports = balanceFaucetController;

require("module-alias/register");
const logger = require("@logger");
const { ethers } = require("ethers");
const config = require("@config");

async function getBalance(walletAddress) {    
    const provider = new ethers.providers.JsonRpcProvider(config.ethermint.rpc);    
    const balance = await provider.getBalance(walletAddress);    
    return ethers.utils.formatEther(balance);
}

const balanceController = async (req, res) => {
    try {
        const urlBody = req.body;
        const wallet = urlBody.wallet;        
        if (!wallet) {
            return res.status(404).json({
                code: "NOK",
                data: {
                    message: "invalid params",
                },
            });
        } else {            
            const balance = await getBalance(wallet);
            return res.status(200).send(balance);
        }
    } catch (exception) {
        logger.warn(`balanceController got exception:${exception}`);
        return res.status(500).json("system fail");
    }
};
module.exports = balanceController;

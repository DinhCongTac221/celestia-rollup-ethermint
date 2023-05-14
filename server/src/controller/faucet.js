require("module-alias/register");
const logger = require("@logger");
const { ethers } = require("ethers");
const config = require("@config");

async function transferETH(toAddress) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(config.ethermint.rpc);
        const wallet = new ethers.Wallet(config.ethermint.faucetPrivateKey, provider);
        let [nonce, gasPrice] = await Promise.all([
            provider.getTransactionCount(config.ethermint.faucetWallet),            
            provider.getGasPrice()
        ]);        
        const transaction = {
            to: toAddress,
            value: ethers.utils.parseEther("1"), //1 ETH
            chainId: 9000, // ethermint chain id
            nonce: nonce,
            gasLimit: 21000, 
            gasPrice: gasPrice,
        };  
        const signedTransaction = await wallet.signTransaction(transaction);
        const transactionResponse = await provider.sendTransaction(signedTransaction);  
        console.log("Faucet successfully!");
        logger.info(JSON.stringify(transactionResponse, null, 4));
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }    
  }

const faucetController = async (req, res) => {
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
            const processFaucet = await transferETH(wallet);
            return res.status(processFaucet? 200 : 400).send(processFaucet? "Faucet successfully" : "Faucet failed");
        }
    } catch (exception) {
        logger.warn(`faucetController got exception:${exception}`);
        return res.status(500).json("system fail");
    }
};
module.exports = faucetController;

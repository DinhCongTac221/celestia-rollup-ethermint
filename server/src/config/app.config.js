require("module-alias/register");
require("dotenv").config();

const config = {};

config.app = {
    port: process.env.PORT_APP,
};

config.ethermint = {
    rpc: process.env.RPC_URL,
    faucetWallet: process.env.FAUCET_WALLET,
    faucetPrivateKey: process.env.PRIVATE_KEY_FAUCET_WALLET
}

config.redis = {
    host: process.env.REDIS_CONFIG_HOST,
    port: process.env.REDIS_CONFIG_PORT,
};

module.exports = config;

const dotenv = require("dotenv");
dotenv.config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");

const { PRIVATE_KEY_ETHERMINT } = process.env;

module.exports = {
    defaultNetwork: "ethermint",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545",
        },
        hardhat: {},
        ethermint: {
            url: "https://celestia-rpc-ethermint.thinhpn.com",
            accounts: [`0x${PRIVATE_KEY_ETHERMINT}`],
        },
    },
    solidity: {
        version: "0.8.8",
        settings: {
            optimizer: {
                enabled: true,
            },
        },
    },
    etherscan: {
        apiKey: {},
    },
    mocha: {
        timeout: 20000,
    },
};

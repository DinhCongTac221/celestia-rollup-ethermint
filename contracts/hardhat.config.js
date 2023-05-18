const dotenv = require("dotenv");
dotenv.config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");

const { PRIVATE_KEY_ETHERMINT, PRIVATE_KEY } = process.env;

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
        bscTestnet: {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545",
            chainId: 97,
            accounts: [`0x${PRIVATE_KEY}`],
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
        apiKey: {
            bscTestnet: process.env.API_BSCSCAN,
        },
    },
    mocha: {
        timeout: 20000,
    },
};

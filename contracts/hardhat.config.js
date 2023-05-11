const dotenv = require("dotenv");
dotenv.config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");

const { PRIVATE_KEY, PRIVATE_KEY_ETHERMINT } = process.env;

module.exports = {
    defaultNetwork: "polygon",
    networks: {
        localhost: {
            url: "http://127.0.0.1:8545",
        },
        hardhat: {},
        bscTestnet: {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
            chainId: 97,
            accounts: [`0x${PRIVATE_KEY}`],
        },
        bsc: {
            url: "https://bsc-dataseed.binance.org/",
            chainId: 56,
            accounts: [`0x${PRIVATE_KEY}`],
        },
        polygonMumbai: {
            url: "https://matic-mumbai.chainstacklabs.com/",
            accounts: [`0x${PRIVATE_KEY}`],
        },
        polygon: {
            url: "https://rpc.ankr.com/polygon",
            accounts: [`0x${PRIVATE_KEY}`],
        },
        goerli: {
            url: "https://responsive-neat-waterfall.ethereum-goerli.quiknode.pro/bacb707aa5816c19b3c6ae15a808c4e22e9ee63d/",
            accounts: [`0x${PRIVATE_KEY}`],
        },
        arbitrum: {
            chainId: 42161,
            url: "https://arb1.arbitrum.io/rpc",
            accounts: [`0x${PRIVATE_KEY}`],
        },
        mainnet: {
            chainId: 1,
            url: "https://rpc.ankr.com/eth",
            accounts: [`0x${PRIVATE_KEY}`],
        },
        base: {
            chainId: 84531,
            url: "https://base-goerli.public.blastapi.io",
            gasPrice: 200000000000,
            accounts: [`0x${PRIVATE_KEY}`],
        },
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
        apiKey: {
            //ethereum
            mainnet: process.env.API_ETHERSCAN,            
            //polygon
            polygon: process.env.API_POLYGONSCAN,
            // polygonMumbai: process.env.API_POLYGONSCAN,
            //bsc
            bscTestnet: process.env.API_BSCSCAN,
            bsc: process.env.API_BSCSCAN,
        },
    },
    mocha: {
        timeout: 20000,
    },
};

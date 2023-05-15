# HOW TO DEPLOY AN ETHERMINT ROLLUP AND DAPP ON TOP OF CELESTIA
This is the source code of the Celestia project's rollup construction on the Blockspace Race network using the ethermint tool. It includes one-hit-script for install Ethermint for Celestia,  contracts (built using the Hardhat framework), a React frontend, and a NodeJs server (for some APIs).

Let's get started with my goals:

 1. Running the Ethermint Rollup network on the Celestia network.
 2. Creating a faucet page for your Ethermint Rollup network where any wallet will receive 2 ETH within 24 hours (with rate limiting to prevent spam).
 3. Allowing users to use their wallets on the Ethermint network to deploy an ERC20 token of their choice with customizable options such as Name, Symbol, and Total Supply.
 4. Enabling users to utilize the MultiSend feature to send tokens in bulk.
Let's begin!

I will detail everything.

## 1. Install Ethermint
Here is a relatively easy process. First, you need to install a Celestia node, and the light node is the simplest option. After that, oh, we just need to install Ethermint on it. Take a look at my script; it's an all-in-one script. You just need to download it, upload it to your server, give execution permissions, and then run it.
The script is relatively straightforward, so I won't explain anything further.

After deploying the Ethermint network, we will have an **RPC endpoint** to interact with the network, usually available at the address **http://localhost:8545** by default. If you intend to use this RPC endpoint, it's recommended to have a domain name and set up DNS resolution to point to the server running the Ethermint node on port 8545.
Here's an example of my domain (feel free to use it if you wish): *https://celestia-rpc-ethermint.thinhpn.com*.

Deployment steps:

 1. Download /ethermint/ethermint_rollup_one_script.sh & save to your server
 2. `chmod +x ./ethermint_rollup_one_script.sh`
 3. `./ethermint_rollup_one_script.sh`

## 2. Write Contracts
The question is, why do we need to write smart contracts? Well, as we discussed earlier, we have deployed the Ethermint Rollup network on top of Celestia. So, we need to write smart contracts to create DApps on the Ethermint network and leverage this infrastructure. I won't go into too much detail about smart contracts here, as you can find plenty of resources online. I'll just use a few simple examples, such as a pure ERC20 token or a contract that allows sending to multiple different wallets in a single transaction (multisend).
The framework I am using is Hardhat Framework, which is a very user-friendly framework with powerful tools for developing, testing, and optimizing your smart contracts. If you're unfamiliar with Hardhat, you can refer to the following link: https://hardhat.org/. Here, I have two contract samples:
 * **StandardToken.sol** (contracts\contracts\token\StandardToken.sol): This contract will be used to deploy tokens for users.
 * **MultiSend.sol** (contracts\contracts\utility\MultiSend.sol): This contract serves the feature of multisending any ERC20 token.

To compile these contracts into ABI and bytecode for use in a DApp, follow these steps:

 1. Change directory to ./contracts.
 2. Update your .env file.
 3. Run `yarn` to install dependencies.
 4. Run `yarn compile`.
 5. After compilation, you can find the ABI and bytecode for the contracts at the following path: contracts/artifacts/contracts.

## 3. Server NodeJS

The Node.js server is a relatively simple server with the task of handling faucet requests from users (sending from the faucet wallet to user wallets) and ensuring efficient execution. I have also implemented some features such as checking the balance of the faucet wallet and any arbitrary wallet and making it publicly accessible.

Here are some processing threads:

 * Faucet: Using the Ether.js library to send a transaction transferring 2 ETH to the requested faucet wallet (using the *provider.sendTransaction* method of Ether.js).
 * Rate Limit: To prevent faucet spamming, I have set a limit where a wallet can only receive faucet funds once within a continuous 24-hour period. This is implemented *sing Redis to store the faucet wallet addresses with a TTL of 24 hours. Continuous faucet requests will result in a 429 error code and will be displayed on the interface.
 * Checking the faucet wallet balance: This is relatively simple, using the *provider.getBalance* method to retrieve the balance of the wallet.
You can see the detailed programming implementation for these tasks in the following directory: server/src/controller.

Note the parameters required to run the server:

 * PORT_APP: Replace with your desired port.
 * FAUCET_WALLET: Replace with the deployed wallet address on the Ethermint network.
 * PRIVATE_KEY_FAUCET_WALLET: Run the command ethermintd q auth account `$(ethermintd keys show mykey -a) -o text` on your node to get the private key of the faucet wallet.
 * RPC_URL: The RPC URL of the deployed Ethermint network from Step 1. By default, it is http://localhost:8545.
Deployment steps:

 1. Change directory to ./src.
 2. Run `yarn` to install dependencies.
 3. Update your environment variables.
 4. Run `yarn app`.

## 4. Dapp
My Dapp is built with ReactJS, a popular web development platform. Now, let's note down some key features that need to be implemented:

Connect with MetaMask wallet and add a custom Ethermint network to the wallet.
Validate the user's wallet and allow them to access the Faucet functionality through the deployed server API from Step 3.
Use the ABI and Bytecode of the smart contracts from Step 2 to assist users in creating their desired ERC20 tokens and interact with the deployed smart contracts on the Ethermint Rollup network.
In this project, I'm using the Rainbowkit library to connect with wallets, but you can use similar libraries for the same purpose.

To build the Dapp, follow these steps:

 1. Navigate to the dapp directory.
 2. Run `yarn` to install dependencies.
 3. Run `yarn vite` for development or `yarn build` for production
 Please experience what we have just done at the following link: *https://celestia-dapp.thinhpn.com*

Have a nice day!


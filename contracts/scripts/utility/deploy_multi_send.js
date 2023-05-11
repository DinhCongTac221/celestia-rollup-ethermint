const { ethers } = require("hardhat");
async function main() {
    const Token = await ethers.getContractFactory("MultiSend");
    const token = await Token.deploy();
    await token.deployed();
    console.log("Success when deploy MultiSend contract: %s", token.address);
}
main();

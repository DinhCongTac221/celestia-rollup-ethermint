const { ethers } = require("hardhat");
async function main() {
    const Token = await ethers.getContractFactory("BurnableToken");
    const token = await Token.deploy();
    await token.deployed();
    console.log("Success when deploy BurnableToken contract: %s", token.address);
}
main();

const { ethers } = require("hardhat");
async function main() {
    const Token = await ethers.getContractFactory("StandardToken");
    const token = await Token.deploy("thinh's coin", "THI", "100000000000000");
    await token.deployed();
    console.log("Success when deploy StandardToken contract: %s", token.address);
}
main();

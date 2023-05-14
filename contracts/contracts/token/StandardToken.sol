// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StandardToken is ERC20 {
    constructor(string memory _name, string memory _symbol, uint256 _supply) 
    ERC20(_name, _symbol) {
        require(_supply > 0, "invalid suplly");
        _mint(msg.sender, _supply * 10 ** decimals());
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StandardToken is ERC20{
    constructor() ERC20("Simle Token", "STK") {
        _mint(msg.sender, 1_000_000_000 * 10 ** decimals());
    }
}

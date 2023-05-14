// SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

interface IERC20 {
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract MultiSend {    

    function multiSendFlexibleAmount(
        IERC20 token,
        address[] memory to,
        uint256[] memory amounts
    ) public {
        require(to.length == amounts.length, "Invalid input lengths");
        require(token.balanceOf(msg.sender) >= getTotalAmount(amounts), "Insufficient balance");
        for (uint256 i = 0; i < to.length; i++) {
            require(token.transferFrom(msg.sender, to[i], amounts[i]), "Transfer failed");
        }
    }

    function multiSendFixedAmount(IERC20 token, address[] memory to, uint256 amount) public {
        require(token.balanceOf(msg.sender) >= amount, "Insufficient balance");
        for (uint256 i = 0; i < to.length; i++) {
            require(token.transferFrom(msg.sender, to[i], amount), "Transfer failed");
        }
    }

    function getTotalAmount(uint256[] memory amounts) internal pure returns (uint256) {
        uint256 total = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            total += amounts[i];
        }
        return total;
    }
}

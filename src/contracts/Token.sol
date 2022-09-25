pragma solidity >0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    address public minter;

    event MinterChanged(address indexed from, address to);

    constructor() payable ERC20("DecentralBank", "DCB") {
        minter = msg.sender;
    }

    //pass minter role
    function passMinterRole(address contractAddress) public returns (bool) {
        require(
            msg.sender == minter,
            "Error: only owner can pass a minter role to another contract"
        );
        minter = contractAddress;

        emit MinterChanged(msg.sender, contractAddress);
        return true;
    }

    //mint function = create tokens to reward investors
    function mint(address account, uint256 amount) public {
        require(
            msg.sender == minter,
            "Error: msg sender does not have minter role"
        );
        _mint(account, amount);
    }
}

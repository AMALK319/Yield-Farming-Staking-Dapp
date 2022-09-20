pragma solidity >0.8.16;

import "./Tether.sol";
import "./RWD.sol";

contract DecentralBank {
    address public owner;
    string public name = "Decentral Bank";
    Tether public tether;
    RWD public rwd;

    address[] public stackers;
    mapping(address => uint256) public stackingBalance;
    mapping(address => bool) public hasStacked;
    mapping(address => bool) public isStacking;

    constructor(RWD _rwd, Tether _tether) {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    function stakeTokens(uint256 _amount) public {
        //require stacking amount to be greater than 0
        require(_amount > 0, "cannot stake 0 tokens");

        //tansfer tether tokens to this contact address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        //update stacking balance
        stackingBalance[msg.sender] += _amount;

        isStacking[msg.sender] = true;
        hasStacked[msg.sender] = true;

        if (!hasStacked[msg.sender]) {
            stackers.push(msg.sender);
        }
    }

    function unstakeTokens() public {
        uint256 balance = stackingBalance[msg.sender];
        require(balance > 0, "cannot unstake 0 tokens");
        tether.transfer(msg.sender, balance);
        stackingBalance[msg.sender] = 0;
        isStacking[msg.sender] = false;
    }

    function issueTokens() public {
        // require only the owner to issue tokens
        require(msg.sender == owner, "caller must be the owner");
        for (uint256 i = 0; i < stackers.length; i++) {
            address recipient = stackers[i];
            uint256 balance = stackingBalance[recipient] / 9;
            if (balance > 0) {
                rwd.transfer(recipient, balance);
            }
        }
    }
}

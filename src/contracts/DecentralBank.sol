pragma solidity >0.8.16;

import "./Token.sol";

contract DecentralBank {
    Token private token;

    mapping(address => uint256) public etherBalanceOf;
    mapping(address => uint256) depositStart;
    mapping(address => bool) isDeposited;

    //events
    event DepositTokens(
        address indexed user,
        uint256 etherAmount,
        uint256 timeStart
    );
    event WithDraw(
        address indexed user,
        uint256 etherAmount,
        uint256 depositTime,
        uint256 interest
    );

    constructor(Token _token) {
        token = _token;
    }

    //depositTokens function
    function deposit() public payable {
        require(
            isDeposited[msg.sender] == false,
            "Error: deposit already active"
        );
        require(msg.value >= 1e16, "Error: deposit must be >= 0.01 eth");

        etherBalanceOf[msg.sender] += msg.value;
        depositStart[msg.sender] += block.timestamp;
        isDeposited[msg.sender] = true;

        emit DepositTokens(msg.sender, msg.value, block.timestamp);
    }

    //withDraw function
    function withDraw() public {
        require(isDeposited[msg.sender] == true, "Error: no previous deposit");
        uint256 userBalance = etherBalanceOf[msg.sender];
        uint256 depositTime = block.timestamp - depositStart[msg.sender];

        uint256 interestPerSecond = 31668017 *
            (etherBalanceOf[msg.sender] / 1e16);
        uint256 interest = interestPerSecond * depositTime;

        payable(msg.sender).transfer(etherBalanceOf[msg.sender]);
        token.mint(msg.sender, interest);

        etherBalanceOf[msg.sender] = 0;
        depositStart[msg.sender] = 0;
        isDeposited[msg.sender] = false;

        emit WithDraw(
            msg.sender,
            userBalance,
            depositTime,
            interest
        );
    }
}

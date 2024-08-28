pragma solidity ^0.4.17;

contract SplitFactory {
    address[] public deployedSplits;

    function createSplit(uint amount, string desc) public {
        address newSplit = new Split(amount, msg.sender, desc);
        deployedSplits.push(newSplit);
    }

    function getDeployedSplits() public view returns (address []) {
        return deployedSplits;
    }
}

contract Split {
    address public creator;
    uint public amount;
    string public description;
    bool public status; 
    uint public payeeCount;
    mapping(address => bool) payee; 
    bool public payReady;

    function Split(uint amt, address sender, string desc) public {
        creator = sender;
        amount = amt;
        description = desc;
        status = false;
        payeeCount = 1;
        payee[sender] = true;
        payReady = false;
    }

    function joinSplit() public {
        require(!payee[msg.sender]);
        require(!status);
        payee[msg.sender] = false;
        payeeCount++;
    }

    function enablePayment() public {
        require(msg.sender == creator);
        require(!status);

        payReady = true;
    }

    function payShare() public payable {
        require(payee[msg.sender] == false);
        require(payReady);
        require(!status);

        require(msg.value == (amount / payeeCount));

        payee[msg.sender] = true;
    }

    function closeSplit() public {
        require(msg.sender == creator);
        require(address(this).balance > 199);

        creator.transfer(address(this).balance);
        status = true;
    }
}
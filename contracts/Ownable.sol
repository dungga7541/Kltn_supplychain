// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16 <= 0.9.0;

contract Ownable {
    address public owner;

    constructor () public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(isOwner(), "Ownable: caller is not the owner");
        _;
    }
    function setOwner(address _owner) public returns (address){
        owner = _owner;
    }
    function getOwner() public view returns (address){
        return owner;
    }

    function isOwner() public view returns (bool) {
        return (msg.sender == owner);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16 <= 0.9.0;
import "./Ownable.sol";
pragma experimental ABIEncoderV2;

contract MTRootHash is Ownable
{ 
    bytes32 MTRoot;

    function setMTRoot(bytes32 _MTRoot) public onlyOwner {
        MTRoot = _MTRoot;
    }
    function getMTRoot() public view returns(bytes32){
        return MTRoot;
    }
}
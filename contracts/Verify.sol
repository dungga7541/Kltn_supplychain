// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.5.16 <0.9.0;
pragma experimental ABIEncoderV2;

contract Verify {
  function verify(bytes32 root, bytes32 leaf,bytes32[] memory proof) public view returns (bool)
  {
    bytes32 computedHash = leaf;
    for (uint256 i = 0; i < proof.length; i++) {
      bytes32 proofElement = proof[i];
      if (computedHash < proofElement) {
        computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
      } else {
        computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
      }
    }
    return computedHash == root;
  }
}
  

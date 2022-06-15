const Web3 = require("web3");
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const MTRootHash = artifacts.require("MTRootHash");

module.exports = function (deployer) {
  deployer.deploy(MTRootHash);
};
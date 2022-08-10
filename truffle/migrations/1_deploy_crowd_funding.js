const CrowdFunding = artifacts.require("CrowdFunding");
const Web3 = require("web3");
module.exports = function (deployer) {
  deployer.deploy(CrowdFunding, Web3.utils.toWei("1", "ether"));
};

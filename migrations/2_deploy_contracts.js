const LandTransfer = artifacts.require("LandTransfer");

module.exports = function (deployer, network, accounts) {
  // const registrar = accounts[3];
  // , {registrar: 0xE6224E87d1b139aE578bB74e337089aCC7D8514B}
  deployer.deploy(LandTransfer);
};

var ConditionalOwned = artifacts.require("ConditionalOwned");

module.exports = function(deployer) {
    deployer.deploy(ConditionalOwned);
};

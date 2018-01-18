var ConditionalOwned = artifacts.require("./Base/ConditionalOwned.sol");

contract('ConditionalOwned', function(accounts) {
    var instance;

    beforeEach (() => {
        return ConditionalOwned.new({from:accounts[0]}).then ((r) => {
            instance = r;
        })
    })

    it ("Check owner. Owner request change of ownership. New owner confirms. Ownership transfers", () => {
        let owner = accounts[0];
        let newOwner = accounts[1];

        console.log ("it: Check owner. Owner request change of ownership. New owner confirms. Ownership transfers");

        return instance.getOwner.call().then((r) => {
            console.log ("    Owner: " + r.toString());
            console.log ("    Owner requests ownership change to " + newOwner);
            return instance.transferOwnership(newOwner, {from:owner});
        }).then(() => {
            return instance.getOwner.call();
        }).then((r) => {
            console.log ("    Owner: " + r.toString());
            return instance.getNewOwner.call();
        }).then((r) => {
            console.log ("    New Owner (not confirmed): " + r.toString());
            console.log ("    New Owner confirms the transfer...");
            return instance.confirmOwnershipTransfer(true, {from:newOwner});
        }).then(() => {
            return instance.getOwner.call();
        }).then((r) => {
            console.log ("    Owner: " + r.toString());
            assert.equal (r.toString(), newOwner.toString(), "ERROR: The new owner shall be " + newOwner.toString());
            return instance.getNewOwner.call();
        }).then((r) => {
            console.log ("    New Owner: " + r.toString());
            assert.equal (r.toString(), "0x0000000000000000000000000000000000000000", "ERROR: The new owner shall be 0");
        })
    })

})
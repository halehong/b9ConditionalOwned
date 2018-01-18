pragma solidity ^0.4.4;

// Contract that allows its ownership to be transferred to a new owner AFTER the new owner 
// confirms the acceptance of the new ownership

contract ConditionalOwned {
    address private owner;
    address private newOwner;

    function getOwner() external constant returns(address _owner) { return owner; }

    function getNewOwner() external constant returns(address _newOwner) { return newOwner; }

    function ConditionalOwned() public {
        owner = msg.sender;
    }

    event LogConditionalOwnedTransferOwnership (address _who, address _newOwner);
    // Function that starts the ownership transfer.
    // The owner calls this function passing the address of the new owner
    // Requires:
    //  - Only owner can execute
    //  - New owner address cannot be 0
    function transferOwnership(address _newOwner) public returns(bool _success) {
        require (msg.sender == owner);
        require (_newOwner != address(0));

        newOwner = _newOwner;

        LogConditionalOwnedTransferOwnership(msg.sender, _newOwner);
        return true;
    }

    event LogConditionalOwnedConfirmOwnershipTransfer (address _who, bool _confirmation);
    // Function called only by the new owner to confirm the ownership transfer
    // Requires:
    //  - Only new owner can execute
    //  - New owner addres shall then be already submitted. This prevents this function to be successfully executed before the transferOwnership function
    //  - The new owner sends a True as acceptance of the new ownership
    function confirmOwnershipTransfer(bool _confirmation) public returns(bool _success) {
        require (msg.sender == newOwner);
        require (_confirmation);

        owner = newOwner;
        delete newOwner;

        LogConditionalOwnedConfirmOwnershipTransfer (msg.sender, _confirmation);
        return true;
    }
}
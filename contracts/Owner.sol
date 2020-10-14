pragma solidity ^0.5.0;

contract Owner {
  uint public OwnerCount = 0;

   struct OwnerModel {
     uint id;
     string name;
     string deviceId;
     string nic;
   }

   mapping(uint => OwnerModel) public owners;

   constructor() public {
       createOwner("John","3abcdef2ghijk3lm","961234567V");
   }

   function createOwner(string memory _name,string memory _deviceId,string memory _nic) public {
     OwnerCount++;
     owners[OwnerCount] = OwnerModel(OwnerCount,_name,_deviceId,_nic);
   }

}

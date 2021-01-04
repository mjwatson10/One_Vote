pragma solidity ^0.6.6;

import "./OneVote.sol";


contract Test is OneVote {

  function createCitizen(
    string memory _name,
    int64 _dateOfBirth,
    uint256 _zipCode,
    uint256 _stateId
    ) public returns (uint256){
      return _createCitizen(_name, _dateOfBirth, _zipCode, _stateId);
    }


  function getCitizen(uint256 _citizenId) public view returns(string memory name, int64 dateOfBirth, uint256 zipCode){
    return _getCitizen(_citizenId);
  }


  function addressAssignedToId(uint256 _tokenId) public view returns(address){
    return citizenIndexToOwner[_tokenId];
  }
}

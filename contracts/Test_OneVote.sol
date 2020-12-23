pragma solidity ^0.6.6;

import "./OneVote.sol";


contract Test is OneVote {

  function createCitizen(
    string memory _name,
    uint256 _dateOfBirth,
    uint256 _zipCode,
    uint256 _stateId
    ) public returns (uint256){
      return _createCitizen(_name, _dateOfBirth, _zipCode, _stateId);
    }


  /* function getCitizen(uint256 _citizenId) public view retruns(string memory name, uint256 dateOfBirth, uint256 zipCode){
    retrun _getCitizen(_citizenId);
  } */


  function assignCitizenIdToAddress(address _from, address _to, uint256 _tokenId) public {
    _assignCitizenIdToAddress(_from, _to, _tokenId);
  }
}

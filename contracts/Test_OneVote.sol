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


  function loseOfCitizenship(
          uint256 _citizenId,
          address _citizenAddress,
          string memory _reasonForLoseOfCitizenship
    ) public{
      _loseOfCitizenship(_citizenId, _citizenAddress, _reasonForLoseOfCitizenship);
  }


  function filledOfficePosition(uint256 _officeId, uint256 _candidateId) public {
    _filledOfficePosition(_officeId, _candidateId);
  }


  function timestamp() public view returns(uint64){
    return uint64(block.timestamp);
  }


  function getTestResultsOfCandidate(uint256 _candidateId) public view returns(
        string memory _officeTitle,
        uint256 _zipCode,
        string memory _candidateName,
        uint256 _voteCount
      )
  {
    Candidate storage candidate = candidates[_candidateId];

    Citizen storage citizen = citizens[candidate.citizenId];

    Election storage election = elections[candidate.electionId];
    /* require(election.electionEnd <= uint64(block.timestamp), "Election results are not available until election is close off from voting"); */

    Office storage office = offices[election.officeId];

    _officeTitle = office.officeTitle;
    _zipCode = office.zipCode;
    _candidateName = citizen.name;
    _voteCount = candidate.voteCount;
  }

}

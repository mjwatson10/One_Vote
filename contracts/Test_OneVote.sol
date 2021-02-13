pragma solidity ^0.7
.0;

import "./OneVote.sol";


contract Test is OneVote{

  function createCitizen(
    string memory _name,
    int64 _dateOfBirth,
    uint256 _zipCode,
    uint256 _stateId
    ) public returns (uint256){
      return _createCitizen(_name, _dateOfBirth, _zipCode, _stateId);
    }


  function getCitizen(uint256 _citizenId) public view returns(string memory name, int64 dateOfBirth, uint256 zipCode, bool citizenship){
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


  function filledOfficePosition(uint256 _candidateId) public {
    _filledOfficePosition(_candidateId);
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


  function getTestHighestVoteTotal(uint256 _electionId) public view returns(uint64){
    Election memory election = elections[_electionId];

    require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender) == true, "You do NOT have access to this data");

    uint64 highestVoteCount = 0;
    uint256 i = 0;

    for(i = 0; i < election.candidateIds.length; i++){
      Candidate memory candidate = candidates[i];
      if(candidate.voteCount >= highestVoteCount){
        highestVoteCount = candidate.voteCount;
      }
    }
    return highestVoteCount;
  }


  function declareWinnerOfTestElection(uint256 _candidateId) public {
    Candidate memory candidate = candidates[_candidateId];
    require(getTestHighestVoteTotal(candidate.electionId) == candidate.voteCount, "This candidate does not have the highest amount of vote");

    filledOfficePosition(_candidateId);

    emit Winner(_candidateId, candidate.officeId, candidate.voteCount, uint64(block.timestamp), msg.sender);
  }


  /* function getTestIdOfWinningCandidates(uint256 _electionId) public view returns(uint256[] memory){
    Election memory election = elections[_electionId];

    uint64 highestVoteCount = getTestHighestVoteTotal(_electionId);
    uint256[] memory result = new uint256[](election.candidateIds.length);

    for(uint256 i = 0; i < election.candidateIds.length; i++){
      Candidate memory candidate = candidates[i];
      if(candidate.voteCount == highestVoteCount){
        result[i] = candidate.candidateId;
      }
    }
    return result;
  } */


}

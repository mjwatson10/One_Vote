pragma solidity ^0.6.6;

import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/math/SignedSafeMath.sol";
import "../node_modules/@openzeppelin/contracts/access/AccessControl.sol";
//see if can use TimedCrowdsale.sol for election time and TimelockController



contract OneVote is AccessControl{

    using SafeMath for uint256;
    using SignedSafeMath for int256;


//EVENTS
    //emitted when citizen is created showing new citizen's name, indexed citizen's address zip code, date approved
    event CitizenAdded(address owner, uint256 citizenId, uint256 stateId, uint256 zipCode);

    //emitted when citizen has died or citzenship has been dismissed or revoked
    event NoLongerACitizen(uint256 citizenId, address citzenAddress, string reasonForLoseOfCitizenship);

    //emitted when citizen is assigned to a corresponding address
    event Assigned(address from, address to, uint256 tokenId);

    //emitted when a candidate is created showing new candidate name, office, electionStart
    event CandidateAdded(string _name, string _officeTitle, uint64 _electionStart);

    //emitted when an office is create
    event OfficeAdded(string _officeTitle, uint256 _zipCode, uint256 _officeId);

    //emitted when office position is filled and no longer open until next office position is created
    event OfficePositionIsFilledBy(string _officeTitle, string _name, uint256 zipCode);

    //emitted when a election is created
    event ElectionAdded(string _officeTitle, uint256 _zipCode, uint64 _electionStart, uint64 _electionEnd, uint256 _electionId);

    //emitted when new law is created for a vote, does not stat that law is approved
    event LawAddedForVote(string _lawName, uint256 _zipCode, uint64 _electionStart, uint64 _electionEnd, uint256 _lawId);

    //emitted when vote has been cast
    event VoteCast(uint256 _candidateid, uint256 _electionId, uint256 timeVoteCast, string voteCast);

//STRUCTS
    //use date object for all dates
    struct Citizen {
        uint256 stateId;
        string name;
        int64 dateOfBirth;
        uint256 zipCode;
        uint64 dateApproved;
        //bool used for whether a citizen has died or lost citizenship
        bool citizenship;
        uint256 citizenId;
    }

    struct Candidate {
        uint256 citizenId;
        uint256 officeId;
        uint256 electionId;
        /* string name;
        int64 dateOfBirth;
        string officeTitle;
        uint256 zipCode;
        uint64 electionStart;
        uint64 electionEnd; */
        uint256 voteCount;
        uint64 dateApprovedToRun;
        uint256 candidateId;
    }

    struct Office {
        string officeTitle;
        uint256 zipCode;
        int64 requiredAge;
        uint64 dateApproved;
        uint256 officeId;
    }

    struct Election {
        /* string officeTitle;
        uint256 zipCode; */
        uint256 officeId;
        uint64 electionStart;
        uint64 electionEnd;
        uint256 electionId;
        uint256[] candidateIds;
    }

    struct Law {
        string lawName;
        uint256 zipCode;
        uint64 electionStart;
        uint64 electionEnd;
        uint256 voteFor;
        uint256 voteAgainst;
        uint64 dateApprovedForVote;
        bool approvedForVote;
        uint256 lawId;
    }


//ARRAYS
    Citizen[] citizens;
    Candidate[] candidates;
    Office[] offices;
    Election[] elections;
    Law[] laws;

    //citizen mapping
    /// @dev citizen mapping needs to be private after testing
    mapping(uint256 => address) public citizenIndexToOwner;
    mapping(address => uint256) public citizenIdOfAddress;
    mapping(uint256 => Citizen) public citizenIdToCitizen;
    mapping(uint256 => bool) private stateIdInUse;
    mapping(address => bool) private addressInUse;

    //candidate mapping
    /* mapping(uint256 => Candidate) public candidateIdToCandidate; */
    mapping(uint256 => bool) public candidateIsApprovedToRun;

    //office mapping
    /* mapping(uint256 => Office) public officeIdToOffice; */
    mapping(uint256 => bool) public officeIsUpForElection;

    //election mapping
    /* mapping(uint256 => Election) public electionIdToElection; */
    /* mapping(uint256 => bool) public electionIsActive; */

    //law mapping
    /* mapping(uint256 => Law) public lawIdToLaw; */


//CONSTRUCTOR
    /*    // will set access control as contract owner upon deploying contract */
    constructor() public {
      _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }



//FUNCTIONS
////creation functions

    /*  //creates citizens that will be able to vote if citizens are included in a particular election
        //emits event once citizen is created
        //a citizen cannot have the same stateId as another citizen */
    function _createCitizen(
            string memory _name,
            int64 _dateOfBirth,
            uint256 _zipCode,
            uint256 _stateId
        ) internal returns (uint256){
          require(stateIdInUse[_stateId] == false, "State ID is already assigned to a citizen");
          require(addressInUse[msg.sender] == false, "Address is already assigned to a citizen");

            Citizen memory _citizen = Citizen({
                stateId: _stateId,
                name: _name,
                dateOfBirth: _dateOfBirth,
                zipCode: _zipCode,
                dateApproved: uint64(block.timestamp),
                citizenship: true,
                citizenId: citizens.length
            });

            citizens.push(_citizen);
            uint256 newCitizenId = citizens.length - 1;

            stateIdInUse[_stateId] = true;
            addressInUse[msg.sender] = true;
            citizenIdToCitizen[newCitizenId] = _citizen;

            emit CitizenAdded(msg.sender, newCitizenId, _stateId, _zipCode);

            _assignCitizenIdToAddress(address(0), msg.sender, newCitizenId);

          return newCitizenId;
        }


      /*  //gets citizen data
          //must be internal to prevent data being seen by unwanted users */
      function _getCitizen(uint256 _citizenId)internal view returns(
            string memory _name,
            int64 _dateOfBirth,
            uint256 _zipCode
          )
      {
        require(citizenIndexToOwner[_citizenId] == msg.sender);
                Citizen storage citizen = citizens[_citizenId];

                    _name = citizen.name;
                    _dateOfBirth = citizen.dateOfBirth;
                    _zipCode = citizen.zipCode;
      }


      function getCitizenId(address owner) public view returns(uint256){
        require(msg.sender == owner);
        return citizenIdOfAddress[owner];
      }


      /* //transfer citizen data to address the citizen was created to represent */
      function _assignCitizenIdToAddress(address _from, address _to, uint256 _tokenId) internal {
        citizenIndexToOwner[_tokenId] = _to;
        citizenIdOfAddress[_to] = _tokenId;

        emit Assigned(_from, _to, _tokenId);
      }


      /* //used when citizens have died or citzenship has been dismissed or revoked */
      function _loseOfCitizenship(
              uint256 _citizenId,
              address _citizenAddress,
              string memory _reason
          ) internal {
            require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender) == true, "You do NOT have access to changing citizenship status");
            require(citizenIndexToOwner[_citizenId] == _citizenAddress, "This is not the citizens correct address");
            require(msg.sender != _citizenAddress, "You cannot change your own citizenship");

            stateIdInUse[_citizenId] = false;
            addressInUse[_citizenAddress] = false;
          }


      /*  //create a candidate that will be used for elections
          //all candidates must be citizens
          //emit event when canidiate is created */
      function createCandidate(
              uint256 _citizenId,
              uint256 _stateId,
              uint256 _officeId,
              uint256 _electionId
          ) public returns(uint256){
            require(stateIdInUse[_stateId] == true, "State Id is not assigned to a citizen yet");
            require(addressInUse[msg.sender] == true, "Address is not assigned to to a citizen yet");
            require(citizenIndexToOwner[_citizenId] == msg.sender, "User is not owner of citizen trying to become candidate");

            Citizen memory citizen = citizenIdToCitizen[_citizenId];
            Office memory office = offices[_officeId];
            Election memory election = elections[_electionId];

            require(citizen.citizenship == true, "You are no longer a citizen");
            require(citizen.stateId == _stateId, "User is not owner of required State ID");
            require(officeIsUpForElection[_officeId] == true, "Office is NOT up for election");
            require(office.requiredAge >= citizen.dateOfBirth, "Citizen is NOT old enough to run for Office");

              //need to find out if it is possible to use _getCitizen() and assign that data to a variable like in javascript
              Candidate memory _candidate = Candidate({
                    /* //name: citizen.name,
                    //dateOfBirth: citizen.dateOfBirth,
                    //officeTitle: office.officeTitle,
                    //zipCode: office.zipCode, */
                    citizenId: _citizenId,
                    officeId: _officeId,
                    /* electionStart: election.electionStart,
                    electionEnd: election.electionEnd, */
                    electionId: _electionId,
                    voteCount: 0,
                    dateApprovedToRun: uint64(block.timestamp),
                    candidateId: candidates.length
                });

            candidates.push(_candidate);
            uint256 newCandidateId = candidates.length - 1;
            elections[_electionId].candidateIds.push(newCandidateId);

            /* elections[_electionId].candidateIds.push(newCandidateId); */
            /* candidateIdToCandidate[newCandidateId] = _candidate; */
            candidateIsApprovedToRun[newCandidateId] = true;

            emit CandidateAdded(citizen.name, office.officeTitle, election.electionStart);

        return newCandidateId;
      }


      function getCandidate(uint256 _candidateId) public view returns(
            string memory name,
            string memory officeTitle,
            uint256 zipCode,
            uint256 voteCount
          )
        {
          Candidate storage candidate = candidates[_candidateId];
          Office memory office = offices[candidate.officeId];
          Citizen memory citizen = citizens[candidate.citizenId];

          name = citizen.name;
          officeTitle = office.officeTitle;
          zipCode = office.zipCode;
          voteCount = candidate.voteCount;
        }


      /*  //create an office for candidates to run for election
          //emit event when office is created
          //will need array for zipCode if office covers multiple zipCodes */
      function createOffice(
              string memory _officeTitle,
              uint256 _zipCode,
              int64 _requiredAge
          ) public returns(uint256){

            Office memory _office = Office({
                  officeTitle: _officeTitle,
                  zipCode: _zipCode,
                  requiredAge: _requiredAge,
                  dateApproved: uint64(block.timestamp),
                  officeId: offices.length
              });

              offices.push(_office);
              uint256 newOfficeId = offices.length - 1;

              /* officeIdToOffice[newOfficeId] = _office; */
              officeIsUpForElection[newOfficeId] = true;

              emit OfficeAdded(_officeTitle, _zipCode, newOfficeId);

        return newOfficeId;
      }


      function getOffice(uint256 _officeId) public view returns(
            string memory officeTitle,
            uint256 zipCode,
            int64 requiredAge,
            bool isOpenForElection
          )
        {
          Office storage office = offices[_officeId];

          officeTitle = office.officeTitle;
          zipCode = office.zipCode;
          requiredAge = office.requiredAge;
          isOpenForElection = officeIsUpForElection[_officeId];
        }


      /* //changes status of open offices after elections */
      function _filledOfficePosition(uint256 _officeId, uint256 _candidateId) internal {
        require(officeIsUpForElection[_officeId] == true);

        Candidate memory candidate = candidates[_candidateId];
        Office memory candidateOffice = offices[candidate.officeId];
        Office memory office = offices[_officeId];
        Citizen memory citizen = citizens[candidate.citizenId];

        require(office.zipCode == candidateOffice.zipCode);

        officeIsUpForElection[_officeId] = false;

        emit OfficePositionIsFilledBy(office.officeTitle, citizen.name, office.zipCode);
      }


      /*  //emit event when law is created
          //will need array for zipCodes */
      function createALaw(
              string memory _lawName,
              uint256 _zipCode,
              uint64 _start,
              uint64 _end
          ) public returns(uint256){

            Law memory _law = Law({
                lawName: _lawName,
                zipCode: _zipCode,
                electionStart: _start,
                electionEnd: _end,
                voteFor: 0,
                voteAgainst: 0,
                dateApprovedForVote: uint64(block.timestamp),
                approvedForVote: true,
                lawId: laws.length
              });

          laws.push(_law);
          uint256 newLawId = laws.length - 1;

          /* lawIdToLaw[newLawId] = _law; */

          emit LawAddedForVote(_lawName, _zipCode, _start, _end, newLawId);

        return newLawId;
      }


      function getLaw(uint256 _lawId) public view returns(
            string memory lawName,
            uint256 zipCode,
            uint64 electionStart,
            uint64 electionEnd,
            uint256 voteFor,
            uint256 voteAgainst
          )
        {
          Law storage law = laws[_lawId];

          lawName = law.lawName;
          zipCode = law.zipCode;
          electionStart = law.electionStart;
          electionEnd = law.electionEnd;
          voteFor = law.voteFor;
          voteAgainst = voteAgainst;
        }


      /*  //emit event when election is created
          //will need to access office array in which election is forum */
      function createAnElection(
              uint256 _officeId,
              uint64 _start,
              uint64 _end
          ) public returns(uint256){
            require(officeIsUpForElection[_officeId] == true, "Office is NOT up for election");
            require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender) == true, "You do NOT have access to creating an election");

            elections.push();

            Office memory office = offices[_officeId];

            Election storage election = elections[elections.length - 1];
                /* officeTitle: office.officeTitle,
                zipCode: office.zipCode, */
                election.officeId = _officeId;
                election.electionStart = _start;
                election.electionEnd = _end;
                election.electionId = elections.length;


            /* elections.push(_election); */
            uint256 newElectionId = elections.length - 1;

            /* electionIdToElection[newElectionId] = _election; */

            emit ElectionAdded(office.officeTitle, office.zipCode, _start, _end, newElectionId);

        return newElectionId;
      }


      function getElection(uint256 _electionId) public view returns(
            string memory officeTitle,
            uint256 zipCode,
            uint64 electionStart,
            uint64 electionEnd
          )
        {
          Election storage election = elections[_electionId];
          Office memory office = offices[election.officeId];

          officeTitle = office.officeTitle;
          zipCode = office.zipCode;
          electionStart = election.electionStart;
          electionEnd = election.electionEnd;
        }


////voting function

      function vote(uint256 _citizenId, uint256 voteForCandidateId, uint256 _electionId) public {
        require(citizenIndexToOwner[_citizenId] == msg.sender, "User is not owner of citizen trying to vote");
        require(addressInUse[msg.sender] == true, "This address is not eligible to vote");

        Citizen memory citizen = citizenIdToCitizen[_citizenId];
        require(citizen.citizenship == true, "You are no longer a citizen");

        Election memory election = elections[_electionId];
        require(election.electionStart <= uint64(block.timestamp), "The election has not opened yet");
        require(election.electionEnd >= uint64(block.timestamp), "The election is no longer open");

        Office memory office = offices[election.officeId];
        require(citizen.zipCode == office.zipCode, "You are not permitted to vote for this office in this zipCode");

        Candidate storage candidate = candidates[voteForCandidateId];
        require(candidate.officeId == election.officeId && candidate.electionId == _electionId, "This candidate is not eligible for this vote");
        candidate.voteCount = candidate.voteCount++;

        emit VoteCast(voteForCandidateId, _electionId, uint64(block.timestamp), "Congratulations, you have cast your vote");
      }


      /*  //returns individual candidates election data based on candidateId for only after vote casting has concluded */
      function getResultsOfCandidate(uint256 _candidateId) public view returns(
            string memory _officeTitle,
            uint256 _zipCode,
            string memory _candidateName,
            uint256 _voteCount
          )
      {
        Candidate storage candidate = candidates[_candidateId];

        Citizen storage citizen = citizens[candidate.citizenId];

        Election storage election = elections[candidate.electionId];
        require(election.electionEnd <= uint64(block.timestamp), "Election results are not available until election is close off from voting");

        Office storage office = offices[election.officeId];

        _officeTitle = office.officeTitle;
        _zipCode = office.zipCode;
        _candidateName = citizen.name;
        _voteCount = candidate.voteCount;
      }


      /*  //returns all candidateIds contained in an election struct based on an electionId */
      function getAllCandidateIds(uint256 _electionId) public view returns (uint256[] memory){
        Election memory election = elections[_electionId];

        return election.candidateIds;
      }


      /*  //returns winner of each election associated with a particular electionId
          //(full elections may be made of multiple electionIds due to election covering multiple zipCodes)
          //will change officeIsUpForElection to false
          //(this will only change the officeId associated with the particular electionId other officeIds of the same office may remain open until a later date due to office covering multiple zipCodes) */
      /* function getWinnerOfElectionId(uint256 _electionId) public returns(uint256 _candidateId){

      } */
}

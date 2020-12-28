pragma solidity ^0.6.6;

import "./Safemath.sol";

contract OneVote {

    using SafeMath for uint256;


//events
    //emitted when citizen is created showing new citizen's name, indexed citizen's address zip code, date approved
    event CitizenAdded(address owner, uint256 citizenId, uint256 stateId, uint256 zipCode);

    //emitted when citizen is assigned to a corresponding address
    event Assigned(address from, address to, uint256 tokenId);

//structs
    struct Citizen {
        uint256 stateId;
        string name;
        string dateOfBirth;
        uint256 zipCode;
        uint256 dateApproved;
        bool citizenship;
    }

    struct Candidate {
        uint256 stateId;
        string name;
        string dateOfBirth;
        string office;
        string electionStart;
        string electionEnd;
        uint256 dateApproved
    }

    struct Election {
        string office;
        string electionStart;
        string electionEnd;
    }


//arrays
    Citizen[] citizens;
    Candidate[] candidates;
    Election[] elections;


    mapping(uint256 => address) public citizenIndexToOwner;
    mapping(uint256 => bool) private stateIdInUse;
    mapping(address => bool) private addressInUse;


//function
    //creates citizens that will be able to vote if citizens are included in a particular election
    //emits event once citizen is created
    //a citizen cannot have the same stateId as another citizen
    function _createCitizen(
            string memory _name,
            string memory _dateOfBirth,
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
                dateApproved: uint64(now),
                citizenship: true
            });

            citizens.push(_citizen);
            uint256 newCitizenId = citizens.length - 1;

            stateIdInUse[_stateId] = true;
            addressInUse[msg.sender] = true;

            emit CitizenAdded(msg.sender, newCitizenId, _stateId, _zipCode);

            _assignCitizenIdToAddress(address(0), msg.sender, newCitizenId);

            return newCitizenId;
            }


      //gets citizen data
      //must be internal to prevent data being seen by unwanted users
      function _getCitizen(uint256 _citizenId)internal view returns(
            string memory name,
            string memory dateOfBirth,
            uint256 zipCode
          )
      {
                Citizen storage citizen = citizens[_citizenId];

                name = citizen.name;
                dateOfBirth = citizen.dateOfBirth;
                zipCode = citizen.zipCode;
      }

      //transfer citizen data to address the citizen was created to represent
      function _assignCitizenIdToAddress(address _from, address _to, uint256 _tokenId) internal {
        citizenIndexToOwner[_tokenId] = _to;

        emit Assigned(_from, _to, _tokenId);
      }


      //create a candidate that will be used for elections
      //all candidates must be citizens
      //emit event when canidiate is created
      function _createCandidate(uint256 stateId, uint32 age, string memory officeTitle, uint256 officeId) internal returns(uint256){
        require(stateIdInUse[stateId] == true);

        return candidateId;
      }


      //create an office for candidates to run for election
      //emit event when office is created
      //will need array for zipcode if office covers multiple zipcodes
      function _createOffice(string memory officeTitle, uint256 _zipCode) internal returns(uint256){
        return officeId;
      }

      //emit event when law is _create
      //will need array for zipcodes
      function _createALaw(string memory law, uint _zipCode) internal returns(uint256){
        return lawId;
      }
}

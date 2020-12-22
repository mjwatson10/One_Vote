pragma solidity ^0.6.6;

import "./Safemath.sol";

contract OneVote {

    using SafeMath for uint256;


//events
    //emitted when citizen is created showing new citizen's name, indexed citizen's address zip code, date approved
    event CitizenAdded(address owner, uint256 citizenId, uint256 stateId, uint256 zipCode);

    //emitted when citizen is assigned to a corresponding address
    event Assigned(address from, address to, uint256 tokenId);

    struct Citizen {
        uint256 stateId;
        string name;
        uint256 dateOfBirth;
        uint256 zipCode;
        uint256 dateApproved;
        bool citizenship;
    }

    Citizen[] citizens;


    mapping(uint256 => address) public citizenIndexToOwner;


//function
    //creates citizens that will be able to vote if citizens are included in a particular election
    //emits event once citizen is created
    //a citizen cannot have the same stateId as another citizen
    function createCitizen(
            string memory _name,
            uint256 _dateOfBirth,
            uint256 _zipCode,
            uint256 _stateId,
            address _owner
        ) internal returns (uint256){
          /* require() */

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

            emit CitizenAdded(_owner, newCitizenId, _stateId, _zipCode);

            _assignCitizenToAddress(address(0), _owner, newCitizenId);

            return newCitizenId;
            }

      //checks whether or not a stateId has already created a citizen
      function isANewCitizen(uint256 _stateId) public view returns(bool){

      }

      //gets citizen data
      //must be internal to prevent data being seen by unwanted users
      function getCitizen()internal view returns(){

      }

      //transfer citizen data to address the citizen was created to represent
      function _assignCitizenToAddress(address _from, address _to, uint256 _tokenId) internal {
        citizenIndexToOwner[_tokenId] = _to;

        emit Assigned(_from, _to, _tokenId);
      }
}

pragma solidity ^0.6.6;

import "./Safemath.sol";

contract OneVote {

    using SafeMath for uint256;


//events
    //emitted when citizen is created showing new citizen's name, indexed citizen's address zip code, date approved

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


    //creates citizens that will be able to vote if citizens are included in a particular election
    //emits event once citizen is created
    //citizens cannot have the same stateId

}


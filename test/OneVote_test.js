//const OneVoteContract = artifacts.require("OneVote");
const ProxyVote = artifacts.require("Test")
const truffleAssert = require("truffle-assertions");
const moment = require("moment");


    contract ("OneVote", async(accounts) => {

      const user = accounts[1];

      // const dateNeeded = (date) => {
      //   let ageInMilliseconds = Date.parse(date) / 1000;
      //
      //   return ageInMilliseconds;
      // }

      const dateNeeded = (date) => {
        // let ageInMilliseconds = Date.parse(date) / 1000;
        let dateTokens = date.split('-');

        //creating date object from specified year, month, and day
        let date1 = new Date(dateTokens[0], dateTokens[1] - 1, dateTokens[2]);

        let ageInMilliseconds = date1.getTime();

        console.log("Date1 in milliseconds: ", date1.getTime());

        return ageInMilliseconds;
      }

      beforeEach(async() => {
        voteInstance = await ProxyVote.new();
      });


//init test
      it("should assign 'DEFAULT_ADMIN_ROLE' to the accounts[0] address", async() => {
        const role = await voteInstance.DEFAULT_ADMIN_ROLE({from:accounts[0]});
        const admin = await voteInstance.hasRole(role, accounts[0], {from: accounts[0]});

        assert.equal(admin, true);
      });


//creating a citizen test
    describe("creating a citizen", async() => {
      it.only("should create a new citizen", async() => {
        let dob = dateNeeded("May 19, 1986");

        const result = await voteInstance.createCitizen("Mark Watson", dob, 91423, 8372738271, {from: user});
        const citizen = await voteInstance.getCitizen(1, {from: user});

        const citizenZipCode = citizen.zipCode.toString(10);

        assert.equal(citizen.name, "Mark Watson");
        assert.equal(citizen.dateOfBirth, dob);
        assert.equal(citizen.zipCode.toString(10), "91423");

        await truffleAssert.eventEmitted(result, 'CitizenAdded', (ev) => {
          return  ev.owner == user &&
                  ev.citizenId == 1 &&
                  ev.stateId == 8372738271 &&
                  ev.zipCode == parseInt(citizenZipCode);
        });
      });

      it("should NOT create a new citizen because getCitizen() function is NOT being called by citizenId owner", async() => {
        let dob = dateNeeded("May 19, 1986");

        const result = await voteInstance.createCitizen("Mark Watson", dob, 91423, 8372738271, {from: user});
        await truffleAssert.fails(voteInstance.getCitizen(1, {from: accounts[2]}));
      });

      it("should NOT create a new citizen because stateId has already been assigned to a citizen", async() => {
        let dob = dateNeeded("May 19, 1986");
        await voteInstance.createCitizen("Mark Watson", dob, 91423, 8372738271, {from: user});

        await truffleAssert.fails(voteInstance.createCitizen("Tom Smith", "06161988", 92126, 8372738271, {from: accounts[2]}));
      });

      it("should NOT create a new citizen because address has already been assigned to a citizen", async() => {
        let dob = dateNeeded("May 19, 1986");
        await voteInstance.createCitizen("Mark Watson", dob, 91423, 8372738271, {from: user});

        await truffleAssert.fails(voteInstance.createCitizen("Tom Smith", "06161988", 92126, 4373768011, {from: user}));
      });

      it("should assign the new citizenId to the msg.senders", async() => {
        let dob = dateNeeded("May 19, 1986");
        await voteInstance.createCitizen("Mark Watson", dob, 91423, 8372738271, {from: user});
        const assigned = await voteInstance.addressAssignedToId(1);

        assert.equal(assigned, user);
      });

      it("should get citizen ID of user's address", async() => {
        let dob = dateNeeded("May 19, 1986");

        await voteInstance.createCitizen("Mark Watson", dob, 91423, 8372738271, {from: user});
        const citizenId = await voteInstance.getCitizenId(user, {from: user});

        assert.equal(citizenId, 1);
      });

      it("should NOT get citizen ID of user's address because msg.sender is NOT the owner of the address that is being used to search for citizen ID", async() => {
        let dob = dateNeeded("May 19, 1986");

        await voteInstance.createCitizen("Mark Watson", dob, 91423, 8372738271, {from: user});
        await truffleAssert.fails(voteInstance.getCitizenId(user, {from:accounts[2]}));
      });
    });


//test for offices, candidates, elections
    describe("candidates", async() => {
      let citizenAge;
      let citizenId;

      beforeEach(async() => {
        citizenAge = dateNeeded("July 20, 1949");

        citizenId = await voteInstance.createCitizen("Mark Watson", citizenAge, 91423, 8372738271, {from: user});
      });

      it("should create an office", async() => {
        const ageRequired = dateNeeded("June 3, 1961");

        const result = await voteInstance.createOffice("Mayor", 91423, ageRequired);
        const office = await voteInstance.getOffice(1);

        assert.equal(office.officeTitle, "Mayor");
        assert.equal(office.zipCode.toString(10), "91423");
        assert.equal(office.requiredAge, ageRequired);
        // assert.equal(office.isOpenForElection, true);

        await truffleAssert.eventEmitted(result, 'OfficeAdded', (ev) => {
          return  ev._officeTitle == "Mayor" &&
                  ev._zipCode.toString(10) == "91423" &&
                  ev._officeId == 1;
        })
      });

      it("should create an election", async() => {
        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("November 3, 2021");
        const endDate = dateNeeded("November 7, 2021");

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        const result = await voteInstance.createAnElection(1, startDate, endDate);
        const election = await voteInstance.getElection(1);

        assert.equal(election.officeTitle, "Mayor");
        assert.equal(election.zipCode, 91423);
        assert.equal(election.electionStart, startDate);
        assert.equal(election.electionEnd, endDate);

        await truffleAssert.eventEmitted(result, 'ElectionAdded', (ev) => {
          return  ev._officeTitle == "Mayor" &&
                  ev._zipCode == 91423 &&
                  ev._electionStart == startDate &&
                  ev._electionEnd == endDate &&
                  ev._electionId == 1;
        });
      });

      it("should NOT create an election because office is NOT open for an election", async() => {
        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("November 3, 2021");
        const endDate = dateNeeded("November 7, 2021");

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(1, startDate, endDate);
        await voteInstance.createCandidate(1, 8372738271, 1, 1, {from: user});
        await voteInstance.filledOfficePosition(1);

        await truffleAssert.fails(voteInstance.createAnElection(1, startDate, endDate));
      });

      it("should NOT create an election because address does not have 'Administrator' access", async() => {
        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("November 3, 2021");
        const endDate = dateNeeded("November 7, 2021");

        await voteInstance.createOffice("Mayor", 91423, ageRequired);

        await truffleAssert.fails(voteInstance.createAnElection(1, startDate, endDate, {from:user}));
      });

      it("should create a candidate", async() => {
        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("November 3, 2021");
        const endDate = dateNeeded("November 7, 2021");

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(1, startDate, endDate);

        result = await voteInstance.createCandidate(1, 8372738271, 1, 1, {from: user});
        const getCandidate = await voteInstance.getCandidate(1);

        assert.equal(getCandidate.name, "Mark Watson");
        assert.equal(getCandidate.officeTitle, "Mayor");
        assert.equal(getCandidate.zipCode, 91423);

        await truffleAssert.eventEmitted(result, 'CandidateAdded', (ev) => {
          return  ev._name == "Mark Watson" &&
                  ev._officeTitle == "Mayor" &&
                  ev._electionStart == startDate;
        });
      });

      it("should NOT create candidate because candidate does not have state ID", async() => {
        const newCitizenAge = dateNeeded("July 20, 1949");

        await voteInstance.createCitizen("Liam Watson", newCitizenAge, 91423, 7201936274, {from: accounts[2]});

        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("November 3, 2021");
        const endDate = dateNeeded("November 7, 2021");

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(1, startDate, endDate);

        await truffleAssert.fails(voteInstance.createCandidate(1, 9000000000, 1, 1, {from: accounts[2]}));
      });

      it("should NOT create candidate because candidate is using an address that has NOT been assigned to state ID", async() => {
        const newCitizenAge = dateNeeded("July 20, 1949");

        await voteInstance.createCitizen("Liam Watson", newCitizenAge, 91423, 7201936274, {from: accounts[2]});

        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("November 3, 2021");
        const endDate = dateNeeded("November 7, 2021");

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(1, startDate, endDate);

        await truffleAssert.fails(voteInstance.createCandidate(1, 7201936274, 1, 1, {from: accounts[3]}));
      });

      it("should NOT create candidate because candidate is using an address that has been assigned to another state ID", async() => {
        const newCitizenAge = dateNeeded("July 20, 1949");

        await voteInstance.createCitizen("Liam Watson", newCitizenAge, 91423, 7201936274, {from: accounts[2]});

        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("November 3, 2021");
        const endDate = dateNeeded("November 7, 2021");

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(1, startDate, endDate);

        await truffleAssert.fails(voteInstance.createCandidate(1, 7201936274, 1, 1, {from: accounts[user]}));
      });

      it("should NOT create candidate because office running for office is NOT open for election", async() => {
        const newCitizenAge = dateNeeded("July 20, 1949");

        await voteInstance.createCitizen("Liam Watson", newCitizenAge, 91423, 7201936274, {from: accounts[2]});

        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("November 3, 2021");
        const endDate = dateNeeded("November 7, 2021");

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(1, startDate, endDate);
        await voteInstance.createCandidate(1, 8372738271, 1, 1, {from: user});
        await voteInstance.filledOfficePosition(1);

        await truffleAssert.fails(voteInstance.createCandidate(1, 7201936274, 1, 1, {from: accounts[2]}));
      });

      it("should NOT create candidate because candidate's is NOT old enough to run for that particular office", async() => {
        const newCitizenAge = dateNeeded("July 20, 1962");

        await voteInstance.createCitizen("Liam Watson", newCitizenAge, 91423, 7201936274, {from: accounts[2]});

        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("November 3, 2021");
        const endDate = dateNeeded("November 7, 2021");

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(1, startDate, endDate);

        await truffleAssert.fails(voteInstance.createCandidate(1, 7201936274, 1, 1, {from: accounts[2]}));
      });

    });


//test for election data
    describe("Elections", async() => {
      let citizenAge;
      let citizenId;

      beforeEach(async() => {
        citizenAge = dateNeeded("July 20, 1949");

        citizenId = await voteInstance.createCitizen("Mark Watson", citizenAge, 91423, 8372738271, {from: user});
      });

      it("should get all candidateIds in an election", async() => {
        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("November 3, 2021");
        const endDate = dateNeeded("November 7, 2021");

        const newCitizenAge = dateNeeded("July 20, 1949");
        await voteInstance.createCitizen("Liam Watson", newCitizenAge, 91423, 7201936274, {from: accounts[2]});

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(1, startDate, endDate);

        await voteInstance.createCandidate(1, 8372738271, 1, 1, {from: user});
        await voteInstance.createCandidate(2, 7201936274, 1, 1, {from: accounts[2]});

        const election = await voteInstance.getElection(1);

        assert.equal(election.candidateIds[0], 1);
        assert.equal(election.candidateIds[1], 2);
        assert.equal(election.candidateIds.length, 2);
      });

      it("should allow citizen to cast a vote for a candidate", async() => {
        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("January 1, 2021");
        const endDate = dateNeeded("November 7, 2131");

        const newCitizenAge = dateNeeded("July 20, 1949");
        await voteInstance.createCitizen("Liam Watson", newCitizenAge, 91423, 7201936274, {from: accounts[2]});

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(1, startDate, endDate);

        await voteInstance.createCandidate(1, 8372738271, 1, 1, {from: user});

        await truffleAssert.passes(voteInstance.vote(2, 1, 1, {from: accounts[2]}));
      });

      it("should allow a candidate to vote for themselves", async() =>{
        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("January 1, 2021");
        const endDate = dateNeeded("November 7, 2131");

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(1, startDate, endDate);

        await voteInstance.createCandidate(1, 8372738271, 1, 1, {from: user});

        await truffleAssert.passes(voteInstance.vote(1, 1, 1, {from: user}));
      });

      it("should allow a candidate to cast a vote for another candidate", async() => {
        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("January 1, 2021");
        const endDate = dateNeeded("November 7, 2131");

        const newCitizenAge = dateNeeded("July 20, 1949");
        await voteInstance.createCitizen("Liam Watson", newCitizenAge, 91423, 7201936274, {from: accounts[2]});

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(1, startDate, endDate);

        await voteInstance.createCandidate(1, 8372738271, 1, 1, {from: user});
        await voteInstance.createCandidate(2, 7201936274, 1, 1, {from: accounts[2]});

        await truffleAssert.passes(voteInstance.vote(2, 1, 1, {from: accounts[2]}));
      });

      it("should get the total number of votes cast for a candidate", async() => {
        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("January 1, 2021");
        const endDate = dateNeeded("November 7, 2131");
        const timestamp = await voteInstance.timestamp();

        const newCitizenAge = dateNeeded("July 20, 1949");
        await voteInstance.createCitizen("Liam Watson", newCitizenAge, 91423, 7201936274, {from: accounts[2]});

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(1, startDate, endDate);

        await voteInstance.createCandidate(1, 8372738271, 1, 1, {from: user});

        const result = await voteInstance.vote(2, 1, 1, {from: accounts[2]});
        await voteInstance.vote(1, 1, 1, {from: user});
        const candidate = await voteInstance.getTestResultsOfCandidate(1);

        assert.equal(candidate._voteCount.toString(10), 2);
        await truffleAssert.eventEmitted(result, 'VoteCast', (ev) => {
          //// timestamp function may yield slightly different times depending on how closely each runs to one another
          //// because the timestamp is being run on in the vote() function and the timestamp function from the test contract
          /*console.log("Time:   ", timestamp.toString(10));
          console.log("TimeEV: ", ev.timeVoteCast.toString(10));*/

          return  ev._candidateId == 1 &&
                  ev._electionId == 1
                  //&& ev.timeVoteCast.toString(10) == timestamp.toString(10)
                  ;
        });
      });

      it("should NOT allow a citizen to vote because citizenId is not owned by msg.sender", async() => {
        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("January 1, 2021");
        const endDate = dateNeeded("November 7, 2131");

        const newCitizenAge = dateNeeded("July 20, 1949");
        await voteInstance.createCitizen("Liam Watson", newCitizenAge, 91423, 7201936274, {from: accounts[2]});

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(1, startDate, endDate);

        await voteInstance.createCandidate(1, 8372738271, 1, 1, {from: user});

        await truffleAssert.fails(voteInstance.vote(2, 1, 1, {from: user}));
      });

      it("should NOT allow a citizen to vote because msg.sender does not have an eligible address to vote", async() => {
        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("January 1, 2021");
        const endDate = dateNeeded("November 7, 2131");

        const newCitizenAge = dateNeeded("July 20, 1949");
        await voteInstance.createCitizen("Liam Watson", newCitizenAge, 91423, 7201936274, {from: accounts[2]});

        const result = await voteInstance.loseOfCitizenship(2, accounts[2], "death", {from: accounts[0]});

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(1, startDate, endDate);

        await voteInstance.createCandidate(1, 8372738271, 1, 1, {from: user});

        await truffleAssert.fails(voteInstance.vote(2, 1, 1, {from: accounts[2]}));
        await truffleAssert.eventEmitted(result, 'NoLongerACitizen', (ev) => {
          return  ev.citizenId == 2 &&
                  ev.citzenAddress == accounts[2] &&
                  ev.reasonForLoseOfCitizenship == "death";
        });
      });

      it("should NOT allow a citizen to vote because citizen has lost citizenship", async() => {
        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("January 1, 2021");
        const endDate = dateNeeded("November 7, 2131");

        const newCitizenAge = dateNeeded("July 20, 1949");
        await voteInstance.createCitizen("Liam Watson", newCitizenAge, 91423, 7201936274, {from: accounts[2]});

        await voteInstance.loseOfCitizenship(2, accounts[2], "death", {from: accounts[0]});
        const citizen = await voteInstance.getCitizen(2, {from: accounts[0]});

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(1, startDate, endDate);

        await voteInstance.createCandidate(1, 8372738271, 1, 1, {from: user});

        assert.equal(citizen.citizenship, false);
        await truffleAssert.fails(voteInstance.vote(2, 1, 1, {from: accounts[2]}));
        });

      it("should NOT allow a citizen to vote because election has NOT opened yet", async() => {
        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("January 1, 2022");
        const endDate = dateNeeded("November 7, 2131");

        const newCitizenAge = dateNeeded("July 20, 1949");
        await voteInstance.createCitizen("Liam Watson", newCitizenAge, 91423, 7201936274, {from: accounts[2]});

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(1, startDate, endDate);

        await voteInstance.createCandidate(1, 8372738271, 1, 1, {from: user});

        await truffleAssert.fails(voteInstance.vote(2, 1, 1, {from: accounts[2]}));
        });

      it("should NOT allow a citizen to vote because election is NO LONGER OPEN", async() => {
        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("January 1, 2021");
        const endDate = dateNeeded("January 10, 2021");

        const newCitizenAge = dateNeeded("July 20, 1949");
        await voteInstance.createCitizen("Liam Watson", newCitizenAge, 91423, 7201936274, {from: accounts[2]});

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(1, startDate, endDate);

        await voteInstance.createCandidate(1, 8372738271, 1, 1, {from: user});

        await truffleAssert.fails(voteInstance.vote(2, 1, 1, {from: accounts[2]}));
        });

      it("should NOT allow a citizen to vote because citizenId DOES NOT match with zipCode for this particular election's zipCode", async() => {
        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("January 1, 2021");
        const endDate = dateNeeded("November 7, 2131");

        const newCitizenAge = dateNeeded("July 20, 1949");
        await voteInstance.createCitizen("Liam Watson", newCitizenAge, 92126, 7201936274, {from: accounts[2]});

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(1, startDate, endDate);

        await voteInstance.createCandidate(1, 8372738271, 1, 1, {from: user});

        await truffleAssert.fails(voteInstance.vote(2, 1, 1, {from: accounts[2]}));
        });

      });


//tests for election results
    describe("Results", async() => {
      let citizenAge;
      let citizenId;

      beforeEach(async() => {
        citizenAge = dateNeeded("July 20, 1949");

        citizenId = await voteInstance.createCitizen("Mark Watson", citizenAge, 91423, 8372738271, {from: user});

        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("January 1, 2021");
        const endDate = dateNeeded("November 7, 2131");

        const citizenOneAge = dateNeeded("July 20, 1949");
        await voteInstance.createCitizen("Liam Watson", citizenOneAge, 91423, 7201936274, {from: accounts[2]});

        const citizenTwoAge = dateNeeded("July 20, 1959");
        await voteInstance.createCitizen("Isaiah Watson", citizenTwoAge, 91423, 7201936265, {from: accounts[3]});

        const citizenThreeAge = dateNeeded("July 20, 1939");
        await voteInstance.createCitizen("Melissa Watson", citizenThreeAge, 91423, 7201936255, {from: accounts[4]});

        const citizenFourAge = dateNeeded("July 20, 1929");
        await voteInstance.createCitizen("Brock Watson", citizenFourAge, 91423, 7201936245, {from: accounts[5]});

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(1, startDate, endDate);

        await voteInstance.createCandidate(1, 8372738271, 1, 1, {from: user});
        await voteInstance.createCandidate(5, 7201936245, 1, 1, {from: accounts[5]});
        await voteInstance.createCandidate(4, 7201936255, 1, 1, {from: accounts[4]});
        await voteInstance.createCandidate(3, 7201936265, 1, 1, {from: accounts[3]});
      });

      it("should find the highest vote count amongst all candidates in an election", async() => {
        await voteInstance.vote(1, 1, 1, {from: user});
        await voteInstance.vote(2, 2, 1, {from: accounts[2]});
        await voteInstance.vote(3, 2, 1, {from: accounts[3]});

        await voteInstance.vote(4, 2, 1, {from: accounts[4]});
        await voteInstance.vote(5, 2, 1, {from: accounts[5]});

        const highest = await voteInstance.getTestHighestVoteTotal(1);
        console.log("Highest: ", highest.toString(10));

        assert.equal(highest, 4);
      });

      it("should allow admin to enter the winner of an election and emit winner event", async() => {
        await voteInstance.vote(1, 1, 1, {from: user});
        await voteInstance.vote(2, 2, 1, {from: accounts[2]});
        await voteInstance.vote(3, 2, 1, {from: accounts[3]});

        await voteInstance.vote(4, 2, 1, {from: accounts[4]});
        await voteInstance.vote(5, 2, 1, {from: accounts[5]});

        const result = await voteInstance.declareWinnerOfTestElection(2, {from: accounts[0]});

        truffleAssert.eventEmitted(result, 'Winner', (ev) => {
          return  ev._candidateId == 2 &&
                  ev._officeId == 1 &&
                  ev._voteCount == 4 &&
                  //ev.timestamp may cause failure because of time difference between event run and event tested
                  ev.confirmedBy == accounts[0];
        });
      });

      it("should NOT allow winner of an election to be entered because msg.sender is not approved to do so", async() => {
        await voteInstance.vote(1, 1, 1, {from: user});
        await voteInstance.vote(2, 2, 1, {from: accounts[2]});
        await voteInstance.vote(3, 2, 1, {from: accounts[3]});

        await voteInstance.vote(4, 2, 1, {from: accounts[4]});
        await voteInstance.vote(5, 2, 1, {from: accounts[5]});

        await truffleAssert.fails(voteInstance.declareWinnerOfTestElection(2, {from: accounts[1]}));
      });

      it("should NOT allow winner of an election to be entered because election has NOT concluded", async() => {
        await voteInstance.vote(1, 1, 1, {from: user});
        await voteInstance.vote(2, 2, 1, {from: accounts[2]});
        await voteInstance.vote(3, 2, 1, {from: accounts[3]});

        await voteInstance.vote(4, 2, 1, {from: accounts[4]});
        await voteInstance.vote(5, 2, 1, {from: accounts[5]});

        await truffleAssert.fails(voteInstance.declareWinnerOfTestElection(2, {from: accounts[1]}));
      });

      it("shouln NOT allow a citizen to vote more than once in a particular election", async() => {
        await voteInstance.vote(1, 1, 1, {from: user});

        await truffleAssert.fails(voteInstance.vote(1, 1, 1, {from: user}));
      });

    });

    });

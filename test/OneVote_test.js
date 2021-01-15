//const OneVoteContract = artifacts.require("OneVote");
const ProxyVote = artifacts.require("Test")
const truffleAssert = require("truffle-assertions");


    contract ("OneVote", async(accounts) => {

      const user = accounts[1];

      const dateNeeded = (date) => {
        let ageInMilliseconds = Date.parse(date);

        return ageInMilliseconds;
      }

      beforeEach(async() => {
        voteInstance = await ProxyVote.new();
      });


//init test
      it("should assign 'DEFAULT_ADMIN_ROLE' to the accounts[0] address", async() => {
        const role = await voteInstance.DEFAULT_ADMIN_ROLE({from:accounts[0]});
        const admin = await voteInstance.hasRole(role, accounts[0], {from: accounts[0]});

        console.log("Admin: ", admin);

        assert.equal(admin, true);
      });


//creating a citizen test
    describe("creating a citizen", async() => {
      it("should create a new citizen", async() => {
        let dob = dateNeeded("May 19, 1986");

        const result = await voteInstance.createCitizen("Mark Watson", dob, 91423, 8372738271, {from: user});
        const gottenCitizen = await voteInstance.getCitizen(0, {from: user});

        const citizenZipCode = gottenCitizen.zipCode.toString(10);

        assert.equal(gottenCitizen.name, "Mark Watson");
        assert.equal(gottenCitizen.dateOfBirth, dob);
        assert.equal(gottenCitizen.zipCode.toString(10), "91423");

        await truffleAssert.eventEmitted(result, 'CitizenAdded', (ev) => {
          return ev.owner == user && ev.citizenId == 0 && ev.stateId == 8372738271 && ev.zipCode == parseInt(citizenZipCode);
        });
      });

      it("should NOT create a new citizen because getCitizen() function is NOT being called by citizenId owner", async() => {
        let dob = dateNeeded("May 19, 1986");

        const result = await voteInstance.createCitizen("Mark Watson", dob, 91423, 8372738271, {from: user});
        await truffleAssert.fails(voteInstance.getCitizen(0, {from: accounts[2]}));
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
        const assigned = await voteInstance.addressAssignedToId(0);

        assert.equal(assigned, user);
      });

      it("should get citizen ID of user's address", async() => {
        let dob = dateNeeded("May 19, 1986");

        await voteInstance.createCitizen("Mark Watson", dob, 91423, 8372738271, {from: user});
        const citizenId = await voteInstance.getCitizenId(user, {from: user});

        assert.equal(citizenId, 0);
      });

      it("should NOT get citizen ID of user's address because msg.sender is NOT the owner of the address that is being used to search for citizen ID", async() => {
        let dob = dateNeeded("May 19, 1986");

        await voteInstance.createCitizen("Mark Watson", dob, 91423, 8372738271, {from: user});
        await truffleAssert.fails(voteInstance.getCitizenId(user, {from:accounts[2]}));
      });
    });


//test for offices, candidates, elections and laws
    describe("candidates and laws", async() => {
      let citizenAge;
      let citizenId;

      beforeEach(async() => {
        citizenAge = dateNeeded("July 20, 1949");

        citizenId = await voteInstance.createCitizen("Mark Watson", citizenAge, 91423, 8372738271, {from: user});
      });

      it("should create an office", async() => {
        const ageRequired = dateNeeded("June 3, 1961");

        const result = await voteInstance.createOffice("Mayor", 91423, ageRequired);
        const office = await voteInstance.getOffice(0);

        assert.equal(office.officeTitle, "Mayor");
        assert.equal(office.zipCode.toString(10), "91423");
        assert.equal(office.requiredAge, ageRequired);
        // assert.equal(office.isOpenForElection, true);

        await truffleAssert.eventEmitted(result, 'OfficeAdded', (ev) => {
          return ev._officeTitle == "Mayor" && ev._zipCode.toString(10) == "91423" && ev._officeId == 0;
        })
      });

      it("should create an election", async() => {
        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("November 3, 2021");
        const endDate = dateNeeded("November 7, 2021");

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        const result = await voteInstance.createAnElection(0, startDate, endDate);
        const election = await voteInstance.getElection(0);

        assert.equal(election.officeTitle, "Mayor");
        assert.equal(election.zipCode, 91423);
        assert.equal(election.electionStart, startDate);
        assert.equal(election.electionEnd, endDate);

        await truffleAssert.eventEmitted(result, 'ElectionAdded', (ev) => {
          return ev._officeTitle == "Mayor" && ev._zipCode == 91423 && ev._electionStart == startDate && ev._electionEnd == endDate && ev._electionId == 0;
        });
      });

      it("should NOT create an election because office is NOT open for an election", async() => {
        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("November 3, 2021");
        const endDate = dateNeeded("November 7, 2021");

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(0, startDate, endDate);
        await voteInstance.createCandidate(0, 8372738271, 0, 0, {from: user});
        await voteInstance.filledOfficePosition(0, 0);

        await truffleAssert.fails(voteInstance.createAnElection(0, startDate, endDate));
      });

      it("should NOT create an election because address does not have 'Administrator' access", async() => {
        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("November 3, 2021");
        const endDate = dateNeeded("November 7, 2021");

        await voteInstance.createOffice("Mayor", 91423, ageRequired);

        await truffleAssert.fails(voteInstance.createAnElection(0, startDate, endDate, {from:user}));
      });

      it("should create a candidate", async() => {
        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("November 3, 2021");
        const endDate = dateNeeded("November 7, 2021");

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(0, startDate, endDate);

        result = await voteInstance.createCandidate(0, 8372738271, 0, 0, {from: user});
        const getCandidate = await voteInstance.getCandidate(0);

        assert.equal(getCandidate.name, "Mark Watson");
        assert.equal(getCandidate.officeTitle, "Mayor");
        assert.equal(getCandidate.zipCode, 91423);
        assert.equal(getCandidate.voteCount, 0);

        await truffleAssert.eventEmitted(result, 'CandidateAdded', (ev) => {
          return ev._name == "Mark Watson" && ev._officeTitle == "Mayor" && ev._electionStart == startDate;
        });
      });

      it("should NOT create candidate because candidate does not have state ID", async() => {
        const newCitizenAge = dateNeeded("July 20, 1949");

        await voteInstance.createCitizen("Liam Watson", newCitizenAge, 91423, 7201936274, {from: accounts[2]});

        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("November 3, 2021");
        const endDate = dateNeeded("November 7, 2021");

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(0, startDate, endDate);

        await truffleAssert.fails(voteInstance.createCandidate(1, 9000000000, 0, 0, {from: accounts[2]}));
      });

      it("should NOT create candidate because candidate is using an address that has NOT been assigned to state ID", async() => {
        const newCitizenAge = dateNeeded("July 20, 1949");

        await voteInstance.createCitizen("Liam Watson", newCitizenAge, 91423, 7201936274, {from: accounts[2]});

        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("November 3, 2021");
        const endDate = dateNeeded("November 7, 2021");

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(0, startDate, endDate);

        await truffleAssert.fails(voteInstance.createCandidate(1, 7201936274, 0, 0, {from: accounts[3]}));
      });

      it("should NOT create candidate because candidate is using an address that has been assigned to another state ID", async() => {
        const newCitizenAge = dateNeeded("July 20, 1949");

        await voteInstance.createCitizen("Liam Watson", newCitizenAge, 91423, 7201936274, {from: accounts[2]});

        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("November 3, 2021");
        const endDate = dateNeeded("November 7, 2021");

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(0, startDate, endDate);

        await truffleAssert.fails(voteInstance.createCandidate(1, 7201936274, 0, 0, {from: accounts[user]}));
      });

      it("should NOT create candidate because office running for is NOT open for election", async() => {
        const newCitizenAge = dateNeeded("July 20, 1949");

        await voteInstance.createCitizen("Liam Watson", newCitizenAge, 91423, 7201936274, {from: accounts[2]});

        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("November 3, 2021");
        const endDate = dateNeeded("November 7, 2021");

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(0, startDate, endDate);
        await voteInstance.createCandidate(0, 8372738271, 0, 0, {from: user});
        await voteInstance.filledOfficePosition(0, 0);

        await truffleAssert.fails(voteInstance.createCandidate(1, 7201936274, 0, 0, {from: accounts[2]}));
      });

      it("should NOT create candidate because candidate's is NOT old enough to run for that particular office", async() => {
        const newCitizenAge = dateNeeded("July 20, 1962");

        await voteInstance.createCitizen("Liam Watson", newCitizenAge, 91423, 7201936274, {from: accounts[2]});

        const ageRequired = dateNeeded("June 3, 1961");
        const startDate = dateNeeded("November 3, 2021");
        const endDate = dateNeeded("November 7, 2021");

        await voteInstance.createOffice("Mayor", 91423, ageRequired);
        await voteInstance.createAnElection(0, startDate, endDate);

        await truffleAssert.fails(voteInstance.createCandidate(1, 7201936274, 0, 0, {from: accounts[2]}));
      });

    });


    });

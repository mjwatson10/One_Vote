//const OneVoteContract = artifacts.require("OneVote");
const ProxyVote = artifacts.require("Test")
const truffleAssert = require("truffle-assertions");


    contract ("OneVote", async(accounts) => {

      const user = accounts[1];

      beforeEach(async() => {
        voteInstance = await ProxyVote.new();
      });


//creating a citizen test
    describe("creating a citizen", async() => {
      it("should create a new citizen", async() => {
        const result = await voteInstance.createCitizen("Mark Watson", "05191986", 91423, 8372738271, {from: user});
        const gottenCitizen = await voteInstance.getCitizen(0);

        const citizenZipCode = gottenCitizen.zipCode.toString(10);

        assert.equal(gottenCitizen.name, "Mark Watson");
        assert.equal(gottenCitizen.dateOfBirth, "05191986");
        assert.equal(gottenCitizen.zipCode.toString(10), "91423");

        await truffleAssert.eventEmitted(result, 'CitizenAdded', (ev) => {
          return ev.owner == user && ev.citizenId == 0 && ev.stateId == 8372738271 && ev.zipCode == parseInt(citizenZipCode);
        });
      });

      it("should NOT create a new citizen because stateId has already been assigned to a citizen", async() => {
        await voteInstance.createCitizen("Mark Watson", "05191986", 91423, 8372738271, {from: user});

        await truffleAssert.fails(voteInstance.createCitizen("Tom Smith", "06161988", 92126, 8372738271, {from: accounts[2]}));
      });

      it("should NOT create a new citizen because address has already been assigned to a citizen", async() => {
        await voteInstance.createCitizen("Mark Watson", "05191986", 91423, 8372738271, {from: user});

        await truffleAssert.fails(voteInstance.createCitizen("Tom Smith", "06161988", 92126, 4373768011, {from: user}));
      });

      it("should assign the new citizenId to the msg.senders", async() => {
        await voteInstance.createCitizen("Mark Watson", "05191986", 91423, 8372738271, {from: user});
        const assigned = await voteInstance.addressAssignedToId(0);

        assert.equal(assigned, user);
      });
    });


//test for candidates and laws
    describe("candidates and laws", async() => {
      it.only("should create a candidate", async() => {

      });

      it("should NOT create candidate" async() => {

      });
    });


    });

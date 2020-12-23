//const OneVoteContract = artifacts.require("OneVote");
const ProxyVote = artifacts.require("test")
const truffleAssert = require("truffle-assertions");


    contract ("OneVote", async(accounts) => {

      const user = accounts[1];

      beforeEach(async() => {
        voteInstance = await ProxyVote.new();
      });


//creating a citizen test
    describe("creating a citizen", async() => {
      it.only("should create a new citizen", async() => {
        //await voteInstance.createCitizen("Mark Watson", 05191986, 91423, 8372738271);


      });

      it("should NOT create a new citizen because stateId has already been assigned to a citizen", async() => {

      });

      it("should assign the new citizenId to the msg.senders", async() => {

      });
    });


    });

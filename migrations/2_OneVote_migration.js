const OneVoteContract = artifacts.require("OneVote");

module.exports = (deployer) => {
  deployer.deploy(OneVoteContract);
}; 

// Import the necessary packages
const { expect } = require("chai");
const { ethers } = require("hardhat");

// Start of the test block
describe("Voting", function () {
  // Define the variables
  let votingContract;
  let candidate1 = "Rahul";
  let candidate2 = "Rohan";
  let user1, user2, user3;

  // Deploy the contract before running the tests
  beforeEach(async function () {
    [user1, user2, user3] = await ethers.getSigners();
    const Voting = await ethers.getContractFactory("Voting");
    votingContract = await Voting.deploy();
    await votingContract.deployed();

    await votingContract.addCandidate(candidate1);
    await votingContract.addCandidate(candidate2);
  });

  // Test the addCandidate Function for adding candidate to the list
  it("should add candidate to the list", async () => {
    await votingContract.addCandidate("Rahul");
    const candidate = await votingContract.candidates(0);
    expect(candidate.name).to.equal("Rahul");
    expect(candidate.voteCount).to.equal(0);
  });

  // Test the vote function with valid inputs
  it("should allow a user to vote for a candidate", async function () {
    await votingContract.connect(user1).vote(0);
    const candidate1Votes = (await votingContract.candidates(0)).voteCount;
    expect(candidate1Votes).to.equal(1);
  });

  // Test the vote function with an invalid candidateIndex
  it("should not allow a user to vote for an invalid candidate", async function () {
    await expect(votingContract.connect(user1).vote(2)).to.be.revertedWith(
      "Invalid candidate index"
     );

    });

    it("should not allow a voter to vote twice", async function () {
        // Cast a vote for the candidate
        await votingContract.connect(user1).vote(0);
  
        // Attempt to cast another vote for the same candidate
        await expect(votingContract.connect(user1).vote(0)).to.be.revertedWith("You have already voted");
  
        // Check that the vote count has not changed
        const candidate = await votingContract.candidates(0);
        expect(candidate.voteCount).to.equal(1);
    });

    it("should revert if an invalid candidate index is provided", async function () {
        // Attempt to cast a vote for a non-existent candidate
        await expect(votingContract.connect(user1).vote(2)).to.be.revertedWith("Invalid candidate index");
  
        // Check that the vote count has not changed
        const candidate = await votingContract.candidates(0);
        expect(candidate.voteCount).to.equal(0);
      });

      
        // Test the getWinner function
    it("should return the name of the candidate with the highest number of votes", async function () {
    // Cast some votes for candidate1 and candidate2
    await votingContract.connect(user1).vote(0);
    await votingContract.connect(user2).vote(0);
    await votingContract.connect(user3).vote(1);
    // Check the winner name
    const winnerName = await votingContract.getWinner();
    expect(winnerName).to.equal(candidate1);
    });


  });


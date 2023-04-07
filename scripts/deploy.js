const { ethers } = require("hardhat");

async function main(){
    // here we are getting the instance of the contract
    const [deployer] = await ethers.getSigners();      //is used to get an array of signer objects.

    const Voting = await ethers.getContractFactory("Voting");
    votingContract = await Voting.deploy();
    await votingContract.deployed();

    console.log("Voting Smart Contract address:", votingContract.address);
}

main().then(()=>process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
})
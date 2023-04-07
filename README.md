# Hardhat Testing(Voting Smart Contract)

This smart contract is designed to allow users to participate in a voting process for a list of candidates. The contract uses Solidity programming language and is compatible with version 0.8.0 or higher.

## Prerequisites

Before running the DApp, make sure you have the following installed on your system:

- Node.js
- npm or yarn
- Ganache or any other local Ethereum development blockchain
- Metamask browser extension

## Installation

1. For Hardhat Installation
``` 
npm init --yes
npm install --save-dev hardhat
```

2. For running hardhat sample project install these dependencies:
```
npm install --save-dev @nomiclabs/hardhat-ethers@^2.0.5 @nomiclabs/hardhat-waffle@^2.0.3 
npm install --save-dev chai@^4.3.6 ethereum-waffle@^3.4.4 ethers@^5.6.2 hardhat@^2.9.2
```
This will create a new React app in a folder named my-app and initialize a new Hardhat project with the basic sample project.

## Usage

1. Compile the smart contract using the command `npx hardhat compile`
2. Run the tests using the command `npx hardhat test`

## Testing

The smart contract includes a test suite to verify its functionality. The test suite uses the Hardhat testing framework and Chai assertion library. The test suite includes the following tests:

- Test to add candidate to the list.
- Test to allow a user to vote for a candidate.
- Test to not allow a user to vote for an invalid candidate.
- Test to not allow a voter to vote twice.
- Test to revert if an invalid candidate index is provided.
- Test to return the name of the candidate with the highest number of votes.

## Deploying Smart Contract to Localhost

1. Write your smart contract in Solidity and save it in the `contracts/` folder.

2. In the `hardhat.config.js` file, configure your local development network by adding the following:

```
require("@nomiclabs/hardhat-waffle")


module.exports = {
    solidity: "0.8.9",
    networks: {
      hardhat: {
        chainId: 1337,
      },
    },
  };
  ```

  3. In the `scripts/` folder, create a new script to deploy your contract to the local network:
  ```
 const { ethers } = require("hardhat");

async function main(){
    // here we are getting the instance of the contract

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
```
4. Compile and deploy the smart contract using Hardhat

```
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost

``` 

This will deploy your smart contract to the local development network.

## License

This project is licensed under the MIT License

const Token = artifacts.require('Token');

const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function (deployer, network, accounts) {
   await deployer.deploy(Token);
   const token = await Token.deployed();

   await deployer.deploy(DecentralBank, token.address);
   const decentralBank = await DecentralBank.deployed();

   await token.passMinterRole(decentralBank.address);


}

require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();

const path = require('path');
const fs = require('fs');

const { vars } = require("hardhat/config");



// Go to https://infura.io, sign up, create a new API key
// in its dashboard, and add it to the configuration variables
const INFURA_API_KEY = process.env.INFURA_API_KEY;
const contractAddress = process.env.MHT_CONTRACT_ADDRESS
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");



// Add your Sepolia account private key to the configuration variables
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
// const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");

// const INFURA_API_KEY = '63af366f87f24744a7f7cc6c9ca934b5';

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/63af366f87f24744a7f7cc6c9ca934b5`,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY],
    },

  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
};


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs, hre) => {
    console.log(hre.network.name);
    const balance = await hre.ethers.provider.getBalance(taskArgs.account);

    console.log(hre.ethers.formatEther(balance), "ETH");

  });


  task("contract", "Prints an account's balance")
  //.addParam("address", "The account's address")
  .setAction(async (taskArgs, hre) => {
    const contractName = 'Token.sol';
    const contractJSONPath = path.join(__dirname, 'artifacts', 'contracts', contractName, 'Token.json');
    
    // 读取合约 JSON 文件
    const contractJSON = JSON.parse(fs.readFileSync(contractJSONPath, 'utf-8'));
    
    // 获取合约 ABI
    const contractABI = contractJSON.abi;
    
    // console.log('Contract ABI:', contractABI);

  

    const provider = new hre.ethers.getDefaultProvider('sepolia', {infura: INFURA_API_KEY});
    // const contract = new hre.ethers.Contract(contractAddress, contractABI, provider);
    try {
      // 调用合约的某个方法，例如获取某个状态变量的值
      //await contract.transfer('0xDea23CE122a016e41bB1E7b2e71014F7Bc8cd346', 100);
      //const symbol = await contract.symbol()
      // console.log('Method Result:', symbol);
      //const totalSupply = await contract.totalSupply()
      //console.log('total:', totalSupply);
      // const balance = await contract.balanceOf('0xb5c2508BE0939f641F30889ae8c0383378968738');
      // console.log("balance: ", balance);
      const wallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider); 
      const contract = new hre.ethers.Contract(contractAddress, contractABI, wallet);
      // await contract.transfer('0xDea23CE122a016e41bB1E7b2e71014F7Bc8cd346', 100);
      const balance = await contract.balanceOf('0xb5c2508BE0939f641F30889ae8c0383378968738');
      console.log("balance: ", balance);
  } catch (error) {
      console.error('Error calling contract method:', error);
  }





  });
 






// curl https://mainnet.infura.io/v3/63af366f87f24744a7f7cc6c9ca934b5 \
//     -X POST \
//     -H "Content-Type: application/json" \
//     --data '{"jsonrpc": "2.0", "id": 1, "method": "eth_blockNumber", "params": []}'
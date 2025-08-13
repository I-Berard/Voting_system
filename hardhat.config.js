require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.29",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    // coinmarketcap: process.env.COINMARKETCAP_API_KEY, // optional, for real USD pricing
    // outputFile: "gas-report.txt", // optional, writes report to a file
    noColors: true,               // good if writing to file
  },
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY] 
    }
  }
};

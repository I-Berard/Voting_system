require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.30",
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
};

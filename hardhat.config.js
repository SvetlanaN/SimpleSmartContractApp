require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const DEFAULT_NETWORK = process.env.DEFAULT_NETWORK

module.exports = {
  defaultNetwork: DEFAULT_NETWORK,
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      gasPrice: 35000000000
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337
    }
  },
  solidity: "0.8.18"
}

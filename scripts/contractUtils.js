const { ethers } = require('hardhat')
const DEFAULT_CONTRACT_NAME = 'SimpleStorage'

async function deployContract(contractName = DEFAULT_CONTRACT_NAME) {
    const contract = await ethers.deployContract(contractName)
    await contract.waitForDeployment()
    console.log(`Contract deployed at: ${contract.target}`)

    return contract
}

async function getContractInstance(
    contractAddress,
    contractName = DEFAULT_CONTRACT_NAME
) {
    return await ethers.getContractAt(contractName, contractAddress)
}

module.exports = {
    deployContract,
    getContractInstance,
}

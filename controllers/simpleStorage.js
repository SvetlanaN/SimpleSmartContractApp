const {
    deployContract,
    getContractInstance,
} = require('../scripts/contractUtils')

let contractInstance

exports.store = async (req, res) => {
    try {
        const { value } = req.body

        if (isNaN(value)) {
            return res.status(400).json({
                error: 'Invalid value. Please provide a valid integer.',
            })
        }

        if (!contractInstance) {
            return res.status(400).json({
                error: 'Contract not set. Please deploy or set a contract first.',
            })
        }

        await contractInstance.store(value)
        res.status(200).json({
            message: `Value '${value}' stored successfully.`,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'An error occurred while storing the value.',
        })
    }
}

exports.retrieve = async (req, res) => {
    try {
        if (!contractInstance) {
            return res.status(400).json({
                error: 'Contract not set. Please deploy or set a contract first.',
            })
        }

        const value = await contractInstance.retrieve()
        res.status(200).json({
            value: parseInt(value),
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'An error occurred while retrieving the value.',
        })
    }
}

exports.deployContract = async (req, res) => {
    try {
        contractInstance = await deployContract()

        res.status(200).json({
            address: contractInstance.target,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'An error occurred while deploying the contract.',
        })
    }
}

exports.setContract = async (req, res) => {
    try {
        const { address } = req.body

        if (!address) {
            return res.status(400).json({
                error: 'Invalid address. Please provide a valid contract address.',
            })
        }

        contractInstance = await getContractInstance(address)

        res.status(200).json({
            message: `Contract instance at '${address}' set successfully.`,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'An error occurred while getting the contract.',
        })
    }
}

# Simple Smart Contract Backend Application

This is a backend application built with Node.js and Hardhat framework that allows you to deploy and interact with a simple smart contract. The application provides endpoints to store and retrieve integer values from the smart contract.

## Setup

1. Install dependencies by running `yarn install`.

2. Copy `.env.example` file, rename it to `.env` and update the necessary values.
Supported options for `DEFAULT_NETWORK` are:
    - `hardhat`
    - `localhost`
    - `sepolia`

You can add additional networks to `hardhat.config.js`.

4. Compile the smart contract by running the following command:
`yarn hardhat compile`

5. Start the application by running the following command:
`node index.js`

## Endpoints

### POST /deployContract

- Creates a new contract instance and deploys it.
- Sets the internal contract instance on which `store` and `retrieve` can be called.

### PUT /setContract

- Sets the internal contract instance on which `store` and `retrieve` can be called.
- Request Body:
```json
{
 "address": <contract_address>
}
```

### PUT /store

- Stores an integer value in the smart contract.
- Request Body:
```json
{
 "value": <integer_value>
}
```

### GET /retrieve
Description: Retrieves the stored integer value from the smart contract.
Default value is 0.

### Example calls
In `exampleCalls.http` two simple calls are prepared, ready to be called with VS Code REST Client extension.

```
GET http://localhost:3000/retrieve
Content-Type: application/json

###

PUT http://localhost:3000/store
Content-Type: application/json

{
    "value": 4
}

###

POST http://localhost:3000/deployContract
Content-Type: application/json

###

PUT http://localhost:3000/setContract
Content-Type: application/json

{
    "address": "0x5FbDB2315678afecb367f032d93F642f64180aa3"
}
```

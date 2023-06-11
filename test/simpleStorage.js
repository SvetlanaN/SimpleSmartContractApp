const request = require('supertest')
const server = require('../index')
const { expect } = require('chai')

describe('Contract API', () => {
    let contractAddress

    before(async () => {
        const deployContractResponse = await request(server).post(
            '/deployContract'
        )
        contractAddress = deployContractResponse.body.address
    })

    after((done) => {
        server.close(done)
    })

    describe('GET /retrieve', () => {
        it('should retrieve the default stored value', async () => {
            const response = await request(server).get('/retrieve')

            expect(response.status).to.equal(200)
            expect(response.body.value).to.equal(0) // 0 is the default value
        })

        it('should retrieve the updated stored value', async () => {
            const updatedValue = 10
            await request(server).put('/store').send({ value: updatedValue })
            const response = await request(server).get('/retrieve')

            expect(response.status).to.equal(200)
            expect(response.body.value).to.equal(updatedValue)
        })
    })

    describe('PUT /store', () => {
        it('should store a valid integer value', async () => {
            const response = await request(server)
                .put('/store')
                .send({ value: 10 })

            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal(
                "Value '10' stored successfully."
            )
        })

        it('should return an error for an invalid value', async () => {
            const response = await request(server)
                .put('/store')
                .send({ value: 'invalid' })

            expect(response.status).to.equal(400)
            expect(response.body.error).to.equal(
                'Invalid value. Please provide a valid integer.'
            )
        })
    })

    describe('POST /deployContract', () => {
        it('should deploy the contract', async () => {
            const response = await request(server).post('/deployContract')

            expect(response.status).to.equal(200)
            expect(response.body.address).to.exist
        })
    })

    describe('PUT /setContract', () => {
        it('should set the contract instance with a valid address', async () => {
            const response = await request(server)
                .put('/setContract')
                .send({ address: contractAddress })

            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal(
                `Contract instance at '${contractAddress}' set successfully.`
            )
        })

        it('should return an error for an invalid address', async () => {
            const response = await request(server)
                .put('/setContract')
                .send({ address: '' })

            expect(response.status).to.equal(400)
            expect(response.body.error).to.equal(
                'Invalid address. Please provide a valid contract address.'
            )
        })
    })
})

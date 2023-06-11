require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const simpleStorageEndpoints = require('./routes/simpleStorage')

app.use(express.json())

app.use('', simpleStorageEndpoints)

const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})

module.exports = server

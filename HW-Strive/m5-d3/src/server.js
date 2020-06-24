const express = require ("express")

const server = express()
const port = process.env.PORT || 3002

server.use(express.json())
server.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
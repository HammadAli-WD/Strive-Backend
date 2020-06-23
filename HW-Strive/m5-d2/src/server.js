const express = require("express")


const studentsRoutes = require("./services")

const server = express()

server.use(express.json())
server.use("/services", studentsRoutes)




server.listen(3001, ()=> {
    console.log("Server is running on port 3001")
})
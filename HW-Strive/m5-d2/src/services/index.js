const express = require("express")
const fs = require ("fs")
const path = require("path")
//const uniqid = require("uniqid")


const router = express.Router()
//console.log(router)
const studentsFilePath = path.join(__dirname, "Students.json")
console.log(studentsFilePath)

//1
router.get("/", (request, response) => {
    const fileContentAsBuffer = fs.readFileSync(studentsFilePath)
    console.log(fileContentAsBuffer)
    const fileContent = fileContentAsBuffer.toString()

    response.send(JSON.parse(fileContent))
})










module.exports = router


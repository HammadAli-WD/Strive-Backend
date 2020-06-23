const express = require("express")
const fs = require ("fs")
const path = require("path")
const { request } = require("http")
const { response } = require("express")
//const uniqid = require("uniqid")


const router = express.Router()
//console.log(router)
const studentsFilePath = path.join(__dirname, "Students.json")
//console.log(studentsFilePath)

//1
router.get("/", (request, response) => {
    const fileContentAsBuffer = fs.readFileSync(studentsFilePath)
    //console.log(fileContentAsBuffer)
    const fileContent = fileContentAsBuffer.toString()
    //console.log(fileContent)

    response.send(JSON.parse(fileContent))
})
//2
router.get("Students/:id", (request, response) => {
    const fileContentAsBuffer = fs.readFileSync(studentsFilePath)
    const studentsArray = JSON.parse(fileContentAsBuffer.toString())
    console.log(studentsArray)

})










module.exports = router


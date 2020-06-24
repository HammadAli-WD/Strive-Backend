const express = require("express")
const fs = require ("fs")
const path = require ("path")
const uniqid = require ("uniqid")

const {check, validationResult} = require("express-validator")

const router = express.Router()

const readFile = (fileName) => {
const fileContent = fs.readFileSync(path.join(__dirname, fileName))
return JSON.parse(fileContent.toString())
}

router.get("/:id", (req, res, next) =>{
    try {
        const studentsDB = readFile("students.json")
        const student = studentsDB.filter((student) => student.ID === req.params.id)
        res.send(student)
        
    } catch (error) {
        error.httpStatusCode = 404
        next(error)
    }
})


module.exports = router

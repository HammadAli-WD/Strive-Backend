const express = require("express")
const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")
const { request, response } = require("express")


const router = express.Router()
//console.log(router)
const studentsFilePath = path.join(__dirname, "Students.json")
//console.log(studentsFilePath)

//1
router.get("/", (request, response) => {
    const fileContentAsBuffer = fs.readFileSync(studentsFilePath)
    //console.log(fileContentAsBuffer)
    const fileContent = fileContentAsBuffer.toString()
    console.log(fileContent)

    response.send(JSON.parse(fileContent))
})


//2
 router.get("/:id", (request, response) => {
    const fileContentAsBuffer = fs.readFileSync(studentsFilePath)
    const studentsArray = JSON.parse(fileContentAsBuffer.toString())
    //console.log(studentsArray)
    const student = studentsArray.filter(student => student.id ===request.params.id)
    console.log(student)

    response.send(student)

})
 
//3
router.post("/", (request, response) => {
    console.log(request.body)
    const newStudent = { ...request.body, id:uniqid()}

    const fileContentAsBuffer = fs.readFileSync(studentsFilePath)
    const studentsArray = JSON.parse(fileContentAsBuffer.toString())
    students.find({'email':email}, function(err,user){
        if (students.length!==0) {
            console.log('Email already exist, email:' + email)
        }
    })

    studentsArray.push(newStudent)
    fs.writeFileSync(studentsFilePath,JSON.stringify(studentsArray))
    
    response.status(201).send(newStudent)
})

//4
router.put("/:id", (request, response) => {
    const fileContentAsBuffer = fs.readFileSync(studentsFilePath)
    const studentsArray = JSON.parse(fileContentAsBuffer.toString())

    const filteredStudentsArray = studentsArray.filter((student) => student.id !== request.params.id)

    const student = request.body 
    student.id = request.params.id

    filteredStudentsArray.push(student)

    fs.writeFileSync(studentsFilePath, JSON.stringify(filteredStudentsArray))
    response.send("OK")

})
router.delete("/id:", (request, response) => {
    const fileContentAsBuffer = fs.readFileSync(studentsFilePath)
    const studentsArray = JSON.parse(fileContentAsBuffer.toString())

    const filteredStudentsArray = studentsArray.filter((student) => student.id !== request.params.id)
fs.writeFileSync(studentsFilePath, JSON.stringify(filteredStudentsArray))

response.send("OK")
})






module.exports = router


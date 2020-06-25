const express = require("express");
const fs = require("fs-extra");
const path = require("path");
const uniqid = require("uniqid");
const { check, body, validationResult } = require("express-validator");
const router = express.Router();
const multer = require("multer")

const upload = multer({})

const studentsFolderPath = path.join(__dirname, "./photos")

const filePath = path.join(__dirname, "projects.json");
const studentsfilePath = path.join(
  __dirname,
  "../students",
  "students.json"
);
const readFile = (fileName) => {
  const buffer = fs.readFileSync(fileName);
  return JSON.parse(buffer.toString());
};

router.get("/", (request, response, next) => {
  try {
    console.log(studentsfilePath);
    const projects = readFile(filePath);
    response.send(projects);
  } catch (e) {
    e.httpRequestStatusCode = 404;
    next(e);
  }
});

router.post("/:id/uploadphoto", upload.array("multipleAvatar"),
async(req, res, next) => {
  console.log(req.params)
  try {
    const arrayofPromises = req.files.map((file) =>
      fs.writeFile(path.join(studentsFolderPath, file.originalname), file.buffer)
    )
    await Promise.all(arrayofPromises)
    res.send("OK")
  } catch (error) {
    console.log(error)
  }
  
})

router.get("/:id", (request, response, next) => {
  try {
    
    const param = request.params.id;
    const projects = readFile(filePath);
    const project = projects.find((project) => project.id === param);
    response.send(project);
  } catch (e) {
    e.httpRequestStatusCode = 500;
    next(e);
  }
});

router.post(
  "/",
  [
    check("name")
      .exists()
      .withMessage("all fields are required")
      .not()
      .isEmpty()
      .withMessage("Can't be Empty"),
    check("description")
      .exists()
      .withMessage("all fields are required")
      .not()
      .isEmpty()
      .withMessage("Can't be Empty"),
    check("studentID")
      .exists()
      
      // .not()
      // .isEmpty()
      .withMessage("Can't be Empty")
      .custom((id) => {
        const students = readFile(studentsfilePath);

        if (students.filter((student) => student.id === id).length === 0) {
          throw new Error("student doesn't exist");
        }
        return true;
      }),
    check("repoURL")
      .exists()
      .withMessage("all fields are required")
      .not()
      .isEmpty()
      .isURL(),
    check("liveURL")
      .exists()
      .withMessage("all fields are required")
      .not()
      .isEmpty()
      .isURL(),
  ],
  (request, response, next) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }
      const projects = readFile(filePath);
      const newProject = {
        ...request.body,
        id: uniqid(),
        createdAt: new Date(),
      };
      projects.push(newProject);
      fs.writeFileSync(filePath, JSON.stringify(projects));
      response.status(201).send();
    } catch (e) {
      e.httpRequestStatusCode = 500;
      next(e);
    }
  }
);
router.put(
  "/:id",
  [
    check("name")
      .exists()
      .withMessage("all fields are required")
      .not()
      .isEmpty()
      .withMessage("Can't be Empty"),
    check("description")
      .exists()
      .withMessage("all fields are required")
      .not()
      .isEmpty()
      .withMessage("Can't be Empty"),
    check("studentID")
      .exists()
      .withMessage("all fields are required")
      .not()
      .isEmpty()
      .withMessage("Can't be Empty")
      .custom((id) => {
        const students = readFile(studentsfilePath);

        if (students.filter((student) => student.id === id).length === 0) {
          throw new Error("student doesn't exist");
        }
        return true;
      }),
    check("repoURL")
      .exists()
      .withMessage("all fields are required")
      .not()
      .isEmpty()
      .isURL(),
    check("liveURL")
      .exists()
      .withMessage("all fields are required")
      .not()
      .isEmpty()
      .isURL(),
  ],
  (request, response, next) => {
    try {
      const param = request.params.id;
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }
      const projects = readFile(filePath);

      const updatedProjects = projects.map(
        (project) =>
          (project.id === param && { ...request.body, id: param }) || project
      );
      fs.writeFileSync(filePath, JSON.stringify(updatedProjects));
      response.status(201).send(updatedProjects);
    } catch (e) {
      e.httpRequestStatusCode = 500;
      next(e);
    }
  }
);

router.delete("/:id", (request, response, next) => {
  try {
    const param = request.params.id;

    const projects = readFile(filePath);
    const filtered = projects.filter((project) => project.id !== param);
    fs.writeFileSync(filePath, JSON.stringify(filtered));
    response.status(201).send(filtered);
  } catch (e) {
    e.httpRequestStatusCode = 500;
    next(e);
  }
});

module.exports = router;

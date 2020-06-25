const express = require("express")
const fs = require("fs-extra")
const {join} = require("path")
const uniqid = require("uniqid");
const router = express.Router()
const { check, body, validationResult } = require("express-validator");


const projectsFilePath = join(__dirname, "../projects", "projects.json")
//console.log(projectsFilePath)
const reviewsFilePath = join(__dirname, "reviews.json")
//console.log(reviewsFilePath)
const readFile = ((filename) => {
    const buffer = fs.readFileSync(filename)
    return JSON.parse(buffer.toString())
})

/* router.get("/:id", (request, response, next) => {
    try {
      
      const reviews = readFile(reviewsFilePath);
      const review = reviews.filter((review) => review.id === request.params.id);
      response.send(review);
    } catch (e) {
      e.httpRequestStatusCode = 400;
      next(e);
    }
  }); */

  router.get("/", (request, response, next) => {
    try {
      console.log(projectsFilePath);
      const reviews = readFile(reviewsFilePath);
      response.send(reviews);
    } catch (e) {
      e.httpRequestStatusCode = 404;
      next(e);
    }
  });
  
  router.post(
    "/",   [check("projectID")
    .exists()
    .withMessage("all fields are required")
    // .not()
    // .isEmpty()
    .withMessage("Can't be Empty")
    .custom((id) => {
      const projects = readFile(projectsFilePath);
      console.log(projects)

      if (projects.filter((project) => project.id === id).length === 0) {
        throw new Error("project doesn't exist");
      }
      return true;
    })],   
    (request, response, next) => {
      try {    
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
          return response.status(400).json({ errors: errors.array() });
        }
        
        const reviews = readFile(reviewsFilePath);
        const newreview = {
          ...request.body,
          reviewID: uniqid(),
          createdAt: new Date(),
        };
        reviews.push(newreview);
        fs.writeFileSync(reviewsFilePath, JSON.stringify(reviews));
        response.status(201).send();
      } catch (e) {
        e.httpRequestStatusCode = 400;
        next(e);
      }
    }
  );
  
  
  router.delete("/:id", (request, response, next) => {
    try {
      const param = request.params.id;
  
      const reviews = readFile(filePath);
      const filtered = reviews.filter((review) => review.id !== param);
      fs.writeFileSync(filePath, JSON.stringify(filtered));
      response.status(201).send(filtered);
    } catch (e) {
      e.httpRequestStatusCode = 500;
      next(e);
    }
  });
module.exports = router
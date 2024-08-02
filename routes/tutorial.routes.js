module.exports = app => {
    const demos = require("../controllers/demo.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Demo
    router.post("/", demos.create);
  
    // Retrieve all Demo's
    router.get("/", demos.findAll);
  
    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // // Retrieve a single Tutorial with id
    // router.get("/:id", tutorials.findOne);
  
    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);

    app.use('/api/demo', router);
  };
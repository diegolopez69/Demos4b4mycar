module.exports = app => {
    const demos = require("../controllers/demo.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Demo
    router.post("/", demos.create);
  
    // Retrieve all Demo's
    router.get("/", demos.findAll);
  
    // Retrieve a single Demo with id
    router.get("/:id", demos.findOne);
  
    // Update a Demo with id
    router.put("/:id", demos.update);
  
    // Delete a Demo with id
    router.delete("/:id", demos.delete);

    app.use('/api/demo', router);
  };
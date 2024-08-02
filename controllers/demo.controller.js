const db = require("../models");
const Demo = db.demo;

// Create 
exports.create = (req, res) => {
    // Validate request
    if ((!req.body.oficialName) || (!req.body.country) || (!req.body.referenceDemo)) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a demo
    const demo = new Demo({
      oficialName: req.body.oficialName,
      country: req.body.country,
      referenceDemo: req.body.referenceDemo,
      urlPage: req.body.urlPage ? req.body.urlPage : 'No page'
    });
  
    // Save Demo in the database
    demo
      .save(demo)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Demo."
        });
      });
  };

// Retrieve all Demo's from the database.
exports.findAll = (req, res) => {
    const oficialName = req.query.oficialName;
    var condition = oficialName ? { oficialName: { $regex: new RegExp(oficialName), $options: "i" } } : {};
  
    Demo.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving demos."
        });
      });
  };

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Tutorial.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Tutorial with id=" + id });
      });
  };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else res.send({ message: "Tutorial was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Tutorial.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
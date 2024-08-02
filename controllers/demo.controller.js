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
        res.status(201).send(data);
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
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving demos."
        });
      });
  };

// Find a single Demo with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Demo.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found demo with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Demo with id=" + id });
      });
  };

// Update a Demo by the id in the request
exports.update = (req, res) => {
    // Validate request
    if ((!req.body.oficialName) || (!req.body.country) || (!req.body.referenceDemo)) {
      res.status(400).send({ message: "Body can not be empty!" });
      return;
    }

    const id = req.params.id;
  
    Demo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Demo with id=${id}. Maybe Demo was not found!`
          });
        } else res.status(200).send({ message: "Demo was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Demo with id=" + id
        });
      });
  };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Demo.findByIdAndDelete(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Demo with id=${id}. Maybe Demo was not found!`
          });
        } else {
          res.status(200).send({
            message: "Demo was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Demo with id=" + id
        });
      });
  };
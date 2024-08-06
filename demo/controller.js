import Demo from './model.js'

// Create 
export const createDemo = async (req, res) => {
    // Validate request
    const {oficialName, country, referenceDemo, urlPage, question} = req.body 
    if ((!oficialName) || (!country) || (!referenceDemo)) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a demo
    const demo = new Demo({
      oficialName: oficialName,
      country: country,
      referenceDemo: referenceDemo,
      urlPage: urlPage ? urlPage : 'No page',
      question: question
    });
  
    // Save Demo in the database
    try{
      const result = await demo.save()
      res.status(201).json({result: result, data: {oficialName, country, referenceDemo, urlPage, question}});
    }catch(error){
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Demo."
      });
    }
  };

// Retrieve all Demo's from the database.
export const findAllDemo = (req, res) => {
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
export const findOneDemo = (req, res) => {
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
export const updateDemo = (req, res) => {
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

// Delete a Demo with the specified id in the request
export const deleteDemo = (req, res) => {
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
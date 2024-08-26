import Demo from "./model.js";

// Create
export const createDemo = async (req, res) => {
  // Validate request
  const { oficialName, country, referenceDemo, urlPage, question } = req.body;
  if (!oficialName || !country || !referenceDemo) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a demo
  const demo = new Demo({
    oficialName: oficialName,
    country: country,
    referenceDemo: referenceDemo,
    urlPage: urlPage ? urlPage : "No page",
    question: question,
  });

  // Save Demo in the database
  try {
    const result = await demo.save();
    res.status(201).json({ result: result });
  } catch (error) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Demo.",
    });
  }
};

// Retrieve all Demos from the database.
export const findAllDemo = async (req, res) => {
  const { oficialName } = req.query;
  const condition = oficialName
    ? { oficialName: { $regex: new RegExp(oficialName), $options: "i" } }
    : {};

  try {
    const demos = await Demo.find(condition);
    res.status(200).json({ result: demos });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving demos.",
    });
  }
};

// Find a single Demo with an id
export const findOneDemo = async (req, res) => {
  const { id } = req.params;

  try {
    const demo = await Demo.findById(id);

    if (!demo) {
      return res.status(404).send({ message: `Not found demo with id ${id}` });
    }

    res.status(200).json({ result: demo });
  } catch (error) {
    res.status(500).send({
      message: `Error retrieving Demo with id=${id}`,
    });
  }
};

// Update a Demo by the id in the request
export const updateDemo = async (req, res) => {
  // Validate request
  const { oficialName, country, referenceDemo, urlPage, question } = req.body;
  if (!oficialName || !country || !referenceDemo) {
    return res.status(400).send({ message: "Body can not be empty!" });
  }

  const { id } = req.params;

  try {
    const updatedDemo = await Demo.findByIdAndUpdate(
      id,
      { oficialName, country, referenceDemo, urlPage, question },
      { new: true, useFindAndModify: false }
    );

    if (!updatedDemo) {
      return res.status(404).send({
        message: `Cannot update Demo with id=${id}. Maybe Demo was not found!`,
      });
    }

    res
      .status(200)
      .json({ message: "Demo was updated successfully.", result: updatedDemo });
  } catch (error) {
    res.status(500).send({
      message: `Error updating Demo with id=${id}`,
    });
  }
};

// Delete a Demo with the specified id in the request
export const deleteDemo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedDemo = await Demo.findByIdAndDelete(id);

    if (!deletedDemo) {
      return res.status(404).send({
        message: `Cannot delete Demo with id=${id}. Maybe Demo was not found!`,
      });
    }

    res
      .status(200)
      .json({ message: "Demo was deleted successfully!", result: deletedDemo });
  } catch (error) {
    res.status(500).send({
      message: `Could not delete Demo with id=${id}`,
    });
  }
};

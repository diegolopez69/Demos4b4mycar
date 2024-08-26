import { Router } from "express";
import { createDemo, updateDemo, findAllDemo, findOneDemo, deleteDemo } from "./controller.js";

const router = Router()
const demoRouter = (app) => {
// Create a new Demo
router.post("/", createDemo);

// Retrieve all Demo's
router.get("/", findAllDemo);

// Retrieve a single Demo with id
router.get("/:id", findOneDemo);

// Update a Demo with id
router.put("/:id", updateDemo);

// Delete a Demo with id
router.delete("/:id", deleteDemo);

app.use("/demo", router);
}

export default demoRouter;
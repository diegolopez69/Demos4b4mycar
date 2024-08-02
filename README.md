# Demo API Project

This project is a RESTful API built with Node.js, Express, and Mongoose for managing `Demo` entities in a MongoDB database. The API provides endpoints for creating, reading, updating, and deleting `Demo` records.

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:diegolopez69/Demos4b4mycar.git
   cd demo-api
2. Install dependencies:
   ```bash
   npm install
3. Configure the database connection:
- Create a .env file in the root directory and add your MongoDB connection string:
  ```bash
  MONGODB_URI=mongodb://localhost:27017/demos

### Running the Application
1. Start the MongoDB server:
   ```bash
   mongod
2. Start the Node.js server:
   ```bash
   npm start
The server will run on http://localhost:3000.

### API Endpoints
- Create a new Demo
  ```bash
  POST /api/demo
- Retrieve all Demo
  ```bash
  GET /api/demo
- Retrieve a single Demo by ID
  ```bash
  GET /api/demo/:id
- Update a demo by ID
  ```bash
  PUT /api/demo/:id
- Delete a demo by ID
  ```bash
  DELETE /api/demo/:id

### Project Structure
/controllers
  - demo.controller.js
/models
  - demo.model.js
/routes
  - tutorial.routes.js
index.js

### License
This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledments
- Express
- Mongoose

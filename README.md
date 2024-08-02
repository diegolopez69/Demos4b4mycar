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

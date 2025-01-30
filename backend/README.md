# Node.js Final Project

## Overview
This project is a Node.js-based backend for a small business management software for professionals. The software allows users to manage various services, clients, and meetings. The project follows REST API principles, with authentication, roles, and database integration using SQL Server and Sequelize ORM.

## Technologies Used
- **Node.js**: JavaScript runtime for building the server-side application.
- **Sequelize**: ORM for SQL database (SQL Server).
- **Express.js**: Web framework for building the RESTful API.
- **bcrypt**: For hashing passwords securely.
- **JWT**: For token-based authentication.
- **Swagger**: API documentation for easy interaction and testing.
- **ESLint**: Linting for ensuring code quality and consistency.
- **ts-node**: For running the TypeScript server.

## Features Implemented
- **User Authentication**: Users can sign up and sign in. Passwords are hashed using bcrypt.
- **Roles**: Admin users can perform sensitive operations like creating businesses, services, and editing meetings.
- **Database Integration**: The project integrates with an SQL Server database using Sequelize ORM for managing business data, services, users, and meetings.
- **CRUD Operations**: Users can create, update, and delete businesses, services, and meetings.
- **Meeting Validation**: Checks to ensure that no meeting overlaps with another.
- **Swagger Integration**: The project includes Swagger API documentation that provides a visual interface for interacting with the API, testing the endpoints, and viewing detailed information on the API operations.
- **Linting**: ESLint is used to ensure clean and consistent code across the project, with a focus on maintaining best practices and preventing common issues.

## How to Run the Project
### Clone the Repository:
```bash
git clone https://github.com/TehilaShaulzon/node-project.git
cd node-project
```

### Install Dependencies:
```bash
npm install
```

### Configure Environment Variables:
Create a `.env` file at the root of the project and add the following environment variables:

#### Example `.env` file:
```bash
PORT=3000
DB_SERVER=MY_SERVER\SQLEXPRESS
DB_NAME=BusinessDB
JWT_SECRET=exampleSecret123
```

### Run the Project:
To start the server, run:
```bash
npx ts-node app
```
The API will be accessible on [http://localhost:3000](http://localhost:3000).

## API Endpoints
### Users
- **POST** `/signup`: Create a new user (sign up).
- **POST** `/signin`: Log in and obtain a JWT token.

### Business
- **GET** `/business`: Get business details.
- **POST** `/business`: Create a new business (Admin only).
- **PUT** `/business`: Update business details (Admin only).
- **DELETE** `/business`: Delete a business (Admin only).

### Services
- **GET** `/services`: Get a list of services offered.
- **POST** `/services`: Create a new service (Admin only).
- **PUT** `/services`: Update service details (Admin only).
- **DELETE** `/services`: Delete a service (Admin only).

### Meetings
- **GET** `/meetings`: Get a list of meetings.
- **POST** `/meetings`: Create a new meeting.
- **PUT** `/meetings`: Update meeting details (Admin only).
- **DELETE** `/meetings`: Delete a meeting (Admin only).

## Running Tests
To run tests, use the following command:
```bash
npm test
```

## Swagger Documentation
To access the Swagger API documentation, go to:
```bash
http://localhost:3000/docs
```
Swagger provides an interactive interface where you can see the available API endpoints, their methods, and parameters. You can also test each endpoint directly from the UI.

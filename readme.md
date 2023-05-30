# VitaTrack Backend (vitaTrack_BE)

## Description

VitaTrack is an innovative health tracking application that allows users to track various health parameters and store important health-related information. This repository is responsible for the backend part of VitaTrack, handling user data validation, interaction with the database, and exposing necessary APIs to the frontend.

## Features

- Express server setup
- Postgres database interaction with `pg-promise`
- User input validation with `joi`
- Middleware for error handling
- RESTful API endpoints to manage users and health data

## Getting Started

### Prerequisites

You will need the following tools:

- Node.js and npm
- PostgreSQL

### Installation

1. Clone the repository: `git clone <repo-url>`
2. Navigate into the project directory: `cd vitaTrack_BE`
3. Install the dependencies: `npm i`
4. Create the database using: `psql -f db/schema.sql`
5. (Optional) Seed the database: `psql -f db/seed.sql`
6. Start the server: `npm start`

## Project Structure

```bash
├── VitaTrack
│   ├── controllers
│   │   ├── userController.js
│   │   ├── achievementController.js
│   │   ├── allergyController.js
│   │   ├── medicationController.js
│   ├── db
│   │   ├── dbConfig.js
│   │   ├── schema.sql
│   │   ├── seed.sql
│   ├── node_modules
│   ├── queries
│   │   ├── userQueries.js
│   │   ├── achievementQueries.js
│   │   ├── allergyQueries.js
│   │   ├── medicationQueries.js
│   ├── validations
│   │   ├── validateUsers.js
│   │   ├── createUserValidator.js
│   ├── .env
│   ├── .gitignore
│   ├── app.js
│   ├── package-lock.json
│   ├── package.json
│   ├── personal_notes.md
│   ├── README.md
│   ├── server.js
```

## Author

Harold F.

## Collaborators

- Ariunna
- Vandhana
- Joshua
- Diandre
- Keeanu

## License

This project is licensed under the ISC License.

## Acknowledgments

I would like to thank my classmates and instructors for their support and guidance throughout this project.

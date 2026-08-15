# FixMyPG - Apartment / PG Complaint Management System

## Project Description

FixMyPG is an Apartment / PG Complaint Management System that allows residents to submit and manage complaints related to their accommodation.

The system allows users to:

- Submit complaints
- View complaints
- Edit complaints
- Delete complaints
- Search complaints
- Filter complaints by category
- Filter complaints by status
- Change complaint status
- Set complaint priority

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript
- DOM Manipulation
- Fetch API

### Backend
- Node.js
- Express.js
- REST API
- JSON

## Project Structure

FixMyPG/

├── frontend/

│   ├── index.html

│   ├── style.css

│   └── script.js

│

├── backend/

│   ├── server.js

│   ├── package.json

│   └── package-lock.json

│

└── README.md

## How to Run

### 1. Open the backend folder

cd backend

### 2. Install dependencies

npm install

### 3. Start the server

npm start

The server will run on:

http://localhost:4000

### 4. Open the frontend

Open the frontend HTML file in the browser.

### REST API

Create Complaint - POST /complaints

Get All Complaints - GET /complaints

Get One Complaint - GET /complaints/:id

Update Complaint - PUT /complaints/:id

Change Complaint Status - PATCH /complaints/:id/status

Delete Complaint - DELETE /complaints/:id

### COMPLAINT STATUS:

The available complaint statuses are:

- Pending
- In Progress
- Resolved
- Cancelled
- Complaint Categories

The system supports categories such as:

- Electricity
- Plumbing
- Water Supply
- Internet
- Housekeeping
- Maintenance
- Other
- Validation

The application validates:

- Required fields
- Phone number
- Description length
- Complaint category
- Complaint priority
- Complaint status

### ERROR HANDLING  :

The backend uses appropriate HTTP status codes for successful requests and errors, including:

- 200 - Successful request
- 201 - Complaint created
- 400 - Invalid request
- 404 - Complaint not found

### STORAGE 

The current version uses an in-memory JavaScript array for storing complaints.

Data will be cleared when the backend server is restarted.

### API TESTING

The REST APIs were tested using Postman.

Screenshots of API testing are included as part of the project submission.
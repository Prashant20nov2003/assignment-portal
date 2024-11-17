# Assignment Submission Portal

A Node.js Express backend system for managing assignment submissions.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/assignment-portal
   JWT_SECRET=your-secret-key
   ```
4. Start MongoDB service on your machine

5. Start the server:
   ```bash
   npm start
   ```

6. Access Swagger documentation at:
   ```
   http://localhost:3000/api-docs
   ```

## API Endpoints

### User Routes
- POST /api/user/register - Register a new user
- POST /api/user/login - User login
- POST /api/assignment/upload - Upload an assignment
- GET /api/admins - Get all admins

### Admin Routes
- POST /api/admin/register - Register a new admin
- POST /api/admin/login - Admin login
- GET /api/admin/assignments - View assignments
- POST /api/admin/assignments/:id/accept - Accept an assignment
- POST /api/admin/assignments/:id/reject - Reject an assignment

## File Structure

```
assignment-portal/
├── src/
│   ├── controllers/
│   │   ├── userController.js
│   │   └── adminController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Assignment.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── adminRoutes.js
│   └── app.js
├── .env
└── package.json
```

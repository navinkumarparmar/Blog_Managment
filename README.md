# Blog App

A full-stack web application for user authentication and blog management.  
Users can register, login, logout, and perform CRUD operations on blogs.  
Built with Node.js, Express, MongoDB, and JWT authentication.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Running-the-Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [License](#license)

---

## Features
- User Authentication (Register, Login, Logout)
- Create, Read, Update, Delete Blogs
- JWT-based authentication
- Protected routes
- Error handling

---

## Tech Stack
**Backend:**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JSON Web Token (JWT)  
- dotenv  
- body-parser  
- bcrypt  

---

## Installation
Clone the repository:


```bash
git clone https://github.com/navinkumarparmar/Blog_Managment.git


```
 ### frontend start

 cd frontend
 npm install
 npm run dev

 ### backend start

 cd backend
 npm install
 npm run start

 ### ENV 
PORT=3000
MONGO_URL= ""
SecreteKey=""
NODE_ENV ="production" || "development"



### API Documentation

```bash
For detailed API request/response samples and Postman collection, visit:
https://documenter.getpostman.com/view/36242002/2sB3QFRChV

```
 ### API END POINTS

 Auth Routes

 | Method | Endpoint           | Description             | Auth Required |
| ------ | ------------------ | ----------------------- | ------------- |
| POST   | /api/auth/register | Register new user       | No            |
| POST   | /api/auth/login    | Login user              | No            |
| POST   | /api/auth/logout   | Logout user             | Yes           |
| GET    | /api/auth/getOne   | Get logged-in user info | Yes           |

BLOG Routes

| Method | Endpoint         | Description     | Auth Required |
| ------ | ---------------- | --------------- | ------------- |
| POST   | /api/blog/create | Create new blog | Yes           |
| GET    | /api/blog/getAll | Get all blogs   | Yes           |
| GET    | /api/blog/:id    | Get blog by ID  | Yes           |
| PUT    | /api/blog/:id    | Update blog     | Yes           |
| DELETE | /api/blog/:id    | Delete blog     | Yes           |


### License
This project is licensed under the MIT License.


---

## 📌 .gitignore  

```gitignore
# Node modules
node_modules/

# Environment variables
.env

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Build / Coverage
dist/
build/
coverage/

# IDE files
.vscode/
.idea/
.DS_Store

# OS files
Thumbs.db

### Live Demo 
check the hosted backend API: [API Link of Book & Order Management](https://assignment-of-mongoose.vercel.app/)


# 📝 Blog Management Project

A robust backend for a blogging platform with features like secure authentication, role-based access control, and public APIs for viewing, searching, and filtering blogs.

---

## 🚀 Features

### User Roles
- 🛡️ **Admin**
  - Manually created in the database with predefined credentials.
  - Can delete any blog.
  - Can block any user by updating their `isBlocked` property.
  - Cannot update blogs.
- 🛡️ **User**
  - Can register and log in.
  - Can create, update, and delete their own blogs.
  - Cannot perform admin actions.

### Authentication & Authorization
- **Authentication**:
  - Users must log in to perform write, update, and delete operations.
- **Authorization**:
  - Role-based access control for Admin and User roles.

### Blog API
- Public API for viewing blogs with:
  - **Search**: Find blogs by title or content.
  - **Sorting**: Sort blogs by `createdAt`, `title`, or other fields.
  - **Filtering**: Filter blogs by `author`.


---

## 🎯 Technologies Used

- **TypeScript**: Strongly typed JavaScript.
- **Node.js**: Server runtime environment.
- **Express.js**: Web framework for building APIs.
- **Mongoose**: MongoDB object modeling for Node.js.
- **MongoDB**: NoSQL database for data storage.

---

## 📂 API Endpoints

### Blog Routes

| Method | Endpoint        | Description              |
|--------|-----------------|--------------------------|
| POST   | /api/blogs      | Create a new blog.       |
| GET    | /api/blogs      | Get all blog.           |
| PUT    | /api/blogs/:id  | Update a blog by ID.     |
| DELETE | /api/blogs/:id  | Delete a blog by ID.     |

### user Routes

| Method | Endpoint            | Description                      |
|--------|---------------------|----------------------------------|
| POST   | /api/auth/register  | regester a user                  |
| POST    | /api/auth/login     | login a user with bearer token.  |

### Admin Routes

| Method | Endpoint            | Description             |
|--------|---------------------|-------------------------|
| PATCH  | /api/admin/users/:userId/block | block a user |
| DELETE | /api/auth/login     | /api/admin/blogs/:id    |

---



## ⚙️ Installation and Setup

Clone the project

```bash
  git clone : https://github.com/Barkat-Ullah/blog-management
```

Go to the project directory

```bash
  cd assignment-of-mongoose
```

Install dependencies

```bash
  npm install
```
###### 🌍 Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

- `DATABASE_URL: "Enter your database URL" `
- `PORT : 5000`
- `JWT_ACCESS_SECRET: "Enter your jwt-secrect URL" `


Start the server

```bash
  npm run start:dev
```

---

## 🛠️ Project Structure

```plaintext
Book_Management_Backend/
├── src/
│   ├── routes/                  # Route definitions
│   │   ├── auth.routes.ts       # Authentication routes (login, signup)
│   │   ├── user.routes.ts       # User-specific routes
│   │   ├── admin.routes.ts      # Admin-specific routes
│   │   ├── blog.routes.ts       # Blog-related routes
│   ├── controllers/             # Request handlers
│   │   ├── auth.controller.ts   # Handles authentication logic
│   │   ├── user.controller.ts   # Handles user-specific logic
│   │   ├── admin.controller.ts  # Handles admin-specific logic
│   │   ├── blog.controller.ts   # Handles blog post logic
│   ├── models/                  # Mongoose schemas and models
│   │   ├── user.model.ts        # User schema and model
│   │   ├── admin.model.ts       # Admin schema and model
│   │   ├── blog.model.ts        # Blog schema and model
│   ├── interfaces/              # TypeScript interfaces
│   │   ├── user.interface.ts    # User-related interfaces
│   │   ├── admin.interface.ts   # Admin-related interfaces
│   │   ├── blog.interface.ts    # Blog post-related interfaces
│   ├── middlewares/             # Middleware for request processing
│   │   ├── auth.middleware.ts   # Authentication middleware
│   │   ├── admin.middleware.ts  # Admin-only access middleware
│   │   ├── user.middleware.ts   # User-specific middleware
│   ├── utils/                   # Utility functions
│   │   ├── jwt.util.ts          # JSON Web Token helpers
│   │   ├── validation.util.ts   # Input validation helpers
│   ├── app.ts                   # Express app setup
│   └── server.ts                # Server entry point
├── .env.example                 # Example environment variables
├── package.json                 # Project metadata and dependencies
├── README.md                    # Project documentation
└── tsconfig.json                # TypeScript configuration

```

## 📝 Sample API Request and Response
 Create a Blog

Body :
```http
POST /api/blog
Content-Type: application/json
```
```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```
Response : 
```
{
  "success": true,
  "message": "Blog created successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
}

```
## User
Request :
```
POST /api/auth/regester

{
  "email": "john@example.com",
  "password": "securepassword"
}
```
Response : 
```
{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "string"
  }
}
```
## video overview


 visit the demo for better experience this project "Book & Order Manageent 🎥: [Demo](https://drive.google.com/file/d/1H_Kg_2aB4zRINE5ATfdEAP_nBx8kqWGL/view?usp=sharing)





## 🌟 Contact  

**Author**: Barkat Ullah Rakib  
- **GitHub**: [@Barkat-ullah](https://github.com/Barkat-Ullah)  
- **Email**: [barkatullah585464@gmail.com](barkatullah585464@gmail.com)  


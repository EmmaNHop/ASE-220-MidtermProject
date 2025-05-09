# ASE-220 Midterm Project: Greg's List

## Overview

Greg's List is a web application designed to allow users to create, view, and manage posts for jobs, items for sale, and featured content. The project integrates AI-powered tag generation using the Cohere API to enhance post discoverability. It also includes user authentication, dynamic content rendering, and a responsive UI.

## Endpoints

***User Endpoints***

## ***POST*** `/api/users/signup`
- **Description**: Registers a new user.
- **Request Body**

```js
{
  "content": {
    "username": "string",
    "password": "string",
    "email": "string",
    "number": "string",
    "birthday": "string"
  }
}
```

***Response:***
- **Status Code**: 201 Created
- **Body**:

```js
{
  "message": "User created successfully"
}
```

## ***POST*** ```/api/users/signin```
- **Description**: Authenticates a user and returns a token.
- **Request Body**:

```js
{
  "content": {
    "email": "string",
    "password": "string"
  }
}
```

## ***POST*** ```/api/users/signout```
- **Description**: Logs out a user by invalidating their token.
- **Response**:
  - **Status Code:** ```200 OK```
  - Body

```js
{
  "token": "string",
  "user": {
    "email": "string",
    "username": "string",
    "id": "string"
  }
}
```

## ***POST*** ```/api/users/signout```
- **Description**: Logs out a user by invalidating their token.
- **Response**:
- **Status Code**: ```200 OK```

```js
{
  "message": "User signed out successfully"
}
```
------------------------------------------------
**Post Endpoints**

**GET** ```/api/posts```
- **Description**: Retrieves all posts or filtered posts based on query parameters.
- **Response**:
    - **Status Code**: ```200 OK```

```js
[
  {
    "post_title": "string",
    "type": "string",
    "city": "string",
    "state": "string",
    "price": "number",
    "img": "string",
    "post_content": "string",
    "is_job": "boolean",
    "is_featured": "boolean"
  }
]
```

**POST** ```/api/posts/user/:userId/newPost```
- Description: Creates a new post for a user.
- Request Body:

```js
{
  "content": {
    "post_title": "string",
    "type": "string",
    "city": "string",
    "state": "string",
    "price": "number",
    "img": "string",
    "post_content": "string",
    "is_job": "boolean",
    "is_featured": "boolean"
  }
}
```

- **Response**:
    - **Status Code**: ```201 Created```
    - **Body**:

```js
{
  "message": "Post created successfully"
}
```

**GET** ```/api/posts/user/:userId```
- **Description**: Retrieves all posts created by a specific user.
- **Response**:
    - **Status Code**: ```200 OK```
    - **Body**:

```js
[
  {
    "post_title": "string",
    "type": "string",
    "city": "string",
    "state": "string",
    "price": "number",
    "img": "string",
    "post_content": "string",
    "is_job": "boolean",
    "is_featured": "boolean"
  }
]
```
------------------------------------------------
Tag Endpoints
POST ```/api/tags/create```
- **Description**: Generates tags for a user post using the Cohere AI API.
- **Request Body**:

```js
{
  "content": {
    "post_content": "string"
  }
}
```

- ***Response***:
    - **Status Code**: ```201 Created```
    - **Body**:

```js
{
  "tags": ["keyword1", "keyword2", "keyword3"]
}
```

***GET*** ```/api/tags```
- **Description:** Retrieves all tags stored in the system.
- **Response**:
    - **Status Code**: ``200 OK``
    -  **Body**:
    
```js
[
  "tag1",
  "tag2",
  "tag3"
]
```

------------------------------------------------

### **Test User**
To test the application, you can use the following credentials:

 - **User**: ```test@user.com```
 - **Password**: ```!123ABC!```

------------------------------------------------

### **Scope of the Project**
1. Core Features:

    - User authentication (sign-up, sign-in, sign-out).
    - Post creation and retrieval.
    - AI-powered tag generation using the Cohere API.

2. Dynamic Content:

    - Posts and tags are dynamically rendered on the frontend.

3. Responsive Design:

    - The application is designed to work across various devices.

------------------------------------------------

### **Future Improvements**
If we had more time, we would implement the following features:

1. Better UI:

    - Improve the user interface for a more modern and intuitive experience.

2. Static Routes:

    - Implement static routes for serving frontend pages and assets more efficiently.

3. Comments:

    - Add a commenting system for posts to increase user engagement.

4. Search and Filtering:

    - Allow users to search and filter posts by tags, location, or price.

5. Better Error Handling:

    - Improve error handling for API calls and user input validation.

6. Performance Optimization:

    - Implement caching for frequently accessed data to improve performance.

7. Pagination:

     - Add pagination for posts and tags to handle large datasets.

## **How to Run**
1. Clone the repository:

    `git clone https://github.com/your-repo/ASE-220-MidtermProject.git`

2. Navigate to the project directory:

    `cd ASE-220-MidtermProject/webroot/server`

3. Install dependencies:
    `npm install`

Set up environment variables in .env:
- `PORT:` The port number for the server.
- `COHERE_API_KEY:` Your Cohere API key.
- `DB:` MongoDB connection string.
- `JWT_SECRET_KEY:` Secret key for JWT authentication.
5. Start the server:

`npm start`

6. Access the application at `http://localhost:3000.`

## **Conclusion**
This project demonstrates the integration of AI-powered tag generation with a backend API. It provides a foundation for managing posts and tags and can be extended with additional features to enhance functionality and user experience.
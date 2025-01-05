# /users/register

Register a new user.

- **Method:** POST
- **Route:** `/users/register`
- **Request Body:**
  ```
  {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "password": "secretpass"
  }
  ```
- **Response:**
  - **201:** Returns a JWT token and the created user object.
  - **400:** Validation errors.
  - **500:** Server error.

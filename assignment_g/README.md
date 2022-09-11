# Assignment G

## Tasks

### Version 1

Set up a new nodejs project and do the following:

- Create a new server (index.js)

- Establish the following routes inside index.js using the specified method:

  - Users:

    - createUser - POST

    - authenticateUser - POST

    - getAllUsers - GET

  - Books:

    - Create - POST

    - Delete - DELETE

    - LoanOut - POST

    - Return - POST

    - Update - PUT

### Version 2

Improve the assignment by expanding the functionality of each route, use filesystem as a database with NodeJS file handling module. All routes must be authenticated. Ensure tests are written for each route.

- Users:

  - createUser - register a new user of two types

    - Admin

    - Visitor

  - authenticateUser - authenticate a user (login)

  - getAllUsers - return all users (should only be available to admin users)

- Books:

  - Create - Admin user can create a new bookDelete - Admin user can delete a new book

  - LoanOut - visitor can request for a book (check that the book is available)
  
  - Return - visitor can return a loaned bookUpdate - admin user can update a book

Visiting a route that doesn't exist should return a 404

<details>
<summary> Development </summary>

Run `npm install` to install dependencies used, then run `npm start dev` to start the devlopment server on `http://localhost:3030/`

</details>

# ROUTES

This document outlines the data structure for the endpoints

### `/register` route

To create a user, send a `POST` request to the `/register` route. The body will contain a json with properties indicated as following:

```json
{
  "firstName": "first name",
  "lastName": "last name",
  "username": "username",
  "password": "user password",
  "email": "user email"
}
```

New users have a default role of `standard`

### `/login` route

To log in, send a `POST` request to the `/login` route. The body will contain a json with key `userDetails`. This includes the username with key `username` and password with key `password`

```json
{
  "userDetails": {
    "username": "username",
    "password": "user password"
  }
}
```

### `/users` route

<details>
<summary> :sunglasses: </summary>
This route is only accessible to users with the `admin` role
</details>

To get all users, send a `GET` request to the `/users` route. The body will contain a json with key `userDetails`. This includes the username with key `username` and password with key `password`

```json
{
  "userDetails": {
    "username": "admin username",
    "password": "admin user password"
  }
}
```

### `/books/add` route

<details>
<summary> :sunglasses: </summary>
This route is only accessible to users with the `admin` role
</details>

To add books, send a `POST` request to the `/books/add` route. The body will contain a json with two keys `userDetails` and `books` respectively. The value of `userDetails` is an object which includes the username with key `username` and password with key `password`.

The value of `books` is an array with object(s) containing details for the book(s) to add. 

```json
{
  "userDetails": {
    "username": "admin username",
    "password": "admin user password"
  },
  "books": [
    {
      "title": "book title",
      "author": "book author",
      "year": "year book published"
    }
  ]
}
```

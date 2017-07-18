Users
====

### GET /users/search
Returns list of users who's username or name match the query. If the user has opted to hide their name, then they are only queried by username.

Requires Auth: no

#### Required Parameters
`q`

String to query usernames and names with.

#### Example Request
```
curl http://localhost:9000/users/search?q=test
```

#### Example Response
`HTTP 200`

```json
[
  {
    "_id": "596d2092f5f07e3d03fccb11",
    "username": "Des",
    "userId": "auth0|58c6c7733d778f6e3000cd13",
    "picture": "https://balanceappdev.s3.amazonaws.com/bf033da7-fbb0-4390-8147-0615afd7c5b8.JPG",
    "name": "balanceapp.test@gmail.com",
    "friends": [
      {
        "userId": "auth0|59639a9bc08f0b3183ed3eec",
        "status": "requested"
      }
    ]
  }
]
```

====

### GET /users/:userId
Retrieves detailed user info for `userId`.

Requires Auth: yes

#### Example Request
```
curl http://localhost:9000/users/search?q=test
```

#### Example Response
`HTTP 200`

```json
[
  {
    "_id": "596d2092f5f07e3d03fccb11",
    "username": "Des",
    "userId": "auth0|58c6c7733d778f6e3000cd13",
    "picture": "https://balanceappdev.s3.amazonaws.com/bf033da7-fbb0-4390-8147-0615afd7c5b8.JPG",
    "name": "balanceapp.test@gmail.com",
    "friends": [
      {
        "userId": "auth0|59639a9bc08f0b3183ed3eec",
        "status": "requested"
      }
    ]
  }
]
```

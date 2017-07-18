Users
====

### GET /users/search
Returns list of users who's username or name match the query. If the user has opted to hide their name, then they are only queried by username.

#### Requires Auth:
no

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

### GET /users/:userId
Retrieves detailed user info for `userId`.

#### Requires Auth:
yes

#### Example Request
```
curl http://localhost:9000/users/auth0%7C58c6c7733d778f6e3000cd13
```

#### Example Response
`HTTP 200`

```json
{
  "_id": "596d2092f5f07e3d03fccb11",
  "lastUpdated": "2017-07-17T20:43:06.812Z",
  "username": "Des",
  "userId": "auth0|58c6c7733d778f6e3000cd13",
  "email": "balanceapp.test@gmail.com",
  "picture": "https://balanceappdev.s3.amazonaws.com/bf033da7-fbb0-4390-8147-0615afd7c5b8.JPG",
  "name": "balanceapp.test@gmail.com",
  "createdAt": "2017-07-17T20:43:06.812Z",
  "hideName": false,
  "friends": [
    {
      "userId": "auth0|59639a9bc08f0b3183ed3eec",
      "status": "requested"
    }
  ],
  "__v": 0,
  "project_count": 1,
  "bookmark_count": 0
}
```

### GET /users/:userId/friends
Retrieves friends for `userId`

#### Requires Auth:
yes

#### Optional Parameters
`status`

The status of the friend request.

#### Example Request
```
curl http://localhost:9000/users/auth0%7C58c6c7733d778f6e3000cd13/friends?status=requested
```

#### Example Response
`HTTP 200`

```json
[
  {
    "_id": "596d2145f5f07e3d03fccb13",
    "username": "despreston@gmail.com",
    "userId": "auth0|59639a9bc08f0b3183ed3eec",
    "picture": "https://s.gravatar.com/avatar/be00bb412cf3d75b08416ea69b58ae88?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fde.png",
    "name": "despreston@gmail.com"
  }
]
```

### GET /users/:userId/friends
Retrieves friends for `userId`

#### Requires Auth:
yes

#### Optional Parameters
`status`

The status of the friend request.

#### Example Request
```
curl http://localhost:9000/users/auth0%7C58c6c7733d778f6e3000cd13/friends?status=requested
```

#### Example Response
`HTTP 200`

```json
[
  {
    "_id": "596d2145f5f07e3d03fccb13",
    "username": "despreston@gmail.com",
    "userId": "auth0|59639a9bc08f0b3183ed3eec",
    "picture": "https://s.gravatar.com/avatar/be00bb412cf3d75b08416ea69b58ae88?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fde.png",
    "name": "despreston@gmail.com"
  }
]
```

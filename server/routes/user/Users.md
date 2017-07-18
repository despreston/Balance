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

---

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

---

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

---

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

---

### GET /users/:userId/bookmarks
Retrieves bookmarked projects for `userId`

#### Requires Auth:
yes


#### Example Request
```
curl http://localhost:9000/users/auth0%7C58c6c7733d778f6e3000cd13/bookmarks
```

#### Example Response
`HTTP 200`

```json
[
  {
    "_id": "596d2e73b992e447484f429c",
    "lastUpdated": "2017-07-17T21:39:07.274Z",
    "createdAt": "2017-07-17T21:39:07.274Z",
    "title": "Test Project",
    "user": "auth0|59639a9bc08f0b3183ed3eec",
    "privacyLevel": "global",
    "description": "Something",
    "__v": 0,
    "category": "Other",
    "nudges": [],
    "status": "active",
    "Future": null,
    "Past": {
      "_id": "596d2e7bb992e447484f429d",
      "lastUpdated": "2017-07-17T21:39:07.263Z",
      "createdAt": "2017-07-17T21:39:07.263Z",
      "user": "auth0|59639a9bc08f0b3183ed3eec",
      "project": {
        "_id": "596d2e73b992e447484f429c",
        "title": "Test Project",
        "privacyLevel": "global"
      },
      "content": "Did some work",
      "type": "Past",
      "__v": 0,
      "reactions": [],
      "author": {
        "_id": "596d2145f5f07e3d03fccb13",
        "username": "despreston@gmail.com",
        "userId": "auth0|59639a9bc08f0b3183ed3eec",
        "picture": "https://s.gravatar.com/avatar/be00bb412cf3d75b08416ea69b58ae88?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fde.png",
        "id": "596d2145f5f07e3d03fccb13"
      },
      "commentCount": 0,
      "id": "596d2e7bb992e447484f429d"
    },
    "nudgeUsers": null,
    "owner": [
      {
        "_id": "596d2145f5f07e3d03fccb13",
        "username": "despreston@gmail.com",
        "userId": "auth0|59639a9bc08f0b3183ed3eec",
        "id": "596d2145f5f07e3d03fccb13"
      }
    ],
    "id": "596d2e73b992e447484f429c"
  }
]
```

---

### POST /users/:userId/friends/:friend
Creates a new friend request or accepts an existing friend request between :userId and :friend. Responds with both updated users. If the users were already friends, it responds with a blank array.

#### Requires Auth:
yes

#### Example Request
```
curl -X POST http://localhost:9000/auth0%7C58c6c7733d778f6e3000cd13/friends/auth0|59639a9bc08f0b3183ed3eec'
```

#### Example Response
`HTTP 200`

```json
[
  {
    "__v": 1,
    "lastUpdated": "2017-07-18T17:45:12.166Z",
    "createdAt": "2017-07-18T17:45:12.166Z",
    "_id": "596d2092f5f07e3d03fccb11",
    "username": "Des",
    "userId": "auth0|58c6c7733d778f6e3000cd13",
    "picture": "https://balanceappdev.s3.amazonaws.com/bf033da7-fbb0-4390-8147-0615afd7c5b8.JPG",
    "name": "balanceapp.test@gmail.com",
    "hideName": false,
    "friends": [
      {
        "status": "pending",
        "userId": "auth0|59639a9bc08f0b3183ed3eec"
      }
    ],
    "project_count": 1,
    "bookmark_count": 1
  },
  {
    "__v": 1,
    "lastUpdated": "2017-07-18T17:45:12.172Z",
    "createdAt": "2017-07-18T17:45:12.172Z",
    "_id": "596d2145f5f07e3d03fccb13",
    "username": "despreston@gmail.com",
    "userId": "auth0|59639a9bc08f0b3183ed3eec",
    "picture": "https://s.gravatar.com/avatar/be00bb412cf3d75b08416ea69b58ae88?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fde.png",
    "name": "despreston@gmail.com",
    "friends": [
      {
        "status": "requested",
        "userId": "auth0|58c6c7733d778f6e3000cd13"
      }
    ],
    "project_count": 1,
    "bookmark_count": 0
  }
]
```

---

### DELETE /users/:userId/friends/:friend
Removes any friendship regardless of status.

#### Requires Auth:
yes

#### Example Request
```
curl -X DELETE http://localhost:9000/auth0%7C58c6c7733d778f6e3000cd13/friends/auth0|59639a9bc08f0b3183ed3eec'
```

#### Example Response
`HTTP 200`

```json
[
  {
    "__v": 1,
    "lastUpdated": "2017-07-18T17:53:21.683Z",
    "createdAt": "2017-07-18T17:53:21.683Z",
    "_id": "596d2092f5f07e3d03fccb11",
    "username": "Des",
    "userId": "auth0|58c6c7733d778f6e3000cd13",
    "picture": "https://balanceappdev.s3.amazonaws.com/bf033da7-fbb0-4390-8147-0615afd7c5b8.JPG",
    "name": "balanceapp.test@gmail.com",
    "hideName": false,
    "friends": [],
    "project_count": 1,
    "bookmark_count": 1
  },
  {
    "__v": 1,
    "lastUpdated": "2017-07-18T17:53:21.685Z",
    "createdAt": "2017-07-18T17:53:21.685Z",
    "_id": "596e422d6494dd01b8ea314d",
    "username": "Des",
    "userId": "twitter|15740537",
    "picture": "https://pbs.twimg.com/profile_images/579124755392962560/G_z-2pJz_normal.jpg",
    "name": "Des",
    "hideName": false,
    "friends": [],
    "project_count": 0,
    "bookmark_count": 0
  }
]
```

---

### POST /users
Upserts user

#### Requires Auth:
yes

#### Example Request
```
curl -X POST http://localhost:9000/auth0%7C58c6c7733d778f6e3000cd13 \
-d \
  '{
    "identities": [
      {
        "provider": "auth0",
        "social": 0,
        "userId": "58c6c7733d778f6e3000cd13",
        "connection": "Username-Password-Authentication",
        "identityId": "auth0|58c6c7733d778f6e3000cd13"
      }
    ],
    "userId": "auth0|58c6c7733d778f6e3000cd13",
    "email": "balanceapp.test@gmail.com",
    "userMetadata": {},
    "name": "balanceapp.test@gmail.com",
    "nickname": "balanceapp.test",
    "appMetadata": {},
    "createdAt": 1489422195.73
  }'
```

#### Example Response
`HTTP 201`

```json
{
  "_id": "596d2092f5f07e3d03fccb11",
  "lastUpdated": "2017-07-18T17:53:21.683Z",
  "username": "Des",
  "userId": "auth0|58c6c7733d778f6e3000cd13",
  "email": "balanceapp.test@gmail.com",
  "picture": "https://balanceappdev.s3.amazonaws.com/bf033da7-fbb0-4390-8147-0615afd7c5b8.JPG",
  "name": "balanceapp.test@gmail.com",
  "createdAt": "1970-01-18T05:43:42.195Z",
  "__v": 0,
  "hideName": false,
  "friends": [],
  "project_count": 1,
  "bookmark_count": 1
}
```

---

### PUT /users/:userId
Updates user :userId

#### Requires Auth:
yes

#### Optional Parameters
`username`
user name for user. Think of this as a display name.

`email`
Email address

`picture`
URL for user picture

`bio`
Small bio displayed in the user profile

`hideName`
Show or hide the name. If true, a username is required in lieue of a name.

#### Example Request
```
curl -X PUT http://localhost:9000/auth0%7C58c6c7733d778f6e3000cd13 \
-d \
'{
  "_id": "596d2092f5f07e3d03fccb11",
  "lastUpdated": "2017-07-18T18:10:07.999Z",
  "username": "Des",
  "userId": "auth0|58c6c7733d778f6e3000cd13",
  "email": "balanceapp.test@gmail.com",
  "picture": "https://balanceappdev.s3.amazonaws.com/20a945a1-48d0-4056-84cd-aff18695a6c0.JPG",
  "name": "balanceapp.test@gmail.com",
  "createdAt": "1970-01-18T05:43:42.195Z",
  "__v": 0,
  "hideName": true,
  "friends": [],
  "project_count": 1,
  "bookmark_count": 1
}'
```

#### Example Response
`HTTP 200`

```json
{
  "_id": "596d2092f5f07e3d03fccb11",
  "lastUpdated": "2017-07-18T18:12:34.716Z",
  "username": "Des",
  "userId": "auth0|58c6c7733d778f6e3000cd13",
  "email": "balanceapp.test@gmail.com",
  "picture": "https://balanceappdev.s3.amazonaws.com/8f71bd73-7f6e-4856-817a-b878782a4749.JPG",
  "name": "balanceapp.test@gmail.com",
  "createdAt": "1970-01-18T05:43:42.195Z",
  "__v": 0,
  "hideName": true,
  "friends": [],
  "project_count": 1,
  "bookmark_count": 1
}
```

Notes
====

### GET notes/:_id/reactions
Retrieves reactions for note `_id`

#### Requires Auth
yes

#### Example Request
```
curl http://localhost:9000/notes/596e5a0e05a622123419b751/reactions
```

#### Example Response
`HTTP 200`

```json
[
  {
    "_id": "596e5a28757c8e1263bcca8a",
    "createdAt": "2017-07-18T18:57:44.049Z",
    "reaction": "😉",
    "note": "596e5a0e05a622123419b751",
    "__v": 0,
    "user": {
      "_id": "596d2092f5f07e3d03fccb11",
      "username": "Des",
      "userId": "auth0|58c6c7733d778f6e3000cd13",
      "picture": "https://balanceappdev.s3.amazonaws.com/8f71bd73-7f6e-4856-817a-b878782a4749.JPG"
    }
  }
]
```

---

### GET /notes/global_activity
Retrieves all notes with privacy level 'global' and all notes belonging to friends or authenticated user with the privacy level 'friends'.

#### Requires Auth
optional

#### Optional Parameters
`skip`
Skip the first x results

`limit`
Limit the # of results

#### Example Request
```
curl http://localhost:9000/notes/global_activity
```

#### Example Response
`HTTP 200`

```json
[
  {
    "_id": "596d2e7bb992e447484f429d",
    "lastUpdated": "2017-07-17T21:39:07.263Z",
    "createdAt": "2017-07-17T21:39:07.263Z",
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
      "picture": "https://s.gravatar.com/avatar/be00bb412cf3d75b08416ea69b58ae88?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fde.png"
    },
    "commentCount": 0,
    "id": "596d2e7bb992e447484f429d"
  }
]
```

---

### GET /notes/friend_activity
Retrieves all notes belonging to friends or authenticated user with privacy level of 'global' or 'friends'

#### Requires Auth
yes

#### Optional Parameters
`skip`
Skip the first x results

`limit`
Limit the # of results

#### Example Request
```
curl http://localhost:9000/notes/friend_activity
```

#### Example Response
`HTTP 200`

```json
[
  {
    "_id": "596d2e7bb992e447484f429d",
    "lastUpdated": "2017-07-17T21:39:07.263Z",
    "createdAt": "2017-07-17T21:39:07.263Z",
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
      "picture": "https://s.gravatar.com/avatar/be00bb412cf3d75b08416ea69b58ae88?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fde.png"
    },
    "commentCount": 0,
    "id": "596d2e7bb992e447484f429d"
  }
]
```

---

### GET /notes/:_id
Retrieves full details for a note

#### Requires Auth
yes

#### Example Request
```
curl http://localhost:9000/notes/596e5a0e05a622123419b751
```

#### Example Response
`HTTP 200`

```json
{
  "_id": "596e5a0e05a622123419b751",
  "lastUpdated": "2017-07-18T18:57:18.005Z",
  "createdAt": "2017-07-18T18:57:18.005Z",
  "user": "auth0|58c6c7733d778f6e3000cd13",
  "project": {
    "_id": "596d20c5f5f07e3d03fccb12",
    "title": "Test Project",
    "privacyLevel": "global"
  },
  "content": "Test",
  "type": "Future",
  "__v": 0,
  "reactions": [
    {
      "_id": "596e5a28757c8e1263bcca8a",
      "reaction": "😉",
      "userId": "auth0|58c6c7733d778f6e3000cd13"
    }
  ],
  "comments": [],
  "author": {
    "_id": "596d2092f5f07e3d03fccb11",
    "username": "Des",
    "userId": "auth0|58c6c7733d778f6e3000cd13",
    "picture": "https://balanceappdev.s3.amazonaws.com/8f71bd73-7f6e-4856-817a-b878782a4749.JPG"
  },
  "commentCount": 0,
  "id": "596e5a0e05a622123419b751"
}
```

---

### GET /notes
Retrieves collection of notes

#### Requires Auth
yes

#### Optional Parameters
`type`
Find by type

`content`
Find by content

`project`
Find by project

`user`
Find by user

#### Example Request
```
curl http://localhost:9000/notes?user=auth0%7C58c6c7733d778f6e3000cd13
```

#### Example Response
`HTTP 200`

```json
[
  {
    "_id": "596e5a0e05a622123419b751",
    "lastUpdated": "2017-07-18T18:57:18.005Z",
    "createdAt": "2017-07-18T18:57:18.005Z",
    "project": {
      "_id": "596d20c5f5f07e3d03fccb12",
      "title": "Test Project",
      "privacyLevel": "global"
    },
    "content": "Test",
    "type": "Future",
    "__v": 0,
    "reactions": [
      {
        "_id": "596e5a28757c8e1263bcca8a",
        "reaction": "😉",
        "userId": "auth0|58c6c7733d778f6e3000cd13"
      }
    ],
    "author": {
      "_id": "596d2092f5f07e3d03fccb11",
      "username": "Des",
      "userId": "auth0|58c6c7733d778f6e3000cd13",
      "picture": "https://balanceappdev.s3.amazonaws.com/8f71bd73-7f6e-4856-817a-b878782a4749.JPG"
    },
    "commentCount": 0,
    "id": "596e5a0e05a622123419b751"
  }
]
```

---

### POST /notes/:_id/reactions
Creates a new reaction for a note. Responds with the note that the reaction was saved to.

#### Requires Auth
yes

#### Required Parameters
`reaction`
Reaction string

#### Example Request
```
curl -X POST \
http://localhost:9000/notes/596e5a0e05a622123419b751/reaction \
-d \
  '{
    "reaction": "😇"
  }'
```

#### Example Response
`HTTP 200`

```json
{
  "_id": "596e5a0e05a622123419b751",
  "lastUpdated": "2017-07-18T18:57:18.005Z",
  "createdAt": "2017-07-18T18:57:18.005Z",
  "project": {
    "_id": "596d20c5f5f07e3d03fccb12",
    "title": "Test Project",
    "privacyLevel": "global"
  },
  "content": "Test",
  "type": "Future",
  "__v": 0,
  "reactions": [
    {
      "_id": "596e5f777e17ab13ffc0f86d",
      "reaction": "😇",
      "userId": "auth0|58c6c7733d778f6e3000cd13"
    }
  ],
  "author": {
    "_id": "596d2092f5f07e3d03fccb11",
    "username": "Des",
    "userId": "auth0|58c6c7733d778f6e3000cd13",
    "picture": "https://balanceappdev.s3.amazonaws.com/8f71bd73-7f6e-4856-817a-b878782a4749.JPG"
  },
  "commentCount": 0,
  "id": "596e5a0e05a622123419b751"
}
```

---

### POST /notes
Creates a note.

#### Requires Auth
yes

#### Required Parameters
`type`
Type of the note. Either 'Future' or 'Past'

`content`
The content of the note

`project`
The project _id that the note belongs to.

#### Optional Parameters
`picture`
URL of picture for note

#### Example Request
```
curl -X POST \
http://localhost:9000/notes \
-d \
  '{
    "project": "596d20c5f5f07e3d03fccb12",
    "content": "Test",
    "type": "Future"
  }'
```

#### Example Response
`HTTP 200`

```json
  {
    "_id": "596e604d096d37143f85d87a",
    "lastUpdated": "2017-07-18T19:23:57.298Z",
    "createdAt": "2017-07-18T19:23:57.298Z",
    "user": "auth0|58c6c7733d778f6e3000cd13",
    "project": {
      "_id": "596d20c5f5f07e3d03fccb12",
      "title": "Test Project",
      "privacyLevel": "global"
    },
    "content": "Test",
    "type": "Future",
    "__v": 0,
    "reactions": [],
    "comments": [],
    "author": {
      "_id": "596d2092f5f07e3d03fccb11",
      "username": "Des",
      "userId": "auth0|58c6c7733d778f6e3000cd13",
      "picture": "https://balanceappdev.s3.amazonaws.com/8f71bd73-7f6e-4856-817a-b878782a4749.JPG"
    },
    "commentCount": 0,
    "id": "596e604d096d37143f85d87a"
  }
```

---

### PUT /notes/:_id
Updates a note

#### Requires Auth
yes

#### Optional Parameters
`type`
The note type: Future or Past

`content`
Note content

#### Example Request
```
curl -X PUT \
http://localhost:9000/notes/596e604d096d37143f85d87a \
-d \
  '{
    "_id": "596e604d096d37143f85d87a",
    "type": "Past"
  }'
```

#### Example Response
`HTTP 200`

```json
  {
    "_id": "596e604d096d37143f85d87a",
    "lastUpdated": "2017-07-18T19:23:57.298Z",
    "createdAt": "2017-07-18T19:23:57.298Z",
    "user": "auth0|58c6c7733d778f6e3000cd13",
    "project": {
      "_id": "596d20c5f5f07e3d03fccb12",
      "title": "Test Project",
      "privacyLevel": "global"
    },
    "content": "Test",
    "type": "Past",
    "__v": 0,
    "reactions": [],
    "comments": [],
    "author": {
      "_id": "596d2092f5f07e3d03fccb11",
      "username": "Des",
      "userId": "auth0|58c6c7733d778f6e3000cd13",
      "picture": "https://balanceappdev.s3.amazonaws.com/8f71bd73-7f6e-4856-817a-b878782a4749.JPG"
    },
    "commentCount": 0,
    "id": "596e604d096d37143f85d87a"
  }
```

---

### DELETE /notes/:_id/picture
Deletes a note's picture from the note document and also removes from s3 storage.

#### Requires Auth
yes

#### Example Request
```
curl -X DELETE http://localhost:9000/notes/596e604d096d37143f85d87a/picture
```

#### Example Response
`HTTP 204`

```json
  {
    "_id": "596e6023e0825f143493e12a",
    "lastUpdated": "2017-07-18T19:48:05.788Z",
    "createdAt": "2017-07-18T19:23:15.837Z",
    "user": "auth0|58c6c7733d778f6e3000cd13",
    "project": {
      "_id": "596d20c5f5f07e3d03fccb12",
      "title": "Test Project",
      "privacyLevel": "global"
    },
    "content": "Test",
    "type": "Future",
    "__v": 0,
    "reactions": [],
    "comments": [],
    "author": {
      "_id": "596d2092f5f07e3d03fccb11",
      "username": "Des",
      "userId": "auth0|58c6c7733d778f6e3000cd13",
      "picture": "https://balanceappdev.s3.amazonaws.com/8f71bd73-7f6e-4856-817a-b878782a4749.JPG"
    },
    "commentCount": 0,
    "id": "596e6023e0825f143493e12a"
  }
```

---

### DELETE /notes/:_id
Deletes a note. If the note has a picture, it removes that from s3 as well.

#### Requires Auth
yes

#### Example Request
```
curl -X DELETE http://localhost:9000/notes/596e604d096d37143f85d87a
```

#### Example Response
`HTTP 204`

```json
[]
```

# Balance
A platform for managing and sharing personal progress.

[![Codeship Status for despreston/Balance](https://app.codeship.com/projects/85799e90-db62-0134-2f95-72ee877a79e5/status?branch=master)](https://app.codeship.com/projects/204010)

### First Install
#### Requires:
- NodeJS v8.2.1
- Xcode (latest)

#### Db
Install Mongo
```
brew install mongodb
```

Create directory for database data
```
sudo mkdir -p /data/db
```

Start mongo service
```
mongod
```

#### Server
```
cd /server/
npm i
node index.js
```

#### iOS App
```
cd /client/BalanceApp/
npm i
npm i -g react-native
npm i -g react-native-cli
react-native run-ios
```

### Clear and Reinstall all packages
Clears database and installs all dependencies. THIS WILL CLEAR YOUR DATA

Run from /Balance

```
./clean.sh
```

Note: if you get an error about permission denied. Run `chmod +x clean.sh` then try step 1 again.

### Communication with Piper-Socket
Balance sends notifications over websockets by POSTing notifications to a server called Piper-Socket. More info about Piper-Socket is available in the readme for that repo. Piper-Socket config info is available to change in config.json. Piper-Socket (and websocket notifications) are optional when running Balance.

### IOS Push Notifications
Push notifications through APN require certificates. The location of these certifications can be set in config.json.

### Code-Push
The Balance IOS app uses Code Push (https://microsoft.github.io/code-push/) to hot push updates.

If a new version if released on the app store, it MUST also be released on code-push. Otherwise, code-push will override the app store version.

To release to production on code-push
```
code-push release-react -m -d Production Balance ios
```

### DB Backup

Create backup of database on remote machine.
```
cd /var/backups/Balance/
mongodump --db balance --out <OUTPUT_PATH>
```

Compress
```
tar -czf ./<OUTPUT_PATH>.tgz ./<OUTPUT_PATH>
```

Download backup
```
scp <HOST>:/var/backups/Balance/<OUTPUT_PATH>.tgz
```

Eventually this needs to be cleaned up and automated. The backup should be deleted from the production machine.

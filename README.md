# Balance
A platform for managing and sharing personal progress.

[![Codeship Status for despreston/Balance](https://app.codeship.com/projects/85799e90-db62-0134-2f95-72ee877a79e5/status?branch=master)](https://app.codeship.com/projects/204010)

### First Install
#### Requires:
- NodeJS v8.1.2
- Xcode (latest)

#### Db
1. `brew install mongodb`
2. `sudo mkdir -p /data/db`
3. `mongod`

#### Server
1. `cd /server/`
1. `npm i`
2. `node` OR to run with logging enabled, `NODE_DEBUG=<log level(s)> node` e.g `NODE_DEBUG=info node`

#### iOS App
1. `cd /client/BalanceApp/`
2. `npm i`
3. `npm i -g react-native`
4. `npm i -g react-native-cli`
5. `react-native run-ios`
6. Optionally (to see console output): `react-native log-ios`

### Fresh Update
Clears database and installs all dependencies. THIS WILL CLEAR YOUR DATA

1. Run `./clean.sh` in root directory '/Balance'. 

Note: if you get an error about permission denied. Run `chmod +x clean.sh` then try step 1 again.

### Run

1. run `node index` in /server. This starts the server. Leave this open.
2. Separately, run `react-native run-ios` in /client/BalanceApp. This starts the xcode simulator and the iOS app.

### Communication with Piper-Socket
Balance sends notifications over websockets by POSTing notifications to a server called Piper-Socket. More info about Piper-Socket is available in the readme for that repo. Piper-Socket config info is available to change in config.json. Piper-Socket (and websocket notifications) are optional when running Balance.

### IOS Push Notifications
Push notifications through APN require certificates. The location of these certifications can be set in config.json.

### Code-Push
The Balance IOS app uses Code Push (https://microsoft.github.io/code-push/) to hot push updates. 

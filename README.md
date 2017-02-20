# Balance
A platform for managing and sharing personal progress.

### Install/Run
#### Requires:
NodeJS v6.9.x
Xcode (latest)

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

### Fresh Run
Clears database and installs all dependencies. THIS WILL CLEAR YOUR DATA

1. Run `./clean.sh` in root directory '/Balance'. 

Note: if you get an error about permission denied. Run `chmod +x clean.sh` then try step 1 again.

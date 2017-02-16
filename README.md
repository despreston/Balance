# Balance
A platform for managing and sharing personal progress.

### Install/Run
#### Requires:
NodeJS v6.9.x
Xcode (latest)

#### Db
1. `brew install mongodb`
2. `mkdir -p /data/db`
3. `mongod`

#### Server
1. `cd /server/`
1. `npm i`
2. `node` OR to run with logging enabled, `NODE_DEBUG=<log level(s)> node` e.g `NODE_DEBUG=info node`

#### iOS App
1. `cd /client/BalanceApp/`
2. `npm i`
3. `react-native run-ios`
4. Optionally (to see console output): `react-native log-ios`

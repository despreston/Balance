#!/bin/bash

# Exit on failures
set -e 

cd server || echo 'Failed to find server directory'

node utils/clear-db.js && echo 'Cleared DB' || echo 'Failed to clear DB'

npm i && echo 'Installed server packages' || echo 'Failed to install server packages'

cd ..
cd client/BalanceApp/ || echo 'Failed to find client/BalanceApp directory'

npm i && echo 'Installed iOS packages' || echo 'Failed to install iOS packages'

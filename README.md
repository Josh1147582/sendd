# sendd

sendd allows for direct connections between clients to transfer files. It uses peer.js to assign each an ID, and connect them directly without the need for a file hosting server.

sendd also ships with peer-server, meaning it's completely separate from the peer.js main servers, and doesn't require an API key.

### To install (assuming nodejs and npm are installed):
    
    git clone https://github.com/Josh1147582/sendd
    cd sendd
    npm install
    npm start

Or build and run the docker container at:

    https://github.com/Josh1147582/sendd-docker
    
### Usage:

Connect to the server (by default) at localhost:3000. Port 9000 must also be open for the peer server to communicate with clients.

# TODO:

Progression indicator
SSL support
Distributed system support (many outlets supporting one ID source)
UI improvements
Mobile support, either through an app or easier web access
Standalone Desktop client?
QR codes, rather than ID numbers
Words for ID names, rather than ID numbers (suggested by Adelphius)

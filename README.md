# sendd

sendd allows for direct connections between clients to transfer files. It uses peer.js to assign each an ID, and connect them directly without the need for a file hosting server.

sendd also ships with peer-server, meaning it's completely separate from the peer.js main servers, and doesn't require an API key.

To install:
    Install npm and nodejs
    Run:
    git clone https://github.com/Josh1147582/sendd
    cd sendd
    npm install
    npm start

    Or build and run the docker container at:
    https://github.com/Josh1147582/sendd-docker
    
Usage:
    Connect to the server (by default) at localhost:3000. Port 9000 must also be open for the peer server to communicate with clients.

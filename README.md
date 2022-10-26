# GovSend
A proxy to access Twilio APIs. This project contains a Java Twilio client that sends all requests over a node.js proxy server.

## Setup
Set up the server:
```bash
# Clone the repository:
git clone git@github.com:cweems/govsend.git

# Install Maven depdencies and build project:
mvn package

# Create a copy of the .env file:
cp .env.example .env

# Edit your .env file to include your Account SID and Auth Token.

# Server setup:
cd server
npm install
npm run start

# Server will log out the following message:
# Listning for incoming connections on 0.0.0.0:443
```

To test, run `src/main/java/org/govsend/Main.java`. You should receive an SMS.

# Create a Real-time JavaScript Spreadsheet with React and TypeScript using Jspreadsheet

The Jspreadsheet Server extension is a JavaScript plugin that enhances Jspreadsheet by enabling real-time data sharing and persistence. This web-socket-based service, hosted on your server, allows multiple users to collaborate interactively on the same spreadsheet. It ensures that all data remains entirely under your control, providing a secure and efficient way to manage collaborative editing and viewing spreadsheet data.

## Prerequisites
- Git
- Docker
- Node.js and npm

## Setup

### Clone the project:

git clone https://github.com/jspreadsheet/spreadsheet-react-server.git

### Start the server:
Navigate to the project directory and start the server:

cd spreadsheet-react-server\
docker-compose up


### Start the client:
Open a new terminal, navigate to the client directory, install dependencies, and start the client:

cd spreadsheet-react-server/app\
npm install\
npm run start

### Access the application:
Open your browser and go to `http://localhost:3000`.

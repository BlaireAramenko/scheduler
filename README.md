# Interview Scheduler

The Interview Scheduler is a single page application (SPA) built using React, that allows users to book and cancel interviews in real-time. We combine a concise API with a WebSocket server to build a seamless user experience.

## Technical Specifications

- React
- Webpack, Babel
- Axios, WebSockets
- Storybook, Webpack Dev Server, Jest, Testing Library
- The Scheduler client application created using Create React App.
- Express is the basis for the Scheduler API server application.
- Both servers run concurrently; requests are proxied from the Webpack development server to the API server.

## Setup

To set up the project locally, follow these steps:

1. Clone this repository to your local machine 
2. Install the dependencies using npm install
3. Start the Webpack Development Server using npm start
4. Open the browser and navigate to http://localhost:8000/

## Screenshots

![Scheduler main page](https://github.com/BlaireAramenko/scheduler/blob/master/images/scheduler-mainpage.png)

![Delete message](https://github.com/BlaireAramenko/scheduler/blob/master/images/delete-message.png)
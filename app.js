

const express = require('express');
const http = require("http");
const { Socket } = require('socket.io');

const PORT = process.env.PORT || 3000;         //port path given 

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.static("public"));            

app.get("/",(req,res) => {
    res.sendFile(__dirname + "/public/index.html");
});

let connectedPeers = [];  // storing array of connected user in array
io.on('connection', (socket) => {
   connectedPeers.push(socket.id);
   console.log(connectedPeers); 
                                            
                                           /* This code is setting up a Socket.IO connection and creating an array called `connectedPeers` to
                                            store the IDs of connected users. When a user connects to the server, their socket ID is added to
                                            the `connectedPeers` array and the array is logged to the console. When a user disconnects from the
                                            server, their socket ID is removed from the `connectedPeers` array using the `filter()` method and
                                            the updated array is logged to the console. */

   socket.on('disconnect', () => {
    console.log("user disconnected");

    const newConnectedPeers = connectedPeers.filter((peerSocketId) => {
         peerSocketId !== socket.id;
    });
    connectedPeers = newConnectedPeers;
    console.log(connectedPeers);

   });
});


server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);         // for starting the server
});


/* This is a Node.js server-side code that creates a web server using the Express framework and
Socket.IO library. It listens for incoming connections on a specified port (either the environment
variable PORT or 3000 by default), serves static files from the "public" directory, and handles a
GET request to the root URL ("/") by sending the "index.html" file. It also sets up a Socket.IO
connection and logs a message when a user connects to the server. Finally, it starts the server and
logs a message indicating the port it is listening on. */


const express = require('express');
const http = require("http");
const { connect } = require('http2');
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
                        
 
    socket.on("pre-offer", (data) => {
        console.log('pre-offer-came');
        const { calleePersonalCode, callType } = data;
         
        const connectedPeer = connectedPeers.find((peerSocketId) => 
            peerSocketId === calleePersonalCode
        );
        if (connectedPeer) {
            const data = {
                callerSocketID: socket.id,
                callType,
            };
        

            io.to(calleePersonalCode).emit("pre-offer", data);
        
        };
    });
    
    
    
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



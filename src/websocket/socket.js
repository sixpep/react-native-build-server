var app = require("../../app");
var http = require("http");

var server = http.createServer(app);
var io = require("socket.io")(server);

var data = [];

// Function to push a random number to the data array every 2 seconds
setInterval(() => {
  const randomNumber = Math.floor(Math.random() * 100); // Generate a random number
  data.push(randomNumber); // Push it to the data array
  console.log("New random number added:", randomNumber);

  // Emit the updated data to all connected clients
  io.emit("message", data);
}, 2000); // 2000 milliseconds = 2 seconds

io.on("connection", (socket) => {
  console.log("New user connected to the socket");

  socket.emit("message", data);

  socket.on("message", (message) => {
    console.log("Message received : ", message);
  });
});

server.listen(3001);

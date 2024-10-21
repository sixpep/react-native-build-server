const connectSocket = (io) => {
  var data = [];
  // Function to push a random number to the data array every 2 seconds
  setInterval(() => {
    if (data.length < 20) {
      const randomNumber = Math.floor(Math.random() * 100); // Generate a random number
      data.push(randomNumber); // Push it to the data array
      console.log("New random number added:", randomNumber);

      // Emit the updated data to all connected clients
      io.emit("message", data);
      console.log(data.length);
    }
  }, 2000); // 2000 milliseconds = 2 seconds

  io.on("connection", (socket) => {
    console.log("New user connected to the socket");

    socket.emit("message", data);

    socket.on("message", (message) => {
      console.log("Message received : ", message);
    });
  });
};

module.exports = { connectSocket };

var app = require("express")();
var socket = require("socket.io");

const server = app.listen(5000, function() {
	console.log("server is running on port 5000");
});

const io = socket(server);

io.on("connection", (socket) => {
	socket.on("SEND_MESSAGE", function(data) {
		io.emit("RECEIVE_MESSAGE", data);
	});
});

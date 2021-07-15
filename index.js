const moment = require("moment");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// HTTP Server
const app = express();
const server = http.createServer(app);

app.use(express.static("./frontend"));

// Socket server
const io = new Server(server);

io.on("connection", socket => {
	var username = "Desconhecido";
	console.log("Um usuário se conectou");

	socket.on("set_name", name => {
		username = name;
		socket.broadcast.emit("user_enter", username);
	});

	socket.on("disconnect", () => {
		console.log("Um usuário se desconectou");
		socket.broadcast.emit("user_exit", username);
	});

	socket.on("chat_message", ({ msg, date }) => {
		io.emit("chat_message", {
			username,
			msg,
			date: moment(date).format("DD/MM/YYYY HH:mm:ss")
		});
	});
});

server.listen(3000, () => {
	console.log("Servidor rodando na porta 3000");
});

// Socket client
var socket = io();

var messages = document.getElementById("messages");
var form = document.getElementById("form");
var input = document.getElementById("input");

var userName = prompt("Digite o seu nome de usuário:");
if (userName)
	socket.emit("set_name", userName);

form.addEventListener("submit", e => {
	e.preventDefault();
	if (input.value) {
		socket.emit("chat_message", { msg: input.value, date: new Date() });
		input.value = "";
		input.focus();
	}
});

socket.on("chat_message", ({ username, msg, date }) => {
	var item = document.createElement("li");
	item.innerHTML = `<b>${username}:</b> <span>${msg}</span> <small>${date}</small>`;
	messages.appendChild(item);
	window.scrollTo(0, document.body.scrollHeight);
});

socket.on("user_enter", username => {
	var item = document.createElement("li");
	item.classList.add("system_msg");
	item.innerHTML = `<div><b>${username}</b> entrou na sala</div>`;
	messages.appendChild(item);
	window.scrollTo(0, document.body.scrollHeight);
});

socket.on("user_exit", username => {
	var item = document.createElement("li");
	item.classList.add("system_msg");
	item.innerHTML = `<div><b>${username}</b> saiu da sala</div>`;
	messages.appendChild(item);
	window.scrollTo(0, document.body.scrollHeight);
});

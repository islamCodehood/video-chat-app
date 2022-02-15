const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

app.use(cors());

app.get("/", (req, res) => {
	res.send("server is running");
});

io.on("connection", (socket) => {
	socket.emit("me", socket.id);
	socket.on("disconnect", () => socket.broadcast.emit("callEnded"));
	socket.on("callUser", ({ userToCall, signal, from, name }) => {
		io.to(userToCall).emit("callUser", { signal, from, name });
	});
	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal);
	});
});

server.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});

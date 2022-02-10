const app = require('express')();
//const server = require('http').createServer(app);
const cors = require('cors')
const PORT = process.env.PORT || 3333

const server = app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

app.use(cors())


app.get('/', (req, res) => {
    res.send("server is running")
})


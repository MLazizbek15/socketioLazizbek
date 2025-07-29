
const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

io.on("connect", (socket) => {
    socket.on("newhabar", (d) => {
        const VaqtHabar = {
            text: d.text, from: socket.id, date: new Date().toLocaleString("uz-UZ")
        }

        if (d.guruh) {
            io.to(d.guruh).emit("habar", VaqtHabar)
        } else {
            io.emit("habar", VaqtHabar)
        }
    })

    socket.on("join-guruh", (d) => {
        socket.join(d)
    })

    socket.on("left-guruh", (d) => {
        socket.leave(d)
    })
})


app.use(cors())

app.use(cors())

app.get("/", (req, res) => {
    res.json({ message: "home page" })
})

server.listen(3000, () => {
    console.log("Server is running on 3000 port");
})
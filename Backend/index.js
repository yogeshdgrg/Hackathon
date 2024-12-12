const express = require("express")
const { Server } = require("socket.io")
const { createServer } = require("http")
const { connectMongoDB } = require("./db")
const postRouter = require("./routes/post.route")
const userRouter = require("./routes/user.route")
require("dotenv").config()
const cors = require("cors")

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 8000

connectMongoDB(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDb Connected...")
  })
  .catch((err) => {
    console.log("Failed to connect MongoDb...")
  })

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST","DELETE","PATCH"],
    credentials: true,
  })
)

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  },
})

app.use("/post", postRouter)
app.use("/user",userRouter)

io.on("connection", (socket) => {
  console.log("User is connected ...", socket.id)
})

server.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`)
})

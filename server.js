import express from "express"
import cors from "cors"
import usersRoute from "./routes/usersRoute.js"

const server = express()
const port = process.env.PORT ?? 8000

// use cors
server.use(cors())

server.use(express.json())

server.use('/users', usersRoute)

server.get('/', (req, res) => {
    res.send('Hello World! ...')
})

// alternativ 404
server.all("*", (req, res) => {
    res.send("Nothing to see 404")
})

server.listen( port, () => {
    console.log(`Server listening on port ${port}`)
})

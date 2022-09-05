import express from 'express'
import cors from 'cors'
import usersRoute from './routes/usersRoute.js'
import booksRoute from './routes/booksRoute.js'
import { connectingToColligereDB } from './dbConnections.js'

const server = express()
const port = process.env.PORT ?? 8000

// use cors
server.use(cors())

process.on('uncaughtException', function (err) {
	console.log(err)
}) 

server.use(express.json())

server.use('/users', usersRoute)

server.use('/books', booksRoute)

server.get('/', (req, res) => {
	res.send('Hello World! ...')
})

// alternativ 404
server.all('*', (req, res) => {
	res.send('Nothing to see 404')
})

try {
	const db = await connectingToColligereDB()
	await db.authenticate()
	console.log('Connection has been established successfully.')
} catch (error) {
	console.error('Unable to connect to the database:', error)
}

server.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})

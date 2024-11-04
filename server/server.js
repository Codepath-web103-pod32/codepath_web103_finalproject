import './config/dotenv.js'
import express from 'express'
import cors from 'cors'
import clubsRouters from './routes/clubs-routers.js'
import eventsRouters from './routes/events-routers.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/clubs', clubsRouters)
app.use('/api/events', eventsRouters)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log('Server listening on port: ', PORT)
})
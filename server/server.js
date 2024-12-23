import './config/dotenv.js'
import express from 'express'
import cors from 'cors'
import path from 'path'

import passport from 'passport'
import session from 'express-session'
import { GitHub } from './config/auth.js'

import clubsRouters from './routes/clubs-routers.js'
import eventsRouters from './routes/events-routers.js'
import categoriesRouters from './routes/categories-routers.js'
import locationsRouters from './routes/locations-routers.js'
import usersRouters from './routes/users-routers.js'

import authRoutes from './routes/auth-routers.js'

const app = express()

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: 'GET,POST,PUT,DELETE,PATCH',
  credentials: true
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(GitHub)
passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})

app.use('/auth', authRoutes)
app.use('/api/clubs', clubsRouters)
app.use('/api/events', eventsRouters)
app.use('/api/categories', categoriesRouters)
app.use('/api/locations', locationsRouters)
app.use('/api/profile', usersRouters)

const PORT = process.env.PORT || 3003

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('public'))
}

if (process.env.NODE_ENV === 'production') {
  app.get('/*', (_, res) =>
      res.sendFile(path.resolve('public', 'index.html'))
  )
}

app.listen(PORT, () => {
  console.log('Server listening on port: ', PORT)
})
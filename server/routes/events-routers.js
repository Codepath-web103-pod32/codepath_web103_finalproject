import express from 'express'
import eventsControllers from '../controllers/events-controllers.js'

const router = express.Router()

router.get('/', eventsControllers.getEvents)
router.get('/available', eventsControllers.getAvailableEvents)
router.get('/:eventId', eventsControllers.getEventById)
router.get('/category/:categoryId', eventsControllers.getEventsByCategoryId)
router.get('/location/:locationId', eventsControllers.getEventsByLocationId)
// router.get('/search/:searchName', eventsControllers.searchEventsByName)

export default router
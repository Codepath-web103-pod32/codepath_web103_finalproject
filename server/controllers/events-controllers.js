import pool from '../config/database.js'

const getEvents = async (_, res) => {
  try {
    //ChauPhan: query events
    const results = await pool.query('SELECT * FROM events ORDER BY id ASC')

    //ChauPhan: query images to each event
    const promises = results.rows.map(async (event) => {
      const selectImagesQuery = `
        SELECT
          images.id,
          images.name,
          images.url,
          images.taken_date
        FROM images
        JOIN event_images
        ON event_images.image_id = images.id
        WHERE event_images.event_id = $1
      `
      await pool.query(selectImagesQuery, [event.id])
        .then(res => res.rows)
        .then(res => {
          event.images = res
        })
    })
    await Promise.all(promises)
    res.status(200).json(results.rows)
  } catch (err) {
    console.error('get Events error: ', err)
    res.status(409).json({error: err})
  }
}

const getEventById = async (req, res) => {
  try {
    const eventId = req.params.eventId
    //ChauPhan: query event by Id
    const selectQuery = `
      SELECT
        events.id,
        events.name,
        events.start_time,
        events.end_time,
        events.description,
        events.capacity,
        events.registered,
        events.club_organizer
      FROM events
      WHERE events.id = $1
    `
    const result = await pool.query(selectQuery, [eventId])
    const eventResult = result.rows[0]

    //ChauPhan: query locations for the event
    const selectLocationsQuery = `
      SELECT
        locations.id,
        locations.name,
        locations.address
      FROM locations
      JOIN event_locations
      ON event_locations.location_id = locations.id
      WHERE event_locations.event_id = $1
    `
    const locations = await pool.query(selectLocationsQuery, [eventId])
    const locationResults = locations.rows
    eventResult.locations = locationResults

    //ChauPhan: query categories for the event
    const selectCategoriesQuery = `
      SELECT
        categories.id,
        categories.name,
        categories.description
      FROM categories
      JOIN event_categories
      ON event_categories.category_id = categories.id
      WHERE event_categories.event_id = $1
    `
    const categories = await pool.query(selectCategoriesQuery, [eventId])
    const categoriesResults = categories.rows
    eventResult.categories = categoriesResults

    //ChauPhan: query images for the event
    const selectImagesQuery = `
      SELECT
        images.id,
        images.name,
        images.url,
        images.taken_date
      FROM images
      JOIN event_images
      ON event_images.image_id = images.id
      WHERE event_images.event_id = $1
    `
    const images = await pool.query(selectImagesQuery, [eventId])
    const imagesResults = images.rows
    eventResult.images = imagesResults

    //ChauPhan: query all clubs organizing the event
    eventResult.clubs = [eventResult.club_organizer]

    //ChauPhan: send the final event result
    res.status(200).json(eventResult)
  } catch (err) {
    console.error('get Event by Id error: ', err)
    res.status(409).json({error: err})
  }
}

const getEventsByCategoryId = async (req, res) => {
  const categoryId = req.params.categoryId
  try {
    //ChauPhan: query events by category Id
    const selectEventsQuery = `
      SELECT
        events.id,
        events.name,
        events.start_time,
        events.end_time,
        events.description,
        events.capacity,
        events.registered,
        events.club_organizer
      FROM events
      JOIN event_categories
      ON event_categories.event_id = events.id
      WHERE event_categories.category_id = $1
      ORDER BY id ASC
    `
    const results = await pool.query(selectEventsQuery, [categoryId])

    //ChauPhan: query images to each event
    const promises = results.rows.map(async (event) => {
      const selectImagesQuery = `
        SELECT
          images.id,
          images.name,
          images.url,
          images.taken_date
        FROM images
        JOIN event_images
        ON event_images.image_id = images.id
        WHERE event_images.event_id = $1
      `
      await pool.query(selectImagesQuery, [event.id])
        .then(res => res.rows)
        .then(res => {
          event.images = res
        })
    })
    await Promise.all(promises)
    
    //ChauPhan: send the final event results
    res.status(200).json(results.rows)
  } catch (err) {
    console.error('get Events By Category Id error: ', err)
    res.status(409).json({error: err})
  }
}

const getEventsByLocationId = async (req, res) => {
  const locationId = req.params.locationId
  try {
    //ChauPhan: query events by location Id
    const selectEventsQuery = `
      SELECT
        events.id,
        events.name,
        events.start_time,
        events.end_time,
        events.description,
        events.capacity,
        events.registered,
        events.club_organizer
      FROM events
      JOIN event_locations
      ON event_locations.event_id = events.id
      WHERE event_locations.location_id = $1
      ORDER BY id ASC
    `
    const results = await pool.query(selectEventsQuery, [locationId])
    
    //ChauPhan: query images for each event
    const promises = results.rows.map(async (event) => {
      const selectImagesQuery = `
        SELECT
          images.id,
          images.name,
          images.url,
          images.taken_date
        FROM images
        JOIN event_images
        ON event_images.image_id = images.id
        WHERE event_images.event_id = $1
      `
      await pool.query(selectImagesQuery, [event.id])
        .then(res => res.rows)
        .then(res => {
          event.images = res
        })
    })
    await Promise.all(promises)

    //ChauPhan: send the final event results
    res.status(200).json(results.rows)
  } catch (err) {
    console.error('get Events By Location Id error: ', err)
    res.status(409).json({error: err})
  }
}

const getAvailableEvents = async (_, res) => {
  try {
    //ChauPhan: query all available events
    const selectEventsQuery = `
      SELECT *
      FROM events
      WHERE events.capacity > events.registered
        AND events.start_time > NOW()
      ORDER BY id ASC
    `
    const results = await pool.query(selectEventsQuery)

    //ChauPhan: query images for each event
    const promises = results.rows.map(async (event) => {
      const selectImagesQuery = `
        SELECT
          images.id,
          images.name,
          images.url,
          images.taken_date
        FROM images
        JOIN event_images
        ON event_images.image_id = images.id
        WHERE event_images.event_id = $1
      `
      await pool.query(selectImagesQuery, [event.id])
        .then(res => res.rows)
        .then(res => {
          event.images = res
        })
    })
    await Promise.all(promises)

    //ChauPhan: send the final event results
    res.status(200).json(results.rows)
  } catch (err) {
    console.error('get Available Events error: ', err)
    res.status(409).json({error: err})
  }
}

const searchEventsByName = async (req, res) => {
  const searchName = req.params.searchName
  try {
    //ChauPhan: query events by name using pg_trgm extension
    const selectEventsQuery = `
      SELECT *
      FROM events
      ORDER BY STRICT_WORD_SIMILARITY(name, $1) DESC
      LIMIT 5;
    `
    const results = await pool.query(selectEventsQuery, [searchName])

    //ChauPhan: query images for each event
    const promises = results.rows.map(async (event) => {
      const selectImagesQuery = `
        SELECT
          images.id,
          images.name,
          images.url,
          images.taken_date
        FROM images
        JOIN event_images
        ON event_images.image_id = images.id
        WHERE event_images.event_id = $1
      `
      await pool.query(selectImagesQuery, [event.id])
        .then(res => res.rows)
        .then(res => {
          event.images = res
        })
    })
    await Promise.all(promises)

    //ChauPhan: send the final event results
    res.status(200).json(results.rows)
  } catch (err) {
    console.error('Seach Events by Name error: ', err)
    res.status(409).json({error: err})
  }
}

const registerEventUser = async (req, res) => {
  // ChauPhan:
  // TODO:
  // - check if events.registered < events.capacity
  try {
    const eventId = parseInt(req.params.eventId)
    const { githubId } = req.body

    const createQuery = `
      INSERT INTO event_users (event_id, github_id)
      VALUES ($1, $2)
      RETURNING *;
    `
    const updateEventQuery = `
      UPDATE events
      SET registered = registered + 1
      WHERE id = $1
      RETURNING *;
    `

    const results = await pool.query(createQuery, [eventId, githubId])
    const event = await pool.query(updateEventQuery, [eventId])

    res.status(200).json(event.rows[0])
  } catch (err) {
    console.error('Register Event error: ', err)
    res.status(409).json({error: err})
  }
}

const unregisterEventUser = async (req, res) => {
  const { githubId } = req.body
  try {
    const eventId = parseInt(req.params.eventId)
    const { githubId } = req.body

    const deleteQuery = `
      DELETE FROM event_users
      WHERE event_id = $1
        AND github_id = $2;
    `
    const updateEventQuery = `
      UPDATE events
      SET registered = registered - 1
      WHERE id = $1;
    `
    const results = await pool.query(deleteQuery, [eventId, githubId])
    const event = await pool.query(updateEventQuery, [eventId])

    res.status(200).json(results.rows[0])
  } catch (err) {
    console.error('Unregistered Event error: ', err)
    res.status(409).json({error: err})
  }
}

const getEventsByUserGithubId = async (req, res) => {
  const githubId = req.query.githubId
  try {
    //ChauPhan: query events by user github_id
    const selectEventsQuery = `
      SELECT
        events.id,
        events.name,
        events.start_time,
        events.end_time,
        events.description,
        events.capacity,
        events.registered,
        events.club_organizer
      FROM events
      JOIN event_users
      ON event_users.event_id = events.id
      WHERE event_users.github_id = $1
      ORDER BY id ASC
    `
    const results = await pool.query(selectEventsQuery, [githubId])
    
    //ChauPhan: query images for each event
    const promises = results.rows.map(async (event) => {
      const selectImagesQuery = `
        SELECT
          images.id,
          images.name,
          images.url,
          images.taken_date
        FROM images
        JOIN event_images
        ON event_images.image_id = images.id
        WHERE event_images.event_id = $1
      `
      await pool.query(selectImagesQuery, [event.id])
        .then(res => res.rows)
        .then(res => {
          event.images = res
        })
    })
    await Promise.all(promises)

    //ChauPhan: send the final event results
    res.status(200).json(results.rows)

  } catch (err) {
    console.error('Get Events by Users Id error: ', err)
    res.status(409).json({error: err})
  }

}

export default {
  getEvents,
  getEventById,
  getEventsByCategoryId,
  getEventsByLocationId,
  getAvailableEvents,
  searchEventsByName,
  registerEventUser,
  unregisterEventUser,
  getEventsByUserGithubId,
}
import pool from '../config/database.js'

const getEvents = async (_, res) => {
  try {
    const results = await pool.query('SELECT * FROM events ORDER BY id ASC')
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
    const selectQuery = `
      SELECT
        events.id,
        events.name,
        events.start_time,
        events.end_time,
        events.description,
        events.capacity,
        events.registered
      FROM events
      WHERE events.id = $1
    `
    const result = await pool.query(selectQuery, [eventId])
    const eventResult = result.rows[0]

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

    const selectClubQuery = `
      SELECT
        clubs.id,
        clubs.name
      FROM clubs
      JOIN club_events
      ON club_events.club_id = clubs.id
      WHERE club_events.event_id = $1
    `
    const clubs = await pool.query(selectClubQuery, [eventId])
    const clubsResults = clubs.rows
    eventResult.clubs = clubsResults

    console.log(eventResult)
    res.status(200).json(eventResult)
  } catch (err) {
    console.error('get Event by Id error: ', err)
    res.status(409).json({error: err})
  }
}

const getEventsByCategoryId = async (req, res) => {
  const categoryId = req.params.categoryId
  try {
    const selectEventsQuery = `
      SELECT
        events.id,
        events.name,
        events.start_time,
        events.end_time,
        events.description,
        events.capacity,
        events.registered
      FROM events
      JOIN event_categories
      ON event_categories.event_id = events.id
      WHERE event_categories.category_id = $1
      ORDER BY id ASC
    `
    const results = await pool.query(selectEventsQuery, [categoryId])
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
    console.error('get Events By Category Id error: ', err)
    res.status(409).json({error: err})
  }
}

const getEventsByLocationId = async (req, res) => {
  const locationId = req.params.locationId
  try {
    const selectEventsQuery = `
      SELECT
        events.id,
        events.name,
        events.start_time,
        events.end_time,
        events.description,
        events.capacity,
        events.registered
      FROM events
      JOIN event_locations
      ON event_locations.event_id = events.id
      WHERE event_locations.location_id = $1
      ORDER BY id ASC
    `
    const results = await pool.query(selectEventsQuery, [locationId])
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
    console.error('get Events By Location Id error: ', err)
    res.status(409).json({error: err})
  }
}

const getAvailableEvents = async (_, res) => {
  try {
    const selectEventsQuery = `
      SELECT *
      FROM events
      WHERE events.capacity > events.registered
      ORDER BY id ASC
    `
    const results = await pool.query(selectEventsQuery)
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
    console.error('get Available Events error: ', err)
    res.status(409).json({error: err})
  }
}

const searchEventsByName = async (req, res) => {
  const searchName = req.params.searchName
  try {
    const selectEventsQuery = `
      SELECT *
      FROM events
      ORDER BY STRICT_WORD_SIMILARITY(name, $1) DESC
      LIMIT 5;
    `
    const results = await pool.query(selectEventsQuery, [searchName])
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
    console.error('Seach Events by Name error: ', err)
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
}
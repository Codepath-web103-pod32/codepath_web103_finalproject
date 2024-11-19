import pool from '../config/database.js'

const getClubs = async (_, res) => {
  try {
    //ChauPhan: query all clubs
    const results = await pool.query('SELECT * FROM clubs ORDER BY id ASC')

    //ChauPhan: query images for each club
    const promises = results.rows.map(async (club) => {
      const selectImagesQuery = `
        SELECT
          images.id,
          images.name,
          images.url,
          images.taken_date
        FROM images
        JOIN club_images
        ON club_images.image_id = images.id
        WHERE club_images.club_id = $1
      `
      await pool.query(selectImagesQuery, [club.id])
        .then(res => res.rows)
        .then(res => {
          club.images = res
        })
    })
    await Promise.all(promises)

    //ChauPhan: send the final club results
    res.status(200).json(results.rows)
  } catch (err) {
    console.error('get Clubs error: ', err)
    res.status(409).json({error: err})
  }
}

const getClubById = async (req, res) => {
  try {
    const clubId = req.params.clubId
    //ChauPhan: query club by Id
    const selectQuery = `
      SELECT
        clubs.id,
        clubs.name,
        clubs.description,
        clubs.email
      FROM clubs
      WHERE clubs.id = $1
    `
    const result = await pool.query(selectQuery, [clubId])
    const clubResult = result.rows[0]

    //ChauPhan: query locations for the club
    const selectLocationsQuery = `
      SELECT
        locations.id,
        locations.name,
        locations.address
      FROM locations
      JOIN club_locations
      ON club_locations.location_id = locations.id
      WHERE club_locations.club_id = $1
    `
    const locations = await pool.query(selectLocationsQuery, [clubId])
    const locationResults = locations.rows
    clubResult.locations = locationResults

    //ChauPhan: query categories for the club
    const selectCategoriesQuery = `
      SELECT
        categories.id,
        categories.name,
        categories.description
      FROM categories
      JOIN club_categories
      ON club_categories.category_id = categories.id
      WHERE club_categories.club_id = $1
    `
    const categories = await pool.query(selectCategoriesQuery, [clubId])
    const categoriesResults = categories.rows
    clubResult.categories = categoriesResults

    //ChauPhan: query images for the club
    const selectImagesQuery = `
      SELECT
        images.id,
        images.name,
        images.url,
        images.taken_date
      FROM images
      JOIN club_images
      ON club_images.image_id = images.id
      WHERE club_images.club_id = $1
    `
    const images = await pool.query(selectImagesQuery, [clubId])
    const imagesResults = images.rows
    clubResult.images = imagesResults

    //ChauPhan: query boardMembers for the club
    const selectBoardMembersQuery = `
      SELECT
        board_members.id,
        board_members.fullname,
        board_members.introduction,
        board_members.email
      FROM board_members
      JOIN club_board_members
      ON club_board_members.board_member_id = board_members.id
      WHERE club_board_members.club_id = $1
    `
    const boardMembers = await pool.query(selectBoardMembersQuery, [clubId])
    const boardMembersResults = boardMembers.rows
    clubResult.boardMembers = boardMembersResults

    // ChauPhan: query all events organized by the club
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
      WHERE events.club_organizer = $1
    `
    const events = await pool.query(selectEventsQuery, [clubId])
    const eventsResults = events.rows
    //ChauPhan: add images to each events organized by the club
    const promises = eventsResults.map(async (event) => {
      const selectImagesEventQuery = `
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
      await pool.query(selectImagesEventQuery, [event.id])
        .then(res => res.rows)
        .then(res => {
          event.images = res
        })
    })
    await Promise.all(promises)

    clubResult.events = eventsResults

    //ChauPhan: send the final club result
    res.status(200).json(clubResult)
  } catch (err) {
    console.error('get Club by Id error: ', err)
    res.status(409).json({error: err})
  }
}

const getClubsByCategoryId = async (req, res) => {
  const categoryId = req.params.categoryId
  try {
    //ChauPhan: query clubs by category Id
    const selectClubsQuery = `
      SELECT
        clubs.id,
        clubs.name,
        clubs.description,
        clubs.email
      FROM clubs
      JOIN club_categories
      ON club_categories.club_id = clubs.id
      WHERE club_categories.category_id = $1
      ORDER BY id ASC
    `
    const results = await pool.query(selectClubsQuery, [categoryId])

    //ChauPhan: query images for each club
    const promises = results.rows.map(async (club) => {
      const selectImagesQuery = `
        SELECT
          images.id,
          images.name,
          images.url,
          images.taken_date
        FROM images
        JOIN club_images
        ON club_images.image_id = images.id
        WHERE club_images.club_id = $1
      `
      await pool.query(selectImagesQuery, [club.id])
        .then(res => res.rows)
        .then(res => {
          club.images = res
        })
    })
    await Promise.all(promises)
    
    //ChauPhan: send the final club results
    res.status(200).json(results.rows)
  } catch (err) {
    console.error('get Clubs By Category Id error: ', err)
    res.status(409).json({error: err})
  }
}

const searchClubsByName = async (req, res) => {
  const searchName = req.params.searchName
  try {
    //ChauPhan: query all clubs by name using pg_trgm extension
    const selectClubsQuery = `
      SELECT *
      FROM clubs
      ORDER BY STRICT_WORD_SIMILARITY(name, $1) DESC
      LIMIT 5;
    `
    const results = await pool.query(selectClubsQuery, [searchName])

    //ChauPhan: query images for each club
    const promises = results.rows.map(async (club) => {
      const selectImagesQuery = `
        SELECT
          images.id,
          images.name,
          images.url,
          images.taken_date
        FROM images
        JOIN club_images
        ON club_images.image_id = images.id
        WHERE club_images.club_id = $1
      `
      await pool.query(selectImagesQuery, [club.id])
        .then(res => res.rows)
        .then(res => {
          club.images = res
        })
    })
    await Promise.all(promises)
    
    //ChauPhan: send the final club results
    res.status(200).json(results.rows)
  } catch (err) {
    console.error('Seach Clubs by Name error: ', err)
    res.status(409).json({error: err})
  }
}

export default {getClubs, getClubById, getClubsByCategoryId, searchClubsByName}
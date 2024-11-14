import pool from './database.js'

const deleteTables = async () => {
  const createTablesQuery = `
    DROP TABLE IF EXISTS
      club_events,
      club_locations,
      club_board_members,
      club_categories,
      club_images,
      event_locations,
      event_categories,
      event_images,
      event_users,
      board_members,
      categories,
      locations,
      images,
      clubs,
      events,
      users
    CASCADE;

    DROP EXTENSION IF EXISTS pg_trgm;
    `
  try {
    const res = await pool.query(createTablesQuery)
    console.log('tables deleted successfully')
  } catch (err) {
    console.error('error deleting tables', err)
  }
}

deleteTables()

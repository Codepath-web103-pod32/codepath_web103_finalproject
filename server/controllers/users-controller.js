import pool from '../config/database.js'

const updateAvatar = async (req, res) => {
  try {
    const githubId = req.params.githubId
    const newAvatarUrl = req.params.newAvatarUrl
    const updateQuery = `
      UPDATE users
      SET
        users.avatar_url = $1
      WHERE github_id = $2
    `
    const valueQuery = [newAvatarUrl, githubId]
    const result = await pool.query(updateQuery, valueQuery)
    res.status(200).json(result.rows[0])
  } catch (err) {
      console.error('update avatar error: ', err)
      res.status(409).json({error: err})
  }
}

export default { updateAvatar }
import { useState, useEffect } from "react"

const MyEvents = () => {

  // ChauPhan: use user.github_id to get Events registered by that user from
  // http://localhost:3003/api/events/user/:userGithubId

  const API_URL = 'http://localhost:3003'
  const [user, setUser] = useState()

  const getUser = async () => {
    const response = await fetch(
      `${API_URL}/auth/login/success`,
      {credentials: 'include'}
    )
    const json = await response.json()
    setUser(json.user)
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>{user && user.id ?
      <>{user.github_id}</> : <>Please login first!</>
    }</>
  )
}

export default MyEvents

import { Link } from 'react-router-dom';
import './Login.css'

const Login = (props) => {
  const AUTH_URL = `${props.api_url}/auth/github/`

  return (
    <main className='login'>
      <a href={AUTH_URL}>Login via GitHub</a>
    </main>
  )
}

export default Login
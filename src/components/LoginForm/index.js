import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const Login = () => {
  const token = Cookies.get('jwt_token')
  console.log(token)
  if (token !== undefined) {
    return <Redirect to="/Discover" />
  }
  return (
    <div className="login-page">
      <button type="button" className="login-but">
        <a
          className="color"
          href="https://accounts.spotify.com/authorize?response_type=token&client_id=1dfa3328449a48028133183b22cef37b&redirect_uri=https://hari1spotify.ccbp.tech/Discover/&state=generateRandomString(16)"
        >
          Login/Signup
        </a>
      </button>
    </div>
  )
}

export default Login

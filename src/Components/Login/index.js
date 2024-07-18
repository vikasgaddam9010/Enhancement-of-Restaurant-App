import './index.css'
import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = props => {
  const [username, setusername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const callSuccessMethod = jsonData => {
    setErrorMsg('')
    const jwtToken = jsonData.jwt_token
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = props
    history.replace('/')
  }

  const onSubmitForms = async event => {
    event.preventDefault()
    const loginDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(loginDetails),
    }
    const response = await fetch(url, options)
    if (response.ok) {
      callSuccessMethod(await response.json())
    } else {
      const err = await response.json()
      const erroMsg = err.error_msg
      setErrorMsg(erroMsg)
    }
  }

  const onChangeUsername = event => {
    setusername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  if (undefined !== Cookies.get('jwt_token')) {
    return <Redirect to="/" />
  }

  return (
    <div className="d-flex-login">
      <form onSubmit={onSubmitForms}>
        <h1 className="login-head">Login</h1>
        <div className="forms-container">
          <label htmlFor="username">USERNAME</label>
          <input
            id="username"
            onChange={onChangeUsername}
            placeholder="USERNAME"
            type="text"
            value={username}
          />
          <label htmlFor="password">PASSWORD</label>
          <input
            onChange={onChangePassword}
            id="password"
            placeholder="PASSWORD"
            type="password"
            value={password}
          />
          <button className="login-btn" type="submit">
            Login
          </button>
          <p>{errorMsg}</p>
        </div>
      </form>
    </div>
  )
}

export default Login

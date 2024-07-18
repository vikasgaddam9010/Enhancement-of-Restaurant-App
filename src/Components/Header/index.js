import './index.css'
import {Link, withRouter} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import Cookies from 'js-cookie'

const Header = props => {
  const {total, restaurantName} = props

  const onClickToLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link className="heading" to="/">
        <h1>{restaurantName}</h1>
      </Link>

      <div className="d-flex">
        <p className="w-5">My Orders</p>
        <Link to="/cart">
          <button className="cart-btn" type="button" data-testid="cart">
            <AiOutlineShoppingCart />
          </button>
        </Link>
        <p className="cart-count-badge">{total}</p>

        <button onClick={onClickToLogout} type="button" className="btn-99">
          Log out
        </button>
      </div>
    </div>
  )
}
export default withRouter(Header)

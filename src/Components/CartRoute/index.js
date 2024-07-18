import {Link} from 'react-router-dom'
import CartContext from '../../CartContext/CartContext'
import Header from '../Header'
import CartListItem from '../CartListItem'

import './index.css'

const CartRoute = () => (
  <CartContext.Consumer>
    {value => {
      const {total, restaurantName, cartList, removeAllCartItems} = value

      const removeAll = () => {
        removeAllCartItems()
      }

      const zeroListView = () => (
        <div className="no-list-img">
          <img
            alt="zero-list"
            className="zero-list-img"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
          />
          <p className="empty-text">Your Cart is Empty</p>
          <Link className="add-items-text" to="/">
            Click Here to Add items
          </Link>
        </div>
      )

      const cartListView = () => (
        <div className="cart-container">
          <ul className="ul-cart">
            {cartList.map(each => (
              <CartListItem key={each.dishId} each={each} />
            ))}
          </ul>
          <button onClick={removeAll} type="button" className="remove-all-btn">
            Remove All
          </button>
        </div>
      )
      return (
        <>
          <Header restaurantName={restaurantName} total={total} />
          {cartList.length === 0 ? zeroListView() : cartListView()}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartRoute

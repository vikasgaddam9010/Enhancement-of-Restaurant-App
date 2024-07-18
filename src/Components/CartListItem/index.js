import './index.css'
import {MdDeleteForever} from 'react-icons/md'
import CartContext from '../../CartContext/CartContext'

const CartListItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
      } = value
      const {each} = props
      const {dishPrice, dishImage, dishName, quantity} = each

      const addQuantity = () => {
        incrementCartItemQuantity(each)
      }

      const removeQauntity = () => {
        decrementCartItemQuantity(each)
      }

      const removeItem = () => {
        removeCartItem(each)
      }

      return (
        <li className="cart-list-li">
          <div className="flex-start">
            <img alt={dishName} src={dishImage} />
            <div className="ml-10">
              <p className="name-of-the-dish">
                Name of the Dish: <span>{dishName}</span>
              </p>

              <p>
                Price of the dish: <span>{dishPrice}</span>
              </p>
              <p>
                No.of Plates: <span>{quantity}</span>
              </p>
            </div>
          </div>
          <div className="d-flex-column">
            <button onClick={addQuantity} type="button" className="btn-inc-dec">
              +
            </button>
            <p className="quantity-cart">{quantity}</p>
            <button
              onClick={removeQauntity}
              type="button"
              className="btn-inc-dec"
            >
              -
            </button>
          </div>
          <MdDeleteForever onClick={removeItem} className="delete-icon" />
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartListItem

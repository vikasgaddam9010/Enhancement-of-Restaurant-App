import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  tableMenuList: [],
  activeCategory: 'Salads and Soup',
  total: 0,
  restaurantName: '',
  isProgress: true,
  categoryList: [],
  decrementCartItemQuantityCart: () => {},
  incrementCartItemQuantityCart: () => {},
  decrementCartItemQuantity: () => {},
  incrementCartItemQuantity: () => {},
  passACtiveBtn: () => {},
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
})

export default CartContext

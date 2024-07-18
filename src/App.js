import {Route, Switch} from 'react-router-dom'
import {useState, useEffect} from 'react'

import './App.css'
import Login from './Components/Login'
import Home from './Components/Home'
import CartRoute from './Components/CartRoute'
import CartContext from './CartContext/CartContext'
import ProtectedRoute from './Components/ProtectedRoute'

// write your code here
const updated = data =>
  data.map(each => ({
    branchName: each.branch_name,
    nextUrl: each.nexturl,
    restaurantId: each.restaurant_id,
    restaurantImage: each.restaurant_image,
    restaurantName: each.restaurant_name,
    tableId: each.table_id,
    tableName: each.table_name,
    tableMenuList: each.table_menu_list.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
        quantity: 0,
      })),
    })),
  }))
const App = () => {
  const [activeCategory, setActiveCategory] = useState('Salads and Soup')
  const [isProgress, setProgress] = useState(true)
  const [restaurantName, setFullObject] = useState('')
  const [tableMenuList, setTableMenuList] = useState([])
  const [cartList, setCartList] = useState([])

  const getApiResponse = async () => {
    const api =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const apiResponse = await fetch(api)
    const data = await apiResponse.json()
    setFullObject(data[0].restaurant_name)
    const result = updated(data)
    setTableMenuList(result[0].tableMenuList)
    setProgress(false)
  }

  useEffect(() => {
    getApiResponse()
  }, [])

  const decrementCartItemQuantityCart = dishId => {
    const result = tableMenuList.map(eachObject => ({
      ...eachObject,
      categoryDishes: eachObject.categoryDishes.map(each => {
        if (each.dishId === dishId && each.quantity > 0) {
          return {...each, quantity: each.quantity - 1}
        }
        return each
      }),
    }))

    setTableMenuList(result)
  }
  const incrementCartItemQuantityCart = dishId => {
    const result = tableMenuList.map(eachObject => ({
      ...eachObject,
      categoryDishes: eachObject.categoryDishes.map(each => {
        if (each.dishId === dishId) {
          return {...each, quantity: each.quantity + 1}
        }
        return each
      }),
    }))

    setTableMenuList(result)
  }

  const passACtiveBtn = active => {
    setActiveCategory(active)
  }

  const categoryList = tableMenuList.map(each => ({
    menuCategory: each.menuCategory,
    id: each.menuCategoryId,
  }))

  const total = cartList.length

  const addCartItem = each => {
    setCartList(prevCartList => {
      const existingDish = prevCartList.find(
        dish => dish.dishId === each.dishId,
      )

      if (existingDish) {
        return prevCartList.map(dish =>
          dish.dishId === each.dishId
            ? {...dish, quantity: dish.quantity + each.quantity}
            : dish,
        )
      }
      return [...prevCartList, each]
    })
    getApiResponse()
  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  const removeCartItem = each => {
    const filteredList = cartList.filter(
      eachDish => eachDish.dishId !== each.dishId,
    )
    setCartList(filteredList)
  }
  const decrementCartItemQuantity = each => {
    const {dishId} = each
    setCartList(prevState =>
      prevState
        .map(item =>
          item.dishId === dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  const incrementCartItemQuantity = each => {
    const {dishId} = each
    setCartList(prevState =>
      prevState.map(item =>
        item.dishId === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        tableMenuList,
        activeCategory,
        total,
        restaurantName,
        isProgress,
        categoryList,
        decrementCartItemQuantityCart,
        incrementCartItemQuantityCart,
        decrementCartItemQuantity,
        incrementCartItemQuantity,
        passACtiveBtn,
        removeAllCartItems,
        addCartItem,
        removeCartItem,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={CartRoute} />
      </Switch>
    </CartContext.Provider>
  )
}

export default App

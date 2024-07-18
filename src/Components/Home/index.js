import './index.css'

import Loader from 'react-loader-spinner'

import CartContext from '../../CartContext/CartContext'
import Header from '../Header'
import DisplayDishes from '../DisplayDishes'
import CategoryBtnsList from '../CategoryBtnsList'

const Home = () => (
  <CartContext.Consumer>
    {value => {
      const {
        restaurantName,
        isProgress,
        total,
        categoryList,
        tableMenuList,
        activeCategory,
        passACtiveBtn,
        passDecreseId,
        incrementCartItemQuantity,
      } = value

      const renderCategories = () => {
        categoryList.map(each => {
          const onClickToChangeBtn = () => {
            passACtiveBtn(each.menuCategory)
          }

          return (
            <li
              className={`${
                each.menuCategory === activeCategory && 'border'
              } li`}
              key={each.id}
              onClick={onClickToChangeBtn}
            >
              <button type="button" className="btn">
                {each.menuCategory}
              </button>
            </li>
          )
        })
      }

      const renderLoaderingView = () => (
        <div className="loader">
          <Loader type="ThreeDots" color="#0b69ff" height="150" width="150" />
        </div>
      )

      return (
        <>
          {isProgress ? (
            renderLoaderingView()
          ) : (
            <>
              <Header restaurantName={restaurantName} total={total} />
              <hr />
              <ul className="category-btns-ul-container">
                {renderCategories()}
              </ul>
              <CategoryBtnsList
                categoryList={categoryList}
                passACtiveBtn={passACtiveBtn}
                activeCategory={activeCategory}
              />

              <ul className="ul-dishes">
                {tableMenuList
                  .filter(each => each.menuCategory === activeCategory)
                  .map(each =>
                    each.categoryDishes.map(eachItem => (
                      <DisplayDishes
                        key={eachItem.dishId}
                        each={eachItem}
                        passDecreseId={passDecreseId}
                        incrementCartItemQuantity={incrementCartItemQuantity}
                      />
                    )),
                  )}
              </ul>
            </>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Home

/**/

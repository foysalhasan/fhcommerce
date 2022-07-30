import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../contexts/CartContext'
import CartItem from './CartItem'

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext)
  const navigate = useNavigate()
  const goToCheckOut = () => {
    navigate('/checkout')
  }

  return (
    <div className="transition w-60 bg-white absolute right-0 top-14 select-none z-10 border border-gray-300 shadow-md pt-4 pb-8 rounded-b-sm">
      <div className="px-3 pt-2 mb-3 overflow-y-scroll max-h-80">
        {cartItems.map((cartIitem) => (
          <CartItem key={cartIitem.id} cartItem={cartIitem} />
        ))}
        {cartItems.length === 0 && (
          <span className="font-bold text-red-500 flex h-full justify-center items-center text-center">
            YOUR CART IS EMPTY
          </span>
        )}
      </div>
      <div className="text-center">
        <button
          className="bg-black/80 rounded shadow-sm text-white font-semibold text-sm px-5 py-3 hover:bg-pink-700 transition uppercase select-none"
          onClick={goToCheckOut}
        >
          checkout
        </button>
      </div>
    </div>
  )
}

export default CartDropdown

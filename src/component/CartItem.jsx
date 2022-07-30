import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import { FaTimes } from 'react-icons/fa'

const CartItem = ({ cartItem }) => {
  const { removeProduct } = useContext(CartContext)
  const removeItem = () => removeProduct(cartItem)
  return (
    <div className="flex space-x-4 items-center mb-4">
      <div className="relative group">
        <FaTimes
          className="text-white text-2xl cursor-pointer absolute transform -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 z-10 opacity-0 group-hover:opacity-100 transition"
          onClick={removeItem}
        />
        <img
          src={cartItem.imageUrl}
          alt={cartItem.name}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-indigo-700 ring-offset-2 block shrink-0 filter group-hover:brightness-50"
        />
      </div>

      <div className="space-y-1">
        <span className="text-gray-900 block font-semibold text-xs uppercase">{cartItem.name}</span>
        <span className="text-red-600 font-semibold text-lg items-center uppercase flex">
          {cartItem.quantity} <FaTimes className="text-red-600" /> {cartItem.price}$
        </span>
      </div>
    </div>
  )
}

export default CartItem

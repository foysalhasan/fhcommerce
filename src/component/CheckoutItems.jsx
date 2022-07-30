import { useContext } from 'react'
import { FaTimes } from 'react-icons/fa'
import { BsArrowRightSquare, BsArrowLeftSquare } from 'react-icons/bs'
import { CartContext } from '../contexts/CartContext'

const CheckoutItems = ({ item }) => {
  const { removeProduct, addToCart, removeItemFromCart } = useContext(CartContext)

  const cartItemAdder = () => {
    addToCart(item)
  }
  const cartItemRemover = () => {
    removeItemFromCart(item)
  }
  const productRemover = () => {
    removeProduct(item)
  }
  return (
    <tr>
      <td className="p-4 border select-none relative">
        <img src={item.imageUrl} alt="" className="w-20 object-cover mx-auto rounded-md" />
      </td>
      <td className="p-2 border text-center uppercase font-semibold text-gray-700 select-none">{item.name}</td>
      <td className="p-2 border text-center uppercase font-semibold text-gray-700 space-x-5">
        <BsArrowLeftSquare className="text-3xl hover:text-sky-600 cursor-pointer inline-block" onClick={cartItemRemover} />
        <span className="select-none">{item.quantity}</span>
        <BsArrowRightSquare className="text-3xl hover:text-sky-600 cursor-pointer inline-block" onClick={cartItemAdder} />
      </td>
      <td className="select-none p-2 border text-center uppercase font-semibold text-gray-700">{item.price} USD</td>
      <td className="p-2 border text-center uppercase font-semibold text-gray-700">
        <FaTimes className="text-4xl inline-block cursor-pointer transition hover:text-red-500" onClick={productRemover} />
      </td>
    </tr>
  )
}

export default CheckoutItems

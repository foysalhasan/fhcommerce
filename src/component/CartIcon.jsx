import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'

import { BsBag } from 'react-icons/bs'

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext)
  const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  return (
    <div className=" py-[5px] relative cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
      <BsBag className="text-4xl text-white" />
      <span className="font-semibold text-white text-sm absolute top-[16px] left-[13px]">{quantity}</span>
    </div>
  )
}

export default CartIcon

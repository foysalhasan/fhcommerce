import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'

const Products = ({ product }) => {
  const { addToCart } = useContext(CartContext)
  const addItemToCart = () => {
    addToCart(product)
  }
  return (
    <div className="lg:w-1/4 w-full px-3">
      <div className="lg:h-96 h-56 relative bg-slate-200 rounded shadow-sm overflow-hidden group">
        <img src={product.imageUrl} alt={product.name} className="w-full object-cover h-80 mb-4 filter grayscale-0 transition group-hover:grayscale" />
        <div className="flex justify-between items-center px-3">
          <span className="font-semibold text-xl text-gray-900">{product.name}</span>
          <div className="px-4 py-2 rounded bg-indigo-600 text-white font-semibold text-sm">{product.price} USD</div>
        </div>
        <button
          className="bg-black/80 rounded shadow-sm text-white font-semibold text-sm px-5 py-3 absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 transition invisible opacity-0 hover:bg-pink-700 group-hover:opacity-100 group-hover:visible"
          onClick={addItemToCart}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  )
}

export default Products

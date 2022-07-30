import { useContext } from 'react'
import cartIcon from '../assets/cart.png'
import { Link } from 'react-router-dom'
import CheckoutItems from '../component/CheckoutItems'
import { CartContext } from '../contexts/CartContext'

const Checkout = () => {
  const { cartItems } = useContext(CartContext)

  const total = cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
  console.log(total)

  return (
    <div className="container mx-auto lg:px-10 px-4 min-h-screen bg-slate-100 py-8 flex flex-col items-center">
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <table className="bg-white p-4 rounded shadow-sm w-full ">
          <thead className="border-b-2 border-red-400">
            <tr>
              <th className="select-none py-4 border text-red-500">Product</th>
              <th className="select-none py-4 border text-red-500">Description</th>
              <th className="select-none py-4 border text-red-500">Quantity</th>
              <th className="select-none py-4 border text-red-500">Price</th>
              <th className="select-none py-4 border text-red-500">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <CheckoutItems key={item.id} item={item} />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} className="p-2 border text-right uppercase font-semibold text-gray-700 select-none px-4">
                <p className="font-bold uppercase text-gray-900 text-2xl">
                  total =<span className="text-red-500 ml-2">{total} USD</span>
                </p>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  )
}

const EmptyCart = () => {
  return (
    <div className="space-y-2 w-1/4 mx-auto text-center my-10">
      <img className="w-100" src={cartIcon} alt="Emty Cart" />
      <Link to="/shop" className="uppercase px-5 font-bold text-sm transition bg-fuchsia-800 py-3 rounded text-white hover:bg-orange-600">
        Add Product
      </Link>
    </div>
  )
}

export default Checkout

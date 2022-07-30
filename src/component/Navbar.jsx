import React, { useState } from 'react'
import { Fragment, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { TbFocus2 } from 'react-icons/tb'
import { useQuery } from 'react-query'
import { CartContext } from '../contexts/CartContext'
import CartIcon from './CartIcon'
import CartDropdown from './CartDropdown'
import { useAuth } from '../contexts/AuthContext'

import usr from '../assets/user.png'
import { getUserData } from '../utils/firebase/firebase.utils'

const Navbar = () => {
  const { currentUser } = useAuth()

  const { isCartOpen } = useContext(CartContext)
  const [active, setActive] = useState('')

  return (
    <Fragment>
      <div className="container border-b-4 border-pink-700 bg-gray-700 mx-auto lg:px-10 px-0">
        <div className="flex justify-between  items-center relative">
          <Link onClick={() => setActive('')} className="text-white lg:pl-0 pl-3 font-bold text-3xl flex items-center space-x-1" to="/">
            <TbFocus2 />
            <span>FH SHOP</span>
          </Link>
          <div className="flex-1 flex justify-end flex-wrap">
            <Link
              onClick={() => setActive('shop')}
              className={`text-white text-xl font-semibold uppercase block px-5 py-3 ${active === 'shop' ? 'bg-pink-700' : 'bg-transparent'}`}
              to="/shop"
            >
              shop
            </Link>

            <Link
              onClick={() => setActive('press')}
              className={`text-white text-xl font-semibold uppercase block px-5 py-3 ${active === 'press' ? 'bg-pink-700' : 'bg-transparent'}`}
              to="/press"
            >
              press
            </Link>

            <Link
              onClick={() => setActive('paginate')}
              className={`text-white text-xl font-semibold uppercase block px-5 py-3 ${active === 'paginate' ? 'bg-pink-700' : 'bg-transparent'}`}
              to="/paginate"
            >
              paginate
            </Link>

            <Link
              onClick={() => setActive('about')}
              className={`text-white text-xl font-semibold uppercase block px-5 py-3 ${active === 'about' ? 'bg-pink-700' : 'bg-transparent'}`}
              to="/about"
            >
              about
            </Link>

            <Link
              onClick={() => setActive('gv')}
              className={`text-white text-xl font-semibold uppercase block px-5 py-3 ${active === 'gv' ? 'bg-pink-700' : 'bg-transparent'}`}
              to="/test"
            >
              GV
            </Link>

            <Link
              onClick={() => setActive('Pubmit Press')}
              className={`text-white text-xl font-semibold uppercase block px-5 py-3 ${active === 'Pubmit Press' ? 'bg-pink-700' : 'bg-transparent'}`}
              to="/submit-press"
            >
              Submit Press
            </Link>

            {!currentUser ? (
              <Link
                onClick={() => setActive('auth')}
                className={`text-white text-xl font-semibold uppercase block px-5 py-3 ${active === 'auth' ? 'bg-pink-700' : 'bg-transparent'}`}
                to="/auth"
              >
                sign-in
              </Link>
            ) : (
              <Link
                onClick={() => setActive('acc')}
                className={`text-white text-xl font-semibold uppercase block px-5 py-3 ${active === 'acc' ? 'bg-pink-700' : 'bg-transparent'}`}
                to="/profile"
              >
                Account
              </Link>
            )}
            <CartIcon />
          </div>
          {isCartOpen && <CartDropdown />}
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navbar

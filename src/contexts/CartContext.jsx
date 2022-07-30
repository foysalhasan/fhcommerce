import { createContext, useState } from 'react'
import { useLocation } from 'react-router-dom'

const cartToAdd = (cartItems, productToAdd) => {
  const existingItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
  if (existingItem) {
    return cartItems.map((cartItem) => (cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem))
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const cartToRemove = (cartItems, cartItemToRemove) => {
  const existing = cartItems.find((item) => item.id === cartItemToRemove.id)
  if (existing.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
  }
  return cartItems.map((cartItem) => (cartItem.id === cartItemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem))
}

const productRemover = (cartItems, productToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addToCart: () => {},
  removeItemFromCart: () => {},
  removeProduct: () => {},
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const addToCart = (productToAdd) => {
    setCartItems(cartToAdd(cartItems, productToAdd))
  }
  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(cartToRemove(cartItems, cartItemToRemove))
  }
  const removeProduct = (productToRemove) => {
    setCartItems(productRemover(cartItems, productToRemove))
  }
  const value = { isCartOpen, setIsCartOpen, cartItems, addToCart, removeItemFromCart, removeProduct }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

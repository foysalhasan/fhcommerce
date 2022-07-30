import { createContext, useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getUserData, onAuthStateChangedListener } from '../utils/firebase/firebase.utils'

const adminEmail = process.env.REACT_APP_ADMIN_EMAIL

const AuthContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  userFetched: null,
  setUserFetched: () => null,
  isAdmin: null,
  setIsAdmin: () => null,
})

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const value = { currentUser, isAdmin }

  // ON-AUTHSTATECHANE LISTENER
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user)
      setIsAdmin(user?.email === adminEmail)
    })
    return unsubscribe
  }, [currentUser])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

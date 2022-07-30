import React from 'react'
import { Link } from 'react-router-dom'
import err from '../assets/notfound.jpg'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center container mx-auto">
      <Link to="/">
        <img src={err} alt="404 Error" className="cursor-pointer" />
      </Link>
    </div>
  )
}

export default NotFound

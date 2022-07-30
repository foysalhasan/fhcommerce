import { Link, useLocation } from 'react-router-dom'

const Linker = ({ link }) => {
  const location = useLocation()
  const currPath = location.pathname.split('/')[2]
  return (
    <Link
      className={`${
        currPath === link ? 'bg-pink-700 text-white' : 'bg-indigo-200 text-gray-900'
      } px-4 py-3 w-full  text-center font-semibold border-b-2 border-indigo-100 uppercase`}
      to={`/admin/${link}`}
    >
      {link}
    </Link>
  )
}

export default Linker

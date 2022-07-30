import { Directory } from '../component'
import { categories } from '../services'

const Home = () => {
  return (
    <>
      <Directory categories={categories} />
    </>
  )
}

export default Home

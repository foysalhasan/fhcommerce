import Category from './Category'
import Slider from './Slider'
const Directory = ({ categories }) => {
  return (
    <div className="container bg-gray-200 mx-auto rounded">
      <Slider />
      <div className="flex flex-wrap gap-4 mb-8 lg:p-10 p-4">
        {categories.map((category) => (
          <Category key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}
export default Directory

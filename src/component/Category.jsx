const Category = ({ category }) => {
  return (
    <div
      className="lg:min-w-[450px] min-w-full text-center flex-1 overflow-hidden rounded shadow-md text-white font-bold text-4xl h-80 bg-cover bg-no-repeat relative "
      style={{ backgroundImage: `url(${category.imageUrl})` }}
    >
      <div className="absolute bg-black/50 top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="bg-slate-400 backdrop-blur-sm rounded py-4 shadow-sm md:w-1/3 w-2/3">
          <h3 className="text-black text-2xl font-semibold font-josefin capitalize">{category.title}</h3>
          <a href="#" className="text-sm font-bold text-cyan-900  hover:text-pink-800 transition uppercase">
            shop now
          </a>
        </div>
      </div>
    </div>
  )
}

export default Category

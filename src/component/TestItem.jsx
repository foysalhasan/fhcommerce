const TestItem = ({ item }) => {
  const { categories } = item

  return (
    <div className="bg-indigo-100 px-4 text-indigo-700 border-l-4 border-indigo-400 py-5 h-16 rounded text-xl font-semibold  flex justify-between items-center">
      <div className="inline-block w-32">
        <span className="text-sm lg:text-base">{item.name}</span> <br />
        <span className="text-xs lg:text-sm uppercase text-gray-800 font-bold">{categories[0].name}</span>
      </div>
      <a
        href={item.permalink}
        className="flex justify-center items-center py-2 bg-indigo-700 hover:bg-rose-500 transition text-white text-xs lg:text-sm font-bold rounded uppercase cursor-pointer w-32 mx-auto"
        target="_blank"
      >
        <span className="hidden lg:inline-block">BUY NOW</span>
        <span className="mr-2 tracking-widest h-8 w-8 shrink-0 ring-1 ring-white ring-offset-1  rounded-full bg-cyan-900 flex items-center justify-center lg:hidden">
          {item.price}$
        </span>
        <span className="inline-block lg:hidden">BUY NOW</span>
      </a>
      <span className="lg:inline-block hidden shrink-0 text-sm tracking-widest text-center px-5 py-2 rounded bg-gray-500 text-white font-bold">
        {item.price}$
      </span>
    </div>
  )
}

export default TestItem

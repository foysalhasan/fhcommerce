import React from 'react'
import { useContext } from 'react'
import Products from '../component/Products'
import { ProductsContext } from '../contexts/ProductContext'

const Shop = () => {
  const { products } = useContext(ProductsContext)
  return (
    <div className="container lg:px-10 px-4 mx-auto py-8 bg-slate-100">
      <div className="flex flex-wrap gap-y-6">
        {products.map((product) => (
          <Products key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
export default Shop

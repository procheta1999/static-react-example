import Seo from './Seo'
import Rating from './Rating'
import { getProductById } from '../lib/cms'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function ProductPage({ match }) {
  let location = useLocation()
  const { slug } = match.params
  const [product, setProduct] = useState()
  const [meta, setMeta] = useState({})
  useEffect(async () => {
    if (slug) {
      const { product } = await getProductById(slug)
      setProduct(product)
      setMeta({
        title: product.name,
        description: product.description,
        url: `https://layer0-docs-layer0-next-example-default.layer0.link/product/${slug}`,
        image: `https://layer0-docs-og-image-default.layer0.link/api?title=${product.name}&width=1400&height=720`,
      })
    }
  }, [location])
  return (
    <>
      <Seo {...meta} />
      <div className="container center flex flex-col items-center md:flex-row pb-20">
        <div className="container p-5 flex flex-col items-center">
          <img src={product?.picture} />
        </div>
        <div className="container p-5 flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="font-bold py-2 m2">{product?.name}</h2>
          <div className="py-2 m2">{product?.description}</div>
          <div className="py-2 m2">${product?.price}</div>
          <div className="py-2 m2">
            <Rating value={Number(product?.rating)} />
          </div>
          <div className="py-2 m2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

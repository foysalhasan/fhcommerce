import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api'

const woocommerce = new WooCommerceRestApi({
  url: process.env.REACT_APP_WP_URL,
  consumerKey: process.env.REACT_APP_WP_KEY,
  consumerSecret: process.env.REACT_APP_WP_SECRET,
  version: 'wc/v3',
})

export const getWooProducts = async (category = '') => {
  try {
    const { data } = await woocommerce.get('products', {
      category: category,
      per_page: 100,
      stock_status: 'instock',
      status: 'publish',
    })
    return data
  } catch (error) {
    console.log(error.message)
  }
}

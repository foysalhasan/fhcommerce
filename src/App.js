import Home from './routes/Home'
import UserAuth from './routes/UserAuth'
import { Navbar } from './component'
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFound from './component/NotFound'
import Shop from './routes/Shop'
import Test from './component/Test'
import Profile from './component/Profile'
import Checkout from './routes/Checkout'
import ProtectedRoute from './routes/ProtectedRoute'
import Admin from './routes/Admin'
import { useAuth } from './contexts/AuthContext'
import Users from './component/admin/Users'
import { SingleProduct } from './component/admin/SingleProduct'
import AddProduct from './component/admin/AddProduct'
import Products from './component/admin/Products'
import { EditProduct } from './component/admin/EditProduct'
import { Press } from './routes/Press'
import SubmitPress from './component/SubmitPress'
import { SingleTemplate } from './component/press-template/SingleTemplate'
import { PaginateRoute } from './routes/PaginateRoute'

const App = () => {
  // const { currentUser } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<UserAuth />} />
        <Route path="paginate" element={<PaginateRoute />} />
        <Route path="shop" element={<Shop />} />
        <Route path="press" element={<Press />} />
        <Route path="press/:id" element={<SingleTemplate />} />
        <Route path="test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/*" element={<ProtectedRoute />}>
          <Route path="submit-press" element={<SubmitPress />} />
          <Route path="profile" element={<Profile />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="admin" element={<Admin />}>
            <Route path="user" element={<Users />} />
            <Route path="product" element={<Products />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="product/edit/:id" element={<EditProduct />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App

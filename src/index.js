import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import { AuthProvider } from './contexts/AuthContext'
import { ProductProvider } from './contexts/ProductContext'
import { CartProvider } from './contexts/CartContext'
import { TemplateProvider } from './contexts/TemplateContext'

const client = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <QueryClientProvider client={client}>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <TemplateProvider>
              <App />
            </TemplateProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { CartProvider } from './Component/Context/CartContext.jsx'
import { FavProvider } from './Component/Context/FavContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/'>
  
<FavProvider>
    <CartProvider>
        <App />
    </CartProvider>
</FavProvider>
  
    </BrowserRouter>
  </StrictMode>,
)


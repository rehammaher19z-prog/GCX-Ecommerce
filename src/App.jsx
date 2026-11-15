import { Route, Routes } from "react-router-dom"
import BottomHeader from "./Component/Header/BottomHeader"
import TopHeader from "./Component/Header/TopHeader"
import Home from "./Page/Home/Home"
import ProductDetails from "./Page/ProductDetails"
import ScrollToTop from "./Component/ScrollBtn/ScrollToTop";
import Cart from "./Page/Cart/Cart"
import SignUp from "./Page/SignUp/SignUp"
import Login from "./Page/Login/Login"
import { AnimatePresence } from "framer-motion"
import ProductCategories from "./Page/ProductCategories/ProductCategories"
import SearchPage from "./Page/SearchPage/SearchPage"
import AllProducts from "./Page/AllProduct/AllCatagorise"
function App() {


  return (
    <>
      
<header
  // style={{
  //   position: "fixed",
  //   top: 0,
  //   left: 0,
  //   width: "100%",
  //   zIndex: 1000,
  // }}
>
  <TopHeader />
  <BottomHeader />
      </header>

      <AnimatePresence mode="wait">
             <Routes>
          <Route path="/" element={<Home />}></Route>
        <Route path="/categories" element={<AllProducts />} />
        <Route path="/products/:id" element={<ProductDetails/>}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/signup" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route
    path="/category/:categorySlug"
    element={<ProductCategories />}
          />
          <Route path="/search" element={<SearchPage/>} />
      </Routes>
      </AnimatePresence>
      
        <ScrollToTop />


  
    </>
  )
}

export default App

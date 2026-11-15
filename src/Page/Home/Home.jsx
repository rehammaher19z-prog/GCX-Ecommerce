import { useEffect, useState } from "react";
import HeroSlider from "../../Component/HeroHome/HeroSlider";
import SlidProduct from "../../Component/SlideProducts/SlidProduct";
import SlideProductLoading from "../../Component/SlideProducts/SlideProductLoading";
import AOS from "aos";
import "aos/dist/aos.css";

const Catagoris = [
  
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches"

]

export default function Home() {

// Initialize AOS animation when Home page loads
useEffect(() => {
  AOS.init({
    duration: 1500, // Animation duration
    once: true, // Animate each element only once
    offset: 100, // Start animation before element enters viewport
    easing: "ease-out-cubic", // Animation speed effect
  });
}, []);

  const [products, setproduct] = useState({})
   const [Loading, setLoading] = useState(true)
  useEffect(() => {

    const FetchProducts = async () => {
      try {
const result = await Promise.all(
  Catagoris.map(async (catagory) => {
    const res = await fetch(
      `https://dummyjson.com/products/category/${catagory}`
    );

    const data = await res.json();

    return { [catagory]: data.products };
  })
);

const ProductData = Object.assign({}, ...result);
setproduct(ProductData);
      }

      catch (erorr) {
        console.log("Erorr Fetching " ,erorr)
      }
      
      finally {
        setLoading(false)
      }
    }
    
    FetchProducts()
  }, [])

  console.log(products)
  

  return (
    <div>
      <HeroSlider />

      {Loading ? (
  Catagoris.map((Catagory) => {
    return (
      <div key={Catagory} data-aos="fade-up">
        <SlideProductLoading />
      </div>
    );
  })
) : (
  Catagoris.map((Catagory) => {
    return (
      <div key={Catagory} data-aos="fade-up"  data-aos-offset="150">
        <SlidProduct
          title={Catagory}
          data={products[Catagory]}
        />
      </div>
    );
  })
)}

      
    </div>
  )
}

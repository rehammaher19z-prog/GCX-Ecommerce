//Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Hero.css"


export default function HeroSlider() {
    return (
      
        <>
            <div >
 <Swiper
modules={[Pagination, Navigation, Autoplay]}
pagination={{ clickable: true }}
    autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  loop={true}
                    className="mySwiper" 
                    
>
                    <SwiperSlide>
                
                        <img src='../src/img/banner_Hero2.jpg'></img>
  </SwiperSlide>
                    <SwiperSlide>

                        <img src='../src/img/banner_Hero3.jpg'></img>
  </SwiperSlide>
                    <SwiperSlide>
                   
                        <img src='../src/img/banner_Hero1.jpg'></img>
  </SwiperSlide>
</Swiper>

            </div>
        </>
                )
}

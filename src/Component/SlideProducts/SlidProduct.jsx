
import Product from './Product';
import './SlideProduct.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

export default function SlidProduct({title,data}) {
  return (
    <div className="Slide_Products slide">
      <div className="container">
        <div className="top_slide">
                  <h2 style={{textTransform:"capitalize"}} >{title}</h2>
         
        </div>

        <span className="collection_badge">
          <i className="fa-solid fa-sparkles"></i>
          New Collection
        </span>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
       autoplay={{
  delay: 1000,
  disableOnInteraction: false,
  pauseOnMouseEnter: false,
}}
speed={500}
          loop={true}
          spaceBetween={20}
          slidesPerView={5}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 12,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 14,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 16,
            },
          }}
          className="products_swiper"
        >
  

                  {
                      data.map((item) => {
                          return (
                              <SwiperSlide><Product item={item} /></SwiperSlide>
                          )
                      })
                  }
        </Swiper>
      </div>
    </div>
  );
}















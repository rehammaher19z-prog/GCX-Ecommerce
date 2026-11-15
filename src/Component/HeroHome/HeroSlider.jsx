//Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Hero.css"
import Hero1 from "../../img/banner_Hero1.jpg";
import Hero2 from "../../img/banner_Hero2.jpg";
import Hero3 from "../../img/banner_Hero3.jpg";

export default function HeroSlider() {
    return (
        <>
            <div>
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
                        <img src={Hero2} alt="Banner 2" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img src={Hero3} alt="Banner 3" />
                    </SwiperSlide>

                    <SwiperSlide>
                        <img src={Hero1} alt="Banner 1" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
}

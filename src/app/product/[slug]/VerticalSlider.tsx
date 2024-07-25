// import React, { useState } from 'react';
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// const VerticalSlider: React.FC<VerticalSliderProps> = ({ items, slidesToShow }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handlePrevClick = () => {
//     const newIndex = (currentIndex - 1 + items.length) % items.length;
//     setCurrentIndex(newIndex);
//   };

//   const handleNextClick = () => {
//     const newIndex = (currentIndex + 1) % items.length;
//     setCurrentIndex(newIndex);
//   };

//   const getVisibleItems = () => {
//     let visibleItems = [];
//     for (let i = 0; i < slidesToShow; i++) {
//       visibleItems.push(items[(currentIndex + i) % items.length]);
//     }
//     return visibleItems;
//   };

//   return (
//     <div className="slider-container">
//       <button onClick={handlePrevClick} style={{ transform: "rotate(180deg)",boxShadow: "rgba(0, 0, 0, 0.70) 0px -15px 15px;"}} className="slider-button">
//       <ExpandMoreIcon fontSize="small"/>

//       </button>
//       <div className="slider-content">
//         <div
//           className="slider-track"
//         >
//           {getVisibleItems().map((item, index) => (
//             <div key={index} className="slider-item">
//               <img src={item} alt={`Slide ${index + 1}`} />
//             </div>
//           ))}
//         </div>
//       </div>
//       <button onClick={handleNextClick} className="slider-button">
//       <ExpandMoreIcon fontSize="small"/>
//       </button>
//     </div>
//   );
// };

// export default VerticalSlider;

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./VerticalSlider.css"
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Box } from '@mui/material';

export default function App() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <>
    <Box display="flex" flexDirection="row-reverse">
      <Swiper
        // style={{
        //   '--swiper-navigation-color': '#fff',
        //   '--swiper-pagination-color': '#fff',
        // }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
        </SwiperSlide>
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
        </SwiperSlide>
      </Swiper>
      </Box>
    </>
  );
}


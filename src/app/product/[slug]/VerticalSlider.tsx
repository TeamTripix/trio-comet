import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./VerticalSlider.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Box } from "@mui/material";

export default function App({ items }: any) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [zoomed, setZoomed] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const imgRef = useRef(null);

  const handleDoubleClick = (e:any) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0) {
      setZoomed(!zoomed);
    } else {
      setLastTap(currentTime);
    }
  };
  return (
    <>
      <Box display="flex" flexDirection="row-reverse" width="90%">

        {/* right slider */}
        <Swiper
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {items.map((data: any,index:number) => {
            return (
              <SwiperSlide key={`${data}${index}`}>
                <img 
                // onClick={handleDoubleClick}
                 ref={imgRef}
                 alt="Double Tap to Zoom"
                 style={{
                   transition: 'transform 0.3s ease',
                   transform: zoomed ? 'scale(2)' : 'scale(1)',
                   cursor: 'pointer',
                 }}
                src={data} />
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* left sldier */}
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {items.map((data: any) => {
            return (
              <SwiperSlide key={data} className="left-slider">
                <img src={data} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </>
  );
}

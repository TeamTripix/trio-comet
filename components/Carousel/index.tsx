import React, { useState } from "react";

const Carousel = (props: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { images } = props;

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
      <button onClick={goToPrevSlide}>Previous</button>
      <img src={images} alt={`Slide ${currentIndex + 1}`} />
      <button onClick={goToNextSlide}>Next</button>
    </div>
  );
};

export default Carousel;

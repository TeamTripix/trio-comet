import React, { useState } from 'react';
import './VerticalSlider.css';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface VerticalSliderProps {
  items: string[];
  slidesToShow: number;
}

const VerticalSlider: React.FC<VerticalSliderProps> = ({ items, slidesToShow }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    const newIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(newIndex);
  };

  const getVisibleItems = () => {
    let visibleItems = [];
    for (let i = 0; i < slidesToShow; i++) {
      visibleItems.push(items[(currentIndex + i) % items.length]);
    }
    return visibleItems;
  };

  return (
    <div className="slider-container">
      <button onClick={handlePrevClick} style={{ transform: "rotate(180deg)",boxShadow: "rgba(0, 0, 0, 0.70) 0px -15px 15px;"}} className="slider-button">
      <ExpandMoreIcon fontSize="small"/>

      </button>
      <div className="slider-content">
        <div
          className="slider-track"
        >
          {getVisibleItems().map((item, index) => (
            <div key={index} className="slider-item">
              <img src={item} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleNextClick} className="slider-button">
      <ExpandMoreIcon fontSize="small"/>
      </button>
    </div>
  );
};

export default VerticalSlider;

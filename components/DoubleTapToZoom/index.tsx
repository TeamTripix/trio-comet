import React, { useState, useRef } from 'react';

const DoubleTapZoom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const lastTap = useRef(0);
  const isDragging = useRef(false);
  const startDragPosition = useRef({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });
  const boxRef = useRef<HTMLDivElement>(null);

  const handleDoubleTap = () => {
    setScale((prevScale) => {
      if (prevScale === 1) {
        return 2; // Zoom in to 2x
      } else {
        setPosition({ x: 0, y: 0 }); // Reset position on zoom out
        return 1; // Zoom out to 1x
      }
    });
  };

  const handleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      handleDoubleTap();
    }

    lastTap.current = now;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      isDragging.current = true;
      startDragPosition.current = { x: e.clientX, y: e.clientY };
      lastPosition.current = position;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current && boxRef.current) {
      const dx = e.clientX - startDragPosition.current.x;
      const dy = e.clientY - startDragPosition.current.y;

      const newX = lastPosition.current.x + dx;
      const newY = lastPosition.current.y + dy;

      // Constrain the image position to stay within the box
      const boxWidth = boxRef.current.clientWidth;
      const boxHeight = boxRef.current.clientHeight;
      const imgWidth = boxWidth * scale;
      const imgHeight = boxHeight * scale;

      setPosition({
        x: Math.max(Math.min(newX, 0), boxWidth - imgWidth),
        y: Math.max(Math.min(newY, 0), boxHeight - imgHeight),
      });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={boxRef}
      onClick={handleTap}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: scale > 1 ? 'grab' : 'pointer',
      }}
    >
      <div
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          transition: isDragging.current ? 'none' : 'transform 0.3s ease',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DoubleTapZoom
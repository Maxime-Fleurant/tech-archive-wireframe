import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-[18px] h-[18px] bg-[#ffffff] rounded-full pointer-events-none z-[9999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out will-change-transform"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`
        }}
      />
    </>
  );
};

export default CustomCursor;
'use client';
import { useState, useEffect, useRef } from 'react';

export default function SmoothFollower() {
  const mousePosition = useRef({ x: 0, y: 0 });
  const dotPosition = useRef({ x: 0, y: 0 });
  const borderDotPosition = useRef({ x: 0, y: 0 });
  const [renderPos, setRenderPos] = useState({
    dot: { x: 0, y: 0 },
    border: { x: 0, y: 0 },
  });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const DOT_SMOOTHNESS = 0.5;
  const BORDER_DOT_SMOOTHNESS = 0.1;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, img, input, textarea, select, .question-btn, .persona-thumb');
      if (target) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    
    const animate = () => {
      const lerp = (start, end, factor) => {
        return start + (end - start) * factor;
      };
      
      dotPosition.current.x = lerp(
        dotPosition.current.x,
        mousePosition.current.x,
        DOT_SMOOTHNESS
      );
      dotPosition.current.y = lerp(
        dotPosition.current.y,
        mousePosition.current.y,
        DOT_SMOOTHNESS
      );
      
      borderDotPosition.current.x = lerp(
        borderDotPosition.current.x,
        mousePosition.current.x,
        BORDER_DOT_SMOOTHNESS
      );
      borderDotPosition.current.y = lerp(
        borderDotPosition.current.y,
        mousePosition.current.y,
        BORDER_DOT_SMOOTHNESS
      );
      
      setRenderPos({
        dot: { x: dotPosition.current.x, y: dotPosition.current.y },
        border: {
          x: borderDotPosition.current.x,
          y: borderDotPosition.current.y,
        },
      });
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationId);
      document.head.removeChild(style);
    };
  }, [isMobile]);

  if (typeof window === 'undefined' || isMobile) return null;

  return (
    <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 99999 }}>
      <div
        style={{
          position: 'absolute',
          borderRadius: '50%',
          backgroundColor: '#F7F5F2',
          width: '8px',
          height: '8px',
          transform: 'translate(-50%, -50%)',
          left: `${renderPos.dot.x}px`,
          top: `${renderPos.dot.y}px`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          borderRadius: '50%',
          border: '2px solid #1E1E1E',
          boxShadow: '0 0 10px 3px rgba(220, 214, 204, 0.6), 0 0 20px 6px rgba(220, 214, 204, 0.3)',
          width: isHovering ? '44px' : '28px',
          height: isHovering ? '44px' : '28px',
          transform: 'translate(-50%, -50%)',
          left: `${renderPos.border.x}px`,
          top: `${renderPos.border.y}px`,
          transition: 'width 0.3s, height 0.3s',
        }}
      />
    </div>
  );
}


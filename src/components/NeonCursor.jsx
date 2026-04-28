'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import './NeonCursor.css';

const NeonCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseMove = useCallback((e) => {
    setPosition({ x: e.clientX, y: e.clientY });
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  const handleMouseOver = useCallback((e) => {
    const target = e.target;
    if (target.closest('a, button, input, [data-hover="true"], .question-btn, .persona-thumb, .services-process-cta')) {
      setIsHovering(true);
    }
  }, []);

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseOver, handleMouseOut]);

  
  if (typeof window === 'undefined') return null;

  return (
    <div className="neon-cursor-container">
      
      <motion.div
        className="cursor-main"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isClicking ? 0.7 : isHovering ? 1.4 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 600,
          mass: 0.3,
        }}
      />

      
      <motion.div
        className="cursor-trail"
        animate={{
          x: position.x - 17,
          y: position.y - 17,
          scale: isClicking ? 1.2 : isHovering ? 1.6 : 1,
          borderColor: isHovering ? 'var(--color-off-white)' : 'var(--color-dust)',
          borderWidth: isHovering ? '3px' : '1.5px',
        }}
        transition={{
          type: 'spring',
          damping: 35,
          stiffness: 300,
          mass: 0.6,
        }}
      />

      
      <motion.div
        className="cursor-glow"
        animate={{
          x: position.x - 30,
          y: position.y - 30,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.7 : 0.4,
        }}
        transition={{
          type: 'spring',
          damping: 45,
          stiffness: 200,
          mass: 1,
        }}
      />
    </div>
  );
};

export default NeonCursor;

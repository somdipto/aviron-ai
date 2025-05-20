
import React from 'react';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <svg 
      width="32" 
      height="32" 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M16 2L30 28H2L16 2Z" 
        fill="black" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        transform="rotate(12 16 16)"
      />
      <path 
        d="M16 28L8 14L24 14L16 28Z" 
        fill="black" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        transform="rotate(12 16 16)"
      />
    </svg>
  );
};

export default Logo;

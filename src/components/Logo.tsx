
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
      {/* Main triangle shape for the 'A' */}
      <path 
        d="M16 5L28 26H4L16 5Z" 
        fill="black" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* The crossbar of the 'A' */}
      <path 
        d="M10 20H22" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
      
      {/* Circle around the logo for aerospace feel */}
      <circle 
        cx="16" 
        cy="16" 
        r="14" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        fill="none" 
      />
    </svg>
  );
};

export default Logo;

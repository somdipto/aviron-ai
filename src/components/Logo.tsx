
import React from 'react';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <svg 
      width="32" 
      height="32" 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main A shape */}
      <path 
        d="M100 10L10 190H190L100 10Z" 
        fill="currentColor" 
      />
      {/* Inner triangle */}
      <path 
        d="M100 120L80 160H120L100 120Z" 
        fill="#fff" 
      />
      {/* Circle element */}
      <circle 
        cx="60" 
        cy="110" 
        r="25" 
        fill="#fff" 
      />
    </svg>
  );
};

export default Logo;

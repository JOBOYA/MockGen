import React from 'react';

interface DotPatternProps {
  className?: string;
}

export default function DotPattern({ className = '' }: DotPatternProps) {
  return (
    <div 
      className={`absolute inset-0 opacity-10 pointer-events-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.15) 1px, transparent 0)`,
        backgroundSize: '24px 24px',
      }}
    />
  );
}
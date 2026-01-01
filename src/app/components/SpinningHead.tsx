'use client';

import Image from 'next/image';

export default function SpinningHead() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="spinning-head-container">
        <div className="spinning-head-wrapper">
          <Image
            src="/louie.png"
            alt="Spinning head"
            width={50}
            height={50}
            className="spinning-head-image"
          />
        </div>
      </div>
      <style jsx>{`
        .spinning-head-container {
          animation: spin 3s linear infinite;
        }
        
        .spinning-head-wrapper {
          display: inline-block;
        }
        
        .spinning-head-image {
          display: block;
          object-fit: cover;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

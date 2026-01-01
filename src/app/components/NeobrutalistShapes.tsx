'use client';

export default function NeobrutalistShapes() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Bottom left yellow triangle */}
      <svg
        className="absolute"
        style={{ bottom: '128px', left: '64px', transform: 'rotate(-10deg)', filter: 'drop-shadow(6px 6px 0px #000000)' }}
        width="60"
        height="50"
        viewBox="0 0 60 50"
      >
        <polygon
          points="30,5 5,45 55,45"
          fill="#FFEB3B"
          stroke="#000000"
          strokeWidth="3"
        />
      </svg>
      
      {/* Top right yellow triangle */}
      <svg
        className="absolute"
        style={{ top: '128px', right: '64px', transform: 'rotate(15deg)', filter: 'drop-shadow(6px 6px 0px #000000)' }}
        width="60"
        height="50"
        viewBox="0 0 60 50"
      >
        <polygon
          points="30,5 5,45 55,45"
          fill="#FFEB3B"
          stroke="#000000"
          strokeWidth="3"
        />
      </svg>

      {/* Pink triangle */}
      <svg
        className="absolute"
        style={{ top: '400px', left: '200px', transform: 'rotate(45deg)', filter: 'drop-shadow(6px 6px 0px #000000)' }}
        width="60"
        height="50"
        viewBox="0 0 60 50"
      >
        <polygon
          points="30,5 5,45 55,45"
          fill="rgb(238,125,206)"
          stroke="#000000"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
}

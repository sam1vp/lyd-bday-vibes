'use client';

export default function NeobrutalistBalloon() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="neobrutalist-balloon">
        <svg
          width="80"
          height="100"
          viewBox="0 0 80 100"
          className="balloon-svg"
        >
          {/* Balloon body */}
          <ellipse
            cx="40"
            cy="45"
            rx="30"
            ry="40"
            fill="#FFEB3B"
            stroke="#000000"
            strokeWidth="3"
          />
          {/* Balloon highlight */}
          <ellipse
            cx="35"
            cy="35"
            rx="12"
            ry="18"
            fill="#FFF59D"
            opacity="0.8"
          />
          {/* String */}
          <line
            x1="40"
            y1="85"
            x2="40"
            y2="100"
            stroke="#000000"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <style jsx>{`
        .neobrutalist-balloon {
          animation: spin-float 4s ease-in-out infinite;
        }
        
        @keyframes spin-float {
          0% {
            transform: rotate(0deg) translateY(0px);
          }
          25% {
            transform: rotate(90deg) translateY(-8px);
          }
          50% {
            transform: rotate(180deg) translateY(-12px);
          }
          75% {
            transform: rotate(270deg) translateY(-8px);
          }
          100% {
            transform: rotate(360deg) translateY(0px);
          }
        }
        
        .balloon-svg {
          filter: drop-shadow(4px 4px 0px #000000);
        }
      `}</style>
    </div>
  );
}


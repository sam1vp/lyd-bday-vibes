'use client';

interface AnnotationProps {
  text: string;
  textStyle?: React.CSSProperties;
  linePath: string;
  lineViewBox?: string;
  lineWidth?: string;
  lineHeight?: string;
  lineStyle?: React.CSSProperties;
  startCircleX?: string;
  startCircleY?: string;
  endCircleX?: string;
  endCircleY?: string;
}

export default function Annotation({ 
  text,
  textStyle = { left: '50%', top: '0', transform: 'translateX(-50%)' },
  linePath,
  lineViewBox = '0 0 200 80',
  lineWidth = '200',
  lineHeight = '80',
  lineStyle,
  startCircleX,
  startCircleY,
  endCircleX,
  endCircleY
}: AnnotationProps) {
  return (
    <div className="absolute pointer-events-none">
      {/* Annotation text */}
      <div 
        className="absolute"
        style={textStyle}
      >
        <span 
          className="text-2xl md:text-3xl text-black"
          style={{ 
            fontFamily: 'var(--font-caveat), cursive', 
            fontWeight: 700,
            whiteSpace: text.includes('\n') ? 'normal' : (textStyle?.whiteSpace || 'nowrap')
          }}
        >
          {text.split('\n').map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
        </span>
      </div>
      
      {/* Line pointing to target */}
      <svg
        className="absolute"
        width={lineWidth}
        height={lineHeight}
        viewBox={lineViewBox}
        style={lineStyle}
      >
        <path
          d={linePath}
          stroke="black"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {(startCircleX && startCircleY) && (
          <circle cx={startCircleX} cy={startCircleY} r="3" fill="black" />
        )}
        {(endCircleX && endCircleY) && (
          <circle cx={endCircleX} cy={endCircleY} r="3" fill="black" />
        )}
      </svg>
    </div>
  );
}


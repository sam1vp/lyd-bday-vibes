'use client';

interface TitleSectionProps {
  title: string;
  text1?: string;
  text2?: string;
}

export default function TitleSection({ title, text1, text2 }: TitleSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 relative">
      {/* Container for Belated and line pointing to title */}
      <div className="relative w-full mb-6 hidden md:block" style={{ height: '60px' }}>
        {/* Belated text positioned above-left */}
        <div className="absolute left-1/2 top-0" style={{ transform: 'translateX(calc(-50% - 300px)) translateY(20px)' }}>
          <span 
            className="text-2xl md:text-3xl text-black whitespace-nowrap"
            style={{ fontFamily: 'var(--font-caveat), cursive', fontWeight: 700 }}
          >
            Belated
          </span>
        </div>
        
        {/* Line pointing down to space between "Happy" and "Birthday" */}
        <svg
          className="absolute left-1/2 top-0"
          width="200"
          height="80"
          viewBox="0 0 200 80"
          style={{ transform: 'translateX(calc(-50% - 160px)) translateY(40px)' }}
        >
          <path
            d="M 0 10 Q 60 30 120 70"
            stroke="black"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="120" cy="70" r="3" fill="black" />
        </svg>
      </div>

      {/* Main Title */}
      <div className="relative inline-block">
        <h1 
          className="animated-cursive-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-black text-center"
          style={{ fontFamily: 'var(--font-sora), sans-serif', fontWeight: 900 }}
        >
          {title.split('').map((char, index) => (
            <span
              key={index}
              className="inline-block"
              style={{
                animation: `drawLetter 0.4s ease-out ${index * 0.08}s both`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
      </div>

      {/* Subheader text1 */}
      {text1 && (
        <h2 
          className="mt-4 text-2xl md:text-3xl lg:text-4xl text-black text-center"
          style={{ fontFamily: 'var(--font-sora), sans-serif', fontWeight: 600 }}
        >
          {text1}
        </h2>
      )}

      <style jsx global>{`
        @keyframes drawLetter {
          0% {
            opacity: 0;
            transform: translateY(30px) rotate(-5deg) scale(0.7);
          }
          60% {
            opacity: 1;
            transform: translateY(-8px) rotate(2deg) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

'use client';

interface AnimatedTitleProps {
  text: string;
}

export default function AnimatedTitle({ text }: AnimatedTitleProps) {
  return (
    <div className="flex items-center justify-center py-8 px-4">
      <h1 
        className="animated-cursive-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-black"
        style={{ fontFamily: 'var(--font-sora), sans-serif', fontWeight: 900 }}
      >
        {text.split('').map((char, index) => (
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

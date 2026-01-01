'use client';

export default function NewsTicker() {
  // Create a single item unit
  const tickerItem = (
    <div className="flex items-center gap-4 whitespace-nowrap">
      <span>Vibe Coding</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <path
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          fill="rgb(238,125,206)"
        />
      </svg>
    </div>
  );

  // Duplicate for seamless loop
  const horizontalItems = Array(30).fill(null).map((_, i) => (
    <div key={i}>{tickerItem}</div>
  ));

  // Vertical items with icons (cake, star, computer)
  const verticalIconItem = (iconType: string) => (
    <div className="flex items-center justify-center" style={{ color: 'rgb(238,125,206)' }}>
      {iconType === 'cake' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2zm4.6 9.99l-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V21c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-4.61c-.56.38-1.23.61-1.96.61-.92 0-1.79-.36-2.44-1.01zM18 9h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v1.54c0 1.08.88 1.96 1.96 1.96.52 0 1.02-.2 1.38-.57l2.14-2.13 2.13 2.13c.74.74 2.03.74 2.77 0l2.14-2.13 2.13 2.13c.37.37.86.57 1.38.57 1.08 0 1.96-.88 1.96-1.96V12C21 10.34 19.66 9 18 9z"/>
        </svg>
      )}
      {iconType === 'star' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      )}
      {iconType === 'computer' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
        </svg>
      )}
    </div>
  );

  const iconSequence = ['cake', 'star', 'computer'];
  const verticalItems = Array(50).fill(null).map((_, i) => (
    <div key={i} className="vertical-ticker-item">
      {verticalIconItem(iconSequence[i % 3])}
    </div>
  ));

  const tickerStyle = {
    fontFamily: 'var(--font-sora), sans-serif',
    color: 'rgb(238,125,206)',
    fontSize: '16px',
    fontWeight: '400',
    backgroundColor: 'rgb(71,26,234)',
  };

  return (
    <>
      {/* Top border */}
      <div 
        className="fixed top-0 left-0 right-0 z-50 overflow-hidden border-b-4 border-black"
        style={{ 
          height: '30px',
          ...tickerStyle,
        }}
      >
        <div className="flex items-center h-full scroll-left">
          {horizontalItems}
        </div>
      </div>

      {/* Bottom border */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden border-t-4 border-black"
        style={{ 
          height: '30px',
          ...tickerStyle,
        }}
      >
        <div className="flex items-center h-full scroll-right">
          {horizontalItems}
        </div>
      </div>

      {/* Left border - scrolls down */}
      <div 
        className="fixed top-0 bottom-0 left-0 z-50 overflow-hidden border-r-4 border-black"
        style={{ 
          width: '30px',
          ...tickerStyle,
        }}
      >
        <div className="vertical-scroll-wrapper scroll-down-vertical">
          <div className="vertical-content">
            {verticalItems}
          </div>
          <div className="vertical-content">
            {verticalItems}
          </div>
        </div>
      </div>

      {/* Right border - scrolls up */}
      <div 
        className="fixed top-0 bottom-0 right-0 z-50 overflow-hidden border-l-4 border-black"
        style={{ 
          width: '30px',
          ...tickerStyle,
        }}
      >
        <div className="vertical-scroll-wrapper scroll-up-vertical">
          <div className="vertical-content">
            {verticalItems}
          </div>
          <div className="vertical-content">
            {verticalItems}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        
        .scroll-right {
          animation: scroll-right 30s linear infinite;
        }
        
        .vertical-scroll-wrapper {
          display: flex;
          flex-direction: column;
          height: 200%;
        }
        
        .vertical-content {
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }
        
        .vertical-ticker-item {
          height: 30px;
          width: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          flex-shrink: 0;
        }
        
        .vertical-ticker-item > div {
          transform: rotate(90deg);
          transform-origin: center;
        }
        
        .scroll-down-vertical {
          animation: scroll-down-vertical 25s linear infinite;
        }
        
        .scroll-up-vertical {
          animation: scroll-up-vertical 25s linear infinite;
        }
        
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        @keyframes scroll-down-vertical {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        
        @keyframes scroll-up-vertical {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

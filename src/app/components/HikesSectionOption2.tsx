'use client';

import Image from 'next/image';
import type { Hike } from '../utils/loadData';

interface HikesSectionProps {
  title: string;
  hikes: Hike[];
}

export default function HikesSectionOption2({ title, hikes }: HikesSectionProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="border-4 border-black rounded-lg p-8 bg-white mb-8" style={{ boxShadow: '8px 8px 0px 0px #000000' }}>
        <h2 
          className="text-3xl md:text-4xl font-bold text-black text-center"
          style={{ fontFamily: 'var(--font-sora), sans-serif', fontWeight: 700 }}
        >
          {title}
        </h2>
      </div>
      <div className="space-y-6">
        {hikes.map((hike, index) => (
          <div
            key={hike.id}
            className="border-4 border-black rounded-lg p-6 bg-white flex flex-col md:flex-row gap-6"
            style={{ boxShadow: '6px 6px 0px 0px #000000', transform: index % 2 === 0 ? 'rotate(-0.5deg)' : 'rotate(0.5deg)' }}
          >
            {hike.image && (
              <div className="md:w-1/3 overflow-hidden rounded-lg border-2 border-black flex-shrink-0">
                <Image
                  src={hike.image}
                  alt={hike.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-black mb-3" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
                {hike.title}
              </h3>
              <p className="text-black mb-4">{hike.description}</p>
              <div className="flex gap-3 flex-wrap">
                <a
                  href={hike.alltrails}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-black text-white font-bold rounded-lg border-2 border-black hover:bg-gray-800 transition-colors"
                  style={{ boxShadow: '3px 3px 0px 0px #000000' }}
                >
                  AllTrails
                </a>
                <a
                  href={hike.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white text-black font-bold rounded-lg border-2 border-black hover:bg-gray-100 transition-colors"
                  style={{ boxShadow: '3px 3px 0px 0px #000000' }}
                >
                  Directions
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


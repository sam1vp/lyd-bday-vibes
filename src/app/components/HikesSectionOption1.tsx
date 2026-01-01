'use client';

import Image from 'next/image';
import type { Hike } from '../utils/loadData';

interface HikesSectionProps {
  title: string;
  hikes: Hike[];
}

export default function HikesSectionOption1({ title, hikes }: HikesSectionProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <h2 
        className="text-3xl md:text-4xl font-bold text-black mb-8 text-center"
        style={{ fontFamily: 'var(--font-sora), sans-serif', fontWeight: 700 }}
      >
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hikes.map((hike) => (
          <div
            key={hike.id}
            className="border-4 border-black rounded-lg p-6 bg-white"
            style={{ boxShadow: '8px 8px 0px 0px #000000' }}
          >
            {hike.image && (
              <div className="mb-4 overflow-hidden rounded-lg border-2 border-black">
                <Image
                  src={hike.image}
                  alt={hike.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
              </div>
            )}
            <h3 className="text-2xl font-bold text-black mb-3" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
              {hike.title}
            </h3>
            <p className="text-black mb-4">{hike.description}</p>
            <div className="flex gap-3">
              <a
                href={hike.alltrails}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-black text-white font-bold rounded-lg border-2 border-black hover:bg-gray-800 transition-colors"
                style={{ boxShadow: '4px 4px 0px 0px #000000' }}
              >
                AllTrails
              </a>
              <a
                href={hike.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white text-black font-bold rounded-lg border-2 border-black hover:bg-gray-100 transition-colors"
                style={{ boxShadow: '4px 4px 0px 0px #000000' }}
              >
                Directions
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


'use client';

import Image from 'next/image';
import type { Hike } from '../utils/loadData';

interface HikesSectionProps {
  title: string;
  hikes: Hike[];
}

export default function HikesSectionOption3({ title, hikes }: HikesSectionProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <h2 
        className="text-3xl md:text-4xl font-bold text-black mb-8 text-center"
        style={{ fontFamily: 'var(--font-sora), sans-serif', fontWeight: 700 }}
      >
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-8">
        {hikes.map((hike) => (
          <div
            key={hike.id}
            className="border-4 border-black p-6 bg-white relative"
            style={{ boxShadow: '10px 10px 0px 0px #000000' }}
          >
            {/* Decorative corner accent */}
            <div 
              className="absolute -top-2 -left-2 w-8 h-8 border-l-4 border-t-4 border-black bg-white"
            />
            <div 
              className="absolute -bottom-2 -right-2 w-8 h-8 border-r-4 border-b-4 border-black bg-white"
            />
            
            <div className="grid md:grid-cols-3 gap-6">
              {hike.image && (
                <div className="md:col-span-1 overflow-hidden border-4 border-black">
                  <Image
                    src={hike.image}
                    alt={hike.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-black mb-3" style={{ fontFamily: 'var(--font-sora), sans-serif' }}>
                  {hike.title}
                </h3>
                <p className="text-black mb-4">{hike.description}</p>
                <div className="flex gap-3">
                  <a
                    href={hike.alltrails}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 bg-black text-white font-bold border-2 border-black hover:bg-gray-800 transition-colors"
                    style={{ boxShadow: '4px 4px 0px 0px #000000' }}
                  >
                    AllTrails
                  </a>
                  <a
                    href={hike.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 bg-white text-black font-bold border-2 border-black hover:bg-gray-100 transition-colors"
                    style={{ boxShadow: '4px 4px 0px 0px #000000' }}
                  >
                    Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


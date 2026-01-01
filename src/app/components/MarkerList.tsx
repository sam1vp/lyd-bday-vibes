'use client';

import Image from 'next/image';
import type { Marker } from '../utils/loadData';

interface MarkerListProps {
  markers: Marker[];
  onMarkerClick?: (marker: Marker) => void;
}

export default function MarkerList({ markers, onMarkerClick }: MarkerListProps) {
  return (
    <div className="h-full overflow-y-auto p-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {markers.map((marker) => (
          <div
            key={marker.id}
            className="border-4 border-black rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
            style={{ boxShadow: '4px 4px 0px 0px #000000' }}
            onClick={() => onMarkerClick?.(marker)}
          >
            {marker.image && (
              <div className="mb-3 overflow-hidden rounded-lg border-2 border-black">
                <Image
                  src={marker.image}
                  alt={marker.title}
                  width={400}
                  height={300}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}
            <h3 className="text-xl font-bold text-black mb-2">{marker.title}</h3>
            <p className="text-sm text-black">{marker.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


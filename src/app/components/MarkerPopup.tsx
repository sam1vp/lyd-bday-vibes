'use client';

import Image from 'next/image';
import { Marker } from '../utils/loadData';

interface MarkerPopupProps {
  marker: Marker;
}

export default function MarkerPopup({ marker }: MarkerPopupProps) {
  return (
    <div className="max-w-sm">
      <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
        {marker.title}
      </h2>

      {marker.image && (
        <div className="mb-3 overflow-hidden rounded-lg">
          <Image
            src={marker.image}
            alt={marker.title}
            width={400}
            height={300}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      <p className="text-sm text-gray-700 dark:text-gray-300">{marker.description}</p>
    </div>
  );
}


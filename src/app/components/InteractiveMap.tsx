'use client';

import { useState, useCallback, useRef } from 'react';
import Map, { Marker as MapMarker, MapRef, Popup } from 'react-map-gl';
import type { Marker } from '../utils/loadData';
import MarkerPopup from './MarkerPopup';

interface InteractiveMapProps {
  center: {
    lat: number;
    lng: number;
    zoom: number;
  };
  markers: Marker[];
}

export default function InteractiveMap({ center, markers }: InteractiveMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!mapboxToken) {
    return (
      <div className="flex h-[600px] items-center justify-center rounded-lg border border-red-300 bg-red-50 dark:bg-red-900/20">
        <p className="text-red-600 dark:text-red-400">
          Mapbox token not configured. Please set NEXT_PUBLIC_MAPBOX_TOKEN in your environment variables.
        </p>
      </div>
    );
  }

  const handleMarkerClick = useCallback(
    (marker: Marker) => {
      // Center the map on the marker without changing zoom
      if (mapRef.current) {
        const currentZoom = mapRef.current.getZoom();
        mapRef.current.flyTo({
          center: [marker.lng, marker.lat],
          zoom: currentZoom,
          duration: 1000,
        });
      }

      // Open the popup
      setSelectedMarker(marker);
    },
    []
  );

  const handleClosePopup = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700">
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        initialViewState={{
          longitude: center.lng,
          latitude: center.lat,
          zoom: center.zoom,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/light-v11"
      >
        {markers.map((marker) => (
          <MapMarker
            key={marker.id}
            longitude={marker.lng}
            latitude={marker.lat}
            anchor="bottom"
            onClick={() => handleMarkerClick(marker)}
          >
            <button
              className="cursor-pointer transform transition-transform hover:scale-110"
              aria-label={`Marker: ${marker.title}`}
            >
              <svg
                width="30"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  fill="#dc2626"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </MapMarker>
        ))}

        {selectedMarker && (
          <Popup
            longitude={selectedMarker.lng}
            latitude={selectedMarker.lat}
            anchor="bottom"
            onClose={handleClosePopup}
            closeButton={true}
            closeOnClick={false}
            className="custom-popup"
          >
            <MarkerPopup marker={selectedMarker} />
          </Popup>
        )}
      </Map>
    </div>
  );
}

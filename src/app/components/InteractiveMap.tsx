'use client';

import { useState, useCallback, useRef } from 'react';
import Map, { Marker as MapMarker, MapRef, Popup } from 'react-map-gl';
import type { Marker } from '../utils/loadData';
import MarkerPopup from './MarkerPopup';
import MarkerList from './MarkerList';

interface InteractiveMapProps {
  center: {
    lat: number;
    lng: number;
    zoom: number;
    section_title: string;
  };
  markers: Marker[];
}

export default function InteractiveMap({ center, markers }: InteractiveMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

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
      // Center the map significantly north of the marker so popup doesn't get cut off
      if (mapRef.current) {
        const currentZoom = mapRef.current.getZoom();
        // Offset north by approximately 0.008 degrees (roughly 4-5 inches at zoom 13-15)
        const offsetNorth = 0.008;
        mapRef.current.flyTo({
          center: [marker.lng, marker.lat + offsetNorth],
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

  const handleListMarkerClick = useCallback(
    (marker: Marker) => {
      setViewMode('map');
      // Use setTimeout to ensure map is visible before centering
      setTimeout(() => {
        if (mapRef.current) {
          const currentZoom = mapRef.current.getZoom();
          const offsetNorth = 0.008;
          mapRef.current.flyTo({
            center: [marker.lng, marker.lat + offsetNorth],
            zoom: currentZoom,
            duration: 1000,
          });
        }
        setSelectedMarker(marker);
      }, 100);
    },
    []
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Section Title */}
      <h2 
        className="text-3xl md:text-4xl font-bold text-black mb-6 text-center"
        style={{ fontFamily: 'var(--font-sora), sans-serif', fontWeight: 700 }}
      >
        {center.section_title}
      </h2>
      <div className="relative h-[600px] w-full overflow-hidden rounded-2xl border-4 border-black" style={{ boxShadow: '8px 8px 0px 0px #000000' }}>
      {/* Toggle Buttons */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setViewMode('map')}
          className={`px-4 py-2 rounded-lg border-2 border-black font-bold text-sm transition-colors ${
            viewMode === 'map'
              ? 'bg-black text-white'
              : 'bg-white text-black hover:bg-gray-100'
          }`}
          style={{ boxShadow: '4px 4px 0px 0px #000000' }}
        >
          Map
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`px-4 py-2 rounded-lg border-2 border-black font-bold text-sm transition-colors ${
            viewMode === 'list'
              ? 'bg-black text-white'
              : 'bg-white text-black hover:bg-gray-100'
          }`}
          style={{ boxShadow: '4px 4px 0px 0px #000000' }}
        >
          List
        </button>
      </div>

      {viewMode === 'list' ? (
        <MarkerList markers={markers} onMarkerClick={handleListMarkerClick} />
      ) : (
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
        {/* House icon at center location (pink, no popup) */}
        <MapMarker
          longitude={center.lng}
          latitude={center.lat}
          anchor="bottom"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
              fill="rgb(238,125,206)"
              stroke="white"
              strokeWidth="1.5"
            />
          </svg>
        </MapMarker>

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
                  fill="rgb(71,26,234)"
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
      )}
      </div>
    </div>
  );
}

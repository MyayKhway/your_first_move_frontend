import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define the props interface
interface MapComponentProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  title?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  latitude,
  longitude,
  zoom = 13,
  title = 'Location'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Initialize the map if it doesn't exist yet
    if (mapRef.current && !mapInstanceRef.current) {
      // Create map instance
      mapInstanceRef.current = L.map(mapRef.current).setView([latitude, longitude], zoom);

      // Add tile layer (OpenStreetMap)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);

      // Add marker with popup
      L.marker([latitude, longitude])
        .addTo(mapInstanceRef.current)
        .bindPopup(title)
        .openPopup();
    }

    // Update map view if coordinates change
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([latitude, longitude], zoom);

      // Clear existing markers
      mapInstanceRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current?.removeLayer(layer);
        }
      });

      // Add new marker
      L.marker([latitude, longitude])
        .addTo(mapInstanceRef.current)
        .bindPopup(title)
        .openPopup();
    }

    // Cleanup function to handle component unmounting
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, zoom, title]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default MapComponent;

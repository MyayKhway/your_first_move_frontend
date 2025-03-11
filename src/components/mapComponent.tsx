/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface LocationPickerProps {
  initialLocation?: Location;
  onLocationChange: (location: Location) => void;
}

// This component recensters the map when location changes
const MapController: React.FC<{
  center: [number, number];
}> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center);
  }, [center, map]);

  return null;
};

// This component handles the actual marker movement
const DraggableMarker: React.FC<{
  position: [number, number];
  onPositionChange: (lat: number, lng: number) => void;
}> = ({ position, onPositionChange }) => {
  const markerRef = useRef<L.Marker>(null);
  const map = useMap();

  useEffect(() => {
    // Make sure marker is at correct position when props change
    if (markerRef.current) {
      markerRef.current.setLatLng(position);
    }
  }, [position]);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker) {
        const newPosition = marker.getLatLng();
        onPositionChange(newPosition.lat, newPosition.lng);
      }
    },
  };

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
};

// This component handles map clicks
const MapEvents: React.FC<{
  onMapClick: (lat: number, lng: number) => void;
}> = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

export const LocationPicker: React.FC<LocationPickerProps> = ({
  initialLocation = { lat: 40.7128, lng: -74.006 }, // Default to NYC
  onLocationChange,
}) => {
  const [location, setLocation] = useState<Location>(initialLocation);
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');

  // Set initial address if available
  useEffect(() => {
    if (initialLocation.address) {
      setAddress(initialLocation.address);
    } else if (initialLocation.lat && initialLocation.lng) {
      // Try to fetch address for initial location
      fetchAddress(initialLocation.lat, initialLocation.lng);
    }
  }, [initialLocation]);

  const fetchAddress = (lat: number, lng: number) => {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      .then(response => response.json())
      .then(data => {
        const addressText = data.display_name || '';
        setAddress(addressText);
      })
      .catch(error => {
        console.error('Error fetching address:', error);
      });
  };

  const handleLocationChange = (lat: number, lng: number) => {
    const newLocation = { lat, lng };
    setLocation(newLocation);

    // Reverse geocode to get address
    fetchAddress(lat, lng);
    onLocationChange({ ...newLocation, address });
  };

  const handleMapModalOpen = () => {
    setIsMapModalOpen(true);
  };

  const handleMapModalClose = () => {
    setIsMapModalOpen(false);
  };

  const handleSaveLocation = () => {
    onLocationChange({ ...location, address });
    handleMapModalClose();
  };

  // Position as a tuple for Leaflet
  const position: [number, number] = [location.lat, location.lng];

  return (
    <div className="w-full">
      {/* Preview Map (Small) */}
      {!isMapModalOpen &&
        <div
          className="w-full h-48 rounded-lg overflow-hidden shadow-md cursor-pointer relative"
          onClick={handleMapModalOpen}
        >
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
            attributionControl={false}
            dragging={false}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position} />
            <MapController center={position} />
          </MapContainer>
          <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-70 text-white p-2 text-sm">
            {address ? (
              <p className="truncate">{address}</p>
            ) : (
              <p>Click to set dealership location</p>
            )}
          </div>
        </div>
      }

      {/* Location information display */}
      <div className="mt-2 text-sm text-gray-600">
        <p>Address: {address.length > 0 ? address : "No address."}</p>
      </div>

      {/* Modal for the larger map */}
      {isMapModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl">
            <h2 className="text-xl font-bold mb-4">Set Dealership Location</h2>

            <div className="h-96 rounded-lg overflow-hidden mb-4">
              <MapContainer
                center={position}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <DraggableMarker
                  position={position}
                  onPositionChange={handleLocationChange}
                />
                <MapEvents onMapClick={handleLocationChange} />
                <MapController center={position} />
              </MapContainer>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address will be automatically populated when you move the pin"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                onClick={handleMapModalClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={handleSaveLocation}
              >
                Save Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;

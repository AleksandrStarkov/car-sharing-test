import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  coords: { lat: number; lng: number };
}

const Map: React.FC<MapProps> = ({ coords }) => {
  const position: [number, number] = [coords.lat, coords.lng];

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "8px",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup data-testid="map-placeholder">
          Map:{coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;

import React from "react";

interface MapPlaceholderProps {
  coords: { lat: number; lng: number };
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ coords }) => {
  return (
    <div
      data-testid="map-placeholder"
      style={{
        height: "120px",
        backgroundColor: "#f0f9ff",
        border: "1px solid #d0e8ff",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#0066ff",
        fontSize: "14px",
        fontWeight: 500,
      }}
    >
      Map: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
    </div>
  );
};

export default MapPlaceholder;

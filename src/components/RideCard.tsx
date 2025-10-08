import React from "react";
import { Card } from "antd-mobile";
import Map from "./Map";
import MapPlaceholder from "./MapPlaceholder";
interface Ride {
  id: string;
  from: string;
  to: string;
  when: string;
  coords: { lat: number; lng: number };
}

interface RideCardProps {
  ride: Ride;
  showMap: boolean;
}

const RideCard: React.FC<RideCardProps> = ({ ride, showMap }) => {
  const date = new Date(ride.when).toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card
      style={{
        marginBottom: "12px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ padding: "12px 0" }}>
        <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px" }}>
          {ride.from} → {ride.to}
        </div>
        <div style={{ color: "#666", fontSize: "14px", marginBottom: "12px" }}>
          {date}
        </div>
        {showMap ? (
          <MapPlaceholder coords={ride.coords} />
        ) : (
          <div
            data-testid="map-disabled"
            style={{
              padding: "12px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              textAlign: "center",
              color: "#888",
              fontSize: "14px",
            }}
          >
            Map disabled
          </div>
        )}
      </div>
    </Card>
  );
};

export default RideCard;

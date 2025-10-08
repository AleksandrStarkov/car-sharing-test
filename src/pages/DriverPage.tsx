import React, { useEffect, useState } from "react";
import { Empty, Loading } from "antd-mobile";
import { useFeatureFlags } from "../store/featureFlags";
import { getRides } from "../api/mock-api";
import RideCard from "../components/RideCard";

interface Ride {
  id: string;
  role: "passenger" | "driver";
  from: string;
  to: string;
  when: string;
  coords: { lat: number; lng: number };
}

const DriverPage: React.FC = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMapEnabled = useFeatureFlags((state) =>
    state.isEnabled("driverRouteMapPreview")
  );

  useEffect(() => {
    const loadRides = async () => {
      try {
        setLoading(true);
        const data = await getRides("driver");
        setRides(
          data.rides.map((ride) => ({
            ...ride,
            role: ride.role === "driver" ? "driver" : "passenger",
          }))
        );
      } catch (err) {
        setError("Failed to load rides");
      } finally {
        setLoading(false);
      }
    };
    loadRides();
  }, []);

  if (loading) {
    return (
      <div
        data-testid="loading-indicator"
        style={{ padding: "40px", textAlign: "center" }}
      >
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div style={{ padding: "20px", color: "red" }}>{error}</div>;
  }

  return (
    <div
      style={{ padding: "16px", backgroundColor: "#fff", minHeight: "100vh" }}
    >
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px" }}>
        My Rides (Driver)
      </h2>
      {rides.length === 0 ? (
        <Empty description="No scheduled rides" style={{ padding: "32px 0" }} />
      ) : (
        rides.map((ride) => (
          <RideCard key={ride.id} ride={ride} showMap={isMapEnabled} />
        ))
      )}
    </div>
  );
};

export default DriverPage;

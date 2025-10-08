export const allRides = [
  {
    id: "r1",
    role: "passenger",
    from: "Kyiv",
    to: "Fastiv",
    when: "2025-09-27T08:30:00+03:00",
    coords: { lat: 50.4501, lng: 30.5234 },
  },
  {
    id: "r2",
    role: "driver",
    from: "Kyiv",
    to: "Lviv",
    when: "2025-09-27T12:15:00+03:00",
    coords: { lat: 49.8397, lng: 24.0297 },
  },
];

export const getRides = async (role?: "passenger" | "driver") => {
  const rides = role ? allRides.filter((ride) => ride.role === role) : allRides;
  return { rides };
};

export const getFlags = async () => ({
  passengerRouteMap: true,
  driverRouteMapPreview: false,
});

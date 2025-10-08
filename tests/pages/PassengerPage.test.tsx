import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import PassengerPage from "../../src/pages/PassengerPage";
import * as api from "../../src/api/mock-api";
import { useFeatureFlags } from "../../src/store/featureFlags";

vi.mock("../../src/store/featureFlags", () => ({
  useFeatureFlags: vi.fn(),
}));

const mockPassengerRide = {
  id: "r1",
  role: "passenger" as const,
  from: "Kyiv",
  to: "Fastiv",
  when: "2025-09-27T08:30:00+03:00",
  coords: { lat: 50.4501, lng: 30.5234 },
};

describe("PassengerPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows map placeholder when passengerRouteMap is enabled", async () => {
    vi.mocked(useFeatureFlags).mockImplementation((selector) =>
      selector({
        flags: {
          passengerRouteMap: true,
          driverRouteMapPreview: false,
        },
        isLoading: false,
        error: null,
        loadFlags: async () => {},
        enable: vi.fn(),
        disable: vi.fn(),
        isEnabled: (key) => key === "passengerRouteMap",
      })
    );

    vi.spyOn(api, "getRides").mockResolvedValue({ rides: [mockPassengerRide] });

    render(<PassengerPage />);

    await waitFor(() => {
      expect(screen.getByText("Kyiv → Fastiv")).toBeInTheDocument();
    });

    expect(screen.getByText(/Map:/)).toBeInTheDocument();
  });

  it('shows "Map disabled" when passengerRouteMap is disabled', async () => {
    vi.mocked(useFeatureFlags).mockImplementation((selector) =>
      selector({
        flags: {
          passengerRouteMap: false,
          driverRouteMapPreview: true,
        },
        isLoading: false,
        error: null,
        loadFlags: async () => {},
        enable: vi.fn(),
        disable: vi.fn(),
        isEnabled: () => false,
      })
    );

    vi.spyOn(api, "getRides").mockResolvedValue({ rides: [mockPassengerRide] });

    render(<PassengerPage />);

    await waitFor(() => {
      expect(screen.getByText("Kyiv → Fastiv")).toBeInTheDocument();
    });

    expect(screen.getByText("Map disabled")).toBeInTheDocument();
  });

  it("shows empty state when no rides", async () => {
    vi.mocked(useFeatureFlags).mockImplementation((selector) =>
      selector({
        flags: {
          passengerRouteMap: true,
          driverRouteMapPreview: false,
        },
        isLoading: false,
        error: null,
        loadFlags: async () => {},
        enable: vi.fn(),
        disable: vi.fn(),
        isEnabled: () => true,
      })
    );

    vi.spyOn(api, "getRides").mockResolvedValue({ rides: [] });

    render(<PassengerPage />);

    await waitFor(() => {
      expect(screen.getByText("No scheduled rides")).toBeInTheDocument();
    });
  });

  it("shows loading indicator initially", () => {
    vi.spyOn(api, "getRides").mockImplementation(() => new Promise(() => {}));

    render(<PassengerPage />);

    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
  });

  it("shows error message on API failure", async () => {
    vi.spyOn(api, "getRides").mockRejectedValue(new Error("Network error"));

    render(<PassengerPage />);

    await waitFor(() => {
      expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
    });
  });
});

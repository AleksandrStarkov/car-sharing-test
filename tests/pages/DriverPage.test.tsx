import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DriverPage from "../../src/pages/DriverPage";
import * as api from "../../src/api/mock-api";
import { useFeatureFlags } from "../../src/store/featureFlags";

vi.mock("../../src/store/featureFlags", () => ({
  useFeatureFlags: vi.fn(),
}));

const mockDriverRide = {
  id: "r2",
  role: "driver" as const,
  from: "Kyiv",
  to: "Lviv",
  when: "2025-09-27T12:15:00+03:00",
  coords: { lat: 49.8397, lng: 24.0297 },
};

describe("DriverPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows map placeholder when driverRouteMapPreview is enabled", async () => {
    vi.mocked(useFeatureFlags).mockImplementation((selector) =>
      selector({
        flags: {
          driverRouteMapPreview: true,
          passengerRouteMap: false,
        },
        isLoading: false,
        error: null,
        loadFlags: async () => {},
        enable: vi.fn(),
        disable: vi.fn(),
        isEnabled: (key) => key === "driverRouteMapPreview",
      })
    );

    vi.spyOn(api, "getRides").mockResolvedValue({ rides: [mockDriverRide] });

    render(<DriverPage />);

    await waitFor(() => {
      expect(screen.getByText("Kyiv → Lviv")).toBeInTheDocument();
    });

    expect(screen.getByText(/Map:/)).toBeInTheDocument();
  });

  it('shows "Map disabled" when driverRouteMapPreview is disabled', async () => {
    vi.mocked(useFeatureFlags).mockImplementation((selector) =>
      selector({
        flags: {
          driverRouteMapPreview: false,
          passengerRouteMap: false,
        },
        isLoading: false,
        error: null,
        loadFlags: async () => {},
        enable: vi.fn(),
        disable: vi.fn(),
        isEnabled: () => false,
      })
    );

    vi.spyOn(api, "getRides").mockResolvedValue({ rides: [mockDriverRide] });

    render(<DriverPage />);

    await waitFor(() => {
      expect(screen.getByText("Kyiv → Lviv")).toBeInTheDocument();
    });

    expect(screen.getByText("Map disabled")).toBeInTheDocument();
  });

  it("shows empty state when no rides", async () => {
    vi.mocked(useFeatureFlags).mockImplementation((selector) =>
      selector({
        flags: {
          driverRouteMapPreview: true,
          passengerRouteMap: false,
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

    render(<DriverPage />);

    await waitFor(() => {
      expect(screen.getByText("No scheduled rides")).toBeInTheDocument();
    });
  });

  it("shows loading indicator initially", () => {
    vi.spyOn(api, "getRides").mockImplementation(() => new Promise(() => {}));

    render(<DriverPage />);

    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
  });

  it("shows error message on API failure", async () => {
    vi.spyOn(api, "getRides").mockRejectedValue(new Error("Network error"));

    render(<DriverPage />);

    await waitFor(() => {
      expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
    });
  });
});

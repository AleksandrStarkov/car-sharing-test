import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SettingsPage from "../../src/pages/SettingsPage";
import { useFeatureFlags } from "../../src/store/featureFlags";

vi.mock("../../src/store/featureFlags", () => ({
  useFeatureFlags: vi.fn(),
}));

describe("SettingsPage", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders switches with correct initial state", () => {
    const enable = vi.fn();
    const disable = vi.fn();

    (useFeatureFlags as any).mockImplementation(() => ({
      flags: {
        passengerRouteMap: true,
        driverRouteMapPreview: false,
      },
      enable,
      disable,
    }));

    render(<SettingsPage />);

    expect(screen.getByTestId("passenger-route-map-switch")).toBeChecked();
    expect(screen.getByTestId("driver-route-preview-switch")).not.toBeChecked();
  });

  it("calls enable when passenger switch is turned on", async () => {
    const enable = vi.fn();
    const disable = vi.fn();

    (useFeatureFlags as any).mockImplementation(() => ({
      flags: {
        passengerRouteMap: false,
        driverRouteMapPreview: false,
      },
      enable,
      disable,
    }));

    render(<SettingsPage />);

    await user.click(screen.getByTestId("passenger-route-map-switch"));
    expect(enable).toHaveBeenCalledWith("passengerRouteMap");
  });

  it("calls disable when passenger switch is turned off", async () => {
    const enable = vi.fn();
    const disable = vi.fn();

    (useFeatureFlags as any).mockImplementation(() => ({
      flags: {
        passengerRouteMap: true,
        driverRouteMapPreview: false,
      },
      enable,
      disable,
    }));

    render(<SettingsPage />);

    await user.click(screen.getByTestId("passenger-route-map-switch"));
    expect(disable).toHaveBeenCalledWith("passengerRouteMap");
  });

  it("updates UI when flag state changes", async () => {
    let flags = { passengerRouteMap: false, driverRouteMapPreview: false };
    const enable = vi.fn().mockImplementation(() => {
      flags.passengerRouteMap = true;
    });
    const disable = vi.fn();

    (useFeatureFlags as any).mockImplementation(() => ({
      flags,
      enable,
      disable,
    }));

    const { rerender } = render(<SettingsPage />);
    expect(screen.getByTestId("passenger-route-map-switch")).not.toBeChecked();

    await user.click(screen.getByTestId("passenger-route-map-switch"));

    flags = { ...flags, passengerRouteMap: true };
    rerender(<SettingsPage />);
    expect(screen.getByTestId("passenger-route-map-switch")).toBeChecked();
  });
});

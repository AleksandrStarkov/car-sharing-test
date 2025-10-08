import { describe, it, expect, vi, beforeEach } from "vitest";
import { act } from "@testing-library/react";
import { useFeatureFlags } from "../../src/store/featureFlags";
import * as api from "../../src/api/mock-api";

describe("useFeatureFlags", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    const { setState } = useFeatureFlags;
    setState({
      flags: { passengerRouteMap: false, driverRouteMapPreview: false },
      isLoading: false,
      error: null,
    });
  });

  it("enables and disables flags deterministically", () => {
    const { enable, disable, isEnabled } = useFeatureFlags.getState();

    enable("passengerRouteMap");
    expect(isEnabled("passengerRouteMap")).toBe(true);

    disable("passengerRouteMap");
    expect(isEnabled("passengerRouteMap")).toBe(false);
  });

  it("loads flags from API successfully", async () => {
    const mockFlags = { passengerRouteMap: true, driverRouteMapPreview: false };
    vi.spyOn(api, "getFlags").mockResolvedValue(mockFlags);

    await act(async () => {
      await useFeatureFlags.getState().loadFlags();
    });

    const state = useFeatureFlags.getState();
    expect(state.flags).toEqual(mockFlags);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("handles API errors gracefully", async () => {
    vi.spyOn(api, "getFlags").mockRejectedValue(new Error("Network error"));

    await act(async () => {
      await useFeatureFlags.getState().loadFlags();
    });

    const state = useFeatureFlags.getState();
    expect(state.error).toBe("Failed to load flags");
    expect(state.isLoading).toBe(false);
  });
});

import React from "react";
import { List, Switch } from "antd-mobile";
import { useFeatureFlags } from "../store/featureFlags";

const SettingsPage: React.FC = () => {
  const { flags, enable, disable } = useFeatureFlags();

  return (
    <div
      style={{ padding: "16px", backgroundColor: "#fff", minHeight: "100vh" }}
    >
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "16px" }}>
        Settings
      </h2>
      <List header="Features">
        <List.Item
          prefix="👤"
          title="Passenger Route Map"
          extra={
            <Switch
              data-testid="passenger-route-map-switch"
              checked={flags.passengerRouteMap}
              onChange={(checked) =>
                checked
                  ? enable("passengerRouteMap")
                  : disable("passengerRouteMap")
              }
            />
          }
        />
        <List.Item
          prefix="🚗"
          title="Driver Route Preview"
          extra={
            <Switch
              data-testid="driver-route-preview-switch"
              checked={flags.driverRouteMapPreview}
              onChange={(checked) =>
                checked
                  ? enable("driverRouteMapPreview")
                  : disable("driverRouteMapPreview")
              }
            />
          }
        />
      </List>
    </div>
  );
};

export default SettingsPage;

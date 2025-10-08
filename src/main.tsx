import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { useFeatureFlags } from "./store/featureFlags";

const useLoadFlags = () => {
  const loadFlags = useFeatureFlags((state) => state.loadFlags);
  useEffect(() => {
    loadFlags();
  }, [loadFlags]);
};

const AppWithFlags = () => {
  useLoadFlags();
  return <App />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppWithFlags />
  </React.StrictMode>
);

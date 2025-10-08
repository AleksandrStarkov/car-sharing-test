import { BrowserRouter, Routes, Route } from "react-router-dom";
import SettingsPage from "./pages/SettingsPage";
import PassengerPage from "./pages/PassengerPage";
import DriverPage from "./pages/DriverPage";
import NavHeader from "./components/NavHeader";
import HeroPage from "./pages/HeroPage";

function App() {
  return (
    <BrowserRouter>
      <NavHeader />
      <div>
        <Routes>
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/passenger" element={<PassengerPage />} />
          <Route path="/driver" element={<DriverPage />} />
          <Route path="/" element={<HeroPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

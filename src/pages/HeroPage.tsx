import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd-mobile";

const HeroPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "93vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(160deg, #f7ff8bff 0%, #030303ff 100%)",
        color: "#fff",
        textAlign: "center",
        padding: "0 24px",
      }}
    >
      <div style={{ marginBottom: 48, fontWeight: 600, fontSize: 32 }}>
        CarSharing
      </div>

      <h1
        style={{
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 16,
          lineHeight: 1.2,
        }}
      >
        Share your ride, <br /> save time and money
      </h1>

      <p style={{ fontSize: 16, opacity: 0.9, marginBottom: 48 }}>
        Choose your mode below and start your journey now.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: "100%",
          maxWidth: 300,
        }}
      >
        <Button
          color="primary"
          size="large"
          block
          style={{
            "--background-color": "#fff",
            "--text-color": "#5B45FF",
            "--border-color": "#fff",
            fontWeight: 600,
          }}
          onClick={() => navigate("/passenger")}
        >
          I'm a Passenger
        </Button>

        <Button
          color="primary"
          size="large"
          block
          style={{
            "--background-color": "rgba(255,255,255,0.1)",
            "--text-color": "#fff",
            "--border-color": "rgba(255,255,255,0.4)",
            fontWeight: 600,
          }}
          onClick={() => navigate("/driver")}
        >
          I'm a Driver
        </Button>
      </div>
    </div>
  );
};

export default HeroPage;

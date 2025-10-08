import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Popup, List } from "antd-mobile";
import { UnorderedListOutline } from "antd-mobile-icons";

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { key: "/", label: "Home" },
    { key: "/passenger", label: "Passenger" },
    { key: "/driver", label: "Driver" },
    { key: "/settings", label: "Settings" },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 56,
          padding: "0 16px",
          borderBottom: "1px solid #eee",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          backgroundColor: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <UnorderedListOutline
          style={{ fontSize: 24, color: "#333", cursor: "pointer" }}
          onClick={() => setOpen(true)}
        />

        <Link
          to="/"
          style={{
            fontWeight: 600,
            fontSize: 18,
            textAlign: "center",
            flex: 1,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          CarSharing
        </Link>

        <div style={{ width: 24 }} />
      </div>

      <Popup
        visible={open}
        onMaskClick={() => setOpen(false)}
        position="left"
        bodyStyle={{ width: "250px" }}
      >
        <div
          style={{
            padding: "16px ",
            background: "#fff",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <List header="Menu">
            {menuItems.map((item) => (
              <List.Item
                key={item.key}
                onClick={() => handleNavigate(item.key)}
                style={{
                  background:
                    location.pathname === item.key ? "#f0f0f0" : "transparent",
                }}
              >
                {item.label}
              </List.Item>
            ))}
          </List>
        </div>
      </Popup>
    </>
  );
};

export default AppHeader;

import React, { useState, useEffect } from "react";
import "./App.css"; // Make sure your global CSS is correctly applied
import Navbar from "./components/NavBar"; // Import the Navbar component
import Footer from "./components/Footer"; // Import the Footer component
import GenAi from "./components/GenAi";
import { Toaster } from "react-hot-toast";

function App() {
  /* eslint-disable no-unused-vars */
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          // Default styles for all toasts
          style: {
            border: "1px solid #1D264C",
            padding: "7px",
            color: "#1D264C",
            backgroundColor: "#8D93A5", // Set the background color
          },
          iconTheme: {
            primary: "#1D264C",
            secondary: "#8D93A5",
          },
        }}
      />
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setToken={setToken}
      />
      <div className="tool">
        <GenAi isLoggedIn={isLoggedIn} />
      </div>
      <Footer /> {/* Render the Footer */}
    </div>
  );
}

export default App;

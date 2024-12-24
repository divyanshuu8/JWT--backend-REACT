import React, { useState } from "react";
import toast from "react-hot-toast";

const Login = ({ setIsLoggedIn, closeModal, setToken }) => {
  const [formType, setFormType] = useState("Sign-In");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle dropdown change
  const handleFormTypeChange = (event) => {
    setFormType(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      formType === "Sign-Up" &&
      formData.password !== formData.confirmPassword
    ) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const serverUrl = "http://localhost:5000";

      if (formType === "Sign-Up") {
        // Send signup data to the backend using fetch
        const response = await fetch(`${serverUrl}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });
        console.log(response);
        const result = await response.json();
        if (response.ok) {
          closeModal();
          toast.success(result.message);
          toast.success("Please Login Now");
        } else {
          toast.error(result.message || "An error occurred");
        }
      } else if (formType === "Sign-In") {
        // Send sign-in data to the backend using fetch
        const response = await fetch(`${serverUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const result = await response.json();
        if (response.ok) {
          setIsLoggedIn(true);
          setToken(result.token);
          localStorage.setItem("token", result.token);
          closeModal();
          toast.success(result.message); // Notify on successful login
        } else {
          toast.error(result.message || "An error occurred");
        }
      }
    } catch (error) {
      toast.error("An error occurred while processing your request.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="box">
      <div className="content is-normal">
        <h1>{formType}</h1>
        <div className="select is-rounded mb-4">
          <select onChange={handleFormTypeChange}>
            <option value="Sign-In">Sign-In</option>
            <option value="Sign-Up">Sign-Up</option>
          </select>
        </div>
        <form onSubmit={handleSubmit}>
          {formType === "Sign-Up" && (
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="name"
                  placeholder="Alex Snow"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                name="email"
                placeholder="e.g. alex@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {formType === "Sign-Up" && (
            <div className="field">
              <label className="label">Confirm Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="confirmPassword"
                  placeholder="Pookie123"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          <div className="is-flex is-justify-content-center mt-4">
            <button type="submit" className="button is-light">
              {formType === "Sign-In" ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

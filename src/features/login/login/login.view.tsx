import React, { useState } from "react";
import { LoginPasswordField } from "./components/login-password-field";
import { LoginButton } from "./components/login-submit-button";
import { LoginUsernameField } from "./components/login-username-field";

export function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }

    // API AUTH CALL
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
        return;
      }

      const data = await response.json();

      console.log("LOGIN SUCCESS", data); // for testing

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("roles", JSON.stringify(data.role));

      setError("");
    } catch (err) {
      console.error("LOGIN ERROR:", err); // for testing
      setError("Something went wrong.");
    }
  }
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="container rounded shadow p-4"
        style={{ height: "300px", backgroundColor: "#BAD1CD" }}
      >
        <form className="w-100" onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Login</h2>
          <div className="mb-3">
            <LoginUsernameField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <LoginPasswordField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <LoginButton />
          </div>
          <div className="mb-3 text-danger">
            <div style={{ minHeight: "1.5rem", color: "red" }}>{error}</div>
          </div>
        </form>
      </div>
    </div>
  );
}

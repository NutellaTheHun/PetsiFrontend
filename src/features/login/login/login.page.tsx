import React, { useEffect, useState } from "react";
import { getToken, getUserRoles } from "../../../util/auth";
import { ErrorMessage } from "../../shared-components/ErrorMessage";
import { LoadingWheel } from "../../shared-components/LoadingWheel";
import { authLogin } from "./api/auth-login";
import { LoginPasswordField } from "./components/login-password-field";
import { LoginButton } from "./components/login-submit-button";
import { LoginUsernameField } from "./components/login-username-field";
import { handleLoginSuccess } from "./functions/handleLoginSuccess";
import { handleNavigation } from "./functions/handleNavigation";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getToken();
    const roles = getUserRoles();
    if (token && roles) {
      handleNavigation();
    }
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }

    // API AUTH CALL
    setLoading(true);
    try {
      const result = await authLogin(username, password);
      setLoading(false);
      handleLoginSuccess(result);
      handleNavigation();
      setError("");
    } catch (err) {
      console.error("LOGIN ERROR:", err); // for testing
      setError("Something went wrong.");
      setLoading(false);
    }
  }
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="container text-center rounded shadow p-4"
        style={{ height: "300px", width: "400px", backgroundColor: "#BAD1CD" }}
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
          <div>
            {<ErrorMessage error={error} />}
            {<LoadingWheel loading={loading} />}
          </div>
        </form>
      </div>
    </div>
  );
}

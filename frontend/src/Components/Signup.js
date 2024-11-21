import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Flash from "./Flash";
import Loading from "./Loading";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useContext(AuthContext); // Destructure register from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (confirmPassword !== password) {
      setIsLoading(false);
      return setMessage({ error: "Passwords do not match!" });
    }

    const formData = {
      fullName,
      username,
      password,
    };

    try {
      await register(formData); // Use register function from context
    } catch (error) {
      setIsLoading(false);
      console.error("Registration Error:", error);
      if (error.response && error.response.data) {
        setMessage(error.response.data);
      } else {
        setMessage({ error: "Something went wrong!" });
      }
    }
  };

  return (
    <>
      <section style={{ height: "100vh" }} className="container-fluid">
        <Flash message={message} setMessage={setMessage} />
        <Loading isLoading={isLoading} />
        <div style={{ height: "100vh" }} className="row">
          <div className="p-0 col-12 col-md-6">
            <div className="authImageSignup"></div>
          </div>
          <div className="px-4 px-md-0 col-12 col-md-6">
            <form onSubmit={handleSubmit} className="authContainer">
              <h1 className="authHeading">Sign up</h1>
              <p className="authSubHeadingSignup">
                Create an Account and get Access to your personalised Player
                building Tool!
              </p>
              <div className="authInputGroup mb-4">
                <label htmlFor="name">Full name</label>
                <input
                  required
                  id="name"
                  type="text"
                  placeholder="Enter full name"
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                />
              </div>
              <div className="authInputGroup">
                <label htmlFor="email">Email address</label>
                <input
                  required
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div className="authInputGroup my-4">
                <label htmlFor="password">Password</label>
                <input
                  required
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="authInputGroup mb-5">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  required
                  id="confirmPassword"
                  type="password"
                  placeholder="Enter confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </div>
              <button type="submit" className="authSubmitButton">
                Create account
              </button>
              <p className="redirectButton">
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

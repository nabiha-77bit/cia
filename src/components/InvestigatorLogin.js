"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function InvestigatorLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Note: This API uses query params instead of request body
      const response = await axios.post(
        `/auth/investigator/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      )

      // Store investigator data in localStorage or context
      localStorage.setItem("investigator", JSON.stringify(response.data))

      // Redirect to investigator dashboard (you'll need to create this)
      navigate("/investigator-dashboard")
    } catch (err) {
      setError(err.response?.data || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h3 className="mb-0">Investigator Login</h3>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-success w-100" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
            <div className="card-footer text-center">
              <button className="btn btn-link" onClick={() => navigate("/")}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestigatorLogin

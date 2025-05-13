"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import AmberAlerts from "./AmberAlerts"

function Home() {
  const [amberAlerts, setAmberAlerts] = useState([])
  const [laws, setLaws] = useState([])
  const [helplines, setHelplines] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch amber alerts
        const alertsResponse = await axios.get("/cases/amber-alerts")
        setAmberAlerts(alertsResponse.data)

        // Fetch laws and punishments
        const lawsResponse = await axios.get("/api/laws")
        setLaws(lawsResponse.data)

        // Fetch helplines
        const helplinesResponse = await axios.get("/api/helplines")
        setHelplines(helplinesResponse.data)

        setLoading(false)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load data. Please try again later.")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="app-container">
      <div className="header">
        <h1>Crime Investigation System</h1>
        <p>Welcome to the official crime investigation portal</p>
      </div>

      <div className="login-buttons">
        <Link to="/user-login" className="btn btn-primary btn-lg">
          User Login
        </Link>
        <Link to="/investigator-login" className="btn btn-success btn-lg">
          Investigator Login
        </Link>
      </div>

      {/* Amber Alerts Section - Always visible */}
      <div className="amber-alerts-section">
        <h2 className="section-title">Amber Alerts</h2>
        {loading ? (
          <p>Loading alerts...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <AmberAlerts alerts={amberAlerts} />
        )}
      </div>

      <div className="row mt-4">
        {/* Laws and Punishments Section */}
        <div className="col-md-6">
          <h2 className="section-title">Laws and Punishments</h2>
          {loading ? (
            <p>Loading laws...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <div className="laws-list">
              {laws.slice(0, 3).map((law) => (
                <div key={law.lawID} className="card law-card mb-3">
                  <div className="card-header">{law.crime_type}</div>
                  <div className="card-body">
                    <h5 className="card-title">{law.section_name}</h5>
                    <p className="card-text">{law.punishment}</p>
                  </div>
                </div>
              ))}
              <Link to="/laws" className="btn btn-outline-primary">
                View All Laws
              </Link>
            </div>
          )}
        </div>

        {/* Helplines Section */}
        <div className="col-md-6">
          <h2 className="section-title">Emergency Helplines</h2>
          {loading ? (
            <p>Loading helplines...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <div className="helplines-list">
              {helplines.slice(0, 5).map((helpline) => (
                <div key={helpline.helplineID} className="card helpline-card mb-2">
                  <div className="card-body">
                    <h5 className="card-title">{helpline.helplinetype}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{helpline.region_area}</h6>
                    <p className="card-text">
                      <strong>{helpline.helplinenumber}</strong>
                    </p>
                  </div>
                </div>
              ))}
              <Link to="/helplines" className="btn btn-outline-success">
                View All Helplines
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home

"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

function Helplines() {
  const [helplines, setHelplines] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState("")

  useEffect(() => {
    const fetchHelplines = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/helplines")
        setHelplines(response.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching helplines:", err)
        setError("Failed to load helplines. Please try again later.")
        setLoading(false)
      }
    }

    fetchHelplines()
  }, [])

  // Get unique helpline types for filtering
  const helplineTypes = [...new Set(helplines.map((h) => h.helplinetype))]

  // Filter helplines based on selected type
  const filteredHelplines = filter ? helplines.filter((h) => h.helplinetype === filter) : helplines

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Emergency Helplines</h1>
        <Link to="/" className="btn btn-outline-secondary">
          Back to Home
        </Link>
      </div>

      <div className="mb-4">
        <div className="d-flex gap-2 flex-wrap">
          <button
            className={`btn ${filter === "" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFilter("")}
          >
            All
          </button>
          {helplineTypes.map((type) => (
            <button
              key={type}
              className={`btn ${filter === type ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="row">
          {filteredHelplines.map((helpline) => (
            <div key={helpline.helplineID} className="col-md-4 mb-3">
              <div className="card helpline-card h-100">
                <div className="card-body">
                  <h5 className="card-title">{helpline.helplinetype}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{helpline.region_area}</h6>
                  <p className="card-text">
                    <a href={`tel:${helpline.helplinenumber}`} className="btn btn-success">
                      {helpline.helplinenumber}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Helplines

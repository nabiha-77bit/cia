"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

function LawsAndPunishments() {
  const [laws, setLaws] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchLaws = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/laws")
        setLaws(response.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching laws:", err)
        setError("Failed to load laws. Please try again later.")
        setLoading(false)
      }
    }

    fetchLaws()
  }, [])

  // Filter laws based on search term
  const filteredLaws = laws.filter(
    (law) =>
      law.crime_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      law.section_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Laws and Punishments</h1>
        <Link to="/" className="btn btn-outline-secondary">
          Back to Home
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by crime type or section name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
          {filteredLaws.length === 0 ? (
            <div className="col-12">
              <p>No laws found matching your search criteria.</p>
            </div>
          ) : (
            filteredLaws.map((law) => (
              <div key={law.lawID} className="col-md-6 mb-3">
                <div className="card law-card h-100">
                  <div className="card-header">{law.crime_type}</div>
                  <div className="card-body">
                    <h5 className="card-title">{law.section_name}</h5>
                    <p className="card-text">{law.punishment}</p>
                  </div>
                  <div className="card-footer text-muted">Law ID: {law.lawID}</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default LawsAndPunishments

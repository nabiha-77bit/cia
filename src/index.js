import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import axios from "axios"

// Set base URL for all axios requests
// Replace with your Spring Boot backend URL
axios.defaults.baseURL = "http://localhost:8080"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

function AmberAlerts({ alerts }) {
  if (!alerts || alerts.length === 0) {
    return <p>No active amber alerts at this time.</p>
  }

  return (
    <div className="amber-alerts">
      {alerts.map((alert) => (
        <div key={alert.caseId} className="amber-alert">
          <div className="amber-alert-title">AMBER ALERT: {alert.crimeType}</div>
          <div className="amber-alert-details">
            <p>
              <strong>Location:</strong> {alert.location}
            </p>
            <p>
              <strong>Description:</strong> {alert.description}
            </p>
            <p>
              <strong>Reported by:</strong> {alert.reportedByName}
            </p>
            <p>
              <strong>Age:</strong> {alert.age}
            </p>
            <p>
              <strong>Date/Time:</strong> {new Date(alert.dateTime).toLocaleString()}
            </p>
            <p>
              <strong>Status:</strong> {alert.caseStatus}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AmberAlerts

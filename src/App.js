import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import UserLogin from "./components/UserLogin"
import InvestigatorLogin from "./components/InvestigatorLogin"
import LawsAndPunishments from "./components/LawsAndPunishments"
import Helplines from "./components/Helplines"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/investigator-login" element={<InvestigatorLogin />} />
        <Route path="/laws" element={<LawsAndPunishments />} />
        <Route path="/helplines" element={<Helplines />} />
      </Routes>
    </Router>
  )
}

export default App

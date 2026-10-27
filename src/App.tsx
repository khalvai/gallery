import { Routes, Route } from "react-router"
import Home from "./pages/Home.tsx"
import Art from "./pages/Art.tsx"

import "./App.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/arts/:name" element={<Art />} />
    </Routes>
  )
}

export default App

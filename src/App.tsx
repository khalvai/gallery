import { Routes, Route } from "react-router"
import Home from "./pages/Home.tsx"
import Art from "./pages/Art.tsx"
import Footer from "./components/Footer.tsx"
import "@fontsource-variable/vazirmatn"
import "./App.css"
import NotesSlider from "./pages/NoteSlider.tsx"

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/art/:slag" element={<Art />} />
          <Route path="/notes" element={<Home />} />

          <Route path="/notes/:slag" element={<NotesSlider />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App

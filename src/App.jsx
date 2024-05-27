import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home"
import Details from "./pages/Details"
import Favorites from "./pages/favorites"
import { Routes, Route } from "react-router-dom"

export default function App() {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipe/:id" element={<Details />} />
      </Routes>
    </main>
  )
}

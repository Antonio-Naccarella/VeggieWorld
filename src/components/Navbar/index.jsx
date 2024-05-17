import { useContext } from "react"
import { GlobalContext } from "../../context"
import { Link } from "react-router-dom"
import "./styles.css"

export default function Navbar() {
  const { searchParam, setSearchParam, handleSubmit } =
    useContext(GlobalContext)
  return (
    <>
      <nav className="navbar">
        <Link to={"/"}>
          <div className="icon">
            <img src="/favicon.ico" />
            <h1>VeggieWorld</h1>
          </div>
        </Link>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
          <button className="btn" type="submit">
            Search
          </button>
        </form>
        <ul className="link">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/favorites"}>Favorites</Link>
          </li>
        </ul>
      </nav>
      <div className="line"></div>
    </>
  )
}

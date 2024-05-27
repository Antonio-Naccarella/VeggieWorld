import { useContext } from "react"
import { GlobalContext } from "../../context"
import { Link, useNavigate } from "react-router-dom"
import "./styles.scss"

export default function Navbar() {
  const { searchParam, setSearchParam } = useContext(GlobalContext)

  const navigate = useNavigate()
  async function handleSubmit(e) {
    e.preventDefault()
    fetchData(searchParam)
    setSearchParam("")
    navigate("/")
  }
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
            className="search-bar"
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

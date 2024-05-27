import Card from "../../components/Card/Card"
import { useContext } from "react"
import { GlobalContext } from "../../context"
import { Link } from "react-router-dom"

export default function Favorites() {
  const { favoritesList } = useContext(GlobalContext)

  return (
    <>
      <h3>Your favorite recipes:</h3>
      <article className="display">
        {favoritesList.length !== 0 ? (
          favoritesList.map((item) => <Card item={item} />)
        ) : (
          <div className="comunication">
            <h1>Add some recipe in your favorites.</h1>
            <Link to={"/"}>
              <button className="btn2">Home</button>
            </Link>
          </div>
        )}
      </article>
    </>
  )
}

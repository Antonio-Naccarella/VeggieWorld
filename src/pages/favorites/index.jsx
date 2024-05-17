import Card from "../../components/Card"
import { useContext } from "react"
import { GlobalContext } from "../../context"

export default function Favorites() {
  const { isLoading, favoritesList } = useContext(GlobalContext)

  return (
    <>
      <h3>Your favorite recipes:</h3>
      {isLoading && <h1 className="comunication">Loading your recipes...</h1>}
      <article className="display">
        {favoritesList.length !== 0 ? (
          favoritesList.map((item) => <Card item={item} />)
        ) : (
          <h1 className="comunication">Add some recipe in your favorites.</h1>
        )}
      </article>
    </>
  )
}

import { useParams } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "../../context"
import "./styles.scss"
import useFetcher from "../../useHook/useFetcher"
import Loading from "../../components/Loading/Loading"
import Error from "../../components/Error/Error"

export default function Details() {
  const { id } = useParams()
  const { isLoading, detailsData, errorMsg, favoritesList, setFavoritesList } =
    useContext(GlobalContext)

  useFetcher(import.meta.env.VITE_DETAILS_SEARCH, id)

  function handleAddToFavorites(currentItem) {
    let newFavoritesList = [...favoritesList]
    const index = newFavoritesList.findIndex(
      (item) => item.id === currentItem.id
    )

    if (index === -1) {
      newFavoritesList.push(currentItem)
    } else {
      newFavoritesList.splice(index, 1)
    }
    setFavoritesList(newFavoritesList)
  }

  return (
    <>
      {errorMsg && <Error />}
      {isLoading && <Loading />}
      {detailsData ? (
        <article className="details">
          <h1>{detailsData.title}</h1>
          <div className="details-container">
            <div className="details-img">
              <img src={detailsData.image} />
            </div>
            <div className="informations">
              <button
                onClick={() => handleAddToFavorites(detailsData)}
                className="btn"
              >
                {favoritesList.findIndex(
                  (item) => item.id === detailsData.id
                ) !== -1
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </button>
              <div className="health-container">
                <h3>Healt score: </h3>
                <span
                  className={
                    detailsData.healthScore >= 60
                      ? "health-score"
                      : "health-score-red"
                  }
                >
                  {detailsData.healthScore}
                </span>
              </div>{" "}
              <p>Ready in {detailsData.readyInMinutes} minutes.</p>
              <h3>Recipe for {detailsData.servings} people.</h3>
            </div>
          </div>

          <div className="ingredients">
            <h3>Ingredients:</h3>
            <ul>
              {detailsData.extendedIngredients.map((item) => (
                <li>
                  <p>
                    {item.measures.metric.amount}{" "}
                    {item.measures.metric.unitLong} {item.name}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="instructions">
            <h3>Preparation:</h3>
            <ol>
              {detailsData.analyzedInstructions[0].steps.map((item) => (
                <li>{item.step}</li>
              ))}
            </ol>
          </div>
        </article>
      ) : (
        <h1 className="comunication">
          We are sorry, we didn't find your recipe.
        </h1>
      )}
    </>
  )
}

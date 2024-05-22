import { useParams } from "react-router-dom"
import { useEffect, useContext } from "react"
import { GlobalContext } from "../../context"
import axios from "axios"
import "./styles.css"

export default function Details() {
  const { id } = useParams()
  const {
    isLoading,
    setIsLoading,
    detailsData,
    setDetailsData,
    errorMsg,
    setErrorMsg,
    favoritesList,
    handleAddToFavorites,
  } = useContext(GlobalContext)

  async function fetchDetailsData() {
    setIsLoading(true)
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information`,
        {
          params: {
            includeNutrition: false,
            addWinePairing: false,
            addTasteData: false,
            apiKey: import.meta.env.API_KEY,
          },
        }
      )
      setDetailsData(response.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setErrorMsg("Error: " + error.message)
    }
  }

  useEffect(() => {
    fetchDetailsData()
  }, [])
  return (
    <>
      {errorMsg && <h1 className="comunication">{errorMsg}</h1>}
      {isLoading && <h1 className="comunication">Loading...</h1>}
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

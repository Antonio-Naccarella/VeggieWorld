import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const GlobalContext = createContext(null)

export default function GlobalState({ children }) {
  const navigate = useNavigate()

  const [searchParam, setSearchParam] = useState("")
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [detailsData, setDetailsData] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [favoritesList, setFavoritesList] = useState([])

  async function fetchData(param) {
    setIsLoading(true)
    try {
      const response = await axios.get(
        "https://api.spoonacular.com/recipes/complexSearch",
        {
          params: {
            query: param,
            addRecipeInformation: true,
            diet: "vegetarian",
            number: 20,
            apiKey: import.meta.env.VITE_API_KEY,
          },
        }
      )
      if (response?.data?.results) {
        setData(response.data.results)
        setIsLoading(false)
        navigate("/")
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      if (error.response.status === 401) {
        setErrorMsg("We had some problem, please retry later.")
      }
    }
  }
  async function handleSubmit(e) {
    e.preventDefault()
    fetchData(searchParam)
    setSearchParam("")
  }

  useEffect(() => {
    fetchData("")
  }, [])

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
    <GlobalContext.Provider
      value={{
        data,
        isLoading,
        setIsLoading,
        searchParam,
        setSearchParam,
        handleSubmit,
        detailsData,
        setDetailsData,
        errorMsg,
        setErrorMsg,
        favoritesList,
        setFavoritesList,
        handleAddToFavorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

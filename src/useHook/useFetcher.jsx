import axios from "axios"
import { useEffect } from "react"
import { useContext } from "react"
import { GlobalContext } from "../context"

export default function useFetcher(type, item) {
  const { setData, setIsLoading, setErrorMsg, setDetailsData, searchParam } =
    useContext(GlobalContext)

  async function fetchData(type, item) {
    setIsLoading(true)
    try {
      if (type === import.meta.env.VITE_GENERAL_SEARCH) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/${type}/`,
          {
            params: {
              query: item,
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
        }
      } else {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/${item}/${type}`,
          {
            params: {
              includeNutrition: false,
              addWinePairing: false,
              addTasteData: false,
              apiKey: import.meta.env.VITE_API_KEY,
            },
          }
        )
        if (response?.data) {
          setDetailsData(response.data)
          setIsLoading(false)
        }
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      if (error.response.status === 402 || 401) {
        setErrorMsg("We had some problem, please retry later.")
      }
      if (error.response.status === 404) {
        setErrorMsg("We didn't find your recipe")
      }
    }
  }
  useEffect(() => {
    fetchData(type, item)
  }, [searchParam])
}

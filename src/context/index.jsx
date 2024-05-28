import { createContext, useState } from "react"

export const GlobalContext = createContext(null)

export default function GlobalState({ children }) {
  const [search, setSearch] = useState("")
  const [searchParam, setSearchParam] = useState("")
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [detailsData, setDetailsData] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [favoritesList, setFavoritesList] = useState([])

  return (
    <GlobalContext.Provider
      value={{
        data,
        setData,
        isLoading,
        setIsLoading,
        search,
        setSearch,
        searchParam,
        setSearchParam,
        detailsData,
        setDetailsData,
        errorMsg,
        setErrorMsg,
        favoritesList,
        setFavoritesList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

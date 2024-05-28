import { useContext } from "react"
import { GlobalContext } from "../../context"
import Card from "../../components/Card/Card"
import Loading from "../../components/Loading/Loading"
import Error from "../../components/Error/Error"
import useFetcher from "../../useHook/useFetcher"

export default function Home() {
  const { data, isLoading, errorMsg, searchParam } = useContext(GlobalContext)

  useFetcher(import.meta.env.VITE_GENERAL_SEARCH, searchParam)

  return (
    <>
      {errorMsg ? (
        <Error />
      ) : isLoading ? (
        <Loading />
      ) : (
        <article className="display">
          {data.length ? (
            data.map((item) => {
              return <Card item={item} />
            })
          ) : (
            <h1>We didn' t find your recipe</h1>
          )}
        </article>
      )}
    </>
  )
}

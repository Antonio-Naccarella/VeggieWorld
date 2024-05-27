import { useContext } from "react"
import { GlobalContext } from "../../context"
import Card from "../../components/Card/Card"
import Loading from "../../components/Loading/Loading"
import Error from "../../components/Error/Error"
import useFetcher from "../../useHook/useFetcher"

export default function Home() {
  const { data, isLoading, errorMsg } = useContext(GlobalContext)

  useFetcher(import.meta.env.VITE_GENERAL_SEARCH, "")

  return (
    <>
      {errorMsg && <Error />}
      {isLoading && <Loading />}
      <article className="display">
        {data.length
          ? data.map((item) => {
              return <Card item={item} />
            })
          : null}
      </article>
    </>
  )
}

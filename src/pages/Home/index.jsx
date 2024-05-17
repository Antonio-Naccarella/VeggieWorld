import { useContext } from "react"
import { GlobalContext } from "../../context"
import Card from "../../components/Card"

export default function Home() {
  const { data, isLoading, errorMsg } = useContext(GlobalContext)
  return (
    <>
      {errorMsg && <h1 className="comunication">{errorMsg}</h1>}
      {isLoading && <h1 className="comunication">Loading...</h1>}
      <article className="display">
        {data.length ? (
          data.map((item) => {
            return <Card item={item} />
          })
        ) : (
          <h1 className="comunication">
            We got some problem, please retry later.
          </h1>
        )}
      </article>
    </>
  )
}

import { Circles } from "react-loader-spinner"
import "./styles.scss"

export default function Loading() {
  return (
    <div className="loading-container">
      <h1>Looking for the best recipes</h1>
      <Circles
        height="100"
        width="100"
        color="rgb(40, 79, 40)"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  )
}

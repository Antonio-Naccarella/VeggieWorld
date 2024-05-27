import "./styles.scss"
import { Link } from "react-router-dom"

export default function Card({ item }) {
  return (
    <section className="card" key={item.id}>
      <div className="card-img">
        <img src={item.image} alt={item.title} />
      </div>

      <h3>{item.title}</h3>
      <Link to={`/recipe/${item.id}`}>
        <button className="btn2">Details</button>
      </Link>
    </section>
  )
}

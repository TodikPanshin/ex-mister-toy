import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {
    return <article>
        <h4>{toy.name}</h4>
        <h1>⛐</h1>
        <p>Price: <span>${toy.price.toLocaleString()}</span></p>
        <hr />
        <button><Link to={`/toy/${toy._id}`}>Details</Link></button>  
        <button><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button> 

    </article>
}
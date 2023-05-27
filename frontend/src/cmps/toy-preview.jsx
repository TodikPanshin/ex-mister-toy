import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import toyImg from '../assets/img/toys/random toy.jpg'

export function ToyPreview({ toy }) {

let test =toy.url? `https://robohash.org/${toy.name}?set=set4`:`../assets/img/toys/${toy.name}.jpg`
    return <article>
        
        <img src={ `https://robohash.org/${toy.name}?set=set4&size=500x500`} alt="" />
        <hr />
        <div >
            <h2>{toy.name}</h2>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
        </div>
        <button><Link to={`/toy/${toy._id}`}>Details</Link></button>
        <button><Link to={`/toy/edit/${toy._id}`}><FontAwesomeIcon icon="coffee" /></Link></button>
    <div>
        test
    </div>

        <div>
            {toy.labels}
        </div>
    </article>
}
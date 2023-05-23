import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import { toyService } from '../services/toy.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'


export function ToyDetails() {

    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    // const toys = useSelector((storeState) => storeState.toys)

    useEffect(() => {
        toyService.getById(toyId)
            .then(toy => {
                setToy(toy)
            })
            .catch(err => {
                showErrorMsg('Cannot load toy')
            })
    }, [])

    console.log(toy);

    if (!toy) return <h1>loadings....</h1>
    return toy && <div>
        <h3>Toy Details:</h3>
        <h5>ID: {toy._id}</h5>
        <h4>name:{toy.name}</h4>
        <h4>price:{toy.price}$</h4>
        <h4>labels:{toy.labels}</h4>
        <h4>Created At: {toy.createdAt}</h4>
        <h4>State: { toy.inStock  ? 'In Stock' : 'Out Of Toys'}</h4>

        <button><Link className="btn" to="/toy">Back to List</Link></button>
    </div>

}

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { labelService } from "../services/label.service.js"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const [labels, setLabels] = useState([])
    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (!toyId) return
        labelService.query()
            .then(labels => {
                setLabels(labels)
                loadToy()
            })
        // eslint-disable-next-line
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        console.log(value, type, field )
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        toyService.save(toyToEdit)
            .then((toy) => {
                console.log('toy saved', toy);
                showSuccessMsg('Toy saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot save toy')
            })
    }

    function handleInStock({target}){
        let test=target.checked
        if (test) setToyToEdit((prevToy) => ({ ...prevToy, inStock:true }))
    else setToyToEdit((prevToy) => ({ ...prevToy, inStock:false }))
    }

    function onHandleLabel({ target }) {
        const label = target.id
        // console.log('label:', label)
        const idx = toyToEdit.labels.findIndex(curLabel => curLabel === label)
        if (idx === -1) {
            setToyToEdit((prevToy) => {
                return { ...prevToy, labels: [...prevToy.labels, label] }
            }
            )
        } else {
            setToyToEdit((prevToy) => {
                // * With filter
                // const updatedLabels = toyToEdit.labels.filter(curLabel => curLabel !== label)
                // return {
                //     ...prevToy,
                //     labels: updatedLabels
                // }
                // * With slice
                return {
                    ...prevToy,
                    labels: [...prevToy.labels.slice(0, idx), ...prevToy.labels.slice(idx + 1)]
                }
            })
        }
    }
    const labelsAsStr = JSON.stringify(toyToEdit.labels)
    // console.log('labelsAsStr:', labelsAsStr)

    return <section className="toy-edit">
        <h2>{toyToEdit.id ? 'Edit this toy' : 'Add a new toy'}</h2>

        <form onSubmit={onSaveToy}>
            <label htmlFor="name">name : </label>
            <input type="text"
                name="name"
                id="name"
                placeholder="Enter name..."
                value={toyToEdit.name}
                onChange={handleChange}
            />
            <label htmlFor="price">Price : </label>
            <input type="number"
                name="price"
                id="price"
                placeholder="Enter price"
                value={toyToEdit.price}
                onChange={handleChange}
            />

             <label htmlFor="inStock">in stock: </label>
            <input type="checkbox"
                name="inStock"
                id="inStock"
                checked={toyToEdit.inStock}
                onChange={handleInStock}
            />


            <pre>
                {labelsAsStr}
            </pre>
            <div className="label-container">
                <label>Labels:</label>
                <ul>
                    {labels.map(label => {
                        return <li
                            onClick={onHandleLabel}
                            id={label}
                            key={label}
                            className={`${labelsAsStr.includes(label) ? 'red' : 'black'}`}
                        >
                            {label}
                        </li>
                    })}
                </ul>
            </div>

            <div>
                <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                <button><Link to="/toy">Cancel</Link></button>
            </div>
        </form>
    </section>
}
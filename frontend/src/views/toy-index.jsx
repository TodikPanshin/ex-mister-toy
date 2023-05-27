import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { ToyList } from '../cmps/toy-list.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'
import { loadToys, removeToy, saveToy } from '../store/toy.action.js'

export function ToyIndex() {


    const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

    // console.log('filterBy test', filterBy)
    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getEmptyToy()
        toyToSave.name = 'Random Pet Toy'
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    function onSetFilter(filterBy) {
        // console.log('FilterBy', filterBy)
        setFilterBy(filterBy)
    }



    return <section className='toy-app main-layout'>
        <h3>Toys App</h3>
        <div className='controller'>
            <button><Link to={`/toy/edit`}>Add Toy</Link></button>
            <button onClick={onAddToy}>Add random Toy ⛐</button>
            <button><Link to={`/toy/charts`}>show charts</Link></button>
        </div>
        <ToyFilter onSetFilter={onSetFilter} />
        {isLoading && <h4>Loading...</h4>}
        <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy}
        />
        <div>
            <button onClick={() => setFilterBy((prevFilter) => ({ ...prevFilter, pageIdx: prevFilter.pageIdx - 1 }))}>
                Back
            </button>
            {filterBy.pageIdx}
            <button onClick={() => setFilterBy((prevFilter) => ({ ...prevFilter, pageIdx: prevFilter.pageIdx + 1 }))}>
                Next
            </button>
        </div>
    </section>
}
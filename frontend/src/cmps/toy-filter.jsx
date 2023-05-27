import { useEffect, useRef, useState } from "react"
import { useSelector } from 'react-redux'

import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { loadLabels } from '../store/label.action.js'

export function ToyFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())
    onSetFilter = useRef(utilService.debounce(onSetFilter))
    const labels = useSelector(storeState => storeState.labelModule.labels)

    // const elInputRef = useRef(null)

    // useEffect(() => {
    //     elInputRef.current.focus()
    // }, [])

    useEffect(() => {
        loadLabels()
    }
        // eslint-disable-next-line
        , [])

    useEffect(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
        // eslint-disable-next-line
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'checkbox') {
            value = target.checked
        } else {
            value = target.type === 'number' ? (+target.value || '') : target.value
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function onSetFilterLabel(label) {
        console.log(label)
        if (label === 'all') {
            setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: [] }));
        } else if (filterByToEdit.labels && filterByToEdit.labels.includes(label)) {
            setFilterByToEdit((prevFilter) => ({
                ...prevFilter,
                labels: prevFilter.labels.filter((curLabel) => curLabel !== label),
            }))
        } else {
            setFilterByToEdit((prevFilter) => ({
                ...prevFilter,
                labels: [...prevFilter.labels, label],
            }))
        }
    }

    function handleSortOrder(value) {
        const newSortOrder = filterByToEdit.sortOrder === 'ascending' ? 'descending' : 'ascending';
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, sortOrder: newSortOrder }));
        // setFilterByToEdit((prevFilter) => ({ ...prevFilter, sortOrder: value }))
    }
    return <section className="toy-filter main-layout full">
        <h2>Toys Filter</h2>
        <form onSubmit={onSubmitFilter}>

            <label htmlFor="name">Name:</label>
            <input type="text"
                id="name"
                name="name"
                placeholder="By name"
                value={filterByToEdit.name}
                onChange={handleChange}
            // ref={elInputRef}
            />

            <label htmlFor="maxPrice">Max price:</label>
            <input type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="By max price"
                value={filterByToEdit.maxPrice}
                onChange={handleChange}
            />

            <label htmlFor="inStock">in stock:</label>
            <select name="inStock" id="inStock" onChange={handleChange}>
                <option value="all">all</option>
                <option value="inStock">in stock only</option>
                <option value="soldOut">sold out</option>
            </select>

            <label htmlFor="sort">sort by:</label>
            <select name="sort" id="sort" onChange={handleChange}>
                <option value="">Sort by</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="created">Created</option>
            </select>
            <button className="sortOrder-btn"
                type="button"
                id="sortOrder"
                name="sortOrder"
                onClick={() => handleSortOrder(filterByToEdit.sortOrder)} >
                {filterByToEdit.sortOrder === 'ascending' ? 'ASCENDING' : 'DESCENDING '}
            </button>
            <button hidden>Filter</button>
        </form>
        <div className="filter-labels">
            <button onClick={() => onSetFilterLabel('all')}>all</button>
            {labels.map(label => <button key={label} className={`${label} ${filterByToEdit.labels.includes(label) ? 'clicked' : ''}`}  onClick={() => onSetFilterLabel(label)} >{label}</button>)}
        </div>
    </section>
}
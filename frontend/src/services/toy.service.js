
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}



function query(filterBy = {}) {
    // return storageService.query(STORAGE_KEY)
    return httpService.get(BASE_URL, filterBy)
}
function getById(toyId) {
    // return storageService.get(STORAGE_KEY, toyId)
    return httpService.get(BASE_URL + toyId)
}
function remove(toyId) {
    // return storageService.remove(STORAGE_KEY, toyId)
    // return Promise.reject('Not now!')
    return httpService.delete(BASE_URL + toyId)
}
function save(toy) {
    const method = (toy._id) ? 'put' : 'post'
    return httpService[method](BASE_URL, toy)

    // if (toy._id) {
    //     // return storageService.put(STORAGE_KEY, toy)

    //     return httpService.put(BASE_URL, toy)
    // } else {
    //     // return storageService.post(STORAGE_KEY, toy)
    //     
    //     return httpService.post(BASE_URL, toy)
    // }
}

function getDefaultFilter(searchParams = { get: () => { } }) {
    return {
        name: '',
        maxPrice: 100,
        inStock: null,
        labels: [],
    }
}

function getEmptyToy() {
    return {
        _id: '',
        name: '',
        price: utilService.getRandomIntInclusive(1, 99),
        labels: _getRandomLabels(),
        createdAt: Date.now(),
        inStock: true,
    }
}


// TEST DATA

function _getRandomLabels(size = 3) {
    const labels = ['On wheels ', 'Box game ', 'Art ', 'Baby ', 'Doll ', 'Puzzle ',
        'Outdoor ', 'Battery Powered ']

    const list = []
    while (size > 0) {
        let label = labels[utilService.getRandomIntInclusive(0, labels.length - 1)]
        if (list.includes(label)) continue
        list.push(label)
        size--
    }
    return list
}

function _createTodos() {
    let Toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!Toys || !Toys.length) {
        const toyNames = ['dog toy ', 'cat toy ', 'car toy ', 'robot toy ', 'bug toy ']

        Toys = toyNames.map(toyName => _createToy(toyName))
        utilService.saveToStorage(STORAGE_KEY, Toys)
    }
}

function _createToy(name) {
    return {
        _id: utilService.makeId(),
        name,
        price: utilService.getRandomIntInclusive(1, 99),
        labels: _getRandomLabels(),
        createdAt: Date.now(),
        inStock: true,
    }
}


// const toy = {
//     _id: 't101',
//     name: 'Talking Doll',
//     price: 123,
//     labels: ['Doll', 'Battery Powered', 'Baby'],
//     createdAt: 1631031801011,
//     inStock: true,
// }

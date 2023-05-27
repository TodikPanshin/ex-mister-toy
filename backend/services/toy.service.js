const fs = require('fs')
var toys = require('../data/toy-db.json')

function query(filterBy = {}) {
    let toysToDisplay = toys
    
    const { name, labels, inStock, maxPrice, sort, sortOrder,pageIdx,pageSize } = filterBy

    console.log('filter server', filterBy)

    if (name) {
        const regExp = new RegExp(name, 'i')
        toysToDisplay = toys.filter(toy => regExp.test(toy.name))
    }

    if (labels && labels.length > 0) {

        toysToDisplay = toysToDisplay.filter(toy =>
            toy.labels.some(label => labels.includes(label.trim()))
        )

    }

    if (inStock) {
        console.log('test in stock backend')// filter by status (sold out / in stock)
        if (inStock === 'inStock') {
            toysToDisplay = toysToDisplay.filter((toy) => toy.inStock);
        } else if (inStock === 'soldOut') {
            toysToDisplay = toysToDisplay.filter((toy) => !toy.inStock);
        }
    }

    if (maxPrice) {
        toysToDisplay = toysToDisplay.filter(toy => toy.price <= maxPrice)
    }

    switch (sort) {
        case 'name':
            toysToDisplay.sort((a, b) => a.name.localeCompare(b.name));
            break
        case 'price':
            toysToDisplay.sort((a, b) => a.price - b.price);
            break
        case 'created':
            toysToDisplay.sort((a, b) => a.createdAt - b.createdAt);
            break
        default:
            break
    }

    if (sortOrder === 'descending') {
        toysToDisplay.reverse()
    }

    // Apply pagination
  const startIndex = (pageIdx - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedToys = toysToDisplay.slice(startIndex, endIndex);

  const totalPages = Math.ceil(toysToDisplay.length / pageSize);

    return Promise.resolve(paginatedToys)
}

function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('Toy not found!')
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('No Such Toy')
    const toy = toys[idx]
    toys.splice(idx, 1)
    return _saveToysToFile()
}

function save(toy) {
    if (toy._id) {
        const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
        if (!toyToUpdate) return Promise.reject('No such toy')
        toyToUpdate.name = toy.name
        toyToUpdate.price = toy.price
        toyToUpdate.url = toy.url
        toyToUpdate.inStock = toy.inStock
        toyToUpdate.labels = [...toy.labels]
    } else {
        toy._id = _makeId()
        toys.push(toy)
    }

    return _saveToysToFile().then(() => toy)
    // return Promise.resolve(toy)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {

        const toysStr = JSON.stringify(toys, null, 2)
        fs.writeFile('data/toy-db.json', toysStr, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('The file was saved!');
            resolve()
        });
    })
}

module.exports = {
    query,
    get,
    remove,
    save
}
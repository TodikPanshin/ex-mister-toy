

import { combineReducers, legacy_createStore as createStore } from 'redux'

import {  toyReducer } from './toy.reducer.js'
import { labelReducer } from './label.reducer.js'
// import { userReducer } from './user.reducer.js'


// const rootReducer = toyReducer
const rootReducer = combineReducers({
toyModule: toyReducer,
labelModule:labelReducer
    // userModule: userReducer
})



const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
export const store = createStore(rootReducer, middleware)

// For debug
store.subscribe(() => {
    console.log('Current state is:', store.getState())
})



// setInterval(() => {
//     store.dispatch({ type: 'INCREMENT' })
// }, 1000)
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })


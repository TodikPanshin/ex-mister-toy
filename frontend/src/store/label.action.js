
import { labelService } from "../services/label.service.js"
import { store } from './store.js'
import { SET_LABELS } from './label.reducer.js'

export function loadLabels() {
    return labelService
        .query()
        .then((labels) => {
            store.dispatch({ type: SET_LABELS, labels })
        })
        .catch((err) => {
            console.log('label action -> Cannot load labels', err)
            throw err
        })
        }


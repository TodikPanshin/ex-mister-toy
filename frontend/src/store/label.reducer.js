export const SET_LABELS = 'SET_LABELS'

const initialState = {
    labels: [],
}

export function labelReducer(state = initialState, action) {
    let labels

    switch (action.type) {
        // labels
        case SET_LABELS:
            return { ...state, labels: action.labels }
        default:
            return state
    }
}

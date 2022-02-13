import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'

const reducer = notificationReducer

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store

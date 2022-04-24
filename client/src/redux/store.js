import { configureStore, combineReducers } from '@reduxjs/toolkit'
import tableReducer from './reducers/tableReducer'
import authReducer from './reducers/authReducer'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({authReducer, tableReducer})

const store = configureStore({ reducer: rootReducer, middleware: [thunk]})

export default store;

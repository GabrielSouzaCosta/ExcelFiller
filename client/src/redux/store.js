import { configureStore, combineReducers } from '@reduxjs/toolkit'
import tableReducer from './reducers/tableReducer'
import loginReducer from './reducers/loginReducer'

const rootReducer = combineReducers({tableReducer, loginReducer})

const store = configureStore({ reducer: rootReducer })

export default store;

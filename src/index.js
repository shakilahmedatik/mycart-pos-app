import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'antd/dist/antd.css'
import App from './App'

import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { rootReducer } from './redux/rootReducer'

const finalReducer = combineReducers({
  rootReducer: rootReducer,
})

const initialState = {
  rootReducer: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
}

const store = createStore(finalReducer, initialState)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

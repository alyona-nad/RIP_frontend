import React from 'react'
import ReactDOM from 'react-dom/client'
import './MainPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from "./App.tsx"
import { Provider } from 'react-redux'
import  store  from './redux/store.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  //<React.StrictMode>
    <Provider store={store}>
   <App/>
   </Provider>
 // </React.StrictMode>,
)

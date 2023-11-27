import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider , HashRouter} from 'react-router-dom'
import './MainPage.css'
import  MainPage  from './pages/MainPage.tsx'
//import BasicExample from './components/navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from "./App.tsx"
import Colorants from './components/Colorant/Colorant.tsx'
// const router = createBrowserRouter([
//   {
//     path: '/RIP_frontend/',
//     element: <MainPage /*currentFilter ='' services={[]}*/></MainPage>
//   },
//   {
//     path: '/RIP_frontend/colorants/:id',
//     element:<Colorants Name="" Image='' ID_Colorant={0} Description='' Properties='' Link='' Status=''></Colorants>

//   }
// ])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
    {/*<BasicExample />
    <RouterProvider router={router} />*/}
   <App/>
   
  </React.StrictMode>,
)

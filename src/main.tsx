import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './ITunesPage.css'
import  ITunesPage  from './pages/ITunesPage.tsx'
import BasicExample from './components/navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import Colorants from './components/Colorant/Colorant.tsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <ITunesPage currentFilter ='' services={[]}></ITunesPage>
  },
  {
    path: '/colorants/:id',
    element:<Colorants></Colorants>

  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BasicExample />
    <RouterProvider router={router} />
  </React.StrictMode>,
)

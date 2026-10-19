import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewPajamas from './pages/ViewPajamas'
import EditCar from './pages/EditPajama'
import CreatePajama from './pages/CreatePajama'
import PajamaDetails from './pages/PajamaDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreatePajama title='Pajama Customizer | Create Pajamas' />
    },
    {
      path:'/custompajamas',
      element: <ViewPajamas title='Pajama Customizer | Custom Pajamas' />
    },
    {
      path: '/custompajamas/:id',
      element: <PajamaDetails title='Pajama Customizer | View' />
    },
    {
      path: '/edit/:id',
      element: <EditCar title='Pajama Customizer | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App
import './App.css'
import {createBrowserRouter, RouterProvider,} from "react-router-dom"
import HomeRoute from './routes/HomeRoute'
import { CountriesProvider } from '../src/context/CountriesDataContext'
import CountriesListRoute from './routes/CountriesListRoute'
import ErrorRoute from './routes/ErrorRoute'
import Layout from './pages/layout/layout'
function App() {

  let router = createBrowserRouter ([
    {
      path: "/",
      element: <Layout></Layout>,
      errorElement: <ErrorRoute></ErrorRoute>,
      children: [
        {
          path: "/",
          element: <HomeRoute></HomeRoute>,
        },
        {
          path: "/countries",
          element: <CountriesListRoute></CountriesListRoute>,
        },
      ]
    }
  ]);

  return (
      <CountriesProvider>
        <RouterProvider router={router} />
      </CountriesProvider>
  )
}

export default App

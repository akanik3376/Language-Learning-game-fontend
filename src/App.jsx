import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes'
import AuthProvider from './Provider/AuthProvider'

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={routes} />
      </AuthProvider>

    </>
  )
}

export default App

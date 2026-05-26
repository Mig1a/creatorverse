import { useRoutes } from 'react-router-dom'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import EditCreator from './pages/EditCreator'
import AddCreator from './pages/AddCreator'
import './App.css'

function App() {
  const element = useRoutes([
    { path: '/',             element: <ShowCreators /> },
    { path: '/creator/:id', element: <ViewCreator />  },
    { path: '/edit/:id',    element: <EditCreator />  },
    { path: '/add',         element: <AddCreator />   },
    { path: '*',            element: <ShowCreators /> },
  ])

  return (
    <div className="app">
      <nav className="navbar">
        <a href="/" className="nav-brand">
          🌌 Creatorverse
        </a>
        <a href="/add" className="btn btn-primary btn-sm">
          + Add Creator
        </a>
      </nav>
      <main>{element}</main>
      <footer className="footer">
        <p>Made with ✨ for WEB103</p>
      </footer>
    </div>
  )
}

export default App

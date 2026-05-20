import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { PostsProvider } from './context/PostsContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Admin from './pages/Admin'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <PostsProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/criar" element={<CreatePost />} />
              <Route path="/editar/:id" element={<EditPost />} />
              <Route path="/admin" element={<Admin />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </PostsProvider>
    </AuthProvider>
  )
}

export default App
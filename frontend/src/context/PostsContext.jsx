import { createContext, useContext, useState, useEffect } from 'react'
import { getAllPosts } from '../services/api'

const PostsContext = createContext()

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  async function carregarPosts() {
    try {
      setLoading(true)
      const res = await getAllPosts()
      setPosts(res.data)
    } catch (e) {
      setErro('Não foi possível carregar os posts.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarPosts()
  }, [])

  return (
    <PostsContext.Provider value={{ posts, loading, erro, carregarPosts }}>
      {children}
    </PostsContext.Provider>
  )
}

export function usePosts() {
  return useContext(PostsContext)
}
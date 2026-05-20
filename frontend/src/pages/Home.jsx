import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePosts } from '../context/PostsContext'
import { searchPosts } from '../services/api'
import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  background: #16213e;
  padding: 2rem;
`

const Topo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`

const Titulo = styled.h1`
  color: #ffffff;
  font-size: 1.8rem;
`

const BuscaInput = styled.input`
  padding: 0.6rem 1rem;
  border-radius: 4px;
  border: 1px solid #444;
  background: #1a1a2e;
  color: white;
  font-size: 1rem;
  width: 280px;
  &::placeholder { color: #888; }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`

const Card = styled.div`
  background: #1a1a2e;
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  border: 1px solid transparent;
  transition: border 0.2s;
  &:hover { border-color: #e94560; }
`

const CardTitulo = styled.h2`
  color: #e94560;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`

const CardAutor = styled.p`
  color: #aaa;
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
`

const CardResumo = styled.p`
  color: #ccc;
  font-size: 0.95rem;
  line-height: 1.5;
`

const Mensagem = styled.p`
  color: #aaa;
  text-align: center;
  margin-top: 3rem;
  font-size: 1.1rem;
`

export default function Home() {
  const { posts, loading, erro } = usePosts()
  const [busca, setBusca] = useState('')
  const [resultados, setResultados] = useState(null)
  const navigate = useNavigate()

  async function handleBusca(e) {
    const termo = e.target.value
    setBusca(termo)

    if (termo.trim() === '') {
      setResultados(null)
      return
    }

    try {
      const res = await searchPosts(termo)
      setResultados(res.data)
    } catch {
      setResultados([])
    }
  }

  const lista = resultados !== null ? resultados : posts

  if (loading) return <Mensagem>Carregando posts...</Mensagem>
  if (erro) return <Mensagem>{erro}</Mensagem>

  return (
    <Container>
      <Topo>
        <Titulo>📝 Postagens</Titulo>
        <BuscaInput
          type="text"
          placeholder="🔍 Buscar posts..."
          value={busca}
          onChange={handleBusca}
        />
      </Topo>

      {lista.length === 0 ? (
        <Mensagem>Nenhum post encontrado.</Mensagem>
      ) : (
        <Grid>
          {lista.map(post => (
            <Card key={post.id} onClick={() => navigate(`/posts/${post.id}`)}>
              <CardTitulo>{post.title}</CardTitulo>
              <CardAutor>✍️ {post.author}</CardAutor>
              <CardResumo>
                {post.content.length > 120
                  ? post.content.substring(0, 120) + '...'
                  : post.content}
              </CardResumo>
            </Card>
          ))}
        </Grid>
      )}
    </Container>
  )
}
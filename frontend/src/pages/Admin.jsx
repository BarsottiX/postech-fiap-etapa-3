import { useNavigate } from 'react-router-dom'
import { deletePost } from '../services/api'
import { usePosts } from '../context/PostsContext'
import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  background: #16213e;
  padding: 2rem;
`

const Titulo = styled.h1`
  color: #ffffff;
  margin-bottom: 2rem;
`

const Tabela = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #1a1a2e;
  border-radius: 8px;
  overflow: hidden;
`

const Th = styled.th`
  background: #e94560;
  color: white;
  padding: 1rem;
  text-align: left;
  font-size: 0.95rem;
`

const Td = styled.td`
  padding: 1rem;
  color: #ccc;
  border-bottom: 1px solid #2a2a4a;
  font-size: 0.95rem;
  vertical-align: middle;
`

const BotaoEditar = styled.button`
  background: #0f3460;
  color: white;
  border: none;
  padding: 0.4rem 0.9rem;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;
  font-size: 0.85rem;
  &:hover { background: #1a5276; }
`

const BotaoDeletar = styled.button`
  background: #7b0000;
  color: white;
  border: none;
  padding: 0.4rem 0.9rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  &:hover { background: #a00000; }
`

const Mensagem = styled.p`
  color: #aaa;
  text-align: center;
  margin-top: 3rem;
  font-size: 1.1rem;
`

const TituloPost = styled.span`
  color: #e94560;
  font-weight: bold;
`

export default function Admin() {
  const { posts, loading, erro, carregarPosts } = usePosts()
  const navigate = useNavigate()

  async function handleDeletar(id, titulo) {
    const confirmar = window.confirm(`Deseja excluir o post "${titulo}"?`)
    if (!confirmar) return

    try {
      await deletePost(id)
      await carregarPosts()
    } catch {
      alert('Erro ao excluir o post.')
    }
  }

  if (loading) return <Mensagem>Carregando posts...</Mensagem>
  if (erro) return <Mensagem>{erro}</Mensagem>

  return (
    <Container>
      <Titulo>🛡️ Painel Administrativo</Titulo>
      {posts.length === 0 ? (
        <Mensagem>Nenhum post cadastrado.</Mensagem>
      ) : (
        <Tabela>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Título</Th>
              <Th>Autor</Th>
              <Th>Data</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <Td>{post.id}</Td>
                <Td><TituloPost>{post.title}</TituloPost></Td>
                <Td>{post.author}</Td>
                <Td>{new Date(post.created_at).toLocaleDateString('pt-BR')}</Td>
                <Td>
                  <BotaoEditar onClick={() => navigate(`/editar/${post.id}`)}>
                    ✏️ Editar
                  </BotaoEditar>
                  <BotaoDeletar onClick={() => handleDeletar(post.id, post.title)}>
                    🗑️ Excluir
                  </BotaoDeletar>
                </Td>
              </tr>
            ))}
          </tbody>
        </Tabela>
      )}
    </Container>
  )
}
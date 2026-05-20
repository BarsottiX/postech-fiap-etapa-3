import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPostById, updatePost } from '../services/api'
import { usePosts } from '../context/PostsContext'
import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  background: #16213e;
  padding: 2rem;
  display: flex;
  justify-content: center;
`

const Card = styled.div`
  background: #1a1a2e;
  border-radius: 8px;
  padding: 2.5rem;
  width: 100%;
  max-width: 700px;
  height: fit-content;
`

const Titulo = styled.h1`
  color: #e94560;
  margin-bottom: 2rem;
`

const Label = styled.label`
  color: #ccc;
  font-size: 0.95rem;
  display: block;
  margin-bottom: 0.4rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.2rem;
  border-radius: 4px;
  border: 1px solid #444;
  background: #16213e;
  color: white;
  font-size: 1rem;
  box-sizing: border-box;
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.2rem;
  border-radius: 4px;
  border: 1px solid #444;
  background: #16213e;
  color: white;
  font-size: 1rem;
  min-height: 200px;
  resize: vertical;
  box-sizing: border-box;
`

const Botao = styled.button`
  background: #e94560;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover { background: #c73652; }
  &:disabled { background: #888; cursor: not-allowed; }
`

const Erro = styled.p`
  color: #e94560;
  margin-bottom: 1rem;
`

const Sucesso = styled.p`
  color: #4caf50;
  margin-bottom: 1rem;
`

const Carregando = styled.p`
  color: #aaa;
  text-align: center;
  margin-top: 3rem;
  font-size: 1.1rem;
`

export default function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { carregarPosts } = usePosts()

  const [titulo, setTitulo] = useState('')
  const [conteudo, setConteudo] = useState('')
  const [autor, setAutor] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregarPost() {
      try {
        const res = await getPostById(id)
        setTitulo(res.data.title)
        setConteudo(res.data.content)
        setAutor(res.data.author)
      } catch {
        setErro('Não foi possível carregar o post.')
      } finally {
        setLoading(false)
      }
    }
    carregarPost()
  }, [id])

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setSucesso('')

    if (!titulo || !conteudo || !autor) {
      setErro('Preencha todos os campos.')
      return
    }

    try {
      setEnviando(true)
      await updatePost(id, { title: titulo, content: conteudo, author: autor })
      await carregarPosts()
      setSucesso('Post atualizado com sucesso!')
      setTimeout(() => navigate('/admin'), 1500)
    } catch {
      setErro('Erro ao atualizar o post. Tente novamente.')
    } finally {
      setEnviando(false)
    }
  }

  if (loading) return <Carregando>Carregando post...</Carregando>

  return (
    <Container>
      <Card>
        <Titulo>🔧 Editar Postagem</Titulo>
        {erro && <Erro>{erro}</Erro>}
        {sucesso && <Sucesso>{sucesso}</Sucesso>}
        <form onSubmit={handleSubmit}>
          <Label>Título</Label>
          <Input
            type="text"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
          />
          <Label>Autor</Label>
          <Input
            type="text"
            value={autor}
            onChange={e => setAutor(e.target.value)}
          />
          <Label>Conteúdo</Label>
          <Textarea
            value={conteudo}
            onChange={e => setConteudo(e.target.value)}
          />
          <Botao type="submit" disabled={enviando}>
            {enviando ? 'Salvando...' : 'Salvar Alterações'}
          </Botao>
        </form>
      </Card>
    </Container>
  )
}
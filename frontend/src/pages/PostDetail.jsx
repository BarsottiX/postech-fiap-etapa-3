import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPostById } from '../services/api'
import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  background: #16213e;
  padding: 2rem;
  display: flex;
  justify-content: center;
`

const Artigo = styled.article`
    background: #1a1a2e;
    border-radius: 8px;
    padding: 2.5rem;
    width: 100%;
    max-width: 800px;
    height: fit-content; 
`

const Titulo = styled.h1`
    color: #e94560;
    font-size: 2rem;
    margin-bottom: 0.5rem;
`

const Meta = styled.p`
    color: #888;
    font-size: 0.9rem;
    margin-bottom: 2rem;
`

const Conteudo = styled.p`
    color: #ccc;
    font-size: 1.05rem;
    line-height: 1.8;
    white-space: pre-wrap;
`

const BotaoVoltar = styled.button`
    background: transparent;
    color: #e94560;
    border: 1px solid #e94560;
    padding: 0.5rem 1.2rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    &:hover { background: #e94560; color: white; }
`

const Mensagem = styled.p`
    color: #aaa;
    text-align: center;
    margin-top: 3rem;
    font-size: 1.1rem;
`


export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    async function buscarPost() {
      try {
        const res = await getPostById(id)
        setPost(res.data)
      } catch {
        setErro('Post não encontrado.')
      } finally {
        setLoading(false)
      }
    }
    buscarPost()
  }, [id])

  if (loading) return <Mensagem>Carregando...</Mensagem>
  if (erro) return <Mensagem>{erro}</Mensagem>

  return (  
    <Container>
      <Artigo>
        <BotaoVoltar onClick={() => navigate('/')}>← Voltar</BotaoVoltar>
        <Titulo>{post.title}</Titulo>
        <Meta>
          ✍️ {post.author} &nbsp;|&nbsp;
          📅 {new Date(post.created_at).toLocaleDateString('pt-BR')}
        </Meta>
        <Conteudo>{post.content}</Conteudo>
      </Artigo>
    </Container>
  )
}
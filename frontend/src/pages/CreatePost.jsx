import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/api";
import { usePosts } from "../context/PostsContext";
import styled from "styled-components";

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

export default function CreatePost() {
    const [titulo, setTitulo] = useState('')
    const [conteudo, setConteudo] = useState('')
    const [autor, setAutor] = useState('')
    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState('')
    const [enviando, setEnviando] = useState(false)
    const { carregarPosts } = usePosts()
    const navigate = useNavigate()

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
            await createPost({ title: titulo, content: conteudo, author: autor })
            await carregarPosts()
            setSucesso('Post criado com sucesso!')
            setTimeout(() => navigate ('/'), 1500)
        } catch {
            setErro('Erro ao criar o post. Tente novamente.')
        } finally {
            setEnviando(false)
        }
    }

    return (
    <Container>
      <Card>
        <Titulo>Criar Nova Postagem</Titulo>
        {erro && <Erro>{erro}</Erro>}
        {sucesso && <Sucesso>{sucesso}</Sucesso>}
        <form onSubmit={handleSubmit}>
          <Label>Título</Label>
          <Input
            type="text"
            placeholder="Digite o título do post"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
          />
          <Label>Autor</Label>
          <Input
            type="text"
            placeholder="Nome do autor"
            value={autor}
            onChange={e => setAutor(e.target.value)}
          />
          <Label>Conteúdo</Label>
          <Textarea
            placeholder="Escreva o conteúdo do post aqui..."
            value={conteudo}
            onChange={e => setConteudo(e.target.value)}
          />
          <Botao type="submit" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Publicar Post'}
          </Botao>
        </form>
      </Card>
    </Container>
  )
}
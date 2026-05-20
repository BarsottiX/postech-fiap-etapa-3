import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styled from 'styled-components'

const Container = styled.div`
  min-height: 100vh;
  background: #16213e;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Card = styled.div`
  background: #1a1a2e;
  padding: 2.5rem;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
`

const Titulo = styled.h2`
  color: #e94560;
  margin-bottom: 1.5rem;
  text-align: center;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #444;
  background: #16213e;
  color: white;
  font-size: 1rem;
  box-sizing: border-box;
`

const Botao = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #e94560;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover { background: #c73652; }
`

const Erro = styled.p`
  color: #e94560;
  text-align: center;
  margin-bottom: 1rem;
`

const Dica = styled.p`
  color: #888;
  text-align: center;
  font-size: 0.85rem;
  margin-top: 1rem;
`

export default function Login() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [erro, setErro] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    const ok = login(user, pass)
    if (ok) {
      navigate('/admin')
    } else {
      setErro('Usuário ou senha incorretos.')
    }
  }

  return (
    <Container>
      <Card>
        <Titulo>🔑 Login do Professor</Titulo>
        {erro && <Erro>{erro}</Erro>}
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Usuário"
            value={user}
            onChange={e => setUser(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={pass}
            onChange={e => setPass(e.target.value)}
          />
          <Botao type="submit">Entrar</Botao>
        </form>
        <Dica>Usuário: professor | Senha: 123456</Dica>
      </Card>
    </Container>
  )
}
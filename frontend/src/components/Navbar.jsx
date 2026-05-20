import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styled from 'styled-components'

const Nav = styled.nav`
  background-color: #1a1a2e;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled(Link)`
  color: #e94560;
  font-size: 1.4rem;
  font-weight: bold;
  text-decoration: none;
`

const Links = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 0.95rem;
  &:hover { color: #e94560; }
`

const BotaoSair = styled.button`
  background: #e94560;
  color: white;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  &:hover { background: #c73652; }
`

export default function Navbar() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <Nav>
      <Logo to="/">📚 BlogFIAP</Logo>
      <Links>
        <NavLink to="/">Home</NavLink>
        {usuario ? (
          <>
            <NavLink to="/criar">Criar Post</NavLink>
            <NavLink to="/admin">Admin</NavLink>
            <BotaoSair onClick={handleLogout}>Sair</BotaoSair>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </Links>
    </Nav>
  )
}
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { StyledLink, Loader } from '../../utils/style/Atoms'
import Logo from '../../assets/argentBankLogo.png'

import AuthService from '../services/auth.service'
import UserService from '../services/user.service'

import { useDispatch, useSelector } from 'react-redux'
import { selectUser, selectLoading } from '../../store/selectors'
import * as userActions from '../../features/user'
import * as loadingActions from '../../features/loading'

const HomeLogo = styled.img`
  max-width: 100%;
  width: 200px;
`
const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  a {
    font-weight: bold;
    color: #2c3e50;
    .router-link-exact-active {
      color: #42b983;
    }
  }
`

const StyledLogoLink = styled(Link)`
  display: flex;
  align-items: center;
`
const StyledNavDiv = styled.div`
  display: flex;
  align-items: center;
`

function Header() {
  const navigate = useNavigate()
  const loading = useSelector(selectLoading)
  const user = useSelector(selectUser)

  const dispatch = useDispatch()

  const disconnect = () => {
    dispatch(userActions.set({}))
    AuthService.logout()
  }

  if (!user.data.email) {
    if (
      localStorage.getItem('argentbank-user') ||
      sessionStorage.getItem('argentbank-user')
    ) {
      // get the user's data with the token
      UserService.userAccess()
        .then((userResult) => {
          dispatch(loadingActions.set(false))
          dispatch(userActions.set(userResult.data.body))
        })
        .catch(() => {
          dispatch(loadingActions.set(false))
          disconnect()
          navigate(`/login`)
        })
    }
  }

  return (
    <NavContainer>
      {loading ? <Loader /> : <></>}
      <StyledLogoLink to="/">
        <HomeLogo src={Logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </StyledLogoLink>
      {user.data.email ? (
        <StyledNavDiv>
          <StyledLink to="/profile">
            <i className="fa fa-user-circle"></i>&nbsp;{user.data.firstName}
            &nbsp;
          </StyledLink>
          <StyledLink onClick={() => disconnect()} to="/">
            <i className="fa fa-sign-out"></i>&nbsp;Sign Out
          </StyledLink>
        </StyledNavDiv>
      ) : (
        <div>
          <StyledLink to="/login">
            <i className="fa fa-user-circle"></i>&nbsp;Sign In
          </StyledLink>
        </div>
      )}
    </NavContainer>
  )
}

export default Header

import { Link } from 'react-router-dom'
import colors from './colors'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Loader = styled.div`
  padding: 10px;
  border: 6px solid ${colors.primary};
  border-bottom-color: white;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
  position: fixed;
  left: calc(50% - 16px);
  top: calc(50% - 16px);
  z-index: 9999;
  box-shadow: 0px 0px 4px rgba(18, 0, 43, 0.5);
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  margin-right: 0.5rem;
  &:hover {
    text-decoration: underline;
  }
  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-right: 0rem;
    margin-left: 0.5rem;
    white-space: nowrap;
  }
`

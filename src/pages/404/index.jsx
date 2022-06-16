import styled from 'styled-components'
import colors from '../../utils/style/colors'
import ErrorIllustration from '../../assets/404.svg'

const ErrorWrapper = styled.div`
  margin: 30px;
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  align-items: center;
  @media (max-width: 920px) {
    margin: 15px;
  }
`

const ErrorTitle = styled.h1`
  color: #000;
  font-weight: 300;
  @media (max-width: 920px) {
    font-size: 1.5rem;
  }
`

const ErrorSubtitle = styled.h2`
  color: #000;
  font-weight: 300;
  @media (max-width: 920px) {
    font-size: 1.3rem;
  }
`

const Illustration = styled.img`
  max-width: 800px;
  height: 33vh;
  width: 100%;

  object-fit: scale-down;
`

function Error() {
  return (
    <ErrorWrapper>
      <ErrorTitle>Oups...</ErrorTitle>
      <Illustration src={ErrorIllustration} />
      <ErrorSubtitle>
        Il semblerait que la page que vous cherchez n’existe pas
      </ErrorSubtitle>
    </ErrorWrapper>
  )
}

export default Error

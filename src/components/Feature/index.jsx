import styled from 'styled-components'
import PropTypes from 'prop-types'

const FeatureContainer = styled.div`
  flex: 1;
  padding: 2.5rem;
`

const StyledImage = styled.img`
  width: 100px;
  border: 10px solid #00bc77;
  border-radius: 50%;
  padding: 1rem;
`
const StyledTitle = styled.h3`
  color: #222;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`
const StyledText = styled.p`
  display: flex;
  flex-direction: column;
  @media (min-width: 920px) {
    flex-direction: row;
  }
`

function Feature(props) {
  return (
    <FeatureContainer>
      <StyledImage src={props.imagePath} alt={props.alt}></StyledImage>
      <StyledTitle>{props.title}</StyledTitle>
      <StyledText>{props.text}</StyledText>
    </FeatureContainer>
  )
}

Feature.propTypes = {
  /**
   * ImagePath is a text (the path)
   */
  imagePath: PropTypes.string.isRequired,
  /**
   * Alt is a text (the path)
   */
  alt: PropTypes.string.isRequired,
  /**
   * Title is a text
   */
  title: PropTypes.string.isRequired,
  /**
   * Text is a text
   */
  text: PropTypes.string.isRequired,
}

Feature.defaultProps = {
  imagePath: '',
  alt: '',
  title: '',
  text: '',
}

export default Feature

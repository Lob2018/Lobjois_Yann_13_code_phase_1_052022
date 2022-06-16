import styled from 'styled-components'
import Hero from '../../components/Hero'
import Feature from '../../components/Feature'
import IconChat from '../../assets/icon-chat.png'
import IconMoney from '../../assets/icon-money.png'
import IconSecurity from '../../assets/icon-security.png'

const FeaturesContainer = styled.section`
  display: flex;
  flex-direction: column;
  @media (min-width: 920px) {
    flex-direction: row;
  }
`

function Home() {
  return (
    <main className="main">
      <Hero></Hero>
      <FeaturesContainer>
        <h2 className="sr-only">Features</h2>
        <Feature
          imagePath={IconChat}
          alt="Chat Icon"
          title="You are our #1 priority"
          text="Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes."
        ></Feature>
        <Feature
          imagePath={IconMoney}
          alt="Money Icon"
          title="More savings means higher rates"
          text="The more you save with us, the higher your interest rate will be!"
        ></Feature>
        <Feature
          imagePath={IconSecurity}
          alt="Security Icon"
          title="Security you can trust"
          text="We use top of the line encryption to make sure your data and money
            is always safe."
        ></Feature>
      </FeaturesContainer>
    </main>
  )
}

export default Home

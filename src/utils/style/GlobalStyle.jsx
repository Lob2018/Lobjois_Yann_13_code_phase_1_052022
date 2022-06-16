import { createGlobalStyle } from 'styled-components'
import colors from '../../utils/style/colors'

const StyledGlobalStyle = createGlobalStyle`
    html {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: ${colors.text};
    }

    body{
      margin:0;
    }

    #root {
      margin: 0;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .main {
      flex: 1;
    }

    .bg-dark {
      background-color:${colors.background};
    }

    .sr-only {
      border: 0 !important;
      clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */
      -webkit-clip-path: inset(50%) !important;
      clip-path: inset(50%) !important; /* 2 */
      height: 1px !important;
      margin: -1px !important;
      overflow: hidden !important;
      padding: 0 !important;
      position: absolute !important;
      width: 1px !important;
      white-space: nowrap !important; /* 3 */
    }

    .sign-in-button {
      display: block;
      width: 100%;
      padding: 8px;
      font-size: 1.1rem;
      font-weight: bold;
      margin-top: 1rem;
      border-color: ${colors.green};
      background-color: ${colors.green};
      color: #fff;
    }

    // .sign-in-icon {
    //   font-size: 5rem;
    // }

    .header {
      color: #fff;
      margin-bottom: 2rem;
    }

    .edit-button {
      border-color: #00bc77;
      background-color: #00bc77;
      color: #fff;
      font-weight: bold;
      padding: 10px;
    }

    .account-content-wrapper {
      width: 100%;
      flex: 1;
    }
`

function GlobalStyle() {
  return <StyledGlobalStyle />
}

export default GlobalStyle

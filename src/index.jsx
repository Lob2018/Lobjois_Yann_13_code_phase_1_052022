import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Header from './components/Header'
import Footer from './components/Footer'
import Error from './pages/404'
import GlobalStyle from './utils/style/GlobalStyle'
import { Provider } from 'react-redux'
import store from './store/store'

ReactDOM.render(
  /* On englobe toute l'application dans le Provider */
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { useForm } from 'react-hook-form'
import joi from 'joi'

import AuthService from '../../components/services/auth.service'

import { useDispatch } from 'react-redux'
import * as loadingActions from '../../features/loading'

const SectionContainer = styled.section`
  box-sizing: border-box;
  background-color: white;
  width: 300px;
  margin: 0 auto;
  margin-top: 3rem;
  padding: 2rem;
  @media (max-width: 480px) {
    width: 80%;
  }
`
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 1rem;
  label {
    font-weight: bold;
  }
  input {
    padding: 5px;
    font-size: 1.2rem;
  }
`
const InputRemember = styled.div`
  display: flex;
  label {
    margin-left: 0.25rem;
  }
`
const StyledErrors = styled.p`
  color: #d93025;
  font-size: 12px;
  margin: 6px 0 0 0;
`
const StyledAccountError = styled.p`
  color: #d93025;
  font-size: 12px;
  margin: 16px 0 0 0;
`

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // true if localStorage, false if sessionStorage
  const [isLocalStoraged, setLocalStoraged] = useState(false)
  const checkValue = (e) => {
    setLocalStoraged(e.target.checked)
  }
  // message for invalid credentials
  const [isValidAccount, setAccountValidity] = useState(true)
  const checkAccountValidity = (b) => {
    setAccountValidity(b)
  }
  // check form's errors
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const email = data.email
    const password = data.password
    reset({
      email: '',
      password: '',
    })

    // the joi schema
    const schema = joi
      .object({
        email: joi.string().email({ tlds: false }).required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]*$')).required(),
      })
      .with('email', 'password')
    // joi validation
    try {
      await schema.validateAsync({
        email: email,
        password: password,
      })
      dispatch(loadingActions.set(true))
      // API login
      AuthService.login(email, password, isLocalStoraged)
        .then(() => {
          dispatch(loadingActions.set(false))
          navigate(`/profile`)
        })
        .catch(() => {
          checkAccountValidity(false)
          dispatch(loadingActions.set(false))
        })
    } catch (e) {
      checkAccountValidity(false)
    }
  }

  return (
    <main className="main bg-dark">
      <SectionContainer>
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <label htmlFor="email">Username</label>
            <input
              type="email"
              id="email"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <StyledErrors>The username is required.</StyledErrors>
            )}
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <StyledErrors>The password is required.</StyledErrors>
            )}
          </InputWrapper>
          <InputRemember>
            <input type="checkbox" id="remember-me" onChange={checkValue} />
            <label htmlFor="remember-me">Remember me</label>
          </InputRemember>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
          {!isValidAccount && (
            <StyledAccountError>
              Unable to find your account.
            </StyledAccountError>
          )}
        </form>
      </SectionContainer>
    </main>
  )
}

export default Login

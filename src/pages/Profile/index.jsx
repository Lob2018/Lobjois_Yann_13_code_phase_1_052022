import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import joi from 'joi'

import Account from '../../components/Account'
import authHeader from '../../components/services/auth-header'
import userService from '../../components/services/user.service'

import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../../store/selectors'
import * as userActions from '../../features/user'
import * as loadingActions from '../../features/loading'

const StyledFormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.3rem;
  margin-bottom: 1rem;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  label {
    font-weight: bold;
  }
  input {
    padding: 5px;
    font-size: 1.2rem;
  }
`
const StyledErrors = styled.p`
  color: #d93025;
  font-size: 12px;
  margin: 6px 0 6px 0;
`

const StyledUpdateError = styled.p`
  color: #d93025;
  font-size: 12px;
  margin: 16px 0 0 0;
`

const UpdateButton = styled.button`
  width: 156px;
  padding: 5px;
  font-size: 1.1rem;
  font-weight: bold;
  border-color: ${colors.green};
  background-color: ${colors.green};
  color: #fff;
`

function Profile() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  // render the edit name's form
  const [isVisible, setVisible] = useState(false)
  const checkVisible = (b) => {
    setVisible(b)
  }

  // message for invalid credentials
  const [isUpdated, setUpdateValidity] = useState(true)
  const checkUpdateValidity = (b) => {
    setUpdateValidity(b)
  }
  // check form's errors
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const firstname = data.firstname
    const lastname = data.lastname
    // the joi schema
    const schema = joi
      .object({
        firstname: joi.string().alphanum().min(1).max(30).required(),
        lastname: joi.string().alphanum().min(1).max(30).required(),
      })
      .with('firstname', 'lastname')
    // joi validation
    try {
      await schema.validateAsync({
        firstname: firstname,
        lastname: lastname,
      })
      dispatch(loadingActions.set(true))
      // API login
      userService
        .updateUser(firstname, lastname, authHeader())
        .then(() => {
          dispatch(
            userActions.set({
              ...user.data,
              firstName: firstname,
              lastName: lastname,
            })
          )
          dispatch(loadingActions.set(false))
          checkUpdateValidity(true)
          checkVisible(false)
          reset({
            firstname: '',
            lastname: '',
          })
        })
        .catch(() => {
          checkUpdateValidity(false)
          dispatch(loadingActions.set(false))
        })
    } catch (e) {
      checkUpdateValidity(false)
    }
  }

  return (
    <main className="main bg-dark">
      {authHeader() ? (
        <>
          <div className="header">
            {isVisible ? (
              <>
                <h1>
                  Welcome back
                  <br />
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <StyledFormRow>
                    <InputWrapper>
                      <input
                        type="text"
                        id="firstname"
                        placeholder={user.data.firstName}
                        {...register('firstname', { required: true })}
                      />
                      {errors.firstname && (
                        <StyledErrors>The firstname is required.</StyledErrors>
                      )}
                    </InputWrapper>
                    <InputWrapper>
                      <input
                        type="text"
                        id="lastname"
                        placeholder={user.data.lastName}
                        {...register('lastname', { required: true })}
                      />
                      {errors.lastname && (
                        <StyledErrors>The lastname is required.</StyledErrors>
                      )}
                    </InputWrapper>
                  </StyledFormRow>
                  <StyledFormRow>
                    <UpdateButton type="submit">Save</UpdateButton>
                    <UpdateButton
                      type="cancel"
                      onClick={() => checkVisible(false)}
                    >
                      Cancel
                    </UpdateButton>
                  </StyledFormRow>
                  <StyledFormRow>
                    {!isUpdated && (
                      <StyledUpdateError>
                        Unable to update your account.
                      </StyledUpdateError>
                    )}
                  </StyledFormRow>
                </form>
              </>
            ) : (
              <>
                <h1>
                  Welcome back
                  <br />
                  {user.data.firstName + ' ' + user.data.lastName + ' !'}
                </h1>
                <button
                  className="edit-button"
                  onClick={() => checkVisible(true)}
                >
                  Edit Name
                </button>
              </>
            )}
          </div>

          <h2 className="sr-only">Accounts</h2>
          <Account
            title="Argent Bank Checking (x8349)"
            amount="$2,082.79"
            description="Available Balance"
          ></Account>
          <Account
            title="Argent Bank Savings (x6712)"
            amount="$10,928.42"
            description="Available Balance"
          ></Account>
          <Account
            title="Argent Bank Credit Card (x8349)"
            amount="$184.30"
            description="Current Balance"
          ></Account>
        </>
      ) : (
        <Navigate to="/404" />
      )}
    </main>
  )
}

export default Profile

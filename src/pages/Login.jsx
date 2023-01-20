import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, CardInput, Icon, Input, MainContainer } from '../components'
import { useForm, useGlobalData, useNotification } from '../hooks'
import { login, putAccessToken } from '../utils'

function Login() {
  const { getUser, getLang } = useGlobalData()
  const notification = useNotification()
  const navigate = useNavigate()
  const intialData = {
    email: '',
    password: '',
  }

  const validation = (key, value, setError, clearError) => {
    switch (key) {
      case 'email':
        if (value === '') {
          setError('email', getLang('input.validation.email.required'))
          break
        }
        if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          setError('email', getLang('input.validation.email.valid'))
          break
        }
        clearError('email')
        break
      case 'password':
        if (value === '') {
          setError('password', getLang('input.validation.password.required'))
          break
        }
        clearError('password')
        break
      default:
        break
    }
  }

  const {
    handleChange,
    handleBlur,
    setLoading,
    form,
    error,
    isDisabled,
    isLoading,
  } = useForm(intialData, validation)

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const loginData = await login({
      email: form.email,
      password: form.password,
    })
    if (loginData.error) {
      notification.error(loginData.message)
    } else {
      putAccessToken(loginData.data.accessToken)
      await getUser()
      notification.success(loginData.message)
      navigate('/')
    }
    setLoading(false)
  }

  return (
    <MainContainer isCenter>
      <CardInput title={getLang('title.login')}>
        <form className='w-full space-y-6' onSubmit={handleFormSubmit}>
          <Input
            id='email'
            title={getLang('input.label.email')}
            type='email'
            name='email'
            placeholder={getLang('input.label.email')}
            value={form.email}
            error={error.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            id='password'
            title={getLang('input.label.email')}
            type='password'
            name='password'
            placeholder={getLang('input.label.password')}
            value={form.password}
            error={error.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div>
            <Button
              isSubmit
              isFluid
              isLoading={isLoading}
              disabled={isDisabled}
              rightIcon={<Icon name='login' className='ml-2 h-5 w-5' />}
            >
              {getLang('action.login')}
            </Button>
          </div>
          <div className='text-gray-600'>
            <span>{getLang('title.no-account')}</span>
            <Link
              to='/register'
              className='text-blue-500 underline decoration-blue-500 underline-offset-4'
            >
              {getLang('title.create-account')}
            </Link>
          </div>
        </form>
      </CardInput>
    </MainContainer>
  )
}

export default Login

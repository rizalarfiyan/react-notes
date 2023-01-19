import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, CardInput, Icon, Input, MainContainer } from '../components'
import { useForm, useGlobalData, useNotification } from '../hooks'
import { login, putAccessToken } from '../utils'

function Login() {
  const { getUser } = useGlobalData()
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
          setError('email', 'Email is required')
          break
        }
        if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          setError('email', 'Please enter a valid email address')
          break
        }
        clearError('email')
        break
      case 'password':
        if (value === '') {
          setError('password', 'Password is required')
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
      <CardInput title='Login'>
        <form className='w-full space-y-6' onSubmit={handleFormSubmit}>
          <Input
            id='email'
            title='Email'
            type='email'
            name='email'
            placeholder='Your email...'
            value={form.email}
            error={error.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            id='password'
            title='Password'
            type='password'
            name='password'
            placeholder='Your password...'
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
              Login
            </Button>
          </div>
          <div className='text-gray-600'>
            <span>No account? </span>
            <Link
              to='/register'
              className='text-blue-500 underline decoration-blue-500 underline-offset-4'
            >
              Create One
            </Link>
          </div>
        </form>
      </CardInput>
    </MainContainer>
  )
}

export default Login

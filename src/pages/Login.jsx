import React from 'react'
import { Button, CardInput, Icon, Input } from '../components'
import { useForm, useNotification } from '../hooks'
import { login } from '../utils/network-data'

function Login() {
  const notification = useNotification()
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
      notification.success(loginData.message)
    }
    setLoading(false)
  }

  return (
    <CardInput title='Login'>
      <form className='w-full space-y-6' onSubmit={handleFormSubmit}>
        <Input
          id='email'
          title='Email'
          type='text'
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
      </form>
    </CardInput>
  )
}

export default Login

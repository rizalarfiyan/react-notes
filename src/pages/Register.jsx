import React from 'react'
import { Link } from 'react-router-dom'
import { Button, CardInput, Icon, Input, MainContainer } from '../components'
import { useForm, useNotification } from '../hooks'
import { register } from '../utils/network-data'

function Register() {
  const notification = useNotification()
  const intialData = {
    email: '',
    name: '',
    password: '',
    password_confirmation: '',
  }

  const validation = (key, value, setError, clearError, current) => {
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
      case 'name':
        if (value === '') {
          setError('name', 'Name is required')
          break
        }
        if (!value.match(/^(?!\s)([a-z ,.'-]+)$/i)) {
          setError('name', 'Please enter a valid name')
          break
        }
        clearError('name')
        break
      case 'password':
        if (value === '') {
          setError('password', 'Password is required')
          break
        }
        clearError('password')
        break
      case 'password_confirmation':
        if (value === '') {
          setError('password_confirmation', 'Password Confirmation is required')
          break
        }
        if (value !== current.password) {
          setError('password', 'Password Confirmation does not match')
          break
        }
        clearError('password')
        clearError('password_confirmation')
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
    const registerData = await register({
      email: form.email,
      name: form.name,
      password: form.password,
    })
    if (registerData.error) {
      notification.error(registerData.message)
    } else {
      notification.success(registerData.message)
    }
    setLoading(false)
  }

  return (
    <MainContainer isCenter>
      <CardInput title='Create an Account'>
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
            id='name'
            title='Name'
            type='text'
            name='name'
            placeholder='Your Name...'
            value={form.name}
            error={error.name}
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
          <Input
            id='password_confirmation'
            title='Password Confirmation'
            type='password'
            name='password_confirmation'
            placeholder='Your password confirmation...'
            value={form.password_confirmation}
            error={error.password_confirmation}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <div>
            <Button
              isSubmit
              isFluid
              isLoading={isLoading}
              disabled={isDisabled}
              rightIcon={<Icon name='register' className='ml-2 h-5 w-5' />}
            >
              Register
            </Button>
          </div>
          <div className='text-gray-600'>
            <span>Have an account? </span>
            <Link
              to='/login'
              className='text-blue-500 underline decoration-blue-500 underline-offset-4'
            >
              Go login
            </Link>
          </div>
        </form>
      </CardInput>
    </MainContainer>
  )
}

export default Register

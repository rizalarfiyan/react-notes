import React from 'react'
import { Link } from 'react-router-dom'
import { Button, CardInput, Icon, Input, MainContainer } from '../components'
import { useForm, useGlobalData, useNotification } from '../hooks'
import { register } from '../utils'

function Register() {
  const { getLang } = useGlobalData()
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
          setError('email', getLang('input.validation.email.required'))
          break
        }
        if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          setError('email', getLang('input.validation.email.valid'))
          break
        }
        clearError('email')
        break
      case 'name':
        if (value === '') {
          setError('name', getLang('input.validation.name.required'))
          break
        }
        if (!value.match(/^(?!\s)([a-z ,.'-]+)$/i)) {
          setError('name', getLang('input.validation.name.valid'))
          break
        }
        clearError('name')
        break
      case 'password':
        if (value === '') {
          setError('password', getLang('input.validation.password.required'))
          break
        }
        clearError('password')
        break
      case 'password_confirmation':
        if (value === '') {
          setError(
            'password_confirmation',
            getLang('input.validation.password_confirmation.required')
          )
          break
        }
        if (value !== current.password) {
          setError(
            'password',
            getLang('input.validation.password_confirmation.no-match')
          )
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
      <CardInput title={getLang('title.register')}>
        <form className='w-full space-y-6' onSubmit={handleFormSubmit}>
          <Input
            id='email'
            title={getLang('input.label.email')}
            type='email'
            name='email'
            placeholder={getLang('input.placeholder.email')}
            value={form.email}
            error={error.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            id='name'
            title={getLang('input.label.name')}
            type='text'
            name='name'
            placeholder={getLang('input.placeholder.name')}
            value={form.name}
            error={error.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            id='password'
            title={getLang('input.label.password')}
            type='password'
            name='password'
            placeholder={getLang('input.placeholder.password')}
            value={form.password}
            error={error.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            id='password_confirmation'
            title={getLang('input.label.password_confirmation')}
            type='password'
            name='password_confirmation'
            placeholder={getLang('input.placeholder.password_confirmation')}
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
              {getLang('action.register')}
            </Button>
          </div>
          <div className='text-gray-600'>
            <span>{getLang('title.have-account')}</span>
            <Link
              to='/login'
              className='text-blue-500 underline decoration-blue-500 underline-offset-4'
            >
              {getLang('title.go-login')}
            </Link>
          </div>
        </form>
      </CardInput>
    </MainContainer>
  )
}

export default Register

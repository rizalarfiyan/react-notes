import { useEffect, useRef, useState } from 'react'
import { useGlobalData } from './useGlobal'

const useForm = (initialState = {}, callbackValidation = undefined) => {
  const emptyState = {
    form: { ...initialState },
    error: { ...initialState },
    isDisabled: true,
    isLoading: false,
  }
  const { lang } = useGlobalData()
  const isMounted = useRef(false)
  const [state, setState] = useState(emptyState)

  const setLoading = (isLoading) => setState((prev) => ({ ...prev, isLoading }))
  const setDisable = (isDisabled) =>
    setState((prev) => ({ ...prev, isDisabled }))
  const setError = (key, message) =>
    setState((prev) => ({
      ...prev,
      error: {
        ...prev.error,
        [key]: message,
      },
    }))
  const clearError = (key) =>
    setState((prev) => ({
      ...prev,
      error: {
        ...prev.error,
        [key]: '',
      },
    }))

  const validation = (key, value) => {
    if (callbackValidation) {
      callbackValidation(key, value, setError, clearError, state.form)
    }
    const isDisable = Object.keys(state.error).reduce((acc, val) => {
      let data = acc
      if ((state.error[val] !== '' && !acc) || state.form[val] === '') {
        data = true
      }
      return data
    }, false)
    setDisable(isDisable)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setState((prev) => ({
      ...prev,
      form: {
        ...prev.form,
        [name]: value,
      },
    }))
    validation(name, value)
    event.preventDefault()
  }

  const handleBlur = (event) => {
    const { name, value } = event.target
    validation(name, value)
    event.preventDefault()
  }

  const setClear = () => {
    setState(emptyState)
  }

  const triggerValidation = () => {
    Object.keys(state.form).forEach((key) => {
      const value = state.form[key]
      validation(key, value)
    })
  }

  useEffect(() => {
    if (isMounted.current) {
      triggerValidation()
    } else {
      isMounted.current = true
    }
  }, [lang])

  return {
    handleChange,
    handleBlur,
    setLoading,
    form: state.form,
    error: state.error,
    isDisabled: state.isDisabled,
    isLoading: state.isLoading,
    clear: setClear,
    triggerValidation,
  }
}

export default useForm

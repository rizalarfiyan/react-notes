import { createContext, useContext } from 'react'

const GlobalContext = createContext()
const useGlobalData = () => useContext(GlobalContext)

export { GlobalContext, useGlobalData }

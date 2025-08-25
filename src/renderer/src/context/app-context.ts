import { createContext } from 'react'

interface ImmersiveModeContextType {
  immersiveMode: boolean
  setImmersiveMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const ImmersiveModeContext = createContext<ImmersiveModeContextType>({
  immersiveMode: false,
  setImmersiveMode: () => {}
})

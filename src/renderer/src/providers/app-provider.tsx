import { ImmersiveModeContext } from '@renderer/context/app-context'
import { ConfigProvider, theme } from 'antd'
import { ReactNode } from 'react'

interface AppProviderProps {
  children: ReactNode
  immersiveMode: boolean
  setImmersiveMode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AppProvider({
  children,
  immersiveMode,
  setImmersiveMode
}: AppProviderProps): React.ReactNode {
  return (
    <ImmersiveModeContext value={{ immersiveMode, setImmersiveMode }}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          components: {
            Tree: {
              borderRadius: 0
            }
          }
        }}
      >
        {children}
      </ConfigProvider>
    </ImmersiveModeContext>
  )
}

import Sidebar from '@renderer/components/ui/Sidebar'
import AppProvider from '@renderer/providers/app-provider'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Layout } from 'antd'
import { useState } from 'react'

const { Content } = Layout

export const Route = createRootRoute({
  component: Root
})

function Root(): React.ReactElement {
  const [immersiveMode, setImmersiveMode] = useState<boolean>(false)

  return (
    <>
      <AppProvider immersiveMode={immersiveMode} setImmersiveMode={setImmersiveMode}>
        <Layout className="h-screen">
          <Sidebar immersiveMode={immersiveMode} />
          <Content className="p-10 h-full overflow-auto">
            <Outlet />
          </Content>
        </Layout>
      </AppProvider>
      <TanStackRouterDevtools />
    </>
  )
}

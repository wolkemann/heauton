import { Layout } from 'antd'
import { useContext } from 'react'
import { ImmersiveModeContext } from '@renderer/context/app-context'
import SideVerticalMenu from './SideVerticalMenu'
import SideMainMenu from './SideMainMenu'

const { Sider } = Layout

export default function Sidebar(): React.ReactElement {
  const { immersiveMode } = useContext(ImmersiveModeContext)

  if (immersiveMode) {
    return <></>
  }

  return (
    <Sider width={360}>
      <div className="flex h-full">
        <SideVerticalMenu />
        <SideMainMenu />
      </div>
    </Sider>
  )
}

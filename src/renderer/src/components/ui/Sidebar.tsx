import { useFiles } from '@renderer/hooks/useFiles'
import Directory from '../Directory'
import Sidemenu from './Sidemenu'
import Sidesearch from './Sidesearch'
import { Layout } from 'antd'

const { Sider } = Layout

interface SidebarProps {
  immersiveMode: boolean
}

export default function Sidebar({ immersiveMode }: SidebarProps): React.ReactElement {
  const { files, createFile, createFolder, setSelectedPath } = useFiles()

  if (immersiveMode) {
    return <></>
  }

  return (
    <Sider width={320}>
      <div className="bg-zinc-900 shadow flex flex-col h-full">
        <Sidemenu createFile={createFile} createFolder={createFolder} />
        <Sidesearch />
        <Directory files={files} setSelectedPath={setSelectedPath} />
      </div>
    </Sider>
  )
}

import { useFiles } from '@renderer/hooks/useFiles'
import Sidesearch from './Sidesearch'
import Sidemenu from './Sidemenu'
import Directory from '../Directory'

export default function SideMainMenu(): React.ReactElement {
  const { files, createFile, createFolder, setSelectedPath } = useFiles()
  return (
    <div className="flex-1 bg-zinc-900 shadow flex flex-col h-full">
      <Sidesearch />
      <Sidemenu createFile={createFile} createFolder={createFolder} />
      <Directory files={files} setSelectedPath={setSelectedPath} />
    </div>
  )
}

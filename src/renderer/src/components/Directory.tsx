import { EditOutlined } from '@ant-design/icons'

import { getRelativePath, isFile, transformFileNodeToAntdTreeData } from '@renderer/lib/helpers'
import { useNavigate } from '@tanstack/react-router'
import { Tree } from 'antd'
import { DataNode } from 'antd/es/tree'
import { useState } from 'react'
import { FileNode } from 'src/shared/ipc-types'

const { DirectoryTree } = Tree

interface DirectoryProps {
  files: FileNode[]
  setSelectedPath: (path: string) => void
}

export default function Directory({ files, setSelectedPath }: DirectoryProps): React.ReactElement {
  const navigate = useNavigate()

  const treeData = transformFileNodeToAntdTreeData(files)

  const handleOnSelect = (selectedKeys: React.Key[]): void => {
    const noteId = getRelativePath(selectedKeys[0] as string)
    const relativePath = getRelativePath(selectedKeys[0] as string, { mode: 'path-only' })

    if (isFile(noteId)) {
      navigate({ to: `/read/${noteId}` })
    }

    setSelectedPath(relativePath)
  }

  const renderTitle = (node: DataNode): React.ReactNode => {
    const path = getRelativePath(node.key as string)
    return <DirTitle node={node} path={path} key={node.key} />
  }

  return (
    <DirectoryTree
      className="flex-1"
      treeData={treeData}
      titleRender={renderTitle}
      onSelect={handleOnSelect}
      showLine
      defaultExpandAll
    />
  )
}

function DirTitle({ node, path }: { node: DataNode; path: string }): React.ReactElement {
  const [hover, setHover] = useState<boolean>(false)
  const navigate = useNavigate()
  const title = node.title as string
  const relativePath = path as string

  const handleEditClick = (e: React.MouseEvent): void => {
    e.stopPropagation()
    navigate({ to: `/edit/${relativePath}` })
  }

  const isEditVisible = hover && isFile(title)

  return (
    <div
      className="inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {title} {isEditVisible && <EditOutlined className="pl-2" onClick={handleEditClick} />}
    </div>
  )
}

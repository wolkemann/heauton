import { TreeDataNode } from 'antd'
import { FileNode } from 'src/shared/ipc-types'

export const transformFileNodeToAntdTreeData = (data: FileNode[]): TreeDataNode[] => {
  if (!data) return []
  return data.map((item) => {
    const { name, path, isDir, children } = item
    const treeNode: TreeDataNode = {
      title: name,
      key: path,
      isLeaf: !isDir,
      children: isDir && children ? transformFileNodeToAntdTreeData(children) : undefined
    }
    return treeNode
  })
}

export const getFilenameFromPath = (path: string): string => {
  const segments = path.split('\\')

  return segments[segments.length - 1]
}

export const getRelativePath = (
  path: string,
  options?: { mode?: 'file' | 'path-only' }
): string => {
  const segments = path.split('\\')
  const journalIndex = segments.indexOf('heauton-journal')

  if (isFile(path) && options?.mode === 'path-only') {
    return journalIndex !== -1 ? segments.slice(journalIndex + 1, -1).join('\\') : path
  }

  return journalIndex !== -1 ? segments.slice(journalIndex + 1).join('\\') : path
}

export const isFile = (path: string): boolean => path.endsWith('.md')

export const transformFilesToFlatArray = (files: FileNode[]): unknown[] => {
  const finalArray: FileNode[] = []

  const traverse = (nodes: FileNode[]): void => {
    nodes.forEach((node) => {
      if (node?.content) finalArray.push(node)
      if (node.children) {
        traverse(node.children)
      }
    })
  }

  traverse(files)

  return finalArray
}

export const toggleImmersiveModeHelper = (pathname: string): string => {
  if (pathname.startsWith('/edit')) {
    const newPath = pathname.replace('/edit', '/read')
    return newPath
  }
  if (pathname.startsWith('/read')) {
    const newPath = pathname.replace('/read', '/edit')
    return newPath
  }

  throw new Error('Invalid pathname')
}

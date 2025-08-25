import { FileNode } from '../../shared/ipc-types'

export const transformFileNodeToFlatArray = (node: FileNode): FileNode[] => {
  const result: FileNode[] = []
  const traverse = (n: FileNode): void => {
    if (n.content) result.push(n)
    if (n.children) {
      n.children.forEach(traverse)
    }
  }
  traverse(node)
  return result
}

export const parseFileContentToMetaData = (
  content: string | undefined
): { title: string; excerpt: string; date: string } => {
  if (!content) {
    throw new Error('Content is required')
  }
  const lines = content.split('\n')
  const title = lines[0].replace(/^#\s*/, '')
  const excerpt = `${lines.slice(1).join('\n').trim().slice(0, 130)}...`

  const date = new Date(title).toISOString().slice(0, 10)

  return { title, excerpt, date }
}

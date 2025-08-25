// (Node-only helpers)
import { promises as fs } from 'node:fs'
import path from 'node:path'
import type { FileNode } from '../shared/ipc-types'

export async function ensureDir(p: string): Promise<void> {
  await fs.mkdir(p, { recursive: true })
}

export async function readDirTree(root: string): Promise<FileNode> {
  const stat = await fs.stat(root)
  const node: FileNode = { path: root, name: path.basename(root), isDir: stat.isDirectory() }
  if (!node.isDir) return node

  const entries = await fs.readdir(root)
  const children: FileNode[] = []
  for (const e of entries) {
    const full = path.join(root, e)
    const st = await fs.stat(full)
    if (st.isDirectory()) {
      children.push(await readDirTree(full))
    } else {
      const content = await fs.readFile(full, 'utf-8')
      children.push({ path: full, name: e, isDir: false, content })
    }
  }
  node.children = children.sort(
    (a, b) => Number(b.isDir) - Number(a.isDir) || a.name.localeCompare(b.name)
  )
  return node
}

export async function readFile(p: string): Promise<string> {
  return fs.readFile(p, 'utf-8')
}

export async function writeFile(p: string, content: string): Promise<void> {
  await ensureDir(path.dirname(p))
  await fs.writeFile(p, content, 'utf-8')
}

export async function createFile(p: string): Promise<string> {
  await ensureDir(p)

  const date = new Date()
  const timestamp = String(Date.now()).slice(-6)
  const name = `${date.toISOString().slice(0, 10)}-${timestamp}.md`
  const template = `# ${date.toISOString().slice(0, 10)}\n\nWrite here...\n`
  const full = path.join(p, name)

  await fs.writeFile(full, template, { flag: 'wx' })
  return full
}

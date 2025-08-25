import { useCallback, useEffect, useState } from 'react'
import { FileNode } from 'src/shared/ipc-types'

interface useFilesReturn {
  rootPath: string
  files: FileNode[]
  selectedPath: string
  setSelectedPath: (path: string) => void
  refreshFiles: () => Promise<void>
  readFile: (path: string) => Promise<string>
  writeFile: (path: string, content: string) => Promise<string>
  createFile: () => Promise<string>
  createFolder: (pathName: string) => Promise<void>
}

export const useFiles = (): useFilesReturn => {
  const [rootPath, setRootPath] = useState<string>('')
  const [selectedPath, setSelectedPath] = useState<string>('')
  const [files, setFiles] = useState<FileNode[]>([])

  const refreshFiles = useCallback(async (): Promise<void> => {
    const response = await window.api.listDir()
    setRootPath(response.path)
    setFiles([response])
  }, [])

  const readFile = useCallback(
    async (path: string): Promise<string> => {
      if (!rootPath) return Promise.resolve('')
      const content = await window.api.readFile(`${rootPath}/${path}`)
      return content
    },
    [rootPath]
  )

  const writeFile = useCallback(
    async (path: string, content: string): Promise<string> => {
      if (!rootPath) return Promise.resolve('')
      const file = await window.api.writeFile(`${rootPath}/${path}`, content)
      return file
    },
    [rootPath]
  )

  const createFile = useCallback(async (): Promise<string> => {
    if (!rootPath) return Promise.resolve('')
    const newFile = await window.api.createFile(`${rootPath}/${selectedPath}`)
    refreshFiles()
    return newFile
  }, [rootPath, selectedPath, refreshFiles])

  const createFolder = useCallback(
    async (pathName: string): Promise<void> => {
      if (!rootPath) return
      await window.api.createFolder(`${rootPath}/${selectedPath}/${pathName}`)
      refreshFiles()
    },
    [rootPath, selectedPath, refreshFiles]
  )

  useEffect(() => {
    const fetchFiles = async (): Promise<void> => {
      await refreshFiles()
    }

    fetchFiles()
  }, [refreshFiles])

  return {
    files,
    rootPath,
    selectedPath,
    setSelectedPath,
    refreshFiles,
    readFile,
    writeFile,
    createFile,
    createFolder
  }
}

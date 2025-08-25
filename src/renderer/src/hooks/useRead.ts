import { useEffect, useState } from 'react'
import { useFiles } from './useFiles'

/**
 * This hook is responsible for reading the content of a note by its ID.
 */
export const useRead = (noteId: string): { content: string } => {
  const { readFile } = useFiles()

  const [content, setContent] = useState<string>('')

  useEffect(() => {
    const fetchFile = async (): Promise<void> => {
      const fileContent = await readFile(noteId)
      setContent(fileContent)
    }

    fetchFile()
  }, [noteId, readFile])

  return { content }
}

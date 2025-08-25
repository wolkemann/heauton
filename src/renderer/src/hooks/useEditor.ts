import { useCallback, useEffect, useState } from 'react'
import { useFiles } from './useFiles'
import { notification } from 'antd'
import '@ant-design/v5-patch-for-react-19'
import { Hotkeys, Messages } from '@renderer/types/enums'
import { AUTOSAVE_TIMER } from '@renderer/lib/constants'
import { useHotkey } from './useHotkey'

export const useEditor = (
  noteId: string
): { content: string; updateContent: (newContent: string) => void } => {
  const { readFile, writeFile } = useFiles()
  const [content, setContent] = useState<string>('')

  const updateContent = useCallback((newContent: string) => {
    setContent(newContent)
  }, [])

  useHotkey(Hotkeys.SAVE_FILE, async () => {
    const file = await writeFile(noteId, content)
    setContent(file)
    notification.success({
      message: Messages.FILE_SAVED
    })
  })

  useEffect(() => {
    const fetchFile = async (): Promise<void> => {
      const fileContent = await readFile(noteId)
      updateContent(fileContent)
    }

    fetchFile()
  }, [noteId, updateContent, readFile])

  useEffect(() => {
    const saveInterval = setInterval(async () => {
      const file = await writeFile(noteId, content)
      setContent(file)

      notification.success({
        message: Messages.FILE_AUTOSAVED,
        placement: 'bottomRight'
      })
    }, AUTOSAVE_TIMER)

    return () => {
      clearInterval(saveInterval)
    }
  }, [noteId, content, writeFile])

  return { content, updateContent }
}

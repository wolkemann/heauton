import { useEffect } from 'react'

export const useHotkey = (combo: string, handler: (e: KeyboardEvent) => void): void => {
  useEffect(() => {
    const listener = (e: KeyboardEvent): void => {
      const pressed = `${e.ctrlKey ? 'Ctrl+' : ''}${e.key.toLowerCase()}`.toLocaleLowerCase()
      const normalizedCombo = combo.toLowerCase().replaceAll(' ', '')

      if (pressed === normalizedCombo) {
        e.preventDefault()
        handler(e)
      }
    }
    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
  }, [combo, handler])
}

import { Hotkeys } from '@renderer/types/enums'
import { useHotkey } from './useHotkey'
import { useCallback, useContext, useMemo } from 'react'
import { ImmersiveModeContext } from '@renderer/context/app-context'
import { IPCEvents } from '../../../shared/ipc-types'
import { useNavigate, useRouterState } from '@tanstack/react-router'
import { toggleImmersiveModeHelper } from '@renderer/lib/helpers'

interface useQuickmenuPropsReturn {
  immersiveMode: boolean
  isEditMode: boolean
  toggleImmersiveMode: () => void
  toggleEditMode: () => void
}

export const useQuickmenu = (): useQuickmenuPropsReturn => {
  const { immersiveMode, setImmersiveMode } = useContext(ImmersiveModeContext)
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const navigate = useNavigate()

  const isEditMode = useMemo(() => pathname.startsWith('/edit'), [pathname])

  const toggleEditMode = useCallback((): void => {
    navigate({ to: toggleImmersiveModeHelper(pathname) })
  }, [navigate, pathname])

  const toggleImmersiveMode = useCallback((): void => {
    setImmersiveMode(!immersiveMode)
    window.electron.ipcRenderer.send(
      immersiveMode ? IPCEvents.FULLSCREEN_OFF : IPCEvents.FULLSCREEN_ON
    )
  }, [immersiveMode, setImmersiveMode])

  useHotkey(Hotkeys.TOGGLE_IMMERSIVE_MODE, toggleImmersiveMode)

  useHotkey(Hotkeys.TOGGLE_EDIT_MODE, () => {
    const path = toggleImmersiveModeHelper(pathname)
    navigate({ to: path })
  })

  return {
    immersiveMode,
    isEditMode,
    toggleImmersiveMode,
    toggleEditMode
  }
}

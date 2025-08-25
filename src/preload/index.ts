import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { FileNode, IPC } from '../shared/ipc-types'
import { fileObject } from '../shared/shared-types'

// Custom APIs for renderer
const api = {
  listDir: (root?: string) =>
    ipcRenderer.invoke(IPC.LIST_DIR, root ? { root } : undefined) as Promise<FileNode>,
  readFile: (path: string) => ipcRenderer.invoke(IPC.READ_FILE, { path }) as Promise<string>,
  writeFile: (path: string, content: string) =>
    ipcRenderer.invoke(IPC.WRITE_FILE, { path, content }) as Promise<string>,
  createFile: (path: string) => ipcRenderer.invoke(IPC.CREATE_FILE, { path }) as Promise<string>,
  createFolder: (newFolder?: string) =>
    ipcRenderer.invoke(IPC.CREATE_FOLDER, newFolder ? { newFolder } : undefined) as Promise<void>,

  fetchFiles: (searchTerm?: string) =>
    ipcRenderer.invoke(IPC.FETCH_FILES, { searchTerm }) as Promise<fileObject[]>
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

declare global {
  interface Window {
    api: typeof api
    electron: typeof electronAPI
  }
}

import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { fetchApiPayload, fileApiPayload, IPC, IPCEvents } from '../shared/ipc-types'
import { createFile, ensureDir, readDirTree, readFile, writeFile } from './file-system'
import { parseFileContentToMetaData, transformFileNodeToFlatArray } from './lib/helpers'
import { fileObject } from '../shared/shared-types'

export const DEFAULT_ROOT = join(app.getPath('documents'), 'heauton-journal')

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    minWidth: 1400,
    minHeight: 800,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  ipcMain.on(IPCEvents.FULLSCREEN_ON, () => {
    mainWindow.setFullScreen(true)
    mainWindow.setAlwaysOnTop(true, 'screen-saver')
  })

  ipcMain.on(IPCEvents.FULLSCREEN_OFF, () => {
    mainWindow.setFullScreen(false)
    mainWindow.setAlwaysOnTop(false)
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.handle(IPC.LIST_DIR, async (_e, payload: fileApiPayload | undefined) => {
  const root = payload?.path ?? DEFAULT_ROOT
  await ensureDir(root)
  return readDirTree(root)
})

ipcMain.handle(IPC.READ_FILE, async (_e, payload: fileApiPayload) => {
  if (!payload.path) throw new Error('Path is required')
  const path = await readFile(payload.path)
  return path
})

ipcMain.handle(IPC.WRITE_FILE, async (_e, payload: fileApiPayload) => {
  if (!payload.path || !payload.content) throw new Error('Path and content are required')
  await writeFile(payload.path, payload.content)
  const newFile = await readFile(payload.path)

  return newFile
})

ipcMain.handle(IPC.CREATE_FILE, async (_e, payload: fileApiPayload) => {
  if (!payload.path) throw new Error('Path is required')
  const newFilePath = await createFile(payload.path)
  return newFilePath
})

ipcMain.handle(IPC.CREATE_FOLDER, async (_e, payload: fileApiPayload) => {
  if (!payload.newFolder) throw new Error('Folder name is required')
  await ensureDir(payload.newFolder)
})

ipcMain.handle(IPC.FETCH_FILES, async (_e, payload: fetchApiPayload) => {
  await ensureDir(DEFAULT_ROOT)
  const files = await readDirTree(DEFAULT_ROOT)

  let flatArray = transformFileNodeToFlatArray(files)

  if (payload.searchTerm) {
    flatArray = flatArray.filter(
      (file) => typeof file.content === 'string' && file.content.includes(payload.searchTerm ?? '')
    )
  }

  const fileObjects: fileObject[] = flatArray.map(({ content, path }) => {
    const safeContent = typeof content === 'string' ? content : ''
    const { title, date, excerpt } = parseFileContentToMetaData(safeContent)
    return {
      title,
      content: safeContent,
      date,
      excerpt,
      path
    }
  })

  return fileObjects
})

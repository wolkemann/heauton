export type FileNode = {
  path: string
  name: string
  isDir: boolean
  content?: string
  children?: FileNode[]
}

export type fileApiPayload = { path?: string; content?: string; newFolder?: string }
export type fetchApiPayload = { searchTerm?: string }

export const IPC = {
  LIST_DIR: 'fs:list',
  READ_FILE: 'fs:read',
  WRITE_FILE: 'fs:write',
  CREATE_FILE: 'fs:create',
  CREATE_FOLDER: 'fs:create-folder',
  FETCH_FILES: 'api:fetch-file',
  FETCH_MEDITATIONS: 'api:fetch-meditations',
  FETCH_MEDITATIONS_EXTRACT: 'api:fetch-meditations-extract'
} as const

export enum IPCEvents {
  FULLSCREEN_ON = 'fullscreen:on',
  FULLSCREEN_OFF = 'fullscreen:off'
}

export type WatchEvent = { type: 'added' | 'changed' | 'removed'; path: string }

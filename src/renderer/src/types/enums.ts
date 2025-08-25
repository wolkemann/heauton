export enum Messages {
  FILE_SAVED = 'File saved successfully',
  FILE_AUTOSAVED = 'File autosaved successfully',
  IMMERSIVE_MODE_ON = 'Immersive mode enabled',
  IMMERSIVE_MODE_OFF = 'Immersive mode disabled'
}

export enum Hotkeys {
  TOGGLE_IMMERSIVE_MODE = 'CTRL + I',
  TOGGLE_EDIT_MODE = 'CTRL + E',
  SAVE_FILE = 'CTRL + S'
}

export enum TooltipText {
  TOGGLE_IMMERSIVE_MODE = `Toggle immersive mode (${Hotkeys.TOGGLE_IMMERSIVE_MODE})`,
  TOGGLE_EDIT_MODE = `Toggle edit mode (${Hotkeys.TOGGLE_EDIT_MODE})`
}

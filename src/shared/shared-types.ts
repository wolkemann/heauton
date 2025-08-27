export type fileObject = {
  title: string
  content: string
  date: string
  excerpt: string
  path: string
}

export type Meditations = Record<string, Record<string, string>>

export type MeditationsSectionExtract = {
  text: string
  book: number
  section: number
}

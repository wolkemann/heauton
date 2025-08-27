import { FileNode } from '../../shared/ipc-types'
import { Meditations, MeditationsSectionExtract } from '../../shared/shared-types'

export const transformFileNodeToFlatArray = (node: FileNode): FileNode[] => {
  const result: FileNode[] = []
  const traverse = (n: FileNode): void => {
    if (n.content) result.push(n)
    if (n.children) {
      n.children.forEach(traverse)
    }
  }
  traverse(node)
  return result
}

export const parseFileContentToMetaData = (
  content: string | undefined
): { title: string; excerpt: string; date: string } => {
  if (!content) {
    throw new Error('Content is required')
  }
  const lines = content.split('\n')
  const title = lines[0].replace(/^#\s*/, '')
  const excerpt = `${lines.slice(1).join('\n').trim().slice(0, 130)}...`

  const date = new Date(title).toISOString().slice(0, 10)

  return { title, excerpt, date }
}

/**
 * Parse Marcus Aurelius' Meditations HTML into a JS object
 * Structure: { book_1: { section_1: "...", section_2: "..." } }
 * @param {string} html - HTML content
 * @returns {object} parsed structure
 */
export const parseMeditations = (html: string): Meditations => {
  const result: Meditations = {}

  // Match books: <h2 id="I"> ... </h2> + following content until next <h2>
  const bookRegex = /<h2[^>]*id="([IVXLCDM]+)"[^>]*>.*?<\/h2>([\s\S]*?)(?=<h2|$)/g

  let bookMatch
  while ((bookMatch = bookRegex.exec(html)) !== null) {
    const roman = bookMatch[1]
    const content = bookMatch[2]
    const bookNum = romanToInt(roman)
    const bookKey = `book_${bookNum}`
    result[bookKey] = {}

    // Inside the book, find <b id="I_1">1.</b> ... text until next <b>
    const sectionRegex = /<b[^>]*id="[^_]+_(\d+)"[^>]*>\d+\.<\/b>([\s\S]*?)(?=<b|<\/p>)/g

    let sectionMatch
    while ((sectionMatch = sectionRegex.exec(content)) !== null) {
      const sectionNum = sectionMatch[1]
      const text = cleanText(sectionMatch[2])
      result[bookKey][`section_${sectionNum}`] = text
    }
  }

  return result
}

// --- helper: roman numerals → int ---
const romanToInt = (roman: string): number => {
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
  let num = 0,
    prev = 0
  for (let i = roman.length - 1; i >= 0; i--) {
    const val = map[roman[i]]
    if (val < prev) num -= val
    else num += val
    prev = val
  }
  return num
}

// --- helper: clean text ---
const cleanText = (str: string): string => {
  return str
    .replace(/<\/?[^>]+>/g, '') // strip HTML tags
    .replace(/\s+/g, ' ') // collapse whitespace
    .trim()
}

export const getMeditationsRandomSection = (
  meditations: Meditations
): MeditationsSectionExtract => {
  const books = Object.values(meditations)
  const bookIndex = Math.floor(Math.random() * books.length)
  const randomBook = books[bookIndex]
  const sections = Object.values(randomBook)
  const sectionIndex = Math.floor(Math.random() * sections.length)
  const randomSection = sections[sectionIndex]

  return { text: randomSection, book: bookIndex + 1, section: sectionIndex + 1 }
}

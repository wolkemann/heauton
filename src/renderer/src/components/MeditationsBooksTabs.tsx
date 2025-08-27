import { ROMAN_NUMBERS_MAP } from '@renderer/lib/constants'
import { Button } from 'antd'
import { Meditations } from 'src/shared/shared-types'

interface MeditationsBookProps {
  meditations: Meditations
  selectedBook: string
  setSelectedBook: React.Dispatch<React.SetStateAction<string>>
}

export default function MeditationsBooksTabs({
  meditations,
  selectedBook,
  setSelectedBook
}: MeditationsBookProps): React.ReactElement {
  const bookTabs = Object.keys(meditations).map((book) => {
    const bookLabel = book.split('_')[1]
    const bookRomanInt = ROMAN_NUMBERS_MAP[bookLabel]

    return { book, bookLabel: bookRomanInt }
  })

  if (!meditations) return <div>No Meditations Available</div>
  return (
    <div className="w-full flex justify-center  mb-10 bg-black">
      {bookTabs.map(({ book, bookLabel }) => {
        const isActive = book !== selectedBook ? '!border-b-zinc-400' : '!border-b-blue-950'
        return (
          <Button
            key={book}
            type="link"
            className={`!flex-1 !text-zinc-300 !text-lg !font-black !px-7 !py-4 !mx-0 !border-b-4 ${isActive} !rounded-b-none hover:!border-b-blue-950`}
            onClick={() => setSelectedBook(book)}
          >
            {bookLabel}
          </Button>
        )
      })}
    </div>
  )
}

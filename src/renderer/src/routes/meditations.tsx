import MeditationBook from '@renderer/components/MeditationBook'
import MeditationsBooksTabs from '@renderer/components/MeditationsBooksTabs'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Meditations } from 'src/shared/shared-types'

export const Route = createFileRoute('/meditations')({
  component: MeditationsPage
})

function MeditationsPage(): React.ReactElement {
  const [meditations, setMeditations] = useState<Meditations | undefined>(undefined)
  const [selectedBook, setSelectedBook] = useState<string>('book_1')

  useEffect(() => {
    window.api.fetchMeditations().then((data) => {
      setMeditations(data)
    })
  }, [])

  if (!meditations) {
    return <div>Loading...</div>
  }

  const currentBook = meditations[selectedBook] || {}

  return (
    <div className="min-w-[796px] max-w-[1200px] min-h-full m-auto">
      <div className="sticky -top-20 bg-black">
        <h1 className="text-4xl font-black text-center mb-10">
          M. ANTONI IMPERATORIS ROMANI ET PHILOSOPHI
        </h1>
        <MeditationsBooksTabs
          meditations={meditations}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />
      </div>
      <MeditationBook currentBook={currentBook} />
    </div>
  )
}

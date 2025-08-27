import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { MeditationsSectionExtract } from '../../../shared/shared-types'
import MeditationsExtract from '@renderer/components/MeditationsExtract'

export const Route = createFileRoute('/')({
  component: Index
})

function Index(): React.ReactElement {
  const [meditations, setMeditations] = useState<MeditationsSectionExtract | undefined>(undefined)

  useEffect(() => {
    window.api.fetchMeditationsExtract().then((data) => {
      setMeditations(data)
    })
  }, [])

  return (
    <div className="w-full min-h-full flex items-center justify-center">
      <MeditationsExtract meditations={meditations} />
    </div>
  )
}

import Note from '@renderer/components/Note'
import Quickmenu from '@renderer/components/ui/Quickmenu'

import { useRead } from '@renderer/hooks/useRead'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/read/$noteId')({
  component: Read
})

function Read(): React.ReactElement {
  const { noteId } = Route.useParams()
  const { content } = useRead(noteId)

  return (
    <div>
      <Note content={content} />
      <Quickmenu />
    </div>
  )
}

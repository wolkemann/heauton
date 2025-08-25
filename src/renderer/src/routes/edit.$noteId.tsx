import Quickmenu from '@renderer/components/ui/Quickmenu'
import { useEditor } from '@renderer/hooks/useEditor'

import { createFileRoute } from '@tanstack/react-router'
import { Input } from 'antd'

const TextArea = Input.TextArea

export const Route = createFileRoute('/edit/$noteId')({
  component: Editor
})

function Editor(): React.ReactElement {
  const { noteId } = Route.useParams()
  const { content, updateContent } = useEditor(noteId)

  return (
    <>
      <TextArea
        className="!block !bg-transparent !border-transparent focus:!shadow-none !w-[796px] !min-h-full !m-auto !text-xl !resize-none !overflow-hidden"
        value={content}
        onChange={(e) => updateContent(e.target.value)}
        autoFocus
      />
      <Quickmenu />
    </>
  )
}

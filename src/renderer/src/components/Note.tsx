import { MARKDOWN_RENDER_OPTIONS } from '@renderer/lib/constants'
import Markdown from 'markdown-to-jsx'

export default function Note({ content }: { content: string }): React.ReactElement {
  return (
    <div className="w-[796px] m-auto">
      <Markdown options={MARKDOWN_RENDER_OPTIONS}>{content}</Markdown>
    </div>
  )
}

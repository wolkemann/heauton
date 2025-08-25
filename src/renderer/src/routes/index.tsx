import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index
})

function Index(): React.ReactElement {
  return <div className="p-2">Welcome home</div>
}

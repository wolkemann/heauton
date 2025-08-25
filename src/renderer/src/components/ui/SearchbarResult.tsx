import { getRelativePath } from '@renderer/lib/helpers'
import { useNavigate } from '@tanstack/react-router'
import { Card } from 'antd'
import { fileObject } from 'src/shared/shared-types'

interface SearchbarResultProps {
  results: fileObject[]
  searchTerm: string
}

export default function SearchbarResult({
  results,
  searchTerm
}: SearchbarResultProps): React.ReactElement {
  const navigate = useNavigate()

  if (!searchTerm) {
    return <div></div>
  }

  return (
    <div className="pb-2">
      <div className="text-sm text-gray-500 mb-2 ">
        Search result for: <strong>{searchTerm}</strong>
      </div>
      <div className="flex flex-col gap-2">
        {results.map((file, index) => (
          <Card
            key={index}
            classNames={{ body: '!select-none !cursor-pointer' }}
            size="small"
            onClick={() => navigate({ to: `/read/${getRelativePath(file.path)}` })}
            hoverable
          >
            <Card.Meta title={file.title} description={file.excerpt} />
          </Card>
        ))}
      </div>
    </div>
  )
}

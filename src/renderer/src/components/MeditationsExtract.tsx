import { MeditationsSectionExtract } from 'src/shared/shared-types'
import { Typography } from 'antd'

const { Title } = Typography

export default function MeditationsExtract({
  meditations
}: {
  meditations: MeditationsSectionExtract | undefined
}): React.ReactElement {
  return (
    <div className="w-[796px]">
      {meditations && (
        <>
          <Title level={2}>
            Meditations, Book {meditations.book}, section {meditations.section}
          </Title>
          <p className="text-2xl leading-relaxed mb-4 font-serif">{meditations.text}</p>
          <p className="text-lg italic text-right">Marcus Aurelius</p>
        </>
      )}
    </div>
  )
}

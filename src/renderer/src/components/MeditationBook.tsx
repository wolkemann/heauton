export default function MeditationBook({
  currentBook
}: {
  currentBook: Record<string, string>
}): React.ReactElement {
  return (
    <div>
      {Object.entries(currentBook).map(([section, content]) => {
        const sectionNumber = section.split('_')[1]
        return (
          <p className="text-2xl mb-5 leading-relaxed" key={section}>
            <strong>{sectionNumber}. </strong>
            {content}
          </p>
        )
      })}
    </div>
  )
}

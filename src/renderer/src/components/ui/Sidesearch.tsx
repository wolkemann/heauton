import { useEffect, useState } from 'react'
import SearchbarResult from './SearchbarResult'
import Searchbar from '../Searchbar'
import { fileObject } from 'src/shared/shared-types'

export default function Sidesearch(): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [results, setResults] = useState<fileObject[]>([])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (!searchTerm) return
      const response = await window.api.fetchFiles(searchTerm)
      setResults(response)
    }

    fetchData()
  }, [searchTerm])

  return (
    <div className="p-2 border-b">
      <Searchbar setSearchTerm={setSearchTerm} />
      <SearchbarResult results={results} searchTerm={searchTerm} />
    </div>
  )
}

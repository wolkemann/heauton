import { Form, Input } from 'antd'

interface SearchbarProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export default function Searchbar({ setSearchTerm }: SearchbarProps): React.ReactElement {
  return (
    <Form layout="horizontal" size="small" onFinish={(values) => setSearchTerm(values.search)}>
      <Form.Item name="search">
        <Input placeholder="Search..." allowClear onClear={() => setSearchTerm('')} />
      </Form.Item>
    </Form>
  )
}

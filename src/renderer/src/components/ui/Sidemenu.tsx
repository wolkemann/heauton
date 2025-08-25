import { FileAddOutlined, FolderAddOutlined } from '@ant-design/icons'
import { Button, Form, Popover } from 'antd'
import Input from 'antd/es/input/Input'
import '@ant-design/v5-patch-for-react-19'

interface SidemenuProps {
  createFile: () => Promise<string>
  createFolder: (pathName: string) => Promise<void>
}

export default function Sidemenu({ createFile, createFolder }: SidemenuProps): React.ReactElement {
  return (
    <div className="p-1 bg-zinc-900 border-b shadow flex gap-1 justify-end">
      <Button
        size="small"
        title="New Entry"
        type="text"
        icon={<FileAddOutlined />}
        onClick={() => createFile()}
      />
      <Popover
        content={<NewFolderForm createFolder={createFolder} />}
        trigger="click"
        destroyOnHidden
      >
        <Button size="small" title="New Folder" type="text" icon={<FolderAddOutlined />} />
      </Popover>
    </div>
  )
}

const NewFolderForm = ({
  createFolder
}: {
  createFolder: (pathName: string) => Promise<void>
}): React.ReactElement => {
  const handleOnFinish = (values: { folderName: string }): void => {
    createFolder(values.folderName)
  }

  return (
    <Form layout="inline" size="small" onFinish={handleOnFinish}>
      <Form.Item name="folderName">
        <Input type="text" placeholder="Folder Name" />
      </Form.Item>

      <Button htmlType="submit">Create</Button>
    </Form>
  )
}

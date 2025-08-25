import { HomeOutlined } from '@ant-design/icons'
import { useNavigate } from '@tanstack/react-router'
import { Button } from 'antd'

export default function SideVerticalMenu(): React.ReactElement {
  const navigate = useNavigate()
  return (
    <div className="bg-zinc-900 h-full border-r shadow flex flex-col items-center gap-2">
      <Button
        title="Go to the Front page"
        type="text"
        size="large"
        icon={<HomeOutlined />}
        onClick={() => navigate({ to: '/' })}
      />
    </div>
  )
}

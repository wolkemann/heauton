import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { FloatButton } from 'antd'
import '@ant-design/v5-patch-for-react-19'
import { useQuickmenu } from '@renderer/hooks/useQuickmenu'
import { TooltipText } from '@renderer/types/enums'

export default function Quickmenu(): React.ReactElement {
  const { immersiveMode, isEditMode, toggleImmersiveMode, toggleEditMode } = useQuickmenu()

  return (
    <FloatButton.Group
      placement="bottom"
      className="!top-0 !opacity-50 hover:!opacity-100 transition-all"
      shape="circle"
    >
      <FloatButton
        tooltip={TooltipText.TOGGLE_IMMERSIVE_MODE}
        type={immersiveMode ? 'primary' : 'default'}
        icon={<EyeOutlined />}
        onClick={toggleImmersiveMode}
      />
      <FloatButton
        tooltip={TooltipText.TOGGLE_EDIT_MODE}
        type={isEditMode ? 'primary' : 'default'}
        icon={<EditOutlined />}
        onClick={toggleEditMode}
      />
    </FloatButton.Group>
  )
}

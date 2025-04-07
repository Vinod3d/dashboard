import { ChevronDown } from "lucide-react"

interface SidebarWidgetProps {
  title: string
  icon?: React.ReactNode
  badge?: React.ReactNode
  children?: React.ReactNode
  isOpen: boolean
  onToggle: () => void
}

const SidebarWidget = ({ title, icon, badge, children, isOpen, onToggle }: SidebarWidgetProps) => {
  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      <div className="flex justify-between items-center p-3 cursor-pointer" onClick={onToggle}>
        <div className="flex items-center">
          {icon && <span className="mr-2 text-gray-500">{icon}</span>}
          <h3 className="font-medium">{title}</h3>
        </div>
        <div className="flex items-center space-x-2">
          {badge}
          <ChevronDown
            className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
          />
        </div>
      </div>
      {isOpen && children}
    </div>
  )
}

export default SidebarWidget
import { Grid, FileText, Folder, MessageSquare, Edit, Settings, Clock, HelpCircle, User, LogOut, X, House } from "lucide-react"
import { useState } from "react"
import SidebarIcon from "../utilityComponents/SidebarIcon"
import MobileSidebarItem from "../utilityComponents/MobileSidebarItem"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const [activeIcon, setActiveIcon] = useState<string>("grid")
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleIconClick = (iconName: string) => {
    setActiveIcon(iconName)
    if (window.innerWidth < 768) {
      setIsOpen(false)
    }
  }

  const handleLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    setShowLogoutConfirm(false)
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sidebar bg-yellow-500 w-16 flex-shrink-0 flex-col items-center py-4 fixed h-full left-0 top-0 z-20 hidden md:flex">
        <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center mb-6">
        <SidebarIcon
            icon={<House className="h-6 w-6" />}
            active={activeIcon === "grid"}
            onClick={() => handleIconClick("grid")}
            tooltip="Dashboard"
          />
        </div>

        <nav className="flex flex-col items-center space-y-6 flex-1">
          <SidebarIcon
            icon={<Grid className="h-6 w-6" />}
            active={activeIcon === "grid"}
            onClick={() => handleIconClick("grid")}
            tooltip="Dashboard"
          />
          <SidebarIcon
            icon={<FileText className="h-6 w-6" />}
            active={activeIcon === "files"}
            onClick={() => handleIconClick("files")}
            tooltip="Files"
          />
          <SidebarIcon
            icon={<Folder className="h-6 w-6" />}
            active={activeIcon === "folders"}
            onClick={() => handleIconClick("folders")}
            tooltip="Folders"
          />
          <SidebarIcon
            icon={<MessageSquare className="h-6 w-6" />}
            active={activeIcon === "messages"}
            onClick={() => handleIconClick("messages")}
            tooltip="Messages"
          />
          <SidebarIcon
            icon={<Edit className="h-6 w-6" />}
            active={activeIcon === "edit"}
            onClick={() => handleIconClick("edit")}
            tooltip="Edit"
          />
          <SidebarIcon
            icon={<Settings className="h-6 w-6" />}
            active={activeIcon === "settings"}
            onClick={() => handleIconClick("settings")}
            tooltip="Settings"
          />
          <SidebarIcon
            icon={<Clock className="h-6 w-6" />}
            active={activeIcon === "history"}
            onClick={() => handleIconClick("history")}
            tooltip="History"
          />
          <SidebarIcon
            icon={<HelpCircle className="h-6 w-6" />}
            active={activeIcon === "help"}
            onClick={() => handleIconClick("help")}
            tooltip="Help"
          />
          <SidebarIcon
            icon={<User className="h-6 w-6" />}
            active={activeIcon === "profile"}
            onClick={() => handleIconClick("profile")}
            tooltip="Profile"
          />
        </nav>

        <button
          className="w-10 h-10 rounded-full bg-yellow-700 flex items-center justify-center mt-auto hover:bg-yellow-800 transition-colors"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut className="h-5 w-5 text-white" />
        </button>
      </aside>

      {/* Mobile sidebar */}
      <div className={`sidebar fixed inset-0 bg-black/75 z-30 md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="bg-yellow-600 w-64 h-full overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b border-yellow-500">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center mr-3">
                <div className="w-4 h-4 bg-yellow-600 rounded-sm" />
              </div>
              <span className="text-white font-medium">NYU Kreativespace</span>
            </div>
            <button title="close" className="text-white p-1 hover:bg-yellow-700 rounded-md" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="p-4">
            <MobileSidebarItem
              icon={<Grid className="h-5 w-5" />}
              label="Dashboard"
              active={activeIcon === "grid"}
              onClick={() => handleIconClick("grid")}
            />
            <MobileSidebarItem
              icon={<FileText className="h-5 w-5" />}
              label="Files"
              active={activeIcon === "files"}
              onClick={() => handleIconClick("files")}
            />
            <MobileSidebarItem
              icon={<Folder className="h-5 w-5" />}
              label="Folders"
              active={activeIcon === "folders"}
              onClick={() => handleIconClick("folders")}
            />
            <MobileSidebarItem
              icon={<MessageSquare className="h-5 w-5" />}
              label="Messages"
              active={activeIcon === "messages"}
              onClick={() => handleIconClick("messages")}
            />
            <MobileSidebarItem
              icon={<Edit className="h-5 w-5" />}
              label="Edit"
              active={activeIcon === "edit"}
              onClick={() => handleIconClick("edit")}
            />
            <MobileSidebarItem
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              active={activeIcon === "settings"}
              onClick={() => handleIconClick("settings")}
            />
            <MobileSidebarItem
              icon={<Clock className="h-5 w-5" />}
              label="History"
              active={activeIcon === "history"}
              onClick={() => handleIconClick("history")}
            />
            <MobileSidebarItem
              icon={<HelpCircle className="h-5 w-5" />}
              label="Help"
              active={activeIcon === "help"}
              onClick={() => handleIconClick("help")}
            />
            <MobileSidebarItem
              icon={<User className="h-5 w-5" />}
              label="Profile"
              active={activeIcon === "profile"}
              onClick={() => handleIconClick("profile")}
            />
            <MobileSidebarItem icon={<LogOut className="h-5 w-5" />} label="Logout" onClick={handleLogout} />
          </nav>
        </div>
      </div>

      {/* Logout confirmation dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-medium mb-4">Confirm Logout</h3>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-yello-600 text-white rounded-md hover:bg-yellow-700"
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar


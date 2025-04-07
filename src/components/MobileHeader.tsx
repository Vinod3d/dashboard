"use client"

import { Menu, User } from "lucide-react"

interface MobileHeaderProps {
  toggleSidebar: () => void
  toggleRightSidebar: () => void
}

const MobileHeader = ({ toggleSidebar, toggleRightSidebar }: MobileHeaderProps) => {
  return (
    <div className="md:hidden flex justify-between items-center p-4 bg-white border-b border-gray-200">
      <button className="p-2 rounded-md hover:bg-gray-100" onClick={toggleSidebar} aria-label="Toggle sidebar">
        <Menu className="h-6 w-6 text-gray-700" />
      </button>

      <div className="flex items-center">
        <h1 className="text-lg font-medium text-amber-700">NYU Kreativespace</h1>
      </div>

      <button className="p-2 rounded-md hover:bg-gray-100" onClick={toggleRightSidebar} aria-label="Toggle user menu">
        <User className="h-6 w-6 text-gray-700" />
      </button>
    </div>
  )
}

export default MobileHeader


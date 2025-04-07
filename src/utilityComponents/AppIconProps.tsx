import { useState } from "react"

interface AppIconProps {
    color: string
    letter: string
    tooltip?: string
  }


const AppIcon = ({ color, letter, tooltip }: AppIconProps) => {
    const [showTooltip, setShowTooltip] = useState(false)
  
    return (
      <div className="relative">
        <button
          className={`${color} rounded-md w-10 h-10 flex items-center justify-center text-white font-medium hover:opacity-90 transition-opacity`}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          {letter}
        </button>
  
        {tooltip && showTooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-20">
            {tooltip}
          </div>
        )}
      </div>
    )
  }
  

  export default AppIcon
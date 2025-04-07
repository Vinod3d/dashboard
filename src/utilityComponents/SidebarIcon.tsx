import { useState } from "react";

interface SidebarIconProps {
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
  tooltip: string;
}

const SidebarIcon = ({
  icon,
  active = false,
  onClick,
  tooltip,
}: SidebarIconProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <button
        className={`w-10 h-10 flex items-center justify-center rounded-md ${
          active ? "bg-white text-yellow-600" : "text-white hover:bg-yellow-700"
        } transition-colors`}
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {icon}
      </button>

      {showTooltip && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-20">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default SidebarIcon
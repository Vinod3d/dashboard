interface MobileSidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const MobileSidebarItem = ({
  icon,
  label,
  active = false,
  onClick,
}: MobileSidebarItemProps) => {
  return (
    <button
      className={`flex items-center w-full p-3 rounded-md mb-1 ${
        active ? "bg-amber-700 text-white" : "text-white hover:bg-amber-700"
      }`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default MobileSidebarItem;

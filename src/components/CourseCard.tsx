import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Heart,
  MoreVertical,
  MessageSquare,
  FileText,
  Folder,
  Bookmark,
  Edit,
  Eye,
  Share2,
  Download,
  Trash2,
  Copy,
} from "lucide-react"
import type { Course } from "../types/Course"

interface CourseCardProps {
  course: Course
  onFavoriteToggle: () => void
  viewMode: "grid" | "list"
}

const CourseCard = ({ course, onFavoriteToggle, viewMode }: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [dropdownDirection, setDropdownDirection] = useState<"up" | "down">("down")
  const menuRef = useRef<HTMLDivElement>(null)
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])


  useEffect(() => {
    const updateMenuDirection = () => {
      if (menuRef.current) {
        const rect = menuRef.current.getBoundingClientRect()
        const spaceBelow = window.innerHeight - rect.bottom
        const spaceAbove = rect.top
  
        // Suppose dropdown height ~200px
        if (spaceBelow < 300 && spaceAbove > 300) {
          setDropdownDirection("up")
        } else {
          setDropdownDirection("down")
        }
      }
    }
  
    updateMenuDirection()
    window.addEventListener("resize", updateMenuDirection)
    return () => window.removeEventListener("resize", updateMenuDirection)
  }, [showMenu])
  





  if (viewMode === "list") {
    return (
      <div
        className="bg-white  h-40  rounded-lg border border-gray-200  shadow-sm hover:shadow-lg transition-shadow flex"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-50 h-full overflow-hidden relative">
          <div
          className=" transition-transform w-full h-full"
          style={{
            backgroundColor: course.color || "#f3f4f6",
            backgroundImage: course.thumbnail ? `url(${course.thumbnail})` : "none",
            backgroundSize: "cover",
            transform: `scale(${isHovered ? 1.1 : 1})`,
            backgroundPosition: "center",
          }}
        ></div>
          
        {course.semester && !course.thumbnail && (
            <div className="absolute bottom-2 left-2 bg-white rounded-full px-2 py-0.5 text-xs font-medium">
              {course.semester}
            </div>
          )}
        </div>
        

        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="mb-1 flex items-center">
              {course.isClosed && (
                <span className="inline-block bg-orange-100 text-orange-800 text-xs font-medium px-2 py-0.5 rounded-full mr-2">
                  Closed
                </span>
              )}
              {course.semester && course.thumbnail && <span className="text-gray-500 text-sm">{course.semester}</span>}
            </div>

            <h3 className="font-medium text-lg mb-1">{course.title}</h3>
            <p className="text-gray-500 text-sm">{course.code}</p>
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-4">
              <ActionIcon
                icon={<MessageSquare className="h-5 w-5" />}
                active={course.hasMessages}
                tooltip="Messages"
              />
              <ActionIcon
                icon={<FileText className="h-5 w-5" />}
                active={course.hasDocuments}
                tooltip="Documents"
              />
              <ActionIcon
                icon={<Folder className="h-5 w-5" />}
                active={course.hasFiles}
                tooltip="Files"
              />
            </div>

            <div className="relative" ref={menuRef}>
              <button title="more" className="p-1 rounded-md hover:bg-gray-100" onClick={() => setShowMenu(!showMenu)}>
                <MoreVertical className="h-5 w-5 text-gray-500" />
              </button>

              {showMenu && (
                <div className={`absolute right-0 w-48 z-50 bg-white border border-gray-200 rounded-md shadow-md ${
                  dropdownDirection === "up" ? "bottom-full mb-2" : "top-full mt-2"
                }`}>
                  <ul className="py-1">
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                        onClick={() => {
                          setShowMenu(false)
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Course
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                        onClick={() => {
                          setShowMenu(false)
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Course
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                        onClick={() => {
                         
                          setShowMenu(false)
                        }}
                      >
                        <Bookmark className="h-4 w-4 mr-2" />
                        {course.isBookmarked ? "Remove Bookmark" : "Bookmark Course"}
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                        onClick={() => {
                          setShowMenu(false)
                        }}
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Course
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                        onClick={() => {
                          setShowMenu(false)
                        }}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Materials
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                        onClick={() => {
                          setShowMenu(false)
                        }}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate Course
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center text-red-500"
                        onClick={() => {
                          setShowMenu(false)
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Course
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="h-48 overflow-hidden relative"
      >
        <div
          className=" transition-transform w-full h-full"
          style={{
            backgroundColor: course.color || "#f3f4f6",
            backgroundImage: course.thumbnail ? `url(${course.thumbnail})` : "none",
            backgroundSize: "cover",
            transform: `scale(${isHovered ? 1.1 : 1})`,
            backgroundPosition: "center",
          }}
        ></div>
        <button
          onClick={onFavoriteToggle}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
          aria-label={course.isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={`h-5 w-5 ${course.isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
        </button>

        {course.semester && (
          <div className="absolute bottom-3 left-3 bg-white rounded-full px-3 py-1 text-xs font-medium">
            {course.semester}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-1">
          {course.isClosed && (
            <span className="inline-block bg-orange-100 text-orange-800 text-xs font-medium px-2 py-0.5 rounded-full mr-2">
              Closed
            </span>
          )}
          {course.semester && !course.thumbnail && <span className="text-gray-500 text-sm">{course.semester}</span>}
        </div>

        <h3 className="font-medium text-lg mb-1">{course.title}</h3>
        <p className="text-gray-500 text-sm">{course.code}</p>
      </div>

      <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center">
        <div className="flex space-x-4">
          <ActionIcon
            icon={<MessageSquare className="h-5 w-5" />}
            active={course.hasMessages}
            tooltip="Messages"
          />
          <ActionIcon
            icon={<FileText className="h-5 w-5" />}
            active={course.hasDocuments}
            tooltip="Documents"
          />
          <ActionIcon
            icon={<Folder className="h-5 w-5" />}
            active={course.hasFiles}
            tooltip="Files"
          />
        </div>

        <div className="relative" ref={menuRef}>
          <button title="more" className="p-1 rounded-md hover:bg-gray-100" onClick={() => setShowMenu(!showMenu)}>
            <MoreVertical className="h-5 w-5 text-gray-500" />
          </button>

          {showMenu && (
            <div className={`absolute right-0 w-48 z-50 bg-white border border-gray-200 rounded-md shadow-md ${
              dropdownDirection === "up" ? "bottom-full mb-2" : "top-full mt-2"
            }`}>
              <ul className="py-1">
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      setShowMenu(false)
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Course
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      setShowMenu(false)
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Course
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      
                      setShowMenu(false)
                    }}
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    {course.isBookmarked ? "Remove Bookmark" : "Bookmark Course"}
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      setShowMenu(false)
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Course
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      setShowMenu(false)
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Materials
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                    onClick={() => {
                      setShowMenu(false)
                    }}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate Course
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center text-red-500"
                    onClick={() => {
                      setShowMenu(false)
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Course
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface ActionIconProps {
  icon: React.ReactNode
  active?: boolean
  tooltip: string
}

const ActionIcon = ({ icon, active = false, tooltip }: ActionIconProps) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative">
      <button
        className="relative p-1 rounded-md hover:bg-gray-100"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="text-gray-500">{icon}</div>
        {active && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
        )}
      </button>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-20">
          {tooltip}
        </div>
      )}
    </div>
  )
}

export default CourseCard


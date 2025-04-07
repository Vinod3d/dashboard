import { useState, useEffect, useRef } from "react"
import { Bell, Globe, ChevronDown, X, Calendar, CheckSquare, Megaphone, Plus } from "lucide-react"
import SidebarWidget from "../utilityComponents/SidebarWidgetProps"
import AppIcon from "../utilityComponents/AppIconProps"

interface RightSidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const RightSidebar = ({ isOpen, setIsOpen }: RightSidebarProps) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [todoOpen, setTodoOpen] = useState(false)
  const [announcementOpen, setAnnouncementOpen] = useState(false)
  const [todoItems, setTodoItems] = useState([
    { id: 1, text: "Complete assignment", completed: false },
    { id: 2, text: "Review lecture notes", completed: true },
    { id: 3, text: "Prepare for exam", completed: false },
  ])
  const [newTodoText, setNewTodoText] = useState("")

  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".mobile-header")
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  const toggleTodoCompleted = (id: number) => {
    setTodoItems(todoItems.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const addTodoItem = () => {
    if (newTodoText.trim()) {
      const newItem = {
        id: Date.now(),
        text: newTodoText.trim(),
        completed: false,
      }
      setTodoItems([...todoItems, newItem])
      setNewTodoText("")
    }
  }

  const deleteTodoItem = (id: number) => {
    setTodoItems(todoItems.filter((item) => item.id !== id))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodoItem()
    }
  }

  // Calendar events
  const calendarEvents = [
    { id: 1, title: "Team Meeting", date: "Today, 2:00 PM", type: "meeting" },
    { id: 2, title: "Assignment Due", date: "Tomorrow, 11:59 PM", type: "deadline" },
    { id: 3, title: "Office Hours", date: "Friday, 10:00 AM", type: "event" },
  ]

  // Announcements
  const announcements = [
    { id: 1, title: "Campus Closed", content: "Campus will be closed on Monday for maintenance.", date: "2 hours ago" },
    {
      id: 2,
      title: "New Course Available",
      content: "Registration for the new course is now open.",
      date: "Yesterday",
    },
    {
      id: 3,
      title: "System Maintenance",
      content: "The system will be down for maintenance on Saturday.",
      date: "3 days ago",
    },
  ]

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 border-l border-gray-200 p-4 bg-gray-50" ref={sidebarRef}>
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <div className="relative">
              <button
              title="notification-button"
                className="p-2 rounded-full hover:bg-gray-200 relative"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute left-0 top-full mt-1 w-58 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                  <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-medium">Notifications</h3>
                    <button className="text-xs text-amber-600 hover:underline">Mark all as read</button>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-2"></div>
                        <div>
                          <p className="text-sm font-medium">New announcement posted</p>
                          <p className="text-xs text-gray-500">2 minutes ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-2"></div>
                        <div>
                          <p className="text-sm font-medium">Assignment graded</p>
                          <p className="text-xs text-gray-500">1 hour ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-gray-50">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 mr-2"></div>
                        <div>
                          <p className="text-sm font-medium">New course available</p>
                          <p className="text-xs text-gray-500">Yesterday</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 border-t border-gray-100 text-center">
                    <button className="text-sm text-amber-600 hover:underline">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-200"
                onClick={() => setLanguageOpen(!languageOpen)}
              >
                <Globe className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium">En</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {languageOpen && (
                <div className="absolute left-0 top-full mt-1 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                  <ul className="py-1">
                    <li>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
                        <span className="w-6 inline-block">🇺🇸</span>
                        <span className="ml-2">English</span>
                      </button>
                    </li>
                    <li>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
                        <span className="w-6 inline-block">🇪🇸</span>
                        <span className="ml-2">Español</span>
                      </button>
                    </li>
                    <li>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
                        <span className="w-6 inline-block">🇫🇷</span>
                        <span className="ml-2">Français</span>
                      </button>
                    </li>
                    <li>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
                        <span className="w-6 inline-block">🇩🇪</span>
                        <span className="ml-2">Deutsch</span>
                      </button>
                    </li>
                    <li>
                      <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
                        <span className="w-6 inline-block">🇯🇵</span>
                        <span className="ml-2">日本語</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <button className="flex items-center" onClick={() => setProfileOpen(!profileOpen)}>
              <div className="w-8 h-8 rounded-full bg-orange-500 overflow-hidden">
                <img src="https://avatars.githubusercontent.com/u/98041742?v=4" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg  z-10">
                <div className="p-3 border-b border-gray-100">
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs text-gray-500">john.doe@nyu.edu</p>
                </div>
                <ul className="py-1">
                  <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Account Settings</button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Help Center</button>
                  </li>
                  <li className="border-t border-gray-100">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <SidebarWidget
            title="Calendar"
            icon={<Calendar className="h-5 w-5" />}
            isOpen={calendarOpen}
            onToggle={() => setCalendarOpen(!calendarOpen)}
          >
            <div className="p-3">
              {calendarEvents.map((event) => (
                <div key={event.id} className="mb-3 last:mb-0">
                  <div className="flex items-start">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 mr-2 ${
                        event.type === "meeting"
                          ? "bg-blue-500"
                          : event.type === "deadline"
                            ? "bg-red-500"
                            : "bg-green-500"
                      }`}
                    ></div>
                    <div>
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-gray-500">{event.date}</p>
                    </div>
                  </div>
                </div>
              ))}
              <button className="mt-2 text-sm text-amber-600 hover:underline flex items-center">
                <Plus className="h-4 w-4 mr-1" />
                Add Event
              </button>
            </div>
          </SidebarWidget>

          {/* Add to the To Do widget */}
          <SidebarWidget
            title="To Do"
            icon={<CheckSquare className="h-5 w-5" />}
            isOpen={todoOpen}
            onToggle={() => setTodoOpen(!todoOpen)}
          >
            <div className="p-3">
              <div className="flex mb-3">
                <input
                  type="text"
                  placeholder="Add a task..."
                  className="flex-1 p-2 border border-gray-300 rounded-l-md text-sm"
                  value={newTodoText}
                  onChange={(e) => setNewTodoText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  list="todo-suggestions"
                />
                <datalist id="todo-suggestions">
                  <option value="Complete assignment" />
                  <option value="Study for exam" />
                  <option value="Read chapter 5" />
                  <option value="Submit project" />
                  <option value="Attend lecture" />
                </datalist>
                <button title="add" className="px-3 bg-amber-600 text-white rounded-r-md hover:bg-amber-700" onClick={addTodoItem}>
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {todoItems.length > 0 ? (
                <ul>
                  {todoItems.map((item) => (
                    <li key={item.id} className="flex items-center mb-2 last:mb-0">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleTodoCompleted(item.id)}
                        className="mr-2"
                      />
                      <span className={`text-sm flex-1 ${item.completed ? "line-through text-gray-400" : ""}`}>
                        {item.text}
                      </span>
                      <button className="text-gray-400 hover:text-red-500" onClick={() => deleteTodoItem(item.id)}>
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No tasks yet. Add one above!</p>
              )}
            </div>
          </SidebarWidget>

          <SidebarWidget
            title="Announcement"
            icon={<Megaphone className="h-5 w-5" />}
            badge={
              <span className="bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                16
              </span>
            }
            isOpen={announcementOpen}
            onToggle={() => setAnnouncementOpen(!announcementOpen)}
          >
            <div className="p-3">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="mb-3 pb-3 border-b border-gray-100 last:mb-0 last:pb-0 last:border-0"
                >
                  <h4 className="text-sm font-medium">{announcement.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{announcement.content}</p>
                  <p className="text-xs text-gray-400 mt-1">{announcement.date}</p>
                </div>
              ))}
              <button className="mt-2 text-sm text-amber-600 hover:underline">View all announcements</button>
            </div>
          </SidebarWidget>

          <div className="mt-8">
            <div className="grid grid-cols-5 gap-2">
              <AppIcon color="bg-orange-400" letter="E" tooltip="Email" />
              <AppIcon color="bg-blue-400" letter="Af" tooltip="Assignments" />
              <AppIcon color="bg-green-500" letter="G" tooltip="Grades" />
              <AppIcon color="bg-gray-400" letter="S" tooltip="Schedule" />
              <AppIcon color="bg-purple-500" letter="Tt" tooltip="Tutoring" />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}





export default RightSidebar


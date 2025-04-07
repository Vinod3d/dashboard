import { MoreVertical, RefreshCw, SortAsc, SortDesc, GridIcon, List } from "lucide-react"
import CourseGrid from "./CourseGrid"
import type { Course } from "../types/Course"
import { useState, useRef, useEffect } from "react"

interface DashboardProps {
  courses: Course[]
  loading: boolean
  error: string | null
  toggleFavorite: (courseId: string) => void
}

const Dashboard = ({ courses, loading, error, toggleFavorite }: DashboardProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"title" | "date">("title")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [showMenu, setShowMenu] = useState(false)

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


  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid")
  }

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  }

  const toggleSortBy = () => {
    setSortBy(sortBy === "title" ? "date" : "title")
  }



  return (
    <main className="flex-1 p-4">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold mb-2 sm:mb-0">Dashboard</h2>

          <div className="flex flex-wrap items-center gap-2">

            <button
              className="p-2 hover:bg-gray-100 rounded-md"
              onClick={toggleViewMode}
              title={viewMode === "grid" ? "Switch to list view" : "Switch to grid view"}
            >
              {viewMode === "grid" ? (
                <List className="h-5 w-5 text-gray-500" />
              ) : (
                <GridIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>

            <div className="relative" ref={menuRef}>
              <button title="more" className="p-2 hover:bg-gray-100 rounded-md" onClick={() => setShowMenu(!showMenu)}>
                <MoreVertical className="h-5 w-5 text-gray-500" />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                  <ul className="py-1">
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                        onClick={() => {
                          toggleSortBy()
                          setShowMenu(false)
                        }}
                      >
                        <span className="mr-2">Sort by: {sortBy === "title" ? "Title" : "Date"}</span>
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                        onClick={() => {
                          toggleSortDirection()
                          setShowMenu(false)
                        }}
                      >
                        {sortDirection === "asc" ? (
                          <>
                            <SortAsc className="h-4 w-4 mr-2" />
                            <span>Ascending</span>
                          </>
                        ) : (
                          <>
                            <SortDesc className="h-4 w-4 mr-2" />
                            <span>Descending</span>
                          </>
                        )}
                      </button>
                    </li>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                        onClick={() => {
                          setShowMenu(false)
                        }}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        <span>Refresh</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-amber-600 mb-2"></div>
            <p>Loading courses...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : courses.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No courses found matching your criteria.</p>
           
          </div>
        ) : (
          <CourseGrid
            courses={courses}
            toggleFavorite={toggleFavorite}
            viewMode={viewMode}
          />
        )}
      </div>
    </main>
  )
}

export default Dashboard


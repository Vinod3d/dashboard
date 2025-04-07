"use client"

import { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar"
import type { Course } from "./types/Course"
import { Menu } from "lucide-react"
import Dashboard from "./components/Dashboard"
import RightSidebar from "./components/RightSidebar"
import { fetchCourses } from "./api/courseApi"

function App() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // Add state for mobile menu
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [mobileRightSidebarOpen, setMobileRightSidebarOpen] = useState(false)

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true)
        const data = await fetchCourses()
        setCourses(data)
      } catch (err) {
        setError("Failed to load courses")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadCourses()
  }, [])

  const toggleFavorite = (courseId: string) => {
    setCourses(
      courses.map((course) => (course.id === courseId ? { ...course, isFavorite: !course.isFavorite } : course)),
    )
  }

  const toggleBookmark = (courseId: string) => {
    setCourses(
      courses.map((course) => (course.id === courseId ? { ...course, isBookmarked: !course.isBookmarked } : course)),
    )
  }

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen)
  }

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      <Sidebar isOpen={mobileSidebarOpen} setIsOpen={setMobileSidebarOpen} />

      <div className="flex flex-col flex-1 md:ml-16">
        {/* Add mobile header with menu button */}
        <div className="md:hidden flex justify-between items-center p-4 bg-white border-b border-gray-200">
          <button
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={toggleMobileSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>

          <div className="flex items-center">
            <h1 className="text-lg font-medium text-amber-700">NYU Kreativespace</h1>
          </div>
        </div>

        <header className="bg-amber-50 border border-amber-200 rounded-lg m-4 p-6">
          <h1 className="text-amber-700 text-2xl font-medium">Welcome to NYU Kreativespace, John</h1>
        </header>

        <Dashboard
          courses={courses}
          loading={loading}
          error={error}
          toggleFavorite={toggleFavorite}
          toggleBookmark={toggleBookmark}
        />
      </div>

      <RightSidebar isOpen={mobileRightSidebarOpen} setIsOpen={setMobileRightSidebarOpen} />
    </div>
  )
}

export default App


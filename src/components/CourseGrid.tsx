import type { Course } from "../types/Course"
import CourseCard from "./CourseCard"

interface CourseGridProps {
  courses: Course[]
  toggleFavorite: (courseId: string) => void
  viewMode: "grid" | "list"
}

const CourseGrid = ({ courses, toggleFavorite, viewMode }: CourseGridProps) => {
  return (
    <div
      className={`
      ${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "flex flex-col"} gap-6 p-6
    `}
    >
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onFavoriteToggle={() => toggleFavorite(course.id)}
          
          viewMode={viewMode}
        />
      ))}
    </div>
  )
}

export default CourseGrid


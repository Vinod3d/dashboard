import type { Course } from "../types/Course"

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Web Development Bootcamp",
    code: "WD-101",
    semester: "Fall 2023",
    thumbnail: "https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg",
    isFavorite: false,
    isBookmarked: false,
    isClosed: false,
    hasMessages: true,
    hasDocuments: false,
    hasFiles: false,
  },
  {
    id: "2",
    title: "Data Structures & Algorithms",
    code: "CS-204",
    semester: "Spring 2024",
    thumbnail: "https://cdn.pixabay.com/photo/2016/08/28/19/06/networking-1626665_1280.jpg",
    isFavorite: true,
    isBookmarked: false,
    isClosed: false,
    hasMessages: true,
    hasDocuments: true,
    hasFiles: false,
  },
  {
    id: "3",
    title: "Introduction to Artificial Intelligence",
    code: "AI-300",
    semester: "Summer 2024",
    thumbnail: "https://cdn.pixabay.com/photo/2023/05/08/08/41/ai-7977960_1280.jpg",
    isFavorite: true,
    isBookmarked: true,
    isClosed: false,
    hasMessages: false,
    hasDocuments: true,
    hasFiles: true,
  },
  {
    id: "4",
    title: "UX/UI Design Fundamentals",
    code: "UX-105",
    semester: "Winter 2023",
    thumbnail: "https://cdn.pixabay.com/photo/2015/05/28/14/38/ux-787980_1280.jpg",
    isFavorite: false,
    isBookmarked: false,
    isClosed: true,
    hasMessages: true,
    hasDocuments: true,
    hasFiles: false,
  },
  {
    id: "5",
    title: "Cloud Computing with AWS",
    code: "CC-220",
    semester: "Fall 2024",
    thumbnail: "https://cdn.pixabay.com/photo/2024/02/26/17/05/cloud-8598424_1280.jpg",
    isFavorite: false,
    isBookmarked: true,
    isClosed: true,
    hasMessages: true,
    hasDocuments: true,
    hasFiles: true,
  },
  {
    id: "6",
    title: "Python Programming Essentials",
    code: "PY-110",
    semester: "Summer 2023",
    thumbnail: "https://cdn.pixabay.com/photo/2016/07/13/08/48/mobile-phone-1513945_1280.jpg",
    isFavorite: false,
    isBookmarked: false,
    isClosed: true,
    hasMessages: true,
    hasDocuments: false,
    hasFiles: true,
  },
]


// Simulate API call with a delay
export const fetchCourses = (): Promise<Course[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCourses)
    }, 800)
  })
}

// // Simulate API call to toggle favorite
// export const toggleCourseFavorite = (courseId: string): Promise<{ success: boolean }> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ success: true })
//     }, 300)
//   })
// }

// // Simulate API call to toggle bookmark
// export const toggleCourseBookmark = (courseId: string): Promise<{ success: boolean }> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ success: true })
//     }, 300)
//   })
// }


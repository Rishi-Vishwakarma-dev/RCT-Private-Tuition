import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'

import Navbar from './component/Navbar'
import App from './App.jsx'
import Footer from './component/Footer'

import ContactUs from './component/ContactUs.jsx'
import About from './component/About.jsx'
import Help from './component/Help.jsx'

import Auth from './component/Auth.jsx'

import Dashboard from './component/Dashboard.jsx'
import Profile from './component/student/Profile.jsx'
import Payment from "./component/student/payment/Payment.jsx"
import Course from "./component/student/Course"
import AIChat from "./component/student/AIChat"
import TeacherChat from "./component/student/TeacherChat"
import Quiz from "./component/student/Quiz"
import Notice from "./component/student/Notice"
import Report from "./component/student/Report"

import TeacherPanel from './component/TeacherPanel.jsx'
import TeacherProfile from './component/teacher/Profile.jsx'
import Attendance from './component/teacher/Attendance.jsx'
import AddQuiz from './component/teacher/AddQuiz.jsx'
import AddNotice from './component/teacher/AddNotice.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <div className='app-container'>
      <div className="background-image-box"></div>
      <Navbar />
      <App />
      <Footer />
    </div>
  },
  {
    path: '/contact',
    element: <div className='app-container'>
      <Navbar />
      <ContactUs />
      <Footer />
    </div>
  },
  {
    path: '/about',
    element: <div className='app-container'>
      <Navbar />
      <About />
      <Footer />
    </div>
  },
  {
    path: '/help',
    element: <div className='app-container'>
      <Navbar />
      <Help />
      <Footer />
    </div>
  },
  {
    path: '/login',
    element: <Auth />
  },
  {
    path: '/dashboard/profile',
    element: <>
      <Dashboard />
      <Profile />
    </>
  },
  {
    path: '/dashboard/payment',
    element: <>
      <Dashboard />
      <Payment />
    </>
  },
  {
    path: '/dashboard/course',
    element: <>
      <Dashboard />
      <Course />
    </>
  },
  {
    path: '/dashboard/teacherChat',
    element: <>
      <Dashboard />
      <TeacherChat />
    </>
  },
  {
    path: '/dashboard/aiAssessment',
    element: <>
      <Dashboard />
      <AIChat />
    </>
  },
  {
    path: '/dashboard/quiz',
    element: <>
      <Dashboard />
      <Quiz />
    </>
  },
  {
    path: '/dashboard/notice',
    element: <>
      <Dashboard />
      <Notice />
    </>
  },
  {
    path: '/dashboard/report',
    element: <>
      <Dashboard />
      <Report />
    </>
  },

  {
    path: '/teacher/profile',
    element: <>
      <TeacherPanel />
      <TeacherProfile />
    </>
  },
  {
    path: '/teacher/attendance',
    element: <>
      <TeacherPanel />
      <Attendance />
    </>
  },
  {
    path: '/teacher/add-quiz',
    element: <>
      <TeacherPanel />
      <AddQuiz />
    </>
  },
  {
    path: '/teacher/add-notice',
    element: <>
      <TeacherPanel />
      <AddNotice />
    </>
  }
])

createRoot(document.getElementById('root')).render(

  <RouterProvider router={(router)} />,
)
// <StrictMode>

{/* </StrictMode>, */ }
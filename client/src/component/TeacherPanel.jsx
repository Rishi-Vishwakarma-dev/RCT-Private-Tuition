import React, { useEffect, useState } from "react";
import { createBrowserRouter, Link, RouterProvider, useLocation, useNavigate } from 'react-router-dom'
import "./TeacherPanel.css"
import Profile from "./student/Profile";

const TeacherPanel = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const getPage = location.pathname.split("/").pop();

  useEffect(() => {

    if (currentPage !== getPage) {
      setCurrentPage(getPage);

      const query = new URLSearchParams(location.search);
      const username = query.get("user");

      navigate(`/teacher/${getPage}?user=${encodeURIComponent(username)}`, { replace: true });
    }
  }, [getPage]);

  const redirect = (page) => {

    setCurrentPage(page);
    const query = new URLSearchParams(location.search);
    const username = query.get("user");

    navigate(`/teacher/${page}?user=${encodeURIComponent(username)}`);
  };

  return (
    <>
      <div className="dashboard-container" style={{width: "250px"}}>
        {/* Sidebar */}

        <aside className="sidebar">
          <div className="logo">🎓</div>
          <ul className="menu">
            <li className={currentPage === "profile" ? "active" : ''} onClick={() => { redirect("profile") }}>Dashboard</li>
            <li className={currentPage === "attendance" ? "active" : ''} onClick={() => { redirect("attendance") }}>Attendance</li>
            <li className={currentPage === "add-quiz" ? "active" : ''} onClick={() => { redirect("add-quiz") }}>Add Quiz</li>
            <li className={currentPage === "add-notice" ? "active" : ''} onClick={() => { redirect("add-notice") }}>Add Notice</li>
            {/* <li className={currentPage === "aiAssessment" ? "active" : ''} onClick={() => { redirect("aiAssessment") }}>AI Assessment</li>
            <li className={currentPage === "quiz" ? "active" : ''} onClick={() => { redirect("quiz") }}>Quiz</li>
            <li className={currentPage === "notice" ? "active" : ''} onClick={() => { redirect("notice") }}>Notice</li>
            <li className={currentPage === "report" ? "active" : ''} onClick={() => { redirect("report") }}>Report</li> */}
            <li className={currentPage === "logout" ? "active logout" : 'logout'} onClick={() => { setShowLogout(true) }}>Logout</li>
          </ul>
        </aside>

        {
          showLogout ? (
            <div className="logout-box-container">
              <div className="logout-box">
                <div className="logout-text">
                  Are you sure you want to log out?
                </div>
                <Link to={'/'} className="logout-button-box" onClick={() => { setShowLogout(false) }}>
                  <div className="logout-button-text">
                    Log out
                  </div>
                </Link>
                <div className="cancel-button-box" onClick={() => { setShowLogout(false) }}>
                  <div className="cancel-button-text">
                    Cancel
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )
        }
      </div>
    </>
  )
}

export default TeacherPanel

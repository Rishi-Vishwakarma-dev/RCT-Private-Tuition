import React, { useEffect, useState } from "react";
import { createBrowserRouter, Link, RouterProvider, useLocation, useNavigate } from 'react-router-dom'
import "./Dashboard.css";
import { FaHome, FaDollarSign, FaCalendarAlt, FaTasks, FaMinusCircle, FaChartLine, FaBell, FaClock, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('profile');
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const getPage = location.pathname.split("/").pop()

  // setCurrentPage(getPage)  
  useEffect(() => {
    setCurrentPage(getPage);

    const query = new URLSearchParams(location.search);
    const username = query.get("user");

    navigate(`/dashboard/${getPage}?user=${encodeURIComponent(username)}`, { replace: true });
  }, [getPage])
  
  const redirect = (page) => {

    setCurrentPage(page);
    const query = new URLSearchParams(location.search);
    const username = query.get("user");

    navigate(`/dashboard/${page}?user=${encodeURIComponent(username)}`);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
          <div className="logo">🎓</div>
          <ul className="menu">
            <li className={currentPage === "profile" ? "active" : ''} onClick={() => { redirect("profile") }}>Dashboard</li>
            <li className={currentPage === "payment" ? "active" : ''} onClick={() => { redirect("payment") }}>Payment Info</li>
            <li className={currentPage === "course" ? "active" : ''} onClick={() => { redirect("course") }}>Courses</li>
            <li className={currentPage === "teacherChat" ? "active" : ''} onClick={() => { redirect("teacherChat") }}>Teacher Chat</li>
            <li className={currentPage === "aiAssessment" ? "active" : ''} onClick={() => { redirect("aiAssessment") }}>AI Assessment</li>
            <li className={currentPage === "quiz" ? "active" : ''} onClick={() => { redirect("quiz") }}>Quiz</li>
            <li className={currentPage === "notice" ? "active" : ''} onClick={() => { redirect("notice") }}>Notice</li>
            <li className={currentPage === "report" ? "active" : ''} onClick={() => { redirect("report") }}>Report</li>
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
  );
};

export default Dashboard;
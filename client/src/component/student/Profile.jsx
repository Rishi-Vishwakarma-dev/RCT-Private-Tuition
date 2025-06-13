import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link, useLocation } from "react-router-dom"
import "./Profile.css"
import "./Calendar.css"
import { calendarOrganizer } from "./calendar"
import { Application } from "https://esm.sh/@splinetool/runtime";

const Profile = () => {
  const [studentDetail, setStudentDetail] = useState(null)
  const [course, setCourse] = useState(null)
  const [timeTable, setTimeTable] = useState(false)

  const [notice, setNotice] = useState(null)
  const query = new URLSearchParams(useLocation().search);
  const username = query.get("user");

  useEffect(() => {
    if (!username) {
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/show-user`, { params: { username: username } });
        setStudentDetail(response.data)
      }
      catch {
        alert("Loading Failed!");
      }
    }
    fetchUser();
  }, [username])

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const courseResponse = await axios.get(`${import.meta.env.VITE_API_URL}/get-course`, { params: { standard: studentDetail.detail.standard } });
        setCourse(courseResponse.data);
      }
      catch {
      }
    }
    loadCourse();
  }, [studentDetail])

  useEffect(() => {
    const loadNotice = async () => {
      try {
        const noticeResponse = await axios.get(`${import.meta.env.VITE_API_URL}/get-notice`, { params: { standard: studentDetail.detail.standard } });
        setNotice(noticeResponse.data);
      }
      catch {
      }
    }
    loadNotice();
  }, [studentDetail])

  // *********** 3D model section ***********
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const fileName = "0eI7JO23zWEe8FiA";
    const app = new Application(canvasRef.current);

    app.load(`https://prod.spline.design/${fileName}/scene.splinecode`)
      .catch(err => console.error("Error loading Spline scene:", err));

    return () => {
      app.dispose(); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    calendarOrganizer(); // Call function after component mounts
  }, []);

  return (
    <>
      <div className="main-content">
        <div className="profile-mega-container">
          <div className="student-profile-banner">
            <div className="student-profile-banner-text">
              Dashboard
            </div>
            <div className="student-profile-box">
              <div className="student-detail-box">
                <div className="student-name-box">
                  {
                    studentDetail ? (
                      <div className="student-name">
                        {studentDetail.username}
                      </div>
                    ) : (
                      <p>Loading...</p>
                    )
                  }
                </div>
                <div className="student-standard-box">
                  {
                    studentDetail ? (
                      <div className="student-standard">
                        {studentDetail.detail.standard}
                      </div>
                    ) : (
                      <p>Loading...</p>
                    )
                  }
                </div>
              </div>
              <div className="student-profile-image-box">
                {
                  studentDetail ? (
                    <img src={`${studentDetail.detail.studentImage}`} alt="" className="student-profile-image" />
                  ) : (
                    <img src="./RCT_classes_logo_1.png" alt="" className="student-profile-image" />
                  )
                }
              </div>
            </div>
          </div>
          <div className="block-3-card">
            <Link to={`/dashboard/course?user=${username}`} className="block-card">
              <div className="block-title-box">Notes bank</div>
              <div className="block-description-box">
                <img src="https://png.pngtree.com/png-clipart/20250102/original/pngtree-book-icon-png-image_4358423.png" alt="" className="block-description-image" />
                <div className="block-description-text">
                  Unlock new insights and enhance your productivity with our curated book.
                </div>
              </div>
            </Link>
            <div className="block-card">
              <div className="block-title-box">Time Table</div>
              <div className="time-table-image-box">
                {
                  course ? (
                    <img src={`${course.timeTable}`} onClick={() => { setTimeTable(true) }} alt="time table" className="time-table-image" />
                  ) : (
                    <img src="./RCT_classes_logo_1.png" alt="" className="student-profile-image" />
                  )
                }
              </div>
              {
                timeTable ?
                  <div className="big-time-table-box">
                    <div className="big-time-table-cross" onClick={() => { setTimeTable(false) }}>x</div>
                    <img src={course?.timeTable} alt="" className="big-time-table" />
                  </div>
                  :
                  ""
              }
            </div>
            <div className="block-card">
              <div className="container-3d">
                <canvas ref={canvasRef} id="canvas3d"></canvas>
              </div>
            </div>
          </div>
          <div className="bottom-card-block">
            <div className="list-card-block">
              <div className="calendar-container">
                <header className="calendar-header">
                  <p className="calendar-current-date"></p>
                  <div className="calendar-navigation">
                    <span id="calendar-prev">
                      <img src="" alt="" className="calendar-prev-icon" />
                    </span>
                    <span id="calendar-next">
                      <img src="" alt="" className="calendar-next-icon" />
                    </span>
                  </div>
                </header>

                <div className="calendar-body">
                  <ul className="calendar-weekdays">
                    <li>Sun</li>
                    <li>Mon</li>
                    <li>Tue</li>
                    <li>Wed</li>
                    <li>Thu</li>
                    <li>Fri</li>
                    <li>Sat</li>
                  </ul>
                  <ul className="calendar-dates"></ul>
                </div>
              </div>
            </div>
            <div className="notice-card-block">
              <div className="block-title-box">Notice Board</div>
              {
                notice?.map((item, index) => (
                  <div className="notice-box" key={index}>
                    <div className="notice-title">{item.title}</div>
                    <div className="notice-description">{item.notice}</div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile

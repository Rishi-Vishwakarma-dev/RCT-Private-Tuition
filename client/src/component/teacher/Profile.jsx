import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link, useLocation } from "react-router-dom"
import "./Profile.css"
import { Application } from "https://esm.sh/@splinetool/runtime";
import { calendarOrganizer } from "./calendar"

const Profile = () => {
  const [teacherDetail, setTeacherDetail] = useState(null)
  const [course, setCourse] = useState(null)
  const [timeTable, setTimeTable] = useState(false)

  // const [notice, setNotice] = useState(null)
  const query = new URLSearchParams(useLocation().search);
  const username = query.get("user");

  useEffect(() => {
    if (!username) {
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/show-user`, { params: { username: username } });
        setTeacherDetail(response.data)
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
        const courseResponse = await axios.get(`${import.meta.env.VITE_API_URL}/get-course`, { params: { standard: teacherDetail.classes[0] } });
        setCourse(courseResponse.data);
      }
      catch {
      }
    }
    loadCourse();
  }, [teacherDetail])

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
        <div className="teacher-profile-mega-container">
          <div style={{ backgroundColor: "white" }} className="student-profile-banner">
            <div className="student-profile-banner-text">
              Dashboard
            </div>
            <div className="student-profile-box">
              <div className="student-detail-box">
                <div className="student-name-box">
                  {
                    teacherDetail ? (
                      <div className="student-name">
                        {teacherDetail.detail.name}
                      </div>
                    ) : (
                      <p>Loading...</p>
                    )
                  }
                </div>
                <div className="student-standard-box">
                  {
                    teacherDetail ? (
                      <div className="student-standard">
                        {teacherDetail.detail.adminID}
                      </div>
                    ) : (
                      <p>Loading...</p>
                    )
                  }
                </div>
              </div>
              <div className="student-profile-image-box">
                {
                  teacherDetail ? (
                    <img src={`${teacherDetail.detail.studentImage}`} alt="" className="student-profile-image" />
                  ) : (
                    <img src="./RCT_classes_logo_1.png" alt="" className="student-profile-image" />
                  )
                }
              </div>
            </div>
          </div>
          <div className="block-3-card">
            {
              <div className="block-card" style={{ backgroundColor: "white" }}>
                <div className="block-title-box" style={{ marginBottom: "20px" }}>Personal Detail</div>
                <div className="personal-detail"><span style={{ fontSize: "1.2rem" }}>Post : </span>{teacherDetail?.detail.adminID}</div>
                <div className="personal-detail"><span style={{ fontSize: "1.2rem" }}>Designation : </span>{teacherDetail?.detail.designation}</div>
                <div className="personal-detail"><span style={{ fontSize: "1.2rem" }}>Department : </span>{teacherDetail?.detail.department}</div>
                <div className="personal-detail"><span style={{ fontSize: "1.2rem" }}>Number : </span>{teacherDetail?.detail.number}</div>
              </div>
            }
            <div className="block-card" style={{ backgroundColor: "white" }}>
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
            <div className="block-card" style={{ backgroundColor: "white" }}>
              <div className="container-3d">
                <canvas ref={canvasRef} id="canvas3d"></canvas>
              </div>
            </div>
          </div>

          <div className="bottom-card-block">
            <div className="list-card-block" style={{ width: "50%" }}>
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

          </div>

        </div>
      </div>
    </>
  )
}

export default Profile

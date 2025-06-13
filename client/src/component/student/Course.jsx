import React, { useEffect, useState } from 'react'
import "./Course.css"
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Course = () => {
  const [course, setCourse] = useState([]);
  const [standard, setStandard] = useState(null);

  const query = new URLSearchParams(useLocation().search);
  const name = query.get("user");

  useEffect(() => {
    const loadCourse = async () => {
      try {

        const userResponse = await axios.get("http://localhost:3000/check-user", { params: { username: name } });

        const userStandard = userResponse.data.detail.standard;
        setStandard(userStandard);

        const courseResponse = await axios.get("http://localhost:3000/get-course", { params: { standard: userStandard } });

        setCourse(courseResponse.data.courses);
      } catch (error) {
        console.error("Error fetching course:", error);
        setError("Failed to load course.");
      } finally {
      }
    };

    if (name) {
      loadCourse();
    }
  }, [name]);

  const handleDownload = async () => {
    try {
      const response = await fetch("https://pdfobject.com/pdf/sample.pdf");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "sample.pdf"; // File name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the PDF:", error);
    }
  };

  return (
    <>
      <div className="main-content">
        <div className="course-mega-container">
          {
            course.map((book, index) => (
              <div className="course-detail-card" key={index}>
                <div className="course-image-box">
                  <img src={book.imageUrl} alt="" className="course-image" />
                </div>
                <div className="course-name-box">
                  {book.title}
                </div>
                <a onClick={handleDownload} href={book.download} download={`${book.title}.pdf`} target='_blank' className="course-button-box">
                  <div className="course-button-text">
                    View Book
                  </div>
                </a>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Course

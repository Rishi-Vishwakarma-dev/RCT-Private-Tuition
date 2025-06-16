import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import axios from 'axios';

function App() {

  const [academy, setAcademy] = useState(null);

  useEffect(() => {
    axios.get(`https://rct-private-tuition-server.vercel.app/academy-detail`)
      .then(response => setAcademy(response.data))
      .catch(error => console.error("Error fetching academy data:", error));
  }, []);

  return (
    <>
      <div className="main-container-layout">
        <div className="mega-container">
          <div className="header-container">
            <div className="header">

              <div className="title-box">
                <div className="typewriter">
                  <div className="type-text">
                    OUR AIM IS TO BUILD A STRONG CAREER
                  </div>
                </div>
              </div>
              <div className="apply-button-box">
                <Link to={'/login'} className="apply-button">
                  <div className='apply-button-text'>
                    Apply Now
                  </div>
                  <div className="apply-arrow-box">
                    <img src="/arrow-icon.png" alt="" className="apply-arrow-icon" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="about-card-container-box">
            <div className="about-card-container">
              <div className="about-text-box">
                <div className="about-title-box">
                  ABOUT &nbsp;<span className="about-title-name" style={{ color: "red" }}>RCT CLASSES</span>
                </div>
                <div className="about-description-box">
                RCT Classes is a premier educational institute dedicated to shaping young minds from 1st to 12th grade. With a team of highly qualified and passionate educators, we provide a strong academic foundation that empowers students to excel in their studies and beyond. Our well-structured curriculum focuses on conceptual clarity, problem-solving skills, and practical learning, ensuring that students are not just prepared for exams but for life’s challenges as well.
                </div>
              </div>
              <div className="about-image-box">
                <div className="about-icon-box">
                  <img src="https://karnavatclasses.com/wp-content/uploads/2020/05/AUDIO-VISUAL-SUPPORT.png" alt="" className="about-icon" />
                  <div className="about-text">
                    Best Infrastructure
                  </div>
                </div>
                <div className="about-icon-box">
                  <img src="https://karnavatclasses.com/wp-content/uploads/2020/05/WEEKLY-TEST-SERIES.png" alt="" className="about-icon" />
                  <div className="about-text">
                    Test Series
                  </div>
                </div>
                <div className="about-icon-box">
                  <img src="https://karnavatclasses.com/wp-content/uploads/2020/05/CAREER-GUIDANCE.png" alt="" className="about-icon" />
                  <div className="about-text">
                    Career Guidance
                  </div>
                </div>
                <div className="about-icon-box">
                  <img src="https://karnavatclasses.com/wp-content/uploads/2020/05/ANNUAL-PRIZE-DISTRIBUTION.png" alt="" className="about-icon" />
                  <div className="about-text">
                    Scholarships
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="batches-card-container-box">
            <div className="batches-card-box">
              <div className="batches-title-box">
                OUR <span className="about-title-name" style={{ color: "red" }}>UPCOMING BATCHES</span>
              </div>
              <div className="batches-container-box">
                <div className="batch-box">
                  <div className="batch-name">
                    {
                      academy ? (
                        academy.batches[0].currentBatch
                      ) : (
                        <p>Loading notices...</p>
                      )
                    } Batch Started
                  </div>
                  <hr className="batch-seperator" />
                  <div className="batch-date">
                    {
                      academy ? (
                        academy.batches[0].academicYear
                      ) : (
                        <p>Loading notices...</p>
                      )
                    }
                  </div>
                </div>
                <div className="batch-box">
                  <div className="batch-name">
                    {
                      academy ? (
                        academy.batches[1].currentBatch
                      ) : (
                        <p>Loading notices...</p>
                      )
                    } Batch Started
                  </div>
                  <hr className="batch-seperator" />
                  <div className="batch-date">
                    {
                      academy ? (
                        academy.batches[1].academicYear
                      ) : (
                        <p>Loading notices...</p>
                      )
                    }
                  </div>
                </div>
                <div className="batch-box">
                  <div className="batch-name">
                    {
                      academy ? (
                        academy.batches[2].currentBatch
                      ) : (
                        <p>Loading notices...</p>
                      )
                    } Batch Started
                  </div>
                  <hr className="batch-seperator" />
                  <div className="batch-date">
                    {
                      academy ? (
                        academy.batches[2].academicYear
                      ) : (
                        <p>Loading notices...</p>
                      )
                    }
                  </div>
                </div>
                <div className="batch-box">
                  <div className="batch-name">
                    {
                      academy ? (
                        academy.batches[3].currentBatch
                      ) : (
                        <p>Loading notices...</p>
                      )
                    } Batch Started
                  </div>
                  <hr className="batch-seperator" />
                  <div className="batch-date">
                    {
                      academy ? (
                        academy.batches[3].academicYear
                      ) : (
                        <p>Loading notices...</p>
                      )
                    }
                  </div>
                </div>
                <div className="batch-box">
                  <div className="batch-name">
                    {
                      academy ? (
                        academy.batches[4].currentBatch
                      ) : (
                        <p>Loading notices...</p>
                      )
                    } Batch Started
                  </div>
                  <hr className="batch-seperator" />
                  <div className="batch-date">
                    {
                      academy ? (
                        academy.batches[4].academicYear
                      ) : (
                        <p>Loading notices...</p>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="achievement-card-container-box">
            <div className="achievement-card-box">
              <div className="achievement-title-box">
                OUR <span className="achievement-title-name" style={{ color: "red" }}>ACHIEVEMENTS</span>
              </div>
              <div className="achievement-container-box">
                <div className="achievement-box">
                  <div className="achievement-icon-box">
                    <img src="https://karnavatclasses.com/wp-content/uploads/2020/05/alumni-1.png" alt="" className="achievement-icon" />
                  </div>
                  <div className="achievement-score">
                    22000+
                  </div>
                  <div className="achievement-detail">
                    Alumini Students have been educated at RCT Classes
                  </div>
                </div>
                <div className="achievement-box">
                  <div className="achievement-icon-box">
                    <img src="https://karnavatclasses.com/wp-content/uploads/2020/05/medal-1.png" alt="" className="achievement-icon" />
                  </div>
                  <div className="achievement-score">
                    1000+
                  </div>
                  <div className="achievement-detail">
                  Teaching Experience
                  </div>
                </div>
                <div className="achievement-box">
                  <div className="achievement-icon-box">
                    <img src="https://karnavatclasses.com/wp-content/uploads/2020/05/teaching-1.png" alt="" className="achievement-icon" />
                  </div>
                  <div className="achievement-score">
                    50+
                  </div>
                  <div className="achievement-detail">
                  Teaching & Non -Teaching Staff
                  </div>
                </div>
                <div className="achievement-box">
                  <div className="achievement-icon-box">
                    <img src="https://karnavatclasses.com/wp-content/uploads/2020/05/years-1.png" alt="" className="achievement-icon" />
                  </div>
                  <div className="achievement-score">
                    20+
                  </div>
                  <div className="achievement-detail">
                  Years of Journey
                  </div>
                </div>
                <div className="achievement-box">
                  <div className="achievement-icon-box">
                    <img src="https://karnavatclasses.com/wp-content/uploads/2020/05/awards-1.png" alt="" className="achievement-icon" />
                  </div>
                  <div className="achievement-score">
                    70+
                  </div>
                  <div className="achievement-detail">
                  Awards received by RCT Classes
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ranker-card-container-box">
            <div className="ranker-card-box">
              <div className="ranker-title-box">
                OUR <span className="ranker-title-name" style={{ color: "red" }}>RANKERS</span>
              </div>
              {
                <div className="ranker-container-box">
                  <div className="ranker-box">
                    <div className="ranker-icon-box">
                      <img src={academy?.rankers[0].rankersImage} alt="" className="ranker-icon" />
                    </div>
                    <div className="ranker-name">
                      {academy?.rankers[0].rankersName}
                    </div>
                    <div className="ranker-marks">
                      {academy?.rankers[0].rankersGrade}%
                    </div>
                  </div>
                  <div className="ranker-box">
                    <div className="ranker-icon-box">
                      <img src={academy?.rankers[1].rankersImage} alt="" className="ranker-icon" />
                    </div>
                    <div className="ranker-name">
                      {academy?.rankers[1].rankersName}
                    </div>
                    <div className="ranker-marks">
                      {academy?.rankers[1].rankersGrade}%
                    </div>
                  </div>
                  <div className="ranker-box">
                    <div className="ranker-icon-box">
                      <img src={academy?.rankers[2].rankersImage} alt="" className="ranker-icon" />
                    </div>
                    <div className="ranker-name">
                      {academy?.rankers[2].rankersName}
                    </div>
                    <div className="ranker-marks">
                      {academy?.rankers[2].rankersGrade}%
                    </div>
                  </div>
                  <div className="ranker-box">
                    <div className="ranker-icon-box">
                      <img src={academy?.rankers[3].rankersImage} alt="" className="ranker-icon" />
                    </div>
                    <div className="ranker-name">
                      {academy?.rankers[3].rankersName}
                    </div>
                    <div className="ranker-marks">
                      {academy?.rankers[3].rankersGrade}%
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

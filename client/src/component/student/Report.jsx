import React, { useEffect, useState } from 'react'
import "./Report.css"
import axios from 'axios'
import { useLocation } from 'react-router-dom';

const Report = () => {
  const [username, setUsername] = useState(null);
  const [standard, setStandard] = useState(null);

  const [type, setType] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const query = new URLSearchParams(useLocation().search);
  const name = query.get("user");

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/check-user`, { params: { username: name } })

      const username = response.data.username;
      const standard = response.data.detail.standard;
      setUsername(username);
      setStandard(standard);
    }
    getUser();
  }, [name]);

  const submitReport = async () => {
    if (username && standard && type && subject && description) {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/submit-report`, { username: username, standard: standard, type: type, subject: subject, description: description })
      setType('')
      setSubject('')
      setDescription('')
    }
    else {
      alert("All field are required")
    }
  }

  return (
    <>
      <div className="main-content">
        <div className="report-mega-container">
          <div className="report-header-panel">
            <div className="report-label">
              REPORT
            </div>
          </div>
          <div className="report-container">
            <div className="report-submit-section">
              <div className="report-select-text">
                Select type of report
              </div>
              <div className="report-select-box-container">
                <div className="report-select-box" style={type == "feedback" ? { backgroundColor: "gray" } : {}} onClick={() => { setType("feedback") }}>Feedback</div>
                <div className="report-select-box" style={type == "bug" ? { backgroundColor: "gray" } : {}} onClick={() => { setType("bug") }}>Bug</div>
                <div className="report-select-box" style={type == "complaint" ? { backgroundColor: "gray" } : {}} onClick={() => { setType("complaint") }}>Complaint</div>
                <div className="report-select-box" style={type == "other" ? { backgroundColor: "gray" } : {}} onClick={() => { setType("other") }}>Other</div>
              </div>
              <div className="report-subject-text">Subject</div>
              <input type="text" name="" id="" value={subject} className="report-subject-input" placeholder='write subject here' required onChange={(e) => { setSubject(e.target.value) }} />
              <div className="report-description-text">Description</div>
              <textarea type="text" name="" id="" value={description} className="report-description-input" placeholder='write description' required onChange={(e) => { setDescription(e.target.value) }} ></textarea>
              <div className="report-submit-button" onClick={submitReport}>
                <div className="report-submit-text">Submit</div>
              </div>
            </div>
            <div className="report-reply-section">
              <div className="report-reply-text">Reply</div>
              <div className="report-reply-box-list">
                <div className="report-reply-box">
                  No Reply yet....
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Report

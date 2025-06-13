import React, { useEffect, useState } from 'react'
import "./Attendance.css"
import axios from 'axios';

const Attendance = () => {
  const [allStudent, setAllStudent] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [standard, setStandard] = useState(4);

  const [present, setPresent] = useState([]);
  const [absent, setAbsent] = useState([]);

  const [attendanceDate, setAttendanceDate] = useState("");

  const currentDate = new Date().toLocaleString(); // or .toDateString(), .toISOString(), etc.

  useEffect(() => {
    if (!standard) return;

    axios
      .get("http://localhost:3000/get-students", {
        params: { standard: standard },
      })
      .then((response) => {
        const fetchedStudents = response.data;
        setAllStudent(fetchedStudents);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, [standard]);

  const attendanceHandler = (id, type) => {
    if (type === "present") {
      setPresent((prev) => (prev.includes(id) ? prev : [...prev, id]));
      setAbsent((prev) => prev.filter((studentId) => studentId !== id));
    } else if (type === "absent") {
      setAbsent((prev) => (prev.includes(id) ? prev : [...prev, id]));
      setPresent((prev) => prev.filter((studentId) => studentId !== id));
    }
  };

  const submitAttendanceHandler = async () => {
    if (!attendanceDate || !standard) {
      alert("Please select a date and standard before submitting.");
      return;
    }

    try {
      // First: Check if attendance already exists for selected date & standard
      const response = await axios.get("http://localhost:3000/get-attendance-one", {
        params: { attendanceDate, standard }
      });

      const matchAttendance = response.data?.date;

      if (matchAttendance === attendanceDate) {
        alert("Attendance for this date and standard is already submitted!");
        return;
      }

      // Second: If no match found, submit the attendance
      const submitResponse = await axios.post("http://localhost:3000/submit-attendance", {
        date: attendanceDate,
        standard: standard,
        present: present,
        absent: absent,
      });

      alert("Attendance submitted successfully!");

    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("An error occurred while submitting attendance.");
    }
  };

  useEffect(() => {
    if (!standard) return;

    axios
      .get("http://localhost:3000/get-attendance", {
        params: { standard: standard },
      })
      .then((response) => {
        const fetchedAttendance = response.data;
        setAttendance(fetchedAttendance);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, [standard]);


  return (
    <>
      <div className="main-content">
        <div className="teacher-attendance-mega-container">
          <div className="attendance-container">
            <h2 className="attendance-title">Attendance Sheet</h2>
            <div className="attendance-header">
              <div className="date-picker">
                <label htmlFor="attendance-date">Select Date:</label>
                <input type="date" id="attendance-date" onChange={(e) => setAttendanceDate(e.target.value)} />
              </div>
              <select className='standard-select-list-box' value={standard} onChange={(e) => setStandard(e.target.value)}>
                <option className='standard-select-list' value="-">Select Standard</option>
                <option className='standard-select-list' value="1">Standard 1</option>
                <option className='standard-select-list' value="2">Standard 2</option>
                <option className='standard-select-list' value="3">Standard 3</option>
                <option className='standard-select-list' value="4">Standard 4</option>
                <option className='standard-select-list' value="5">Standard 5</option>
                <option className='standard-select-list' value="6">Standard 6</option>
                <option className='standard-select-list' value="7">Standard 7</option>
                <option className='standard-select-list' value="8">Standard 8</option>
                <option className='standard-select-list' value="9">Standard 9</option>
                <option className='standard-select-list' value="10">Standard 10</option>
                <option className='standard-select-list' value="11">Standard 11</option>
                <option className='standard-select-list' value="12">Standard 12</option>
              </select>
              {/* <button className="mark-all-btn">Mark All Present</button> */}
            </div>
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>Roll No</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {
                  allStudent.length === 0 ? (
                    <tr>
                      <td colSpan="4">No data</td>
                    </tr>
                  ) : (
                    allStudent.map((student, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{student.username || "Name not available"}</td>
                        <td>{student.stud_id || "N/A"}</td>
                        <td className='attendance-table-data-box'>
                          <label>
                            <input
                              type="radio"
                              name={`attendance-${student.stud_id}`}
                              checked={present.includes(student.stud_id)}
                              onChange={() => attendanceHandler(student.stud_id, "present")}
                              className='attendance-check-box'
                            />
                            P
                          </label>

                          <label>
                            <input
                              type="radio"
                              name={`attendance-${student.stud_id}`}
                              checked={absent.includes(student.stud_id)}
                              onChange={() => attendanceHandler(student.stud_id, "absent")}
                              className='attendance-check-box'
                            />
                            A
                          </label>
                        </td>

                      </tr>
                    ))
                  )}
              </tbody>
            </table>
            <button className="submit-btn" onClick={submitAttendanceHandler} > Submit Attendance </button>
            <div className="view-attendance-button-box">
              <div className="view-attendance-button">
                View Attendance
              </div>
            </div>
            {attendance
              .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date DESC (newest first)
              .map((record, index) => (
                <div key={index} style={{ marginBottom: "2rem" }}>
                  <h3>Date: {record.date}</h3>
                  <table className="attendance-table">
                    <thead>
                      <tr>
                        <th>Roll No</th>
                        <th>Attendance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Present Students */}
                      {record.present.map((rollNo, i) => (
                        <tr key={`present-${index}-${i}`}>
                          <td>{rollNo}</td>
                          <td style={{ color: "green" }}>Present</td>
                        </tr>
                      ))}

                      {/* Absent Students */}
                      {record.absent.map((rollNo, i) => (
                        <tr key={`absent-${index}-${i}`}>
                          <td>{rollNo}</td>
                          <td style={{ color: "red" }}>Absent</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}

          </div>
        </div>
      </div>
    </>
  )
}

export default Attendance
import React, { useState } from 'react'
import "./AddNotice.css"
import axios from 'axios';

const AddNotice = () => {
  const [standard, setStandard] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitNotice = async () => {
    const response = await axios.post("http://localhost:3000/add-notice", { standard: standard, title: title, description: description })
    setTitle("")
    setDescription("")
    alert("notice added sussecfully")
  }

  return (
    <>
      <div className="main-content">
        <div className="teacher-add-notice-mega-container">
          <div className="add-notice-header-panel">
            <div className="add-notice-label">
              Add Notice
            </div>
          </div>
          <select className='notice-select-list-box' value={standard} onChange={(e) => setStandard(e.target.value)}>
            <option className='notice-select-list' value="-">Select Standard</option>
            <option className='notice-select-list' value="1">Standard 1</option>
            <option className='notice-select-list' value="2">Standard 2</option>
            <option className='notice-select-list' value="3">Standard 3</option>
            <option className='notice-select-list' value="4">Standard 4</option>
            <option className='notice-select-list' value="5">Standard 5</option>
            <option className='notice-select-list' value="6">Standard 6</option>
            <option className='notice-select-list' value="7">Standard 7</option>
            <option className='notice-select-list' value="8">Standard 8</option>
            <option className='notice-select-list' value="9">Standard 9</option>
            <option className='notice-select-list' value="10">Standard 10</option>
            <option className='notice-select-list' value="11">Standard 11</option>
            <option className='notice-select-list' value="12">Standard 12</option>
          </select>
          <div className="notice-title-input-box">
            <div className="notice-title-label">Title: </div>
            <input type="text" className='notice-title-input' value={title} placeholder='Enter notice title' onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="notice-description-input-box">
            <div className="notice-description-label">Description: </div>
            <textarea type="text" className='notice-description-input' value={description} placeholder='Enter notice description' onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="notice-submit-button" onClick={submitNotice}>
            Submit
          </div>
        </div>
      </div>
    </>
  )
}

export default AddNotice

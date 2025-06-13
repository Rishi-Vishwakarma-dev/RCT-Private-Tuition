import React from 'react'
import "./TeacherChat.css"

const TeacherChat = () => {
  return (
    <>
      <div className="main-content">
        <div className="teacherChat-mega-container-box">
          <div className="chat-panel-box">
            <div className="chat-profile-panel">
              <div className="chat-profile-image-box">
                <img src="#" alt="" className="chat-profile-image" />
              </div>
              <div className="chat-profile-name">
                Rishi Sir
              </div>
            </div>
            <div className="conversation">
              <div className="chat-user-text-box">
                <div className="chat-user-text">Good morning, sir! I was revising algebra, and I got stuck on quadratic equations. Could you help me understand how to solve them easily?</div>
              </div>
              <div className="chat-teacher-text-box">
                <div className="chat-teacher-text">Good morning, Rahul! Sure, I'd be happy to help. Could you tell me which part of quadratic equations is confusing you?</div>
              </div>
              <div className="chat-user-text-box">
                <div className="chat-user-text">I understand the basic equation ax² + bx + c = 0, but I get confused when deciding which method to use—factoring, completing the square, or the quadratic formula.</div>
              </div>
              <div className="chat-teacher-text-box">
                <div className="chat-teacher-text">Good question! The method depends on the equation:
                  1️⃣ Factoring – Use it when the equation is easily factorable, meaning you can break it into two binomials.
                  2️⃣ Completing the Square – This method is useful when the quadratic term's coefficient (a) is 1, and factoring isn't straightforward.
                  3️⃣ Quadratic Formula – Works for all quadratic equations, even when they can't be factored easily.

                  Would you like me to show an example using each method?</div>
              </div>
              <div className="chat-user-text-box">
                <div className="chat-user-text">Yes, sir! That would really help.</div>
              </div>
            </div>
          </div>
          <div className="chat-input-box-container">
            <div className="chat-input-box">
              <textarea className="chat-input" rows="10" cols="70" placeholder='Ask anything...'></textarea>
              <div className="chat-send-button-box">
                <div className="chat-send-button">
                  <img src="/send-icon.png" className="chat-send-button" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TeacherChat

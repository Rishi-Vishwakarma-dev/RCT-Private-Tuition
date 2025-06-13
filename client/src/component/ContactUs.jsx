import React from 'react'
import "./ContactUs.css"

const ContactUs = () => {
  return (
    <>
      <div className="contact-main-container">
            <div className="contact-box">
                <div className="contact-label">Contact Us</div>
                <div className="contact-form">
                    <div className="contact-name">
                        <label for="name">Name: </label>
                        <input className='contact-input' id="contact-name" type="text" autocomplete="none" placeholder="Enter your full name" />
                    </div>
                    <div className="contact-number">
                        <label for="number">Number: </label>
                        <input className='contact-input' id="contact-number" type="text" autocomplete="none" placeholder="Enter your number" />
                    </div>
                    <div className="contact-address">
                        <label for="address">Address: </label>
                        <textarea id="contact-address" name="address" rows="7" autocomplete="none"
                            placeholder="Enter your current address"></textarea>
                    </div>
                    <input className="contact-submit contact-input" type="submit" value="submit" />
                </div>
            </div>
            <div className="contact-bg_img">
                <img className='contact-img' src="/contact-bg-Image.jpeg" alt="Contact_Us.png"
                    onerror="this.src='../image/no-image-available.jpg'" />
            </div>
        </div>
    </>
  )
}

export default ContactUs

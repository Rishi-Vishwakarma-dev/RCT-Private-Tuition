import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div className="footer-container-box">
        <div className="footer-box">
          <div className="footer-classes-detail">
            <div className="footer-logo-box">
              <img src="/RCT_classes_logo_1.png" alt="" className="footer-logo" />
            </div>
            <div className="footer-social-media-box">
              <div className="footer-social-media-title">
                Connect With Us
              </div>
              <div className="footer-social-media-icon-box">
                <img src="" alt="" className="footer-social-media-icon" />
              </div>
            </div>
          </div>
          <div className="footer-quick-link-box">
            <div className="footer-quick-link-title">
              Quick Links
            </div>
            <div className="footer-quick-link-list">
              Home <br /> About Us <br /> Courses <br /> Gallary <br /> FAQs <br /> Contact Us <br /> Sitemap
            </div>
          </div>
          <div className="head-office-box">
            <div className="head-office-title">
              Head Office
            </div>
            <div className="head-office-address-box">
              <div className="head-office-icon-box">
                <img src="https://img.icons8.com/ios-filled/50/FFFFFF/marker.png" alt="" className="mini-icon" />
              </div>
              <a href='https://maps.app.goo.gl/NXuQoXBV1iwwYiFHA' className="head-office-address">
                R.C.T Classes, Near AGR school, Baneli, Titwala(E), 421102
              </a>
            </div>
          </div>
          <div className="contact-us-box">
            <div className="contact-us-title">
              Contact Us
            </div>
            <div className="contact-us-detail-box">
              <div className="contact-us-detail">
                <div className="contact-us-icon-box">
                  <img src="https://img.icons8.com/ios-filled/50/FFFFFF/marker.png" alt="" className="mini-icon" />
                </div>
                <div className="contact-us-text">
                  rishivishwa4878@gmail.com
                </div>
              </div>
              <div className="contact-us-detail">
                <div className="contact-us-icon-box">
                  <img src="https://img.icons8.com/ios-filled/50/FFFFFF/marker.png" alt="" className="mini-icon" />
                </div>
                <div className="contact-us-text">
                  +91 9321763572
                </div>
              </div>
              <div className="contact-us-detail">
                <div className="contact-us-icon-box">
                  <img src="https://img.icons8.com/ios-filled/50/FFFFFF/marker.png" alt="" className="mini-icon" />
                </div>
                <Link href='https://maps.app.goo.gl/CJoKrx9vxh1goFpD7' target='_blank' rel="noopener noreferrer" className="contact-us-text">
                  OUR Branch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
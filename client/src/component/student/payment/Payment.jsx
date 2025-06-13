import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./Payment.css"
import { useLocation } from 'react-router-dom'

const Payment = () => {
  const [studentDetail, setStudentDetail] = useState(null)

  const query = new URLSearchParams(useLocation().search);
  const username = query.get("user");

  useEffect(() => {
    if (!username) {
      return;
    }

    const fetchUser = async () => {

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/show-user`, { params: { username: username } });

        const studentDetail = response.data
        setStudentDetail(studentDetail)
      }
      catch {
        alert("Loading Failed!");
      }
    }
    fetchUser();
  }, [username])

  // *********** razorpay *************

  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //   script.onload = () => setRazorpayLoaded(true);
  //   script.onerror = () => console.error("Razorpay SDK failed to load");
  //   document.body.appendChild(script);
  // }, []);

  const handlePayment = async () => {
    // if (!razorpayLoaded) {
    //   alert("Razorpay SDK not loaded. Please try again.");
    //   return;
    // }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/razorpay`, { amount: 500 });

      const options = {
        key: "qlliEl4EnLB1s3pJrSSN8LH4", // Replace with your actual API Key
        amount: data.amount,
        currency: data.currency,
        name: "Your Business Name",
        description: "Test Transaction",
        order_id: data.id,
        handler: function (response) {
          alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        },
        prefill: {
          name: "rishi vishwakarma",
          email: "rishivishwa4877@gmail.com",
          contact: "9321763572",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <>
      <div className="main-content">
        <div className="payment-mega-container">
          <div className="payment-header-panel">
            <div className="payment-label">
              PAYMENT
            </div>
          </div>
          <div className="payment-fee-panel-box">
            <div className="payment-fee-panel">
              <div style={{ backgroundColor: "red" }} className="payment-color-rod"></div>
              <div className="payment-fee-box">
                <div className="payment-fee-text">
                  Total fee
                </div>
                <div className="payment-fee-amount">
                  {studentDetail?.payment.total || "loading"}
                </div>
              </div>
            </div>
            <div className="payment-fee-panel">
              <div style={{ backgroundColor: "red" }} className="payment-color-rod"></div>
              <div className="payment-fee-box">
                <div className="payment-fee-text">
                  Paid fee
                </div>
                <div className="payment-fee-amount">
                  {studentDetail?.payment.paid || "loading"}
                </div>
              </div>
            </div>
            <div className="payment-fee-panel">
              <div style={{ backgroundColor: "red" }} className="payment-color-rod"></div>
              <div className="payment-fee-box">
                <div className="payment-fee-text">
                  Due fee
                </div>
                <div className="payment-fee-amount">
                  {studentDetail?.payment.due || "loading"}
                </div>
              </div>
            </div>
          </div>
          <div className="payment-option-box-container">
            <div className="payment-option-box">
              <img src="https://etimg.etb2bimg.com/photo/72812716.cms" className="payment-option-image" />
              <div className="payment-now-button" onClick={handlePayment}>
                <div className="payment-now-text">
                  Pay Now
                </div>
              </div>
            </div>
          </div>
          <div className="payment-partner-image-box">
            <img src="/razopay-footer-logo.png" alt="" className="payment-partner-image" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Payment

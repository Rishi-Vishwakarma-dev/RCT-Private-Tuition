import React, { useState } from 'react'
import axios from "axios"
import "./AIChat.css"

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  
  const sendMessage = async () => {
    setInput("");
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=AIzaSyBA5x_aR3Lno4VddC4J2DHn282JUE9WvmU`,
        {
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `This is a chatbot for my class management website. Format the response as only clean HTML that fit in my div tag <div className={'chat-$\{msg.sender}-text'} dangerouslySetInnerHTML={{ __html: msg.text }} /> . Question: ${input}`
                }
              ]
            }
          ],
        }
      );

      // ✅ Extract & clean response
      const botResponseParts = response.data.candidates?.[0]?.content?.parts;
      const botMessageText = botResponseParts?.map(part => part.text).join(" ") || "<p>Sorry, I didn't understand that.</p>";

      // ✅ Remove Markdown-style ```html ``` wrapping
      const cleanText = botMessageText.replace(/```html|```/g, "").trim();

      // ✅ Wrap response properly
      const botMessage = { sender: "bot", text: `<div className="chat-response">${cleanText}</div>` };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "<p>Error fetching response.</p>" }]);
    }

  };



  return (
    <>
      <div className="main-content">
        <div className="AiChat-mega-container-box">
          <div className="chat-panel-box">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-${msg.sender}-text-box`}>
                <div className={`chat-${msg.sender}-text`} dangerouslySetInnerHTML={{ __html: msg.text }} />
              </div>
            ))}
          </div>

          <div className="chat-input-box-container">
            <div className="chat-input-box">
              <textarea
                className="chat-input"
                rows="2"
                placeholder="Ask anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              ></textarea>

              <div className="chat-send-button-box">
                <img src="/send-icon.png" className="chat-send-button" onClick={sendMessage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AIChat

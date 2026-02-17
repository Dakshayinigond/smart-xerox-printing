import React, { useState, useRef, useEffect } from "react";
import "../styles/ChatBox.css";

function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input) return;

    setMessages([...messages, { from: "user", text: input }]);
    const userMsg = input.toLowerCase();
    setInput("");

    // Simple auto-reply
    let reply = "Thank you! We will assist you shortly.";
    if (userMsg.includes("upload")) reply = "Login first, then click 'Upload' to send your document.";
    else if (userMsg.includes("print")) reply = "Choose print options and submit the order.";
    else if (userMsg.includes("collect")) reply = "Collect prints at your reserved time slot.";
    else if (userMsg.includes("login")) reply = "Use your registered credentials or OTP to login.";

    setTimeout(() => {
      setMessages(prev => [...prev, { from: "bot", text: reply }]);
    }, 700);
  };

  return (
    <div className={`chatbox ${open ? "open" : ""}`}>
      <div className="chat-header" onClick={() => setOpen(!open)}>
        Chat {open ? "▲" : "▼"}
      </div>

      {open && (
        <div className="chat-body">
          <div className="messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBox;

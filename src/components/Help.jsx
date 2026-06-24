import { useState } from "react";
import "./Help.css";

function Help() {
  const [openFaq, setOpenFaq] = useState(null);
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [email,setEmail]=useState("");

 const submitHelp = async () => {

  if (!userName || !email || !message) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await fetch(
      "https://my-business-backend-1z8e.onrender.com/help",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          email,
          message,
        }),
      }
    );

    const data = await response.json();

    alert("Message Sent");

    setUserName("");
    setEmail("");
    setMessage("");

  } catch (err) {
    console.log(err);
    alert("Error");
  }
};
  

   
  return (
    <div className="help-page">
      <div className="faq-box">
        <h3 onClick={() => setOpenFaq(1)}>
          How do I order a table?
        </h3>
        {openFaq === 1 && (
          <p>Go to Store and place an order.</p>
        )}

        <h3 onClick={() => setOpenFaq(2)}>
          Can I customize the size?
        </h3>
        {openFaq === 2 && (
          <p>Yes, custom sizes are available.</p>
        )}

        <h3 onClick={() => setOpenFaq(3)}>
          How long does delivery take?
        </h3>
        {openFaq === 3 && (
          <p>Usually 7–14 days.</p>
        )}
        <h3 onClick={() => setOpenFaq(4)}>
  Do you provide custom designs?
</h3>

{openFaq === 4 && (
  <p>
    Yes, we create fully custom infinity tables
    based on your requirements.
  </p>
)}

<h3 onClick={() => setOpenFaq(5)}>
  What payment methods are accepted?
</h3>

{openFaq === 5 && (
  <p>
    We accept UPI, Card and Cash on Delivery.
  </p>
)}

<h3 onClick={() => setOpenFaq(6)}>
  Can I cancel my order?
</h3>

{openFaq === 6 && (
  <p>
    Orders paid through UPI or Card can be
    cancelled while still pending.
  </p>
)}

<h3 onClick={() => setOpenFaq(7)}>
  Do you ship across India?
</h3>

{openFaq === 7 && (
  <p>
    Yes, we provide delivery to most locations
    across India.
  </p>
)}

<h3 onClick={() => setOpenFaq(8)}>
  What materials are used?
</h3>

{openFaq === 8 && (
  <p>
    We use premium mirrors, LEDs, glass and
    handcrafted wooden structures.
  </p>
)}
      </div>
      

      <div className="contact-box">
        <h2>Contact Us</h2>
        <p>Phone: +91 XXXXX XXXXX</p>
        <p>Email: yourmail@gmail.com</p>
      </div>

      <div className="message-box">
        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button 
        className="send-btn"
        onClick={submitHelp}>
          Send
        </button>
      </div>

    </div>
  );
}

export default Help;
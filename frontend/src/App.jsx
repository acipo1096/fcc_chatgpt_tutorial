import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e,message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);

    let msgs = chats;
    msgs.push({role: "user", content: message});
    setChats(msgs);

    setMessage("");

    fetch("http://localhost:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chats,
      })
    })
    .then((response) => response.json())
    .then((data) => {
      msgs.push(data.output);
      setChats(msgs);
      setIsTyping(false);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <main>
      <h1>FullStack Chat AI Tutorial</h1>

      <section>
        {chats && chats.length ? chats.map((chat, index) => (
          <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
            <span>
              <b>{chat.role.toUpperCase()}</b>
            </span>
            <span>:</span>
            <span>{chat.content}</span>
          </p>
        ))
        : ""}
      </section>

      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing..." : ""}</i>
        </p>
      </div>

      <form action="" onSubmit={(e) => chat(e,message)}>
        <input 
          type="text"
          name="message"
          value={message}
          placeholder="Type a message here and hit Enter..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>

    </main>
    // <>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
  )
}

export default App

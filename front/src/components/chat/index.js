import { useEffect, useState } from "react";
import Message from "../messages";
import { io } from "socket.io-client";

let socket;
export default function Chat() {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    console.log("effect chat");
    socket = io().connect("http://localhost:8080");
  }, []);

  return (
    <>
      <div
        onClick={() => setShowChat(true)}
        className="chat-container cursor-pointer bg-slate-700 fixed right-8 bottom-10 w-14 h-14 rounded-full grid place-content-center shadow-md shadow-slate-800 scale-90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          className="w-10 stroke-violet-100"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>
      {showChat && (
        <Message
          handleShowChat={setShowChat}
          socket={socket}
          showChat={showChat}
        />
      )}
    </>
  );
}

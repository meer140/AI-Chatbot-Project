import { useEffect, useState } from 'react';
import { ChatMessages } from "./components/ChatMessages";
import { ChatInput } from './components/ChatInput';
import { Sidebar } from './components/Sidebar';
import './App.css'

function App() {

  const [chats, setChats] = useState(
    JSON.parse(localStorage.getItem("chats")) || []
  );

  const [currentChatId, setCurrentChatId] = useState(null);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats])

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  function createNewChat() {
    const newChat = {
      id: crypto.randomUUID(),
      title: "New Chat",
      messages: []
    };
    setChats((prev) => [...prev, newChat]);
    setCurrentChatId(newChat.id);
  }

  return (
    <div className="app">
      <Sidebar
        chats={chats}
        setCurrentChatId={setCurrentChatId}
        createNewChat={createNewChat}
      />

      <div className="chat-area">
        {!currentChatId ? (
          <div className="welcome-screen">
            <div className="welcome-icon">🤖</div>
            <h1 className="welcome-msg">Welcome to ChatBot</h1>
            <p className="welcome-sub">Create a new chat to get started</p>
          </div>
        ) : (
          <>
            <ChatMessages chatMessages={currentChat?.messages || []} />
            <ChatInput setChats={setChats} currentChatId={currentChatId} />
          </>
        )}
      </div>
    </div>
  );
}

export default App

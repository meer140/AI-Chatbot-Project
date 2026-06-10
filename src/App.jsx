import { useEffect, useState } from 'react';
import { ChatMessages } from "./components/ChatMessages";
import { ChatInput } from './components/ChatInput';
import { Sidebar } from './components/Sidebar';
import './App.css'

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

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
        sidebarOpen = {sidebarOpen}
        setSidebarOpen = {setSidebarOpen}
      />

      <div className="chat-area">
        <div className="chat-area-header">
          {!sidebarOpen && (
            <button 
              className="sidebar-btn-closed" 
              onClick={() => setSidebarOpen(true)}
              title="Open Sidebar"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          )}
          <div className="chat-area-header-dot"></div>
          <span>{currentChat ? currentChat.title : "ChatBot"}</span>
        </div>

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

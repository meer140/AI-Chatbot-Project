export function Sidebar({ chats, setCurrentChatId, createNewChat, sidebarOpen, setSidebarOpen }) {
    return (
        <>
            {sidebarOpen && (
                <div 
                    className="sidebar-backdrop" 
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
            
            <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
                <div className="sidebar-top">
                    <div className="sidebar-logo">
                        <span>🤖 ChatBot</span>
                        <button className="sidebar-btn" onClick={() => setSidebarOpen(false)} title="Close Sidebar">
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                    </div>
                    <button className="new-chat-btn" onClick={createNewChat}>
                        <i className="fa-solid fa-plus"></i> New Chat
                    </button>
                    {chats.length > 0 && <div className="chat-list-label">Recent</div>}
                </div>
                <div className="chat-list">
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            className="chat-list-item"
                            onClick={() => {
                                setCurrentChatId(chat.id);
                                if (window.innerWidth <= 768) {
                                    setSidebarOpen(false);
                                }
                            }}
                        >
                            <i className="fa-regular fa-comment" style={{ marginRight: '8px' }}></i>
                            {chat.title}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export function Sidebar({ chats, setCurrentChatId, createNewChat }) {
    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <div className="sidebar-logo">⚡ ChatBot</div>
                <button className="new-chat-btn" onClick={createNewChat}>
                    + New Chat
                </button>
                {chats.length > 0 && <div className="chat-list-label">Recent</div>}
            </div>
            <div className="chat-list">
                {chats.map(chat => (
                    <div
                        key={chat.id}
                        className="chat-list-item"
                        onClick={() => setCurrentChatId(chat.id)}
                    >
                        {chat.title}
                    </div>
                ))}
            </div>
        </div>
    );
}

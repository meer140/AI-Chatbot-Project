import { useState } from 'react'
import { getGeminiResponse } from "./ModelResponse.jsx"
import dayjs from "dayjs"

export function ChatInput({ setChats, currentChatId }) {
    const [inputText, setInputText] = useState('');

    function saveInputChat(event) {
        setInputText(event.target.value);
    }

    async function sendMessage() {
        // Bug 2 & 3: Guard against no chat selected or empty input
        if (!currentChatId || !inputText.trim()) return;

        const userMessage = {
            message: inputText,
            sender: "user",
            id: crypto.randomUUID(),
            time: dayjs().valueOf()
        };

        const loadingMessage = {
            message: "",
            sender: "bot",
            id: crypto.randomUUID(),
            status: "loading",
            time: dayjs().valueOf()  // Bug 8: bot messages now get a time
        };

        setChats((prev) => {
            return prev.map((chat) => {
                if (chat.id === currentChatId) {
                    const isFirstMessage = chat.messages.length === 0;
                    return {
                        ...chat,
                        title: isFirstMessage
                            ? inputText.slice(0, 30)
                            : chat.title,
                        messages: [
                            ...chat.messages,
                            userMessage,
                            loadingMessage
                        ]
                    };
                }
                return chat;
            });
        });

        const response = await getGeminiResponse(inputText);

        setChats((prev) => {
            return prev.map((chat) => {
                if (chat.id === currentChatId) {
                    return {
                        ...chat,
                        messages: chat.messages.map((msg) => {
                            // Bug 4: match by id instead of status
                            if (msg.id === loadingMessage.id) {
                                return {
                                    ...msg,
                                    message: response,
                                    status: "done"
                                };
                            }
                            return msg;
                        })
                    };
                }
                return chat;
            });
        });

        setInputText('');
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    }

    return (
        <div className="chat-input-container">
            <input
                placeholder="Send message to Chatbot"
                onChange={saveInputChat}
                onKeyDown={handleKeyDown}
                value={inputText}
                className="chat-input"
            />
            <button onClick={sendMessage} className="send-button">Send</button>
        </div>
    );
}

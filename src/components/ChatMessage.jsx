import userImage from "../assets/user.png"
import robotImage from "../assets/robot.png"
import dayjs from "dayjs"


export function ChatMessage({message,sender, time}) {
  
  return(
    <div className={sender === "user" ? "chat-msg-user" : "chat-msg-bot"}>
      {sender === "bot" && <img src={robotImage} width="50" />}
      <div className="chat-msg-text">
          {message}
          {time && <div className="chat-message-time">
            {dayjs(time).format('h:mma')}
          </div>}
      </div>
      {sender === "user" && <img src={userImage} width="50" className="user-profile" />}  
    </div>
  )
}
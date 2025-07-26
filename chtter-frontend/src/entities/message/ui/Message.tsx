import React from 'react';
 
type MessageProps = {
  content: string;
  isMyMessage: boolean;
  createdAt: string;
};

const Message: React.FC<MessageProps> = ({ content, isMyMessage, createdAt }) => {
  const getFormattedTime = () => {
    const date = new Date(createdAt);
    const mins = date.getMinutes();
    const formattedMins = mins < 10 ? '0' + mins : mins;
    const hours = date.getHours();

    return `${hours}:${formattedMins}`;
  };
  
  return (
    <div className={`chat  ${isMyMessage ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-header">
        <p>User Name</p>
        <time className="text-xs opacity-50">
          {getFormattedTime()}
        </time>
      </div>
      <div className="chat-bubble">
        {content}
      </div>
    </div>
  );
}

export default Message;

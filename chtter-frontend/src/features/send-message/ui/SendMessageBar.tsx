import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useCreateMessage } from '../hooks/useCreateMessage';

export const SendMessageBar = () => {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [createMessage] = useCreateMessage();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [message]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!message.trim()) return;
    console.log('Send message:', message);
    setMessage('');
    createMessage({ variables: {
      createMessageInput: {
        content: message,
        chatId: id!,
      },
    }})
  };

  return (
    <div className="w-full p-3 border-t border-base-300 bg-base-100">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Type a message..."
          className="textarea input w-full resize-none leading-5 min-h-[44px] max-h-40 rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral"
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={!message}
          aria-label="Send message"
          className="btn btn-neutral btn-circle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

import { useState } from 'react';

import { CreateChatModal, useGetChats } from '@/features';
import ChatListItem from './ChatListItem';

interface ChatSidebarProps {
  onSelectChat: () => void;
}

const ChatSidebar = ({ onSelectChat }: ChatSidebarProps) => {
  const { data } = useGetChats();
  const [isCreateChatOpen, setCreateChatOpen] = useState(false);

  console.log(data)
  return (
    <aside className="h-full border-r border-base-300">
      <div className="p-4 font-bold text-lg border-b border-base-300">
        Messages
      </div>
      <button 
        className="btn" 
        onClick={() => setCreateChatOpen(true)}
      >
        Create chat
      </button>
      <ChatListItem
        name="John Doe"
        lastMessage="Let's catch up later today?"
        onClick={onSelectChat}
      />
      <CreateChatModal 
        isOpen={isCreateChatOpen}
        onClose={() => setCreateChatOpen(false)}
      />
    </aside>
  );
};

export default ChatSidebar;

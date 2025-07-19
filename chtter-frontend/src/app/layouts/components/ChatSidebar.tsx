/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import { CreateChatModal, useGetChats } from '@/features';
import ChatListItem from './ChatListItem';

interface ChatSidebarProps {
  onSelectChat: (val: any) => void;
}

const ChatSidebar = ({ onSelectChat }: ChatSidebarProps) => {
  const { data } = useGetChats();
  const [isCreateChatOpen, setCreateChatOpen] = useState(false);

  return (
    <aside className="h-full border-r border-base-300 flex flex-col">
      <div className="p-4 font-bold text-lg border-b border-base-300">
        Messages
      </div>
      
      <div className="p-2">
        <button 
          className="btn w-full" 
          onClick={() => setCreateChatOpen(true)}
        >
          Create chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {data?.chats.map((chat) => (
          <ChatListItem
            {...chat}
            key={chat._id}
            lastMessage="Message"
            onClick={onSelectChat}
          />
        ))}
      </div>

      <CreateChatModal 
        isOpen={isCreateChatOpen}
        onClose={() => setCreateChatOpen(false)}
      />
    </aside>
  );
};

export default ChatSidebar;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { CreateChatModal, useGetChats, useSendMessage } from '@/features';
import ChatListItem from './ChatListItem';
import type { Chat } from '@/shared/api/graphql/gql/graphql';

interface ChatSidebarProps {
  onSelectChat: (val: any) => void;
}

const sortChats = (chatA: Chat, chatB: Chat) => {
  if (!chatA.latestMessage) return -1;
  const chatACreatedAt = new Date(chatA.latestMessage.createdAt).getTime();
  const chatBCreatedAt = new Date(chatB.latestMessage?.createdAt).getTime();

  return chatBCreatedAt - chatACreatedAt;
};

const ChatSidebar = ({ onSelectChat }: ChatSidebarProps) => {
  const { data } = useGetChats();
  const { id } = useParams();
  const [isCreateChatOpen, setCreateChatOpen] = useState(false);
  useSendMessage({ chatIds: data?.chats.map((chat) => chat._id) || [] });

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
        {data?.chats ? [...data.chats].sort(sortChats).map((chat) => (
          <ChatListItem
            key={chat._id}
            chat={chat}
            onClick={onSelectChat}
            isActive={id === chat._id}
          />
        )) : null}
      </div>

      <CreateChatModal 
        isOpen={isCreateChatOpen}
        onClose={() => setCreateChatOpen(false)}
      />
    </aside>
  );
};

export default ChatSidebar;

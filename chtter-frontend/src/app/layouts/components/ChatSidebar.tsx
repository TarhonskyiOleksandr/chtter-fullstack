/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { CreateChatModal, useGetChats, useSendMessage } from '@/features';
import ChatListItem from './ChatListItem';
import type { Chat } from '@/shared/api/graphql/gql/graphql';
import InfiniteScroll from 'react-infinite-scroller';
import { useCountChats } from '@/entities';

interface ChatSidebarProps {
  onSelectChat: (val: any) => void;
}

const PAGE_SIZE = 9;

const sortChats = (chatA: Chat, chatB: Chat) => {
  if (!chatA.latestMessage) return -1;
  const chatACreatedAt = new Date(chatA.latestMessage.createdAt).getTime();
  const chatBCreatedAt = new Date(chatB.latestMessage?.createdAt).getTime();
  return chatBCreatedAt - chatACreatedAt;
};

const ChatSidebar = ({ onSelectChat }: ChatSidebarProps) => {
  const { data, fetchMore } = useGetChats({ offset: 0, limit: PAGE_SIZE });
  const { id } = useParams();
  const [isCreateChatOpen, setCreateChatOpen] = useState(false);

  useSendMessage({ chatIds: data?.chats.map((chat) => chat._id) || [] });
  const { chatsCount, countChats } = useCountChats();

  useEffect(() => {
    countChats();
  }, [countChats]);

  return (
    <aside className="h-[calc(100vh-64px)] border-r border-base-300 flex flex-col">
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
        <InfiniteScroll
          pageStart={0}
          hasMore={data?.chats && chatsCount ? data.chats.length < chatsCount : false}
          loadMore={() =>
            fetchMore({
              variables: {
                offset: data?.chats.length,
                limit: 9,
              },
            })
          }
          initialLoad={false}
          useWindow={false}
          loader={<div className="p-4 text-center">Loading...</div>}
        >
          {data?.chats
            ? [...data.chats]
                .sort(sortChats)
                .map((chat) => (
                  <ChatListItem
                    key={chat._id}
                    chat={chat}
                    onClick={onSelectChat}
                    isActive={id === chat._id}
                  />
                ))
            : null}
        </InfiniteScroll>
      </div>

      <CreateChatModal 
        isOpen={isCreateChatOpen}
        onClose={() => setCreateChatOpen(false)}
      />
    </aside>
  );
};

export default ChatSidebar;

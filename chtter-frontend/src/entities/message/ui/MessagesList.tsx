import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useGetMessages } from '../hooks/useGetMessages';
import Message from './Message';
import { useGetMe } from '@/entities';
import type { Message as MessageType } from '@/shared/api/graphql/gql/graphql';
import { useCountMessages } from '../hooks/useCountMessages';
import InfiniteScroll from 'react-infinite-scroller';

const PAGE_SIZE = 10;

export const MessagesList = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { id } = useParams();
  const { 
    data: existingMessages, 
    loading, 
    error,
    fetchMore,
  } = useGetMessages({ 
    chatId: id!,
    offset: 0,
    limit: PAGE_SIZE,
  });
  const { data: meData } = useGetMe();
  const { messagesCount, countMessages } = useCountMessages(id!);

  useEffect(() => {
    countMessages();
  }, [countMessages]);

  useEffect(() => {
    if (existingMessages) setMessages(existingMessages.messages);
  }, [existingMessages]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <InfiniteScroll
      isReverse
      pageStart={0}
      hasMore={
        existingMessages?.messages && messagesCount ? 
        existingMessages.messages.length < messagesCount 
        : false
      }
      loadMore={() =>
        fetchMore({
          variables: {
            offset: existingMessages?.messages.length,
            limit: PAGE_SIZE,
          },
        })
      }
      initialLoad={false}
      useWindow={false}
      loader={<div className="p-4 text-center">Loading...</div>}
    >
      {
        messages.map((message, index, self) => {
          const currentDate = new Date(message.createdAt).toLocaleDateString('en-US');
          const prevDate = self[index - 1]
            ? new Date(self[index - 1].createdAt).toLocaleDateString('en-US')
            : null;

          const shouldShowDate = currentDate !== prevDate;

          return (
            <div key={message._id}>
              {shouldShowDate && (
                <div className="flex justify-center mb-2">
                  <time className="text-xs text-gray-400">{currentDate}</time>
                </div>
              )}
              <Message
                content={message.content}
                isMyMessage={message.user._id === meData?.me._id}
                createdAt={message.createdAt}
              />
            </div>
          );
        }).reverse()
      }
    </InfiniteScroll>
  );
};

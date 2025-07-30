import { useParams } from 'react-router-dom';

import { useGetMessages } from '../hooks/useGetMessages';
import Message from './Message';
import { useGetMe } from '@/entities';
import { useSendMessage } from '@/features';

export const MessagesList = () => {
  const { id } = useParams();
  const { data, loading, error } = useGetMessages({ chatId: id! });
  const { data: meData } = useGetMe();
  const { data: lastMessages } = useSendMessage({ chatId: id! });

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  console.log(lastMessages)

  return (
    <>
      {
        data?.messages.map((message, index, self) => {
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
                isMyMessage={message.userId === meData?.me._id}
                createdAt={message.createdAt}
              />
            </div>
          );
        }).reverse()
      }
    </>
  );
};

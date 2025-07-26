import { useParams } from 'react-router-dom';

import { MessagesList, useGetChat } from '@/entities';
import { SendMessageBar } from '@/features';

const ChatView = () => {
  const { id } = useParams();
  const { data, loading, error } = useGetChat({ _id: id! });

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  console.log(data)

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-grow flex-col-reverse overflow-auto max-h-[calc(100vh-80px-80px)] px-6">
        <MessagesList />
      </div>
      <div className="p-2">
        <SendMessageBar />
      </div>
    </div>
  );
}

export default ChatView;
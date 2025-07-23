import { useParams } from 'react-router-dom';
import { useGetMessages } from '../hooks/useGetMessages';

export const MessagesList = () => {
  const { id } = useParams();
  const { data, loading, error } = useGetMessages({ chatId: id! });

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  console.log(data)

  return (
    <div>
      {
        data?.messages.map((message) => 
          <p key={message._id}>
            {message.content}
          </p>
        )
      }
    </div>
  );
};

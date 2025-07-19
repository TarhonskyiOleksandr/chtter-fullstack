import { useParams } from 'react-router-dom';

import { useGetChat } from '@/entities';

const ChatView = () => {
  const { id } = useParams();
  const { data, loading, error } = useGetChat({ _id: id! });

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  console.log(data)

  return (
    <div>
      {data?.chat.name}
    </div>
  );
}

export default ChatView;
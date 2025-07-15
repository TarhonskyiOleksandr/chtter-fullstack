import { useGetChats } from '@/features';
import ChatListItem from './ChatListItem';

interface ChatSidebarProps {
  onSelectChat: () => void;
}

const ChatSidebar = ({ onSelectChat }: ChatSidebarProps) => {
  const { data } = useGetChats();

  console.log(data)
  return (
    <aside className="h-full border-r border-base-300">
      <div className="p-4 font-bold text-lg border-b border-base-300">
        Messages
      </div>
      <ChatListItem
        name="John Doe"
        lastMessage="Let's catch up later today?"
        onClick={onSelectChat}
      />
    </aside>
  );
};

export default ChatSidebar;

import { Avatar } from "@/shared/ui";

interface ChatListItemProps {
  name: string;
  lastMessage: string;
  onClick?: () => void;
}

const ChatListItem = ({ name, lastMessage, onClick }: ChatListItemProps) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 hover:bg-base-200 cursor-pointer"
    >
      <Avatar name={name} />
      <div className="min-w-0">
        <p className="font-semibold truncate">{name}</p>
        <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatListItem;

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Chat } from "@/shared/api/graphql/gql/graphql";
import { Avatar } from "@/shared/ui";

interface ChatListItemProps {
  chat: Chat;
  onClick: (val: any) => void;
  isActive?: boolean;
}

const ChatListItem = ({ chat, onClick, isActive }: ChatListItemProps) => {
  const chatName = chat?.latestMessage?.user.name || chat.name!;

  return (
    <div
      onClick={() => onClick(chat._id)}
      className={`flex items-center gap-3 px-4 py-3 hover:bg-base-200 cursor-pointer ${isActive ? 'bg-base-200' : 'bg-transparent'}`}
    >
      <Avatar 
        name={chatName} 
        avatar={chat?.latestMessage?.user.avatar} 
      />
      <div className="min-w-0">
        <p className="font-semibold truncate">{chat.name}</p>
        {
          chat.latestMessage ? 
          <p className="text-sm text-gray-500 truncate">
            <span className="font-semibold">{chat.latestMessage.user.name}:</span>{' '}
            {chat.latestMessage.content}
          </p> : null
        }
      </div>
    </div>
  );
};

export default ChatListItem;

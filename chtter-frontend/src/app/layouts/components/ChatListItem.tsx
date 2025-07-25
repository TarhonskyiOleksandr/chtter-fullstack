/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Chat } from "@/shared/api/graphql/gql/graphql";
import { Avatar } from "@/shared/ui";

interface ChatListItemProps extends Chat {
  lastMessage: string;
  onClick: (val: any) => void;
  isActive?: boolean;
}

const ChatListItem = ({ name, lastMessage, onClick, _id, isActive }: ChatListItemProps) => {
  return (
    <div
      onClick={() => onClick(_id)}
      className={`flex items-center gap-3 px-4 py-3 hover:bg-base-200 cursor-pointer ${isActive ? 'bg-base-200' : 'bg-transparent'}`}
    >
      <Avatar name={name!} />
      <div className="min-w-0">
        <p className="font-semibold truncate">{name}</p>
        <p className="text-sm text-gray-500 truncate">{lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatListItem;

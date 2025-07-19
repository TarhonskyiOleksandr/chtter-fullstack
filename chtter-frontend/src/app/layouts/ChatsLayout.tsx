import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import ChatSidebar from './components/ChatSidebar';

const ChatLayout = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSelectChat = (id: string) => {
    setShowSidebar(false);
    navigate(`chats/${id}`);
  };

  return (
    <div className="flex h-screen">
      <div
        className={`w-full sm:w-72 sm:block ${
          showSidebar ? 'block' : 'hidden sm:block'
        }`}
      >
        <ChatSidebar onSelectChat={handleSelectChat} />
      </div>

      <main
        className={`flex-1 ${
          showSidebar ? 'hidden' : 'block'
        } sm:block overflow-y-auto`}
      >
        <div className="sm:hidden p-2">
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => setShowSidebar(true)}
          >
            Open
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default ChatLayout;
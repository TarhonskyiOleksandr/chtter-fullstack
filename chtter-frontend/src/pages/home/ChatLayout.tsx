import { useState } from 'react';
import ChatSidebar from './ChatSidebar';

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <div className="flex h-screen">
      <div
        className={`w-full sm:w-72 sm:block ${
          showSidebar ? 'block' : 'hidden sm:block'
        }`}
      >
        <ChatSidebar onSelectChat={() => setShowSidebar(false)} />
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
        {children}
      </main>
    </div>
  );
};

export default ChatLayout;

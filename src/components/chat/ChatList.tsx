
import React from 'react';
import { cn } from '@/lib/utils';
import { type Chat } from './ChatLayout';

interface ChatListProps {
  chats: Chat[];
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, selectedChatId, onSelectChat }) => {
  if (chats.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No conversations yet
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-[calc(100%-60px)]">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className={cn(
            "p-4 border-b hover:bg-slate-50 cursor-pointer transition-colors",
            selectedChatId === chat.id && "bg-slate-100 hover:bg-slate-100"
          )}
          onClick={() => onSelectChat(chat.id)}
        >
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              {chat.participantAvatar ? (
                <img 
                  src={chat.participantAvatar} 
                  alt={chat.participantName} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-lg font-medium text-primary">
                  {chat.participantName.charAt(0)}
                </span>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium truncate">{chat.participantName}</h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {chat.timestamp}
                </span>
              </div>
              
              <p className={cn(
                "text-sm truncate mt-1",
                chat.unread ? "font-medium text-foreground" : "text-muted-foreground"
              )}>
                {chat.lastMessage}
              </p>
            </div>
            
            {chat.unread && (
              <div className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0 mt-2"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;

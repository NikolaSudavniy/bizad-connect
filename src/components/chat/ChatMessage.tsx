
import React from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { type Message } from './ChatLayout';
import { Check, CheckCheck } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  // For demo purposes, using the message's timestamp directly
  // In a real app, you'd use date-fns to format the actual timestamp
  const messageTime = message.timestamp;

  return (
    <div className={cn(
      "flex mb-4",
      message.isOwn ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[75%] rounded-lg px-4 py-2 relative",
        message.isOwn 
          ? "bg-primary text-white rounded-br-none" 
          : "bg-gray-100 text-foreground rounded-bl-none"
      )}>
        <div className="text-sm whitespace-pre-wrap break-words">
          {message.text}
        </div>
        
        <div className={cn(
          "flex items-center gap-1 text-xs mt-1",
          message.isOwn ? "text-white/70 justify-end" : "text-muted-foreground"
        )}>
          <span>{messageTime}</span>
          
          {message.isOwn && (
            message.isRead 
              ? <CheckCheck className="h-3.5 w-3.5" /> 
              : <Check className="h-3.5 w-3.5" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

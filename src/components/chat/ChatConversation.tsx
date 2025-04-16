
import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from './ChatMessage';
import { type Chat, type Message } from './ChatLayout';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChatConversationProps {
  chat: Chat;
  messages: Message[];
}

const ChatConversation: React.FC<ChatConversationProps> = ({ chat, messages }) => {
  const { t } = useLanguage();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [quickEmojis] = useState(['👍', '👌', '😊', '🎉', '👏', '❤️', '🚀', '👨‍💻']);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // In a real app, you would send this to an API
    console.log('Sending message:', newMessage);
    
    // For demo purposes, we'll just clear the input
    setNewMessage('');
  };

  const handleEmojiClick = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col h-full">
        {/* Messages area */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.length > 0 ? (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              {t('chat.noMessages')}
            </div>
          )}
        </div>
        
        {/* Input area */}
        <div className="p-3 border-t bg-gray-50">
          <div className="flex gap-2">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="flex-shrink-0"
            >
              <Smile className="h-5 w-5 text-muted-foreground" />
            </Button>
            
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={t('chat.typeMessage')}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            
            <Button 
              type="button" 
              size="icon" 
              className="flex-shrink-0"
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ''}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Right sidebar with job info and quick reactions */}
      <div className="hidden lg:block w-64 border-l p-4 bg-gray-50 overflow-y-auto space-y-4">
        {/* Job information */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-medium text-sm">{t('chat.jobDetails')}</h3>
            {chat.jobTitle && (
              <div>
                <p className="text-sm font-semibold">{chat.jobTitle}</p>
                <p className="text-xs text-muted-foreground mt-1">{chat.participantName}</p>
              </div>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs"
              onClick={() => chat.jobId && window.location.href = `/vacancy/${chat.jobId}`}
            >
              {t('chat.viewJob')}
            </Button>
          </CardContent>
        </Card>
        
        {/* Quick reaction emojis */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium text-sm mb-3">{t('chat.quickReactions')}</h3>
            <div className="grid grid-cols-4 gap-2">
              {quickEmojis.map((emoji) => (
                <Button
                  key={emoji}
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleEmojiClick(emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatConversation;

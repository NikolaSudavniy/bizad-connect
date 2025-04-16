
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatList from './ChatList';
import ChatConversation from './ChatConversation';
import { useLanguage } from '@/contexts/LanguageContext';

export interface Chat {
  id: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  jobId?: number;
  jobTitle?: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  isOwn: boolean;
}

const ChatLayout = ({ initialChatId }: { initialChatId?: string }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<string | null>(initialChatId || null);
  const [mobileView, setMobileView] = useState<'list' | 'chat'>(initialChatId ? 'chat' : 'list');
  
  // Mock chats data
  const chats: Chat[] = [
    {
      id: 'chat1',
      participantName: 'Діфоменко О. М., ФОП',
      lastMessage: 'Дякую за відповідь, чекаю на вашу пропозицію.',
      timestamp: '12:42',
      unread: true,
      jobId: 1,
      jobTitle: 'Front-end розробник'
    },
    {
      id: 'chat2',
      participantName: 'SoftServe LLC',
      lastMessage: 'Коли ви зможете приступити до роботи?',
      timestamp: '09:15',
      unread: false,
      jobId: 5,
      jobTitle: 'Front-end розробник (React.js)'
    },
    {
      id: 'chat3',
      participantName: 'Планета, мебельна майстерня',
      lastMessage: 'Ми розглянули ваше резюме і хотіли б запросити вас на співбесіду.',
      timestamp: 'Вчора',
      unread: false,
      jobId: 2,
      jobTitle: 'Front-end розробник'
    }
  ];

  // Mock messages data
  const messages: Record<string, Message[]> = {
    chat1: [
      {
        id: 'm1',
        chatId: 'chat1',
        senderId: 'company1',
        text: 'Доброго дня! Ми розглянули ваше резюме на вакансію Front-end розробника.',
        timestamp: '10:30',
        isRead: true,
        isOwn: false
      },
      {
        id: 'm2',
        chatId: 'chat1',
        senderId: 'user',
        text: 'Доброго дня! Дякую за відповідь. Я зацікавлений у вашій пропозиції.',
        timestamp: '11:15',
        isRead: true,
        isOwn: true
      },
      {
        id: 'm3',
        chatId: 'chat1',
        senderId: 'company1',
        text: 'Чудово! Ми б хотіли запросити вас на відеоінтерв\'ю. Коли вам буде зручно?',
        timestamp: '11:45',
        isRead: true,
        isOwn: false
      },
      {
        id: 'm4',
        chatId: 'chat1',
        senderId: 'user',
        text: 'Я вільний у четвер після обіду або у п\'ятницю зранку. Що краще вам підходить?',
        timestamp: '12:20',
        isRead: true,
        isOwn: true
      },
      {
        id: 'm5',
        chatId: 'chat1',
        senderId: 'company1',
        text: 'Давайте у четвер о 15:00. Я надішлю вам посилання на Zoom незабаром.',
        timestamp: '12:35',
        isRead: false,
        isOwn: false
      },
      {
        id: 'm6',
        chatId: 'chat1',
        senderId: 'user',
        text: 'Дякую за відповідь, чекаю на вашу пропозицію.',
        timestamp: '12:42',
        isRead: false,
        isOwn: true
      }
    ],
    chat2: [
      {
        id: 'm7',
        chatId: 'chat2',
        senderId: 'company2',
        text: 'Доброго дня! Ми з SoftServe зацікавились вашим досвідом роботи з React.',
        timestamp: '09:00',
        isRead: true,
        isOwn: false
      },
      {
        id: 'm8',
        chatId: 'chat2',
        senderId: 'user',
        text: 'Доброго дня! Дякую за звернення. У мене 3 роки досвіду з React та Redux.',
        timestamp: '09:10',
        isRead: true,
        isOwn: true
      },
      {
        id: 'm9',
        chatId: 'chat2',
        senderId: 'company2',
        text: 'Коли ви зможете приступити до роботи?',
        timestamp: '09:15',
        isRead: true,
        isOwn: false
      }
    ],
    chat3: [
      {
        id: 'm10',
        chatId: 'chat3',
        senderId: 'company3',
        text: 'Ми розглянули ваше резюме і хотіли б запросити вас на співбесіду.',
        timestamp: 'Вчора',
        isRead: true,
        isOwn: false
      }
    ]
  };

  const handleBackToList = () => {
    setMobileView('list');
  };

  const handleSelectChat = (chatId: string) => {
    setSelectedChat(chatId);
    setMobileView('chat');
  };

  // Determine which chat to show based on selectedChat
  const currentChat = chats.find(chat => chat.id === selectedChat);
  const currentMessages = selectedChat ? messages[selectedChat] || [] : [];

  return (
    <div className="h-[calc(100vh-180px)] max-h-[800px] bg-white rounded-lg border overflow-hidden">
      <div className="flex h-full">
        {/* Chat list - hide on mobile when viewing a chat */}
        <div 
          className={`w-full md:w-1/3 border-r ${
            mobileView === 'chat' ? 'hidden md:block' : 'block'
          }`}
        >
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">{t('chat.conversations')}</h2>
          </div>
          <ChatList 
            chats={chats} 
            selectedChatId={selectedChat} 
            onSelectChat={handleSelectChat} 
          />
        </div>

        {/* Chat conversation - show conditionally */}
        <div 
          className={`w-full md:w-2/3 flex flex-col ${
            mobileView === 'list' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {selectedChat ? (
            <>
              <div className="p-3 border-b flex items-center bg-gray-50">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden mr-2" 
                  onClick={handleBackToList}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div>
                  <h3 className="font-medium">{currentChat?.participantName}</h3>
                  {currentChat?.jobTitle && (
                    <p className="text-xs text-muted-foreground">{currentChat.jobTitle}</p>
                  )}
                </div>
              </div>
              <ChatConversation 
                chat={currentChat!} 
                messages={currentMessages} 
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              {t('chat.selectConversation')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;

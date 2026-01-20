import { useState, useRef, useEffect } from 'react';
import { Send, X, User, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';

type Message = {
  id: string;
  text: string;
  sender: 'driver' | 'passenger';
  timestamp: Date;
};

type DriverChatProps = {
  passengerName: string;
  isOpen: boolean;
  onClose: () => void;
};

// Mensajes rápidos para el conductor
const QUICK_DRIVER_MESSAGES = [
  { id: 'arrived', text: 'Ya llegué al punto', icon: '📍' },
  { id: 'arrive_5', text: 'Llego en 5 minutos', icon: '⏱️' },
  { id: 'arrive_10', text: 'Llego en 10 minutos', icon: '⏱️' },
  { id: 'location', text: '¿Dónde estás?', icon: '📌' },
  { id: 'wait', text: 'Espera un momento por favor', icon: '⏳' },
  { id: 'ready', text: 'Estoy listo para partir', icon: '🚗' },
];

export default function DriverChat({ passengerName, isOpen, onClose }: DriverChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hola, ya voy en camino. ¿Alguna indicación especial?',
      sender: 'driver',
      timestamp: new Date(Date.now() - 180000)
    },
    {
      id: '2',
      text: 'Hola, estoy en el edificio azul',
      sender: 'passenger',
      timestamp: new Date(Date.now() - 120000)
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuickMessage = (messageText: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'driver',
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);

    // Simulate passenger response after a delay
    setTimeout(() => {
      const responses = [
        'Perfecto, gracias por avisar.',
        'Entendido, aquí te espero.',
        'Ok, te veo en un momento.',
        'De acuerdo.'
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const passengerMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'passenger',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, passengerMessage]);
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center">
      <div className="bg-white w-full md:max-w-md md:rounded-lg h-[80vh] md:h-[600px] flex flex-col rounded-t-3xl md:rounded-3xl overflow-hidden animate-in slide-in-from-bottom md:slide-in-from-bottom-0">
        {/* Header */}
        <div className="bg-green-600 text-white p-4 flex items-center gap-3">
          <Avatar className="w-10 h-10 bg-green-700">
            <AvatarFallback className="bg-green-700 text-white">
              {passengerName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-white">{passengerName}</h3>
            <p className="text-green-100 text-sm">Pasajero</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-white hover:bg-green-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Info Banner */}
        <div className="bg-green-50 border-b border-green-200 p-3">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-green-900">
              Usa los mensajes rápidos para comunicarte eficientemente con tus pasajeros
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'driver' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  message.sender === 'driver'
                    ? 'bg-green-600 text-white rounded-br-sm'
                    : 'bg-white text-gray-900 rounded-bl-sm shadow-sm'
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === 'driver' ? 'text-green-100' : 'text-gray-500'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Messages */}
        <div className="bg-white border-t p-4">
          <p className="text-xs text-gray-500 mb-3 font-medium">
            Mensajes rápidos:
          </p>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_DRIVER_MESSAGES.map((msg) => (
              <Button
                key={msg.id}
                variant="outline"
                size="sm"
                onClick={() => handleQuickMessage(msg.text)}
                className="justify-start text-left h-auto py-2 px-3 hover:bg-green-50 hover:border-green-300"
              >
                <span className="mr-2">{msg.icon}</span>
                <span className="text-xs">{msg.text}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
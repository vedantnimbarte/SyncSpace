
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Sparkles, User, Bot, Loader2, Mic, Paperclip, Image as ImageIcon, BarChart2, Zap } from 'lucide-react';
import { generateAIResponse } from '../services/geminiService';
import { ChatMessage, AppView, QuickAction } from '../types';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  currentContext: AppView;
  initialMessage?: string;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose, currentContext, initialMessage }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hasProcessedInitial = useRef(false);

  const quickActions: QuickAction[] = [
    { id: 'image', label: 'Create image', icon: <ImageIcon size={14} />, prompt: 'Create an image of ' },
    { id: 'data', label: 'Analyze data', icon: <BarChart2 size={14} />, prompt: 'Analyze this data: ' },
    { id: 'plan', label: 'Make a plan', icon: <Zap size={14} />, prompt: 'Create a project plan for ' },
    { id: 'summary', label: 'Summarize', icon: <Bot size={14} />, prompt: 'Summarize the following text: ' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && initialMessage && !hasProcessedInitial.current) {
        hasProcessedInitial.current = true;
        handleSend(initialMessage);
    }
    if (!isOpen) {
        hasProcessedInitial.current = false;
    }
  }, [isOpen, initialMessage]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
  };

  const handleSend = async (messageText: string = input) => {
    if (!messageText.trim()) return;

    const textToSend = messageText; 
    if (input === textToSend) {
        setInput('');
        if (inputRef.current) inputRef.current.style.height = 'auto';
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    const responseText = await generateAIResponse(
      textToSend,
      messages.map(m => ({ role: m.role, text: m.text })),
      currentContext
    );

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div 
      className={`fixed right-0 top-0 h-full w-[450px] bg-white/80 backdrop-blur-3xl shadow-[-10px_0_40px_rgba(0,0,0,0.03)] border-l border-white/50 flex flex-col z-50 transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Soft Gradient Background Mesh */}
      <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-b from-brand-50/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-t from-purple-50/30 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="p-6 pt-8 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
            <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center shadow-lg shadow-brand-200">
                    <Sparkles size={20} className="text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
            </div>
            <div>
                <h3 className="font-serif font-semibold text-xl text-gray-800 tracking-tight">SyncSpace AI</h3>
                <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></span>
                    Online
                </p>
            </div>
        </div>
        <button 
            onClick={onClose} 
            className="p-2 hover:bg-white/50 rounded-full text-gray-400 hover:text-gray-600 transition-all hover:rotate-90 duration-300"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages / Zero State */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 relative z-10 custom-scrollbar">
        {messages.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-white to-brand-50 shadow-inner flex items-center justify-center mb-6 relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-200 to-purple-200 opacity-20 blur-xl animate-pulse"></div>
                    <Bot size={48} className="text-brand-300" strokeWidth={1.5} />
                </div>
                <h2 className="font-serif text-3xl font-medium text-gray-800 mb-2">
                    Hi Matt,
                </h2>
                <h3 className="text-lg text-gray-500 mb-8 font-light">
                    Welcome back! How can I help?
                </h3>
                
                <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                    {quickActions.map(action => (
                        <button
                            key={action.id}
                            onClick={() => { 
                                setInput(action.prompt); 
                                if(inputRef.current) inputRef.current.focus(); 
                            }}
                            className="flex items-center gap-2 p-3 bg-white/60 hover:bg-white border border-white/60 hover:border-brand-100 rounded-2xl shadow-sm hover:shadow-md transition-all text-sm text-gray-600 hover:text-brand-600 group text-left"
                        >
                            <span className="p-1.5 bg-gray-50 group-hover:bg-brand-50 rounded-lg transition-colors">
                                {action.icon}
                            </span>
                            {action.label}
                        </button>
                    ))}
                </div>
            </div>
        ) : (
            <div className="space-y-6 pb-4">
                {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                        msg.role === 'user' 
                        ? 'bg-gray-200 overflow-hidden' 
                        : 'bg-white text-brand-500 border border-brand-100'
                    }`}>
                        {msg.role === 'user' ? (
                            <img src="https://picsum.photos/32/32" alt="User" className="w-full h-full object-cover" />
                        ) : <Bot size={16} />}
                    </div>
                    
                    <div className={`flex flex-col gap-1 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                            ? 'bg-gradient-to-br from-brand-600 to-brand-500 text-white rounded-tr-sm' 
                            : 'bg-white/70 backdrop-blur-md border border-white/60 text-gray-800 rounded-tl-sm'
                        }`}>
                        {msg.text}
                        </div>
                        <span className="text-[10px] text-gray-400 opacity-60 px-1">
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                </div>
                ))}
                {isLoading && (
                <div className="flex gap-4 animate-pulse">
                    <div className="w-8 h-8 rounded-full bg-white text-brand-500 border border-brand-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Bot size={16} />
                    </div>
                    <div className="bg-white/70 backdrop-blur-md border border-white/60 px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
                         <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                         <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                         <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
                )}
                <div ref={messagesEndRef} />
            </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 relative z-10">
        <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-200 to-purple-200 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-white border border-white/60 rounded-3xl shadow-lg flex flex-col overflow-hidden focus-within:ring-4 focus-within:ring-brand-500/10 transition-all">
                <textarea
                    id="ai-input"
                    ref={inputRef}
                    value={input}
                    onChange={handleInput}
                    onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                    }
                    }}
                    placeholder="Ask anything..."
                    className="w-full px-5 pt-4 pb-2 bg-transparent outline-none resize-none text-sm text-gray-700 placeholder-gray-400 font-medium custom-scrollbar"
                    rows={1}
                    style={{ minHeight: '52px', maxHeight: '150px' }}
                />
                
                <div className="flex justify-between items-center px-3 pb-3 pt-1">
                    <div className="flex gap-1">
                        <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-600 transition-colors" title="Attach file">
                            <Paperclip size={18} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-gray-600 transition-colors" title="Voice input">
                            <Mic size={18} />
                        </button>
                    </div>
                    <button 
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isLoading}
                        className="p-2 bg-brand-600 text-white rounded-xl hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-brand-200 hover:scale-105 active:scale-95 flex items-center justify-center w-10 h-10"
                    >
                        {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    </button>
                </div>
            </div>
        </div>
        <div className="text-center mt-3">
             <p className="text-[10px] text-gray-400">Powered by Gemini 2.5 • Private & Secure</p>
        </div>
      </div>
    </div>
  );
};

export default AIChat;

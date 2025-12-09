
import React, { useState } from 'react';
import { 
  Hash, 
  MessageCircle, 
  MoreHorizontal, 
  Phone, 
  Video, 
  Info, 
  Search, 
  Smile, 
  Paperclip, 
  Send,
  Plus,
  ChevronDown,
  AtSign,
  Image as ImageIcon,
  FileText
} from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  type: 'public' | 'private' | 'dm';
  unreadCount?: number;
  status?: 'online' | 'offline' | 'busy';
  members?: number;
}

interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  reactions?: { emoji: string; count: number }[];
  attachments?: { name: string; type: string; url: string }[];
}

const Chat: React.FC = () => {
  const [activeChannelId, setActiveChannelId] = useState('general');
  const [messageInput, setMessageInput] = useState('');

  const channels: Channel[] = [
    { id: 'general', name: 'general', type: 'public', members: 24 },
    { id: 'announcements', name: 'announcements', type: 'public', members: 42, unreadCount: 3 },
    { id: 'marketing', name: 'marketing', type: 'public', members: 12 },
    { id: 'random', name: 'random', type: 'public', members: 18 },
    { id: 'project-alpha', name: 'project-alpha', type: 'private', members: 5 },
  ];

  const dms: Channel[] = [
    { id: 'sarah', name: 'Sarah Miller', type: 'dm', status: 'online' },
    { id: 'raj', name: 'Raj Patel', type: 'dm', status: 'busy' },
    { id: 'alex', name: 'Alex Chen', type: 'dm', status: 'offline' },
  ];

  const messages: ChatMessage[] = [
    {
      id: '1',
      userId: 'sarah',
      userName: 'Sarah Miller',
      userAvatar: 'https://i.pravatar.cc/150?u=sarah',
      content: 'Has anyone seen the updated Q2 roadmap specs?',
      timestamp: '10:32 AM',
      reactions: [{ emoji: '👀', count: 2 }]
    },
    {
      id: '2',
      userId: 'raj',
      userName: 'Raj Patel',
      userAvatar: 'https://i.pravatar.cc/150?u=raj',
      content: 'I think Alexandra posted them in #product-docs yesterday. Let me check.',
      timestamp: '10:34 AM'
    },
    {
      id: '3',
      userId: 'me',
      userName: 'Alexandra T.',
      userAvatar: 'https://picsum.photos/32/32',
      content: 'Yes, they are in the shared drive under "Q2 Planning". Here is the direct link:',
      timestamp: '10:35 AM',
      attachments: [{ name: 'Q2_Roadmap_Final.pdf', type: 'pdf', url: '#' }]
    },
    {
      id: '4',
      userId: 'sarah',
      userName: 'Sarah Miller',
      userAvatar: 'https://i.pravatar.cc/150?u=sarah',
      content: 'Awesome, thanks! Taking a look now.',
      timestamp: '10:36 AM',
      reactions: [{ emoji: '👍', count: 1 }, { emoji: '🔥', count: 1 }]
    }
  ];

  const activeChannel = [...channels, ...dms].find(c => c.id === activeChannelId) || channels[0];

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 150)}px`;
  };

  return (
    <div className="h-full flex bg-white/50 backdrop-blur-sm rounded-none">
      
      {/* Left Sidebar - Channels & DMs */}
      <div className="w-64 bg-gray-50/80 border-r border-gray-200 flex flex-col pt-4">
        {/* Header */}
        <div className="px-4 mb-4 flex justify-between items-center">
            <h2 className="font-bold text-gray-800 text-lg">Chat</h2>
            <button className="p-2 bg-white rounded-lg shadow-sm text-gray-500 hover:text-brand-600 hover:shadow-md transition-all">
                <Plus size={16} />
            </button>
        </div>

        {/* Channel Search */}
        <div className="px-4 mb-6">
            <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Jump to..." 
                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 transition-all placeholder-gray-400"
                />
            </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-6">
            {/* Public Channels */}
            <div>
                <button className="flex items-center gap-1 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2 hover:text-gray-600">
                    <ChevronDown size={12} /> Channels
                </button>
                <div className="space-y-0.5">
                    {channels.map(channel => (
                        <button
                            key={channel.id}
                            onClick={() => setActiveChannelId(channel.id)}
                            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-all group ${
                                activeChannelId === channel.id 
                                ? 'bg-white shadow-sm text-brand-700 font-medium' 
                                : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                {channel.type === 'private' ? <MessageCircle size={14} className="opacity-70" /> : <Hash size={14} className="opacity-70" />}
                                <span className="truncate">{channel.name}</span>
                            </div>
                            {channel.unreadCount && (
                                <span className="px-1.5 py-0.5 bg-brand-500 text-white text-[10px] font-bold rounded-full min-w-[1.25rem] text-center">
                                    {channel.unreadCount}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Direct Messages */}
            <div>
                 <button className="flex items-center gap-1 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2 hover:text-gray-600">
                    <ChevronDown size={12} /> Direct Messages
                </button>
                <div className="space-y-0.5">
                    {dms.map(dm => (
                        <button
                            key={dm.id}
                            onClick={() => setActiveChannelId(dm.id)}
                            className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm transition-all ${
                                activeChannelId === dm.id 
                                ? 'bg-white shadow-sm text-brand-700 font-medium' 
                                : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
                            }`}
                        >
                            <div className="relative">
                                <div className="w-5 h-5 rounded bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-[10px] font-bold text-indigo-700">
                                    {dm.name.charAt(0)}
                                </div>
                                <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white ${
                                    dm.status === 'online' ? 'bg-green-500' : 
                                    dm.status === 'busy' ? 'bg-red-500' : 'bg-gray-300'
                                }`}></div>
                            </div>
                            <span className="truncate">{dm.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        
        {/* Chat Header */}
        <div className="h-16 px-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
            <div className="flex items-center gap-3">
                <div className="text-gray-800 font-bold text-lg flex items-center gap-2">
                    {activeChannel.type === 'dm' ? <AtSign size={20} className="text-gray-400" /> : <Hash size={20} className="text-gray-400" />}
                    {activeChannel.name}
                </div>
                {activeChannel.type !== 'dm' && (
                    <>
                        <div className="h-4 w-px bg-gray-200 mx-1"></div>
                        <p className="text-sm text-gray-500 truncate max-w-md">Discussions about Q2 roadmap and assets</p>
                    </>
                )}
            </div>
            <div className="flex items-center gap-4 text-gray-400">
                {activeChannel.members && (
                    <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 bg-gray-50 rounded-full">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        {activeChannel.members}
                    </div>
                )}
                <div className="flex items-center gap-2 border-l border-gray-100 pl-4">
                     <button className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-brand-600 transition-colors">
                        <Phone size={18} />
                    </button>
                    <button className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-brand-600 transition-colors">
                        <Video size={18} />
                    </button>
                    <button className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-brand-600 transition-colors">
                        <Info size={18} />
                    </button>
                </div>
            </div>
        </div>

        {/* Message History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Date Separator */}
            <div className="flex items-center justify-center relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100"></div>
                </div>
                <div className="relative bg-white px-4 py-1 rounded-full border border-gray-100 shadow-sm text-xs font-medium text-gray-400">
                    Today, Dec 15
                </div>
            </div>

            {messages.map((msg) => (
                <div key={msg.id} className="group flex gap-4 hover:bg-gray-50/50 p-2 -mx-2 rounded-xl transition-colors">
                    <img src={msg.userAvatar} alt={msg.userName} className="w-10 h-10 rounded-lg shadow-sm flex-shrink-0 object-cover" />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-bold text-gray-900">{msg.userName}</span>
                            <span className="text-xs text-gray-400">{msg.timestamp}</span>
                        </div>
                        <div className="text-gray-700 leading-relaxed text-sm">
                            {msg.content}
                        </div>
                        
                        {msg.attachments && (
                            <div className="flex gap-2 mt-3">
                                {msg.attachments.map((att, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl max-w-xs hover:border-brand-300 hover:shadow-sm transition-all cursor-pointer">
                                        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-500">
                                            <FileText size={20} />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-sm font-medium text-gray-800 truncate">{att.name}</p>
                                            <p className="text-xs text-gray-400 uppercase">{att.type}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {msg.reactions && (
                            <div className="flex gap-2 mt-2">
                                {msg.reactions.map((rxn, i) => (
                                    <button key={i} className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 hover:bg-white border border-transparent hover:border-gray-200 rounded-full text-xs transition-all">
                                        <span>{rxn.emoji}</span>
                                        <span className="font-medium text-gray-600">{rxn.count}</span>
                                    </button>
                                ))}
                                <button className="opacity-0 group-hover:opacity-100 p-0.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-400 transition-all">
                                    <Plus size={12} />
                                </button>
                            </div>
                        )}
                    </div>
                    
                    {/* Message Actions */}
                    <div className="opacity-0 group-hover:opacity-100 flex items-start gap-1 p-1 bg-white border border-gray-100 rounded-lg shadow-sm h-fit -mt-2">
                        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"><Smile size={14} /></button>
                        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"><MessageCircle size={14} /></button>
                        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"><MoreHorizontal size={14} /></button>
                    </div>
                </div>
            ))}
        </div>

        {/* Input Area */}
        <div className="p-6 pt-2 bg-white">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-400 transition-all overflow-hidden">
                <div className="flex items-center gap-1 p-2 border-b border-gray-100 bg-gray-50/50">
                    <button className="p-2 hover:bg-white rounded-lg text-gray-500 hover:text-gray-700 transition-colors"><p className="font-bold font-serif text-sm">B</p></button>
                    <button className="p-2 hover:bg-white rounded-lg text-gray-500 hover:text-gray-700 transition-colors"><p className="italic font-serif text-sm">I</p></button>
                    <button className="p-2 hover:bg-white rounded-lg text-gray-500 hover:text-gray-700 transition-colors"><p className="line-through font-serif text-sm">S</p></button>
                    <div className="h-4 w-px bg-gray-200 mx-1"></div>
                    <button className="p-2 hover:bg-white rounded-lg text-gray-500 hover:text-gray-700 transition-colors flex gap-1 items-center text-xs font-medium"><Plus size={14} /> Link</button>
                </div>
                <textarea
                    value={messageInput}
                    onChange={handleInput}
                    placeholder={`Message #${activeChannel.name}`}
                    className="w-full p-4 bg-transparent outline-none text-sm min-h-[80px] resize-none text-gray-800 placeholder-gray-400 custom-scrollbar"
                    rows={1}
                />
                <div className="flex justify-between items-center p-2 pl-4 bg-white border-t border-gray-50">
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                            <Plus size={18} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                            <ImageIcon size={18} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                            <Smile size={18} />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors">
                            <AtSign size={18} />
                        </button>
                    </div>
                    <button 
                        className={`p-2 rounded-xl flex items-center justify-center transition-all ${
                            messageInput.trim() 
                            ? 'bg-brand-600 text-white shadow-md hover:bg-brand-700' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!messageInput.trim()}
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
            <div className="text-center mt-2">
                <p className="text-[10px] text-gray-400">
                    <strong>Tip:</strong> Type <span className="font-mono bg-gray-100 px-1 rounded">/</span> for quick commands
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

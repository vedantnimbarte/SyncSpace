
import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  MonitorUp, 
  MessageSquare, 
  Users, 
  MoreHorizontal,
  ChevronDown,
  Settings,
  Smile,
  Hand,
  X,
  LayoutGrid
} from 'lucide-react';

const Calls: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);

  const participants = [
    { id: '1', name: 'Sarah Miller', role: 'Product Manager', avatar: 'https://i.pravatar.cc/150?u=sarah', isSpeaking: true },
    { id: '2', name: 'Raj Patel', role: 'Engineering Lead', avatar: 'https://i.pravatar.cc/150?u=raj', isSpeaking: false },
    { id: '3', name: 'Alex Chen', role: 'Product Designer', avatar: 'https://i.pravatar.cc/150?u=alex', isSpeaking: false },
    { id: '4', name: 'You', role: 'Team Lead', avatar: 'https://picsum.photos/32/32', isSpeaking: false, isLocal: true },
  ];

  return (
    <div className="h-full flex bg-gradient-to-br from-brand-50/50 via-white to-brand-100/30 text-slate-800 overflow-hidden relative font-sans">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-200/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Main Stage */}
      <div className={`flex-1 flex flex-col relative transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-10 ${isSidePanelOpen ? 'mr-[340px]' : 'mr-0'}`}>
        
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-20">
             <div className="flex items-start gap-4">
                <div className="p-3 bg-white/60 backdrop-blur-xl rounded-2xl shadow-sm border border-white/60">
                    <LayoutGrid size={20} className="text-brand-600" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-slate-900 flex items-center gap-3 tracking-tight">
                    Q2 Roadmap Sync 
                    <span className="px-2.5 py-0.5 bg-brand-100/50 border border-brand-200/50 text-brand-700 rounded-full text-xs font-semibold">00:12:45</span>
                    </h1>
                    <p className="text-sm text-slate-500 mt-0.5 font-medium">Weekly alignment • 4 Participants</p>
                </div>
             </div>
             <div className="flex gap-2">
                 <button className="p-2.5 bg-white/60 hover:bg-white/80 backdrop-blur-xl rounded-xl transition-all shadow-sm border border-white/60 text-slate-600 hover:text-brand-600">
                    <Settings size={20} />
                 </button>
             </div>
        </div>

        {/* Video Grid */}
        <div className="flex-1 p-8 pt-24 flex gap-6 overflow-hidden">
             {/* Main Speaker */}
             <div className="flex-1 relative bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-black/5 group transition-all duration-500">
                <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80" 
                    alt="Main Speaker" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                
                {/* Speaker Label */}
                <div className="absolute bottom-8 left-8 flex items-center gap-4">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full border-2 border-white p-0.5 bg-white/20 backdrop-blur-md shadow-lg">
                            <img src={participants[0].avatar} className="w-full h-full rounded-full object-cover" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="text-white drop-shadow-md">
                        <p className="font-bold text-lg leading-none tracking-wide">Sarah Miller</p>
                        <p className="text-xs text-green-300 font-bold mt-1 flex items-center gap-1.5 uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                            Speaking
                        </p>
                    </div>
                </div>

                {/* Reaction Floating */}
                <div className="absolute bottom-24 right-10 animate-slide-up opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 backdrop-blur rounded-2xl p-3 shadow-lg transform rotate-6">
                        <span className="text-4xl">👍</span>
                    </div>
                </div>
             </div>

             {/* Side Strip */}
             <div className="w-72 flex flex-col gap-4 overflow-y-auto no-scrollbar py-1">
                {participants.slice(1).map(p => (
                    <div key={p.id} className="relative aspect-[4/3] bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg ring-1 ring-black/5 group transition-all duration-300">
                         {p.isLocal ? (
                             <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" className="w-full h-full object-cover transform scale-x-[-1]" />
                         ) : (
                             <img src={p.avatar} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                         )}
                         
                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40"></div>

                         <div className="absolute bottom-4 left-4 flex items-center gap-2 max-w-full pr-4">
                             <div className="bg-white/30 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm">
                                <span className="text-white text-xs font-semibold truncate shadow-black drop-shadow-sm">{p.name} {p.isLocal && '(You)'}</span>
                                {!p.isLocal && <MicOff size={10} className="text-red-200" />}
                             </div>
                         </div>
                    </div>
                ))}
             </div>
        </div>

        {/* Controls Bar - Frosted Glass */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white/70 backdrop-blur-2xl border border-white/60 p-2.5 rounded-[24px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] z-20 hover:scale-[1.02] transition-transform duration-300">
             <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-sm ${
                    isMuted 
                    ? 'bg-red-50 text-red-600 ring-1 ring-red-100' 
                    : 'bg-white text-slate-700 hover:bg-slate-50 ring-1 ring-slate-100'
                }`}
             >
                {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
             </button>
             
             <button 
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-sm ${
                    isVideoOff 
                    ? 'bg-red-50 text-red-600 ring-1 ring-red-100' 
                    : 'bg-white text-slate-700 hover:bg-slate-50 ring-1 ring-slate-100'
                }`}
             >
                {isVideoOff ? <VideoOff size={22} /> : <Video size={22} />}
             </button>

             <button className="p-4 bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-600 rounded-2xl transition-all duration-300 hover:scale-105 shadow-sm ring-1 ring-slate-100">
                <MonitorUp size={22} />
             </button>
             
             <button className="p-4 bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-600 rounded-2xl transition-all duration-300 hover:scale-105 shadow-sm ring-1 ring-slate-100">
                <Smile size={22} />
             </button>
             
             <button className="p-4 bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-600 rounded-2xl transition-all duration-300 hover:scale-105 shadow-sm ring-1 ring-slate-100">
                <Hand size={22} />
             </button>
             
             <div className="w-px h-10 bg-slate-200 mx-2"></div>
             
             <button className="p-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl shadow-lg shadow-rose-200 transition-all duration-300 hover:scale-105 px-8 flex items-center gap-2.5 font-semibold tracking-wide">
                <PhoneOff size={22} />
                <span>Leave</span>
             </button>
        </div>

        {/* Side Panel Toggle */}
        <button 
            onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}
            className={`absolute right-8 bottom-10 p-3.5 bg-white/70 backdrop-blur-xl border border-white/60 rounded-2xl text-slate-600 hover:text-brand-600 hover:bg-white shadow-lg transition-all z-20 ${isSidePanelOpen ? 'bg-white text-brand-600 ring-2 ring-brand-100' : ''}`}
        >
            <Users size={22} />
        </button>

      </div>

      {/* Right Sidebar Panel - Light & Airy */}
      <div 
        className={`absolute top-4 bottom-4 right-4 w-[320px] bg-white/80 backdrop-blur-2xl border border-white/60 rounded-[32px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] z-20 ${
            isSidePanelOpen ? 'translate-x-0 opacity-100' : 'translate-x-[110%] opacity-0'
        }`}
      >
          {/* Panel Header */}
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/40 rounded-t-[32px]">
             <div className="flex items-center gap-2">
                <Users size={18} className="text-brand-600" />
                <h2 className="font-bold text-slate-800 text-sm tracking-wide">Participants <span className="text-slate-400 font-normal ml-1">(4)</span></h2>
             </div>
             <button onClick={() => setIsSidePanelOpen(false)} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                 <X size={18} />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
              {participants.map(p => (
                  <div key={p.id} className="flex items-center gap-3.5 group">
                      <div className="relative">
                          <img src={p.avatar} className="w-11 h-11 rounded-2xl bg-slate-100 object-cover shadow-sm ring-1 ring-slate-100" />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                              {p.isSpeaking ? (
                                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                              ) : (
                                  <div className="w-2.5 h-2.5 bg-slate-300 rounded-full"></div>
                              )}
                          </div>
                      </div>
                      <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-800 truncate">{p.name} {p.isLocal && <span className="text-slate-400 font-normal">(You)</span>}</p>
                          <p className="text-xs text-slate-500 truncate mt-0.5">{p.role}</p>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600">
                              <MicOff size={14} />
                          </button>
                          <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600">
                              <MoreHorizontal size={14} />
                          </button>
                      </div>
                  </div>
              ))}
              
              <div className="pt-6 border-t border-slate-100">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Meeting Resources</h3>
                  <div className="space-y-3">
                      <div className="p-3 bg-white border border-slate-100 rounded-2xl hover:border-brand-200 hover:shadow-md transition-all cursor-pointer flex gap-3 items-center group">
                          <div className="p-2.5 bg-blue-50 text-brand-600 rounded-xl group-hover:bg-brand-500 group-hover:text-white transition-colors">
                              <MonitorUp size={18} />
                          </div>
                          <div>
                              <p className="font-semibold text-slate-700 text-sm group-hover:text-brand-700">Q2_Roadmap.pdf</p>
                              <p className="text-xs text-slate-400 mt-0.5">Shared by Sarah</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          {/* Chat Tab (Bottom) */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 rounded-b-[32px]">
               <div className="flex gap-2 relative">
                   <input 
                    type="text" 
                    placeholder="Send a message..." 
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300 text-slate-700 placeholder-slate-400 shadow-sm transition-all"
                   />
                   <button className="p-3 bg-brand-600 rounded-xl text-white hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200">
                       <MessageSquare size={18} />
                   </button>
               </div>
          </div>
      </div>
    </div>
  );
};

export default Calls;

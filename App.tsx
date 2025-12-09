
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Docs from './components/apps/Docs';
import Sheets from './components/apps/Sheets';
import Canvas from './components/apps/Canvas';
import Presentations from './components/apps/Presentations';
import Workflows from './components/apps/Workflows';
import Kanban from './components/apps/Kanban';
import Drive from './components/apps/Drive';
import Chat from './components/apps/Chat';
import Calls from './components/apps/Calls';
import Email from './components/apps/Email';
import ViewAll from './components/ViewAll';
import Settings from './components/Settings';
import AIChat from './components/AIChat';
import { AppView } from './types';
import { Sparkles, Bell, Search, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [initialAIMessage, setInitialAIMessage] = useState<string>('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleAskAI = (message: string) => {
    setInitialAIMessage(message);
    setIsAIChatOpen(true);
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <Dashboard onOpenApp={setCurrentView} onAskAI={handleAskAI} />;
      case AppView.DOCS: return <Docs />;
      case AppView.SHEETS: return <Sheets />;
      case AppView.CANVAS: return <Canvas />;
      case AppView.PRESENTATIONS: return <Presentations />;
      case AppView.WORKFLOWS: return <Workflows />;
      case AppView.PROJECTS: return <Kanban />;
      case AppView.DRIVE: return <Drive />;
      case AppView.CHAT: return <Chat />;
      case AppView.CALLS: return <Calls />;
      case AppView.EMAIL: return <Email />;
      case AppView.VIEW_ALL: return <ViewAll onOpenApp={setCurrentView} />;
      case AppView.SETTINGS: return <Settings />;
      default: return <Dashboard onOpenApp={setCurrentView} onAskAI={handleAskAI} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-[#E0E7FF] via-[#F0F5FF] to-[#E6F0F9] overflow-hidden text-slate-900 font-sans p-3 gap-3">
      {/* Left Sidebar */}
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Card Container with Liquid Glass Effect */}
      <div className={`flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) bg-white/80 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white/50 ring-1 ring-white/50`} 
           style={{ marginRight: isAIChatOpen ? '450px' : '0' }}> 
        
        {/* Top Navigation Bar */}
        <header className="h-16 bg-white/40 backdrop-blur-md border-b border-white/20 flex items-center justify-between px-8 flex-shrink-0 z-20 rounded-t-3xl">
          <div className="flex items-center gap-4 flex-1">
             {/* Contextual Title */}
             <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-500">
                    {currentView === AppView.DASHBOARD ? 'Workspace' : 
                     currentView === AppView.VIEW_ALL ? 'Library' :
                     currentView === AppView.SETTINGS ? 'Account' :
                     currentView.charAt(0) + currentView.slice(1).toLowerCase()}
                </span>
                {currentView !== AppView.DASHBOARD && currentView !== AppView.VIEW_ALL && currentView !== AppView.SETTINGS && (
                    <>
                        <span className="text-gray-300">/</span>
                        <span className="text-sm font-bold text-gray-900">Untitled Project</span>
                    </>
                )}
             </div>
             
             {/* Search Bar */}
             {currentView !== AppView.DASHBOARD && currentView !== AppView.VIEW_ALL && currentView !== AppView.SETTINGS && (
                <div className="ml-8 max-w-md w-full relative hidden md:block group">
                    <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search files, people, or data..." 
                        className="w-full bg-white/50 hover:bg-white/80 border border-transparent focus:border-brand-200/50 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all placeholder-gray-400"
                    />
                </div>
             )}
          </div>

          <div className="flex items-center gap-4">
             <button className="p-2 text-gray-400 hover:bg-white/60 rounded-full relative transition-colors">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
             </button>
             
             <div className="h-6 w-px bg-gray-200/50 mx-1"></div>
             
             <button 
                onClick={() => setIsAIChatOpen(!isAIChatOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
                    isAIChatOpen 
                    ? 'bg-brand-100 text-brand-700 shadow-inner' 
                    : 'bg-white/50 border border-white/60 text-gray-700 hover:bg-white hover:text-brand-600 hover:shadow-lg hover:shadow-brand-500/10'
                }`}
             >
                <Sparkles size={16} className={isAIChatOpen ? 'fill-brand-700' : 'text-brand-500'} />
                <span>Ask AI</span>
             </button>
          </div>
        </header>

        {/* Dynamic App Content */}
        <main className="flex-1 overflow-hidden relative rounded-b-3xl">
            {renderContent()}
        </main>
      </div>

      {/* AI Chat Drawer */}
      <AIChat 
        isOpen={isAIChatOpen} 
        onClose={() => { setIsAIChatOpen(false); setInitialAIMessage(''); }}
        currentContext={currentView}
        initialMessage={initialAIMessage}
      />
    </div>
  );
};

export default App;

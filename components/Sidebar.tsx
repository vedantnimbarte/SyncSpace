
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutGrid, 
  FileText, 
  Table2, 
  Presentation, 
  Workflow, 
  PenTool, 
  Settings,
  Plus,
  ChevronRight,
  ChevronDown,
  Folder,
  Hash,
  KanbanSquare,
  HardDrive,
  ChevronsUpDown,
  Check,
  MessageCircle,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Video,
  LogOut,
  Moon,
  CreditCard,
  BadgeCheck,
  Sparkles,
  User
} from 'lucide-react';
import { AppView, FileSystemItem, SidebarProps } from '../types';

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, isCollapsed, onToggle }) => {
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  
  // Close popovers when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mock File System Data
  const [fileSystem, setFileSystem] = useState<FileSystemItem[]>([
    {
      id: 'team-space',
      name: 'Team Space',
      type: 'folder',
      isOpen: true,
      children: [
        {
          id: 'marketing',
          name: 'Marketing',
          type: 'folder',
          isOpen: true,
          children: [
            { id: 'q2-campaign', name: 'Q2 Campaign Plan', type: 'file', appType: AppView.DOCS },
            { id: 'assets', name: 'Brand Assets', type: 'file', appType: AppView.DRIVE },
          ]
        },
        {
          id: 'product',
          name: 'Product',
          type: 'folder',
          isOpen: false,
          children: [
            { id: 'roadmap', name: '2026 Roadmap', type: 'file', appType: AppView.CANVAS },
            { id: 'specs', name: 'Feature Specs', type: 'file', appType: AppView.DOCS },
            { id: 'tasks', name: 'Sprint Board', type: 'file', appType: AppView.PROJECTS },
          ]
        },
        { id: 'budget', name: 'Q1 Budget', type: 'file', appType: AppView.SHEETS },
      ]
    },
    {
      id: 'personal',
      name: 'Personal',
      type: 'folder',
      isOpen: false,
      children: [
        { id: 'drafts', name: 'Drafts', type: 'folder', children: [] },
        { id: 'ideas', name: 'Brainstorming', type: 'file', appType: AppView.CANVAS },
      ]
    }
  ]);

  const toggleFolder = (id: string) => {
    const toggleNode = (nodes: FileSystemItem[]): FileSystemItem[] => {
      return nodes.map(node => {
        if (node.id === id) {
          return { ...node, isOpen: !node.isOpen };
        }
        if (node.children) {
          return { ...node, children: toggleNode(node.children) };
        }
        return node;
      });
    };
    setFileSystem(toggleNode(fileSystem));
  };

  const getIconForApp = (appType?: AppView) => {
    switch (appType) {
      case AppView.DOCS: return <FileText size={16} className="text-blue-500" />;
      case AppView.SHEETS: return <Table2 size={16} className="text-green-500" />;
      case AppView.CANVAS: return <PenTool size={16} className="text-purple-500" />;
      case AppView.PRESENTATIONS: return <Presentation size={16} className="text-orange-500" />;
      case AppView.WORKFLOWS: return <Workflow size={16} className="text-red-500" />;
      case AppView.PROJECTS: return <KanbanSquare size={16} className="text-pink-500" />;
      case AppView.DRIVE: return <HardDrive size={16} className="text-gray-500" />;
      case AppView.CHAT: return <MessageCircle size={16} className="text-indigo-500" />;
      case AppView.CALLS: return <Video size={16} className="text-rose-500" />;
      default: return <FileText size={16} className="text-gray-400" />;
    }
  };

  const renderTree = (nodes: FileSystemItem[], level: number = 0) => {
    if (isCollapsed) return null; // Hide tree in collapsed mode for cleanliness

    return nodes.map(node => (
      <div key={node.id}>
        <div 
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all cursor-pointer select-none group mb-0.5 ${
            currentView === node.appType 
            ? 'bg-white shadow-sm text-brand-700 font-medium' 
            : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
          }`}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.id);
            } else if (node.appType) {
              onChangeView(node.appType);
            }
          }}
        >
          {node.type === 'folder' && (
            <span className="text-gray-400 group-hover:text-gray-600">
              {node.isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </span>
          )}
          {node.type === 'folder' ? (
            <Folder size={16} className="text-blue-300 fill-blue-50" />
          ) : (
            getIconForApp(node.appType)
          )}
          <span className="truncate">{node.name}</span>
        </div>
        {node.type === 'folder' && node.isOpen && node.children && (
          <div>
            {renderTree(node.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div 
      className={`${isCollapsed ? 'w-20' : 'w-64'} h-full flex flex-col flex-shrink-0 pt-4 pb-4 transition-all duration-300 ease-in-out relative z-30`}
    >
      
      {/* Workspace Switcher */}
      <div className={`mb-6 relative ${isCollapsed ? 'px-2' : 'pl-4 pr-4'}`}>
        <button 
            onClick={() => !isCollapsed && setIsWorkspaceOpen(!isWorkspaceOpen)}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-2 hover:bg-white/50 rounded-xl transition-colors text-left group`}
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-lg shadow-gray-200 text-white font-bold text-sm ring-2 ring-white">
                    A
                </div>
                {!isCollapsed && (
                  <div className="animate-in fade-in duration-300">
                      <h2 className="text-sm font-bold text-gray-800 leading-tight">Acme Corp</h2>
                      <p className="text-xs text-gray-500">Free Plan</p>
                  </div>
                )}
            </div>
            {!isCollapsed && <ChevronsUpDown size={14} className="text-gray-400 group-hover:text-gray-600" />}
        </button>

        {isWorkspaceOpen && !isCollapsed && (
            <div className="absolute top-full left-4 right-4 mt-2 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/50 p-2 z-50 animate-in fade-in zoom-in-95 duration-100 ring-1 ring-black/5">
                <div className="text-xs font-semibold text-gray-400 px-2 py-1 mb-1">Switch Workspace</div>
                <button className="w-full flex items-center justify-between px-2 py-2 rounded-lg bg-gray-50 text-gray-900 text-sm">
                    <span className="font-medium">Acme Corp</span>
                    <Check size={14} className="text-brand-600" />
                </button>
                <button className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-50 text-gray-600 text-sm">
                    <span>Personal</span>
                </button>
                <div className="h-px bg-gray-100 my-2"></div>
                <button className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-50 text-gray-600 text-sm">
                    <Plus size={14} />
                    <span>Create Workspace</span>
                </button>
            </div>
        )}
      </div>

      {/* Navigation */}
      <nav className={`flex-1 overflow-y-auto custom-scrollbar ${isCollapsed ? 'px-2' : 'pl-4 pr-4'}`}>
        {/* Main Links */}
        <div className="mb-6 space-y-1">
           <button
              onClick={() => onChangeView(AppView.DASHBOARD)}
              title={isCollapsed ? "Home" : ""}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 rounded-xl text-sm transition-all group ${
                currentView === AppView.DASHBOARD
                  ? 'bg-white shadow-sm text-brand-700 font-medium'
                  : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
              }`}
            >
              <LayoutGrid size={20} className={`${currentView === AppView.DASHBOARD ? 'text-brand-600' : 'text-gray-400 group-hover:text-gray-600'} transition-colors`} />
              {!isCollapsed && <span>Home</span>}
            </button>
            <button
              onClick={() => onChangeView(AppView.PROJECTS)}
              title={isCollapsed ? "Projects" : ""}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 rounded-xl text-sm transition-all group ${
                currentView === AppView.PROJECTS
                  ? 'bg-white shadow-sm text-pink-600 font-medium'
                  : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
              }`}
            >
              <KanbanSquare size={20} className={`${currentView === AppView.PROJECTS ? 'text-pink-500' : 'text-gray-400 group-hover:text-pink-500'} transition-colors`} />
              {!isCollapsed && <span>Projects</span>}
            </button>
            <button
              onClick={() => onChangeView(AppView.DRIVE)}
              title={isCollapsed ? "Drive" : ""}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 rounded-xl text-sm transition-all group ${
                currentView === AppView.DRIVE
                  ? 'bg-white shadow-sm text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
              }`}
            >
              <HardDrive size={20} className={`${currentView === AppView.DRIVE ? 'text-blue-500' : 'text-gray-400 group-hover:text-blue-500'} transition-colors`} />
              {!isCollapsed && <span>Drive</span>}
            </button>
            <button
              onClick={() => onChangeView(AppView.CHAT)}
              title={isCollapsed ? "Chat" : ""}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 rounded-xl text-sm transition-all group ${
                currentView === AppView.CHAT
                  ? 'bg-white shadow-sm text-indigo-600 font-medium'
                  : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
              }`}
            >
              <MessageCircle size={20} className={`${currentView === AppView.CHAT ? 'text-indigo-500' : 'text-gray-400 group-hover:text-indigo-500'} transition-colors`} />
              {!isCollapsed && <span>Chat</span>}
            </button>
            <button
              onClick={() => onChangeView(AppView.CALLS)}
              title={isCollapsed ? "Calls" : ""}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 rounded-xl text-sm transition-all group ${
                currentView === AppView.CALLS
                  ? 'bg-white shadow-sm text-rose-600 font-medium'
                  : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
              }`}
            >
              <Video size={20} className={`${currentView === AppView.CALLS ? 'text-rose-500' : 'text-gray-400 group-hover:text-rose-500'} transition-colors`} />
              {!isCollapsed && <span>Calls</span>}
            </button>
        </div>

        {!isCollapsed && (
          <div className="animate-in fade-in duration-300">
            <div className="flex items-center justify-between px-3 mb-2">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Files
                </div>
                <button className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600 transition-colors">
                    <Plus size={12} />
                </button>
            </div>
            
            {renderTree(fileSystem)}

            <div className="mt-8 mb-2 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Favorites
            </div>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-white/60 transition-all mb-0.5">
              <Hash size={14} className="text-orange-400"/> <span>Important</span>
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-white/60 transition-all mb-0.5">
              <Hash size={14} className="text-purple-400"/> <span>Q2 Goals</span>
            </button>
          </div>
        )}
        
        {isCollapsed && (
             <div className="flex flex-col gap-2 items-center mt-4 border-t border-gray-200/50 pt-4">
                 <button className="p-2.5 rounded-xl text-gray-400 hover:bg-white/60 hover:text-blue-500 transition-colors" title="Files">
                    <Folder size={20} />
                 </button>
                 <button className="p-2.5 rounded-xl text-gray-400 hover:bg-white/60 hover:text-orange-500 transition-colors" title="Favorites">
                    <Hash size={20} />
                 </button>
             </div>
        )}
      </nav>

      {/* Footer Actions */}
      <div className={`mt-auto px-4 pb-2 flex flex-col gap-2`}>
           <button 
                onClick={onToggle}
                className={`p-2 rounded-xl text-gray-400 hover:bg-white/60 hover:text-gray-600 transition-colors flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}
            >
                {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
                {!isCollapsed && <span className="text-sm">Collapse</span>}
           </button>
      </div>

      {/* User Footer / Popover */}
      <div 
        className={`mt-2 pt-4 border-t border-gray-200/60 ${isCollapsed ? 'px-2' : 'px-4'} relative`}
        ref={profileRef}
      >
        {isProfileOpen && (
          <div 
            className={`absolute z-50 mb-4 w-64 p-2 bg-white/80 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-2xl animate-in fade-in zoom-in-95 slide-in-from-bottom-2 ${isCollapsed ? 'left-full bottom-0 ml-4' : 'bottom-full left-0 w-full mb-2'}`}
          >
              {/* Pro Plan Card */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-brand-500 to-purple-600 text-white mb-2 shadow-lg shadow-brand-500/20">
                  <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={16} className="text-yellow-200" />
                      <span className="text-xs font-bold uppercase tracking-wider">SyncSpace Pro</span>
                  </div>
                  <p className="text-xs text-white/90 mb-3 leading-relaxed">You're on the Pro plan. 250 AI credits remaining this month.</p>
                  <button className="w-full py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-semibold transition-colors border border-white/20">
                      Manage Subscription
                  </button>
              </div>

              {/* Menu Items */}
              <div className="space-y-1">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/60 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium group">
                      <User size={16} className="text-gray-400 group-hover:text-brand-500 transition-colors" />
                      Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/60 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium group">
                      <CreditCard size={16} className="text-gray-400 group-hover:text-brand-500 transition-colors" />
                      Billing
                  </button>
                  <button 
                      onClick={() => { setIsProfileOpen(false); onChangeView(AppView.SETTINGS); }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/60 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium group"
                  >
                      <Settings size={16} className="text-gray-400 group-hover:text-brand-500 transition-colors" />
                      Settings
                  </button>
                  <div className="h-px bg-gray-200/50 my-1 mx-2"></div>
                   <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/60 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium group">
                      <div className="flex items-center gap-3">
                        <Moon size={16} className="text-gray-400 group-hover:text-purple-500 transition-colors" />
                        Dark Mode
                      </div>
                      <div className="w-8 h-4 bg-gray-200 rounded-full relative">
                          <div className="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                      </div>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors text-sm font-medium group">
                      <LogOut size={16} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                      Log out
                  </button>
              </div>
          </div>
        )}

        <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-2 py-2 rounded-xl hover:bg-white/60 transition-colors cursor-pointer group outline-none ${isProfileOpen ? 'bg-white shadow-sm' : ''}`}
        >
          <div className="relative">
            <img 
              src="https://picsum.photos/32/32" 
              alt="User" 
              className="w-9 h-9 rounded-full border border-gray-200 shadow-sm"
            />
            <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
          </div>
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden text-left">
              <p className="text-sm font-bold text-gray-900 truncate">Alexandra T.</p>
              <div className="flex items-center gap-1">
                <BadgeCheck size={12} className="text-brand-500 fill-brand-100" />
                <p className="text-xs text-gray-500 truncate">Pro Account</p>
              </div>
            </div>
          )}
          {!isCollapsed && (
             <Settings size={16} className={`text-gray-400 group-hover:text-gray-600 transition-colors ${isProfileOpen ? 'rotate-45' : ''}`} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

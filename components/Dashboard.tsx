
import React, { useState } from 'react';
import { 
  FileText, 
  Table2, 
  PenTool, 
  Workflow, 
  Presentation, 
  HardDrive, 
  Search, 
  Sparkles,
  Folder,
  ArrowRight,
  KanbanSquare,
  ArrowUpRight,
  Clock,
  User,
  Video,
  Mail
} from 'lucide-react';
import { AppView, FileItem } from '../types';

interface DashboardProps {
  onOpenApp: (view: AppView) => void;
  onAskAI: (message: string) => void;
}

type TabType = 'files' | 'templates';

const Dashboard: React.FC<DashboardProps> = ({ onOpenApp, onAskAI }) => {
  const [activeTab, setActiveTab] = useState<TabType>('files');
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        // Handle search (mock)
        console.log(`Searching for ${inputValue} in ${activeTab}`);
    }
  };

  const featureIcons = [
    { id: AppView.DOCS, label: 'Docs', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
    { id: AppView.SHEETS, label: 'Sheets', icon: Table2, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-100' },
    { id: AppView.CANVAS, label: 'Canvas', icon: PenTool, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-100' },
    { id: AppView.PRESENTATIONS, label: 'Slides', icon: Presentation, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' },
    { id: AppView.PROJECTS, label: 'Projects', icon: KanbanSquare, color: 'text-pink-500', bg: 'bg-pink-50', border: 'border-pink-100' },
    { id: AppView.WORKFLOWS, label: 'Workflows', icon: Workflow, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100' },
    { id: AppView.EMAIL, label: 'Email', icon: Mail, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { id: AppView.CALLS, label: 'Calls', icon: Video, color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100' },
    { id: AppView.DRIVE, label: 'Drive', icon: HardDrive, color: 'text-gray-600', bg: 'bg-gray-100', border: 'border-gray-200' },
  ];

  // Extended mock data with descriptions/images for Masonry
  const recentItems = [
    { id: 'f1', title: 'Summer Campaign', type: AppView.DOCS, lastModified: '10 mins ago', owner: 'You', folder: true, description: 'Assets and copy for the Q3 marketing push.' },
    { id: '3', title: 'Marketing Brainstorm', type: AppView.CANVAS, lastModified: '5 hrs ago', owner: 'Sarah', folder: false, image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&q=80', description: 'Initial thoughts on brand positioning.' },
    { id: '1', title: 'Q2 Product Roadmap', type: AppView.DOCS, lastModified: '1 hr ago', owner: 'You', folder: false, description: 'Finalized specs for the upcoming release cycle including mobile features.' },
    { id: 'f2', title: 'Meeting Notes', type: AppView.DOCS, lastModified: '23 mins ago', owner: 'You', folder: true, description: 'Weekly syncs.' },
    { id: '6', title: 'Sprint 24', type: AppView.PROJECTS, lastModified: 'Yesterday', owner: 'Team', folder: false, description: 'Active tasks for current sprint.', progress: 75 },
    { id: '2', title: 'Financial Projections', type: AppView.SHEETS, lastModified: '2 hrs ago', owner: 'Raj', folder: false, description: 'Revenue models for 2026.' },
    { id: '5', title: 'Pitch Deck v2', type: AppView.PRESENTATIONS, lastModified: 'Yesterday', owner: 'You', folder: false, image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=80' },
    { id: '4', title: 'Onboarding Flow', type: AppView.WORKFLOWS, lastModified: 'Yesterday', owner: 'You', folder: false, description: 'Automated email sequence for new signups.' },
  ];

  const templates = [
      { id: 't1', title: 'Project Plan', type: AppView.DOCS, description: 'Standard comprehensive project plan with milestones.' },
      { id: 't2', title: 'Monthly Budget', type: AppView.SHEETS, description: 'Track income, expenses and savings.' },
      { id: 't3', title: 'User Journey Map', type: AppView.CANVAS, description: 'Visualise the customer experience.' },
      { id: 't4', title: 'Quarterly Review', type: AppView.PRESENTATIONS, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80' },
      { id: 't5', title: 'Agile Board', type: AppView.PROJECTS, description: 'Scrum setup with Backlog, Doing, Done.' },
  ];

  const renderContentGrid = () => {
      const items = activeTab === 'templates' ? templates : recentItems;

      return (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 pb-20">
            {items.map((item, index) => {
                const iconData = featureIcons.find(f => f.id === item.type);
                const Icon = iconData ? iconData.icon : FileText;
                
                return (
                <div 
                    key={item.id}
                    onClick={() => 'folder' in item && item.folder ? onOpenApp(AppView.DRIVE) : onOpenApp(item.type)}
                    className="break-inside-avoid group relative bg-white/60 backdrop-blur-md rounded-3xl border border-white/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] hover:bg-white/80 transition-all duration-500 cursor-pointer overflow-hidden animate-slide-up hover:-translate-y-2 hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                     {/* Liquid Gloss Effect */}
                     <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                    {/* Image Header if available */}
                    {'image' in item && item.image && (
                        <div className="h-32 w-full overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute top-3 right-3 z-20 bg-white/30 backdrop-blur-md p-1.5 rounded-full text-white border border-white/20">
                                <Icon size={14} />
                            </div>
                        </div>
                    )}

                    <div className="p-5 relative z-10">
                        <div className="flex justify-between items-start mb-3">
                            {!('image' in item && item.image) && (
                                <div className={`p-3 rounded-2xl transition-transform duration-500 group-hover:scale-110 shadow-sm ${'folder' in item && item.folder ? 'bg-amber-100/50 text-amber-500' : 'bg-white/80 text-gray-500 group-hover:text-brand-600'}`}>
                                    {'folder' in item && item.folder ? (
                                        <Folder size={20} fill="#FCD34D" className="text-amber-400" />
                                    ) : (
                                        <Icon size={20} />
                                    )}
                                </div>
                            )}
                             <button className="text-gray-300 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                                 <ArrowUpRight size={18} />
                             </button>
                        </div>
                        
                        <h3 className="font-bold text-slate-800 text-lg mb-1 leading-snug group-hover:text-brand-700 transition-colors">{item.title}</h3>
                        
                        {'description' in item && (
                            <p className="text-sm text-slate-500 line-clamp-3 mb-3 font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                {item.description}
                            </p>
                        )}

                        {'progress' in item && (
                            <div className="w-full h-1.5 bg-gray-100 rounded-full mb-3 overflow-hidden">
                                <div className="h-full bg-brand-500 rounded-full" style={{ width: `${item.progress}%` }}></div>
                            </div>
                        )}

                        <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mt-2">
                             {'lastModified' in item && (
                                <div className="flex items-center gap-1">
                                    <Clock size={12} />
                                    <span>{item.lastModified}</span>
                                </div>
                             )}
                             {/* Only show owner if not template */}
                             {activeTab !== 'templates' && 'owner' in item && (
                                <div className="flex items-center gap-1">
                                    <User size={12} />
                                    <span>{item.owner}</span>
                                </div>
                             )}
                        </div>
                    </div>
                </div>
            )})}
        </div>
      );
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="max-w-[1600px] mx-auto px-8 py-12 flex flex-col items-center">
        
        {/* Welcome */}
        <div className="w-full text-left mb-12 pl-2 animate-slide-up">
            <h1 className="text-5xl font-bold font-serif text-slate-900 tracking-tight pb-2">
                Welcome back, Matt
            </h1>
            <p className="text-xl text-slate-500 mt-2 font-light">Your workspace is ready. What will you create today?</p>
        </div>

        {/* Central Input Area - Liquid Glass */}
        <div className="w-full max-w-4xl mb-20 relative z-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
            
            {/* Tabs */}
            <div className="flex items-center gap-8 mb-6 px-4">
                <button 
                    onClick={() => setActiveTab('files')}
                    className={`text-sm font-bold transition-all pb-1 border-b-2 ${activeTab === 'files' ? 'text-slate-900 border-slate-900' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
                >
                    My Files
                </button>
                <button 
                    onClick={() => setActiveTab('templates')}
                    className={`text-sm font-bold transition-all pb-1 border-b-2 ${activeTab === 'templates' ? 'text-slate-900 border-slate-900' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
                >
                    Templates
                </button>
            </div>

            {/* Input */}
            <div className={`relative group transition-all duration-700 ease-out`}>
                {/* Glow Effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r rounded-[28px] blur-xl opacity-40 transition-opacity duration-500 from-slate-200 to-slate-300`}></div>
                
                {/* Glass Container */}
                <div className="relative bg-white/70 backdrop-blur-2xl rounded-[24px] shadow-2xl flex items-center overflow-hidden h-20 transition-all border border-white/60 focus-within:ring-4 focus-within:ring-brand-500/10 focus-within:bg-white/90">
                    <div className="pl-8 text-slate-400">
                        <Search size={28} />
                    </div>
                    <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={
                           activeTab === 'templates' 
                                ? "Search templates..." 
                                : "Search your files..."
                        }
                        className="w-full h-full px-6 outline-none text-xl text-slate-800 placeholder-slate-400 bg-transparent font-medium"
                        autoFocus
                    />
                </div>
            </div>

            {/* Feature Icons Row - Liquid Buttons */}
            <div className="flex justify-between md:justify-center gap-4 md:gap-8 mt-12 overflow-x-auto pb-4 px-2 no-scrollbar mask-gradient">
                {featureIcons.map((feature, idx) => (
                    <button
                        key={feature.label}
                        onClick={() => onOpenApp(feature.id as AppView)}
                        className="flex flex-col items-center gap-3 group min-w-[70px] transform transition-transform duration-300 hover:-translate-y-2 hover:scale-110 ease-out"
                        style={{ animationDelay: `${idx * 50 + 200}ms` }}
                    >
                        <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center border border-white/60 bg-white/40 backdrop-blur-md shadow-[0_8px_20px_-6px_rgba(0,0,0,0.05)] group-hover:shadow-[0_16px_32px_-8px_rgba(0,0,0,0.15)] group-hover:bg-white/70 transition-all duration-300 relative overflow-hidden`}>
                            <feature.icon size={24} className={`${feature.color} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />
                            
                            {/* Reflection */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/80 via-transparent to-transparent opacity-50"></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-900 transition-colors tracking-wide">{feature.label}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* Content Section */}
        <div className="w-full max-w-[1600px] animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center justify-between mb-8 px-2">
                 <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                     {activeTab === 'templates' ? 'Suggested Templates' : 'Jump Back In'}
                 </h2>
                 <button 
                    onClick={() => onOpenApp(AppView.VIEW_ALL)}
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 hover:bg-white border border-white/60 text-sm text-slate-600 font-semibold hover:border-white hover:shadow-lg transition-all backdrop-blur-sm"
                 >
                     View all 
                     <span className="bg-slate-100 rounded-full p-0.5 group-hover:bg-slate-200 transition-colors">
                        <ArrowRight size={12} />
                     </span>
                 </button>
            </div>
            {renderContentGrid()}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

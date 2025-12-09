
import React, { useState } from 'react';
import { 
    FileText, 
    Table2, 
    PenTool, 
    Presentation, 
    Workflow, 
    KanbanSquare, 
    HardDrive, 
    Search, 
    Filter, 
    LayoutGrid, 
    List as ListIcon, 
    MoreHorizontal, 
    Clock, 
    User,
    ArrowUpRight,
    Star
} from 'lucide-react';
import { AppView, FileItem } from '../types';

interface ViewAllProps {
    onOpenApp: (view: AppView) => void;
}

const ViewAll: React.FC<ViewAllProps> = ({ onOpenApp }) => {
    const [filter, setFilter] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');

    const allFiles: FileItem[] = [
        { id: '1', title: 'Q2 Product Roadmap', type: AppView.DOCS, lastModified: '1 hr ago', owner: 'You', folder: false, description: 'Strategic vision for Q2 including new feature sets.' },
        { id: '3', title: 'Marketing Brainstorm', type: AppView.CANVAS, lastModified: '5 hrs ago', owner: 'Sarah', folder: false, image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&q=80', description: 'Concepts for summer campaign visual identity.' },
        { id: '2', title: 'Financial Projections', type: AppView.SHEETS, lastModified: '2 hrs ago', owner: 'Raj', folder: false, description: 'Revenue and expense forecasting.' },
        { id: '4', title: 'Onboarding Flow', type: AppView.WORKFLOWS, lastModified: 'Yesterday', owner: 'You', folder: false, description: 'Logic for new user welcome sequence.' },
        { id: '5', title: 'Pitch Deck v2', type: AppView.PRESENTATIONS, lastModified: 'Yesterday', owner: 'You', folder: false, image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&q=80', description: 'Updated deck for Series B investors.' },
        { id: '6', title: 'Sprint 24', type: AppView.PROJECTS, lastModified: 'Yesterday', owner: 'Team', folder: false, progress: 75, description: 'Current sprint items.' },
        { id: '7', title: 'Brand Guidelines', type: AppView.DOCS, lastModified: '2 days ago', owner: 'Design Team', folder: false },
        { id: '8', title: 'User Research Q1', type: AppView.DOCS, lastModified: '3 days ago', owner: 'You', folder: false, description: 'Interview notes and synthesis.' },
        { id: '9', title: 'Sales Pipeline', type: AppView.SHEETS, lastModified: '1 week ago', owner: 'Mike', folder: false },
        { id: '10', title: 'System Arch', type: AppView.CANVAS, lastModified: '1 week ago', owner: 'Dev Team', folder: false },
        { id: '11', title: 'All Hands Deck', type: AppView.PRESENTATIONS, lastModified: '2 weeks ago', owner: 'Exec', folder: false },
        { id: '12', title: 'Email Automation', type: AppView.WORKFLOWS, lastModified: '2 weeks ago', owner: 'Marketing', folder: false },
    ];

    const getIcon = (type: AppView) => {
        switch (type) {
            case AppView.DOCS: return <FileText size={20} className="text-blue-500" />;
            case AppView.SHEETS: return <Table2 size={20} className="text-green-500" />;
            case AppView.CANVAS: return <PenTool size={20} className="text-purple-500" />;
            case AppView.PRESENTATIONS: return <Presentation size={20} className="text-orange-500" />;
            case AppView.WORKFLOWS: return <Workflow size={20} className="text-red-500" />;
            case AppView.PROJECTS: return <KanbanSquare size={20} className="text-pink-500" />;
            default: return <FileText size={20} className="text-gray-500" />;
        }
    };

    const filteredFiles = allFiles.filter(file => {
        const matchesFilter = filter === 'all' || file.type === filter;
        const matchesSearch = file.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="h-full flex flex-col bg-transparent">
            {/* Header / Filter Bar - Glass Effect */}
            <div className="px-8 py-6 sticky top-0 bg-white/60 backdrop-blur-xl border-b border-white/20 z-20 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Library</h1>
                        <p className="text-sm text-slate-500 mt-1 font-medium">Manage and organize all your workspace content</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search size={16} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search library..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 py-2.5 bg-white/50 border border-white/60 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-300 w-64 shadow-sm hover:shadow-md transition-all placeholder-slate-400 backdrop-blur-sm"
                            />
                        </div>
                        <div className="h-8 w-px bg-white/40 mx-1"></div>
                        <div className="flex p-1 bg-white/40 backdrop-blur-sm rounded-xl border border-white/40 shadow-sm">
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'}`}
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button 
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'}`}
                            >
                                <ListIcon size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filter Chips */}
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {[
                        { id: 'all', label: 'All Items' },
                        { id: AppView.DOCS, label: 'Docs' },
                        { id: AppView.SHEETS, label: 'Sheets' },
                        { id: AppView.CANVAS, label: 'Canvas' },
                        { id: AppView.PRESENTATIONS, label: 'Slides' },
                        { id: AppView.WORKFLOWS, label: 'Workflows' },
                        { id: AppView.PROJECTS, label: 'Projects' },
                    ].map(chip => (
                        <button
                            key={chip.id}
                            onClick={() => setFilter(chip.id)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                                filter === chip.id
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20'
                                    : 'bg-white/50 text-slate-600 border-white/40 hover:border-white/80 hover:bg-white/80 hover:shadow-sm backdrop-blur-sm'
                            }`}
                        >
                            {chip.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                {viewMode === 'grid' ? (
                    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 pb-20">
                        {filteredFiles.map((file, index) => (
                            <div 
                                key={file.id}
                                onClick={() => onOpenApp(file.type)}
                                className="break-inside-avoid group relative bg-white/60 backdrop-blur-md rounded-3xl p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] hover:bg-white/80 border border-white/50 hover:border-white/80 transition-all duration-500 cursor-pointer overflow-hidden animate-slide-up hover:-translate-y-2 hover:scale-[1.02]"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Liquid Gloss Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

                                {/* Image Header */}
                                {file.image && (
                                    <div className="h-40 -mx-5 -mt-5 mb-5 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                                        <img src={file.image} alt={file.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute top-4 right-4 z-20 bg-white/30 backdrop-blur-md p-1.5 rounded-full text-white border border-white/20">
                                            {getIcon(file.type)}
                                        </div>
                                    </div>
                                )}

                                <div className="relative z-10">
                                    {!file.image && (
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-3 rounded-2xl bg-white/80 backdrop-blur-sm transition-colors shadow-sm text-slate-500 group-hover:text-brand-600`}>
                                                {getIcon(file.type)}
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-200">
                                                <button className="p-2 bg-white text-slate-800 rounded-full hover:bg-slate-50 transition-colors shadow-sm">
                                                    <ArrowUpRight size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2 group-hover:text-brand-700 transition-colors">
                                        {file.title}
                                    </h3>

                                    {file.description && (
                                        <p className="text-sm text-slate-500 line-clamp-3 mb-4 font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                            {file.description}
                                        </p>
                                    )}

                                    {file.progress !== undefined && (
                                        <div className="w-full h-1.5 bg-gray-100/50 rounded-full mb-4 overflow-hidden">
                                            <div className="h-full bg-brand-500 rounded-full" style={{ width: `${file.progress}%` }}></div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between text-xs text-slate-400 font-medium pt-2 border-t border-white/40">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={12} />
                                                <span>{file.lastModified}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <User size={12} />
                                                <span>{file.owner}</span>
                                            </div>
                                        </div>
                                        <Star size={14} className="text-slate-300 hover:text-orange-400 cursor-pointer transition-colors" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-sm border border-white/50 overflow-hidden animate-slide-up">
                        <table className="w-full">
                            <thead className="bg-white/40 border-b border-white/40">
                                <tr>
                                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Name</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Owner</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Last Modified</th>
                                    <th className="w-10"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFiles.map((file) => (
                                    <tr 
                                        key={file.id} 
                                        onClick={() => onOpenApp(file.type)}
                                        className="group hover:bg-white/60 transition-colors cursor-pointer border-b border-white/30 last:border-0"
                                    >
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2 rounded-xl bg-white/70 shadow-sm`}>
                                                    {getIcon(file.type)}
                                                </div>
                                                <span className="font-semibold text-slate-700 group-hover:text-brand-700">{file.title}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/50 text-slate-600 border border-white/40">
                                                {file.type}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-slate-500">{file.owner}</td>
                                        <td className="py-4 px-6 text-sm text-slate-500">{file.lastModified}</td>
                                        <td className="py-4 px-6">
                                            <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white rounded-lg text-slate-400 hover:text-slate-600 transition-all">
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewAll;
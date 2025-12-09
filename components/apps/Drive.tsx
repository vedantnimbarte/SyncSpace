
import React, { useState, useEffect, useRef } from 'react';
import { 
    Folder, 
    FileText, 
    Table2, 
    PenTool, 
    MoreHorizontal, 
    Star, 
    Clock, 
    Cloud, 
    Search,
    Grid,
    List as ListIcon,
    ChevronRight,
    ArrowDown,
    Filter,
    LayoutGrid,
    Image as ImageIcon,
    Download,
    Share2,
    Presentation,
    X,
    UploadCloud,
    File,
    CheckCircle2,
    AlertCircle,
    Calendar,
    User,
    Copy,
    Trash2,
    Edit2,
    Link,
    Check
} from 'lucide-react';
import { AppView, FileItem } from '../../types';

interface UploadingFile {
    id: string;
    name: string;
    size: string;
    progress: number;
    status: 'uploading' | 'completed' | 'error';
    type: string;
}

const Drive: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [uploadQueue, setUploadQueue] = useState<UploadingFile[]>([]);
  
  // New State for Share/More features
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [activeFile, setActiveFile] = useState<FileItem | null>(null);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Extended mock data
  const [files, setFiles] = useState<FileItem[]>([
    { id: '1', title: 'Marketing Assets', type: AppView.DRIVE, lastModified: '2025-12-01', owner: 'Me', folder: true, size: '--', description: 'Brand logos and fonts' },
    { id: '2', title: 'Q1 Reports', type: AppView.DRIVE, lastModified: '2025-11-20', owner: 'Me', folder: true, size: '--', description: 'Financial statements' },
    { id: '3', title: 'Project Archive', type: AppView.DRIVE, lastModified: '2025-10-15', owner: 'Admin', folder: true, size: '--' },
    { id: '7', title: 'Pitch Deck.pptx', type: AppView.PRESENTATIONS, lastModified: '2025-12-08', owner: 'Me', size: '12 MB', starred: true, image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80', description: 'Series B funding deck v3' },
    { id: '4', title: 'Q2 Roadmap.docx', type: AppView.DOCS, lastModified: '2025-12-14', owner: 'Me', size: '2.4 MB', starred: true, description: 'Strategic initiatives for the upcoming quarter including mobile app launch.' },
    { id: '6', title: 'UX Flow.canvas', type: AppView.CANVAS, lastModified: '2025-12-10', owner: 'Sarah', size: '5.6 MB', image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80' },
    { id: '5', title: 'Budget 2026.xlsx', type: AppView.SHEETS, lastModified: '2025-12-12', owner: 'Raj', size: '1.1 MB' },
    { id: '8', title: 'Campaign Brief.docx', type: AppView.DOCS, lastModified: '2025-12-05', owner: 'Marketing', size: '840 KB' },
    { id: '9', title: 'Team Offsite photos', type: AppView.DRIVE, lastModified: '2 days ago', owner: 'Alex', size: '45 MB', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80', description: 'Photos from the retreat' },
    { id: '10', title: 'Q4 Review', type: AppView.PRESENTATIONS, lastModified: '1 week ago', owner: 'Exec', size: '15 MB' },
  ]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
            setIsFilterOpen(false);
        }
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            // Only close if we didn't click on a trigger button
            if (!(event.target as HTMLElement).closest('[data-menu-trigger]')) {
                setMenuOpenId(null);
            }
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Simulate file upload progress
  useEffect(() => {
    if (uploadQueue.some(f => f.status === 'uploading')) {
        const interval = setInterval(() => {
            setUploadQueue(prev => prev.map(file => {
                if (file.status === 'uploading') {
                    const newProgress = Math.min(file.progress + Math.random() * 10, 100);
                    return {
                        ...file,
                        progress: newProgress,
                        status: newProgress >= 100 ? 'completed' : 'uploading'
                    };
                }
                return file;
            }));
        }, 500);
        return () => clearInterval(interval);
    }
  }, [uploadQueue]);

  const handleFileUpload = () => {
      const newFiles: UploadingFile[] = [
          { id: Date.now().toString(), name: 'Project_Specs_v2.pdf', size: '4.2 MB', progress: 0, status: 'uploading', type: 'pdf' },
          { id: (Date.now() + 1).toString(), name: 'Design_System_Assets.zip', size: '156 MB', progress: 0, status: 'uploading', type: 'zip' },
      ];
      setUploadQueue([...uploadQueue, ...newFiles]);
      setIsUploadModalOpen(false);
  };

  const handleShare = (e: React.MouseEvent, file: FileItem) => {
      e.stopPropagation();
      setActiveFile(file);
      setShareModalOpen(true);
      setMenuOpenId(null);
  };

  const handleDownload = (e: React.MouseEvent, file: FileItem) => {
      e.stopPropagation();
      setDownloadingFile(file.title);
      setMenuOpenId(null);
      setTimeout(() => setDownloadingFile(null), 3000);
  };

  const toggleMenu = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      setMenuOpenId(menuOpenId === id ? null : id);
  };

  const copyLink = () => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
  };

  const getIcon = (item: FileItem, size: number = 24) => {
      if (item.folder) return <Folder size={size} className="text-amber-400 fill-amber-100" />;
      switch (item.type) {
          case AppView.DOCS: return <FileText size={size} className="text-blue-500" />;
          case AppView.SHEETS: return <Table2 size={size} className="text-green-500" />;
          case AppView.CANVAS: return <PenTool size={size} className="text-purple-500" />;
          case AppView.PRESENTATIONS: return <Presentation size={size} className="text-orange-500" />;
          default: return <FileText size={size} className="text-gray-400" />;
      }
  };

  const getFileColor = (type: AppView) => {
      switch (type) {
          case AppView.DOCS: return 'bg-blue-50 text-blue-600';
          case AppView.SHEETS: return 'bg-green-50 text-green-600';
          case AppView.CANVAS: return 'bg-purple-50 text-purple-600';
          case AppView.PRESENTATIONS: return 'bg-orange-50 text-orange-600';
          default: return 'bg-gray-50 text-gray-600';
      }
  };

  return (
    <div className="h-full flex flex-col bg-transparent relative">
      {/* Drive Toolbar - Glass Effect */}
      <div className="px-8 py-5 flex items-center justify-between sticky top-0 z-20 bg-white/60 backdrop-blur-xl border-b border-white/20">
         <div className="flex items-center gap-2 text-sm text-slate-500">
             <span className="hover:bg-white/50 px-2 py-1 rounded-lg cursor-pointer hover:text-slate-900 transition-colors">My Drive</span>
             <ChevronRight size={14} />
             <span className="font-semibold text-slate-900 px-2 py-1 rounded-lg cursor-pointer bg-white/50 shadow-sm border border-white/40">Marketing</span>
         </div>
         
         <div className="flex items-center gap-3">
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
            
            <div className="relative" ref={filterRef}>
                <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white border border-white/40 rounded-xl text-sm font-medium text-slate-600 transition-all shadow-sm hover:shadow-md ${isFilterOpen ? 'bg-white ring-2 ring-brand-100' : ''}`}
                >
                    <Filter size={16} />
                    <span>Filter</span>
                </button>

                {isFilterOpen && (
                    <div className="absolute top-full right-0 mt-2 w-72 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 p-4 z-50 animate-in fade-in zoom-in-95">
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Type</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <label className="flex items-center gap-2 text-sm text-slate-700 hover:bg-slate-50 p-1.5 rounded-lg cursor-pointer">
                                        <input type="checkbox" className="rounded text-brand-600 focus:ring-brand-500" /> Documents
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-slate-700 hover:bg-slate-50 p-1.5 rounded-lg cursor-pointer">
                                        <input type="checkbox" className="rounded text-brand-600 focus:ring-brand-500" /> Spreadsheets
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-slate-700 hover:bg-slate-50 p-1.5 rounded-lg cursor-pointer">
                                        <input type="checkbox" className="rounded text-brand-600 focus:ring-brand-500" /> Presentations
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-slate-700 hover:bg-slate-50 p-1.5 rounded-lg cursor-pointer">
                                        <input type="checkbox" className="rounded text-brand-600 focus:ring-brand-500" /> Folders
                                    </label>
                                </div>
                            </div>
                            <div className="h-px bg-slate-100"></div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Modified</h4>
                                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20">
                                    <option>Any time</option>
                                    <option>Today</option>
                                    <option>Last 7 days</option>
                                    <option>Last 30 days</option>
                                </select>
                            </div>
                            <div className="h-px bg-slate-100"></div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Owner</h4>
                                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
                                    <User size={14} className="text-slate-400" />
                                    <input type="text" placeholder="Search people..." className="bg-transparent text-sm w-full outline-none placeholder-slate-400" />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button onClick={() => setIsFilterOpen(false)} className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700">Clear</button>
                                <button onClick={() => setIsFilterOpen(false)} className="px-3 py-1.5 bg-brand-600 text-white rounded-lg text-xs font-bold hover:bg-brand-700">Apply</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-brand-500/20"
            >
                <Cloud size={16} />
                <span>Upload</span>
            </button>
         </div>
      </div>

      {/* File Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
        
        {/* Quick Access Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-8">
            {[
                { label: 'Storage Used', value: '45%', sub: '22GB of 50GB', color: 'bg-blue-500' },
                { label: 'Shared Files', value: '128', sub: '+12 this week', color: 'bg-purple-500' },
                { label: 'Trash', value: '14', sub: 'Auto-delete in 30 days', color: 'bg-red-500' },
                { label: 'Offline', value: '8', sub: 'Available locally', color: 'bg-green-500' },
            ].map((stat, i) => (
                <div key={i} className="bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/60 transition-colors cursor-default">
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
                        <h3 className="text-xl font-bold text-slate-800">{stat.value}</h3>
                        <p className="text-[10px] text-slate-500 mt-1">{stat.sub}</p>
                    </div>
                    <div className={`w-1.5 h-8 rounded-full ${stat.color} opacity-20 group-hover:opacity-100 transition-opacity`}></div>
                </div>
            ))}
        </div>

        <div>
            <div className="flex items-center gap-2 mb-6">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">All Files</h2>
                <ArrowDown size={12} className="text-slate-400" />
            </div>

            {viewMode === 'grid' ? (
                // Masonry Layout using CSS Columns
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 pb-20">
                    {files.map((file, index) => (
                        <div 
                            key={file.id} 
                            className="break-inside-avoid group relative bg-white/60 backdrop-blur-md rounded-3xl p-1 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] hover:bg-white/80 border border-white/50 hover:border-white/80 transition-all duration-500 cursor-pointer overflow-visible animate-slide-up hover:-translate-y-2"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                             {/* Liquid Gloss Effect */}
                             <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"></div>

                            {/* Image Header if present */}
                            {file.image ? (
                                <div className="rounded-2xl overflow-hidden mb-3 relative">
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                                    <img src={file.image} alt={file.title} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                    
                                    {/* Type Badge on Image */}
                                    <div className="absolute top-3 left-3 z-20 bg-white/30 backdrop-blur-md p-1.5 rounded-xl border border-white/30 shadow-sm">
                                        {getIcon(file, 16)}
                                    </div>
                                    {file.starred && (
                                        <div className="absolute top-3 right-3 z-20 bg-white/30 backdrop-blur-md p-1.5 rounded-full border border-white/30">
                                            <Star size={12} className="fill-orange-400 text-orange-400" />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // No Image - Icon Header
                                <div className="flex justify-between items-start p-4 pb-0">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${file.folder ? 'bg-amber-100/50' : getFileColor(file.type).replace('text-', 'bg-').replace('600', '50')} ${file.folder ? 'text-amber-500' : ''}`}>
                                        {getIcon(file, 28)}
                                    </div>
                                    {file.starred && <Star size={16} className="fill-orange-400 text-orange-400" />}
                                </div>
                            )}

                            <div className="p-4 pt-2 relative z-10">
                                <h3 className="font-bold text-slate-800 text-sm leading-snug mb-1 truncate" title={file.title}>{file.title}</h3>
                                
                                {file.description && (
                                    <p className="text-xs text-slate-500 line-clamp-3 mb-3 font-medium opacity-80 leading-relaxed">
                                        {file.description}
                                    </p>
                                )}

                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/40">
                                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                                        <span>{file.size || '2 MB'}</span>
                                        <span>•</span>
                                        <span>{file.lastModified}</span>
                                    </div>
                                    
                                    {/* Hover Actions */}
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-200 relative">
                                        <button onClick={(e) => handleShare(e, file)} className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-slate-600 shadow-sm" title="Share"><Share2 size={12}/></button>
                                        <button onClick={(e) => handleDownload(e, file)} className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-slate-600 shadow-sm" title="Download"><Download size={12}/></button>
                                        <button 
                                            data-menu-trigger
                                            onClick={(e) => toggleMenu(e, file.id)}
                                            className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-slate-600 shadow-sm"
                                        >
                                            <MoreHorizontal size={12}/>
                                        </button>

                                        {/* Dropdown Menu */}
                                        {menuOpenId === file.id && (
                                            <div ref={menuRef} className="absolute right-0 bottom-full mb-2 w-48 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/50 p-1.5 z-50 animate-in fade-in zoom-in-95 origin-bottom-right">
                                                <button onClick={(e) => handleShare(e, file)} className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-xs font-medium text-slate-700 flex items-center gap-2">
                                                    <Share2 size={14} /> Share
                                                </button>
                                                <button onClick={(e) => handleDownload(e, file)} className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-xs font-medium text-slate-700 flex items-center gap-2">
                                                    <Download size={14} /> Download
                                                </button>
                                                <button className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-xs font-medium text-slate-700 flex items-center gap-2">
                                                    <Edit2 size={14} /> Rename
                                                </button>
                                                <button className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-xs font-medium text-slate-700 flex items-center gap-2">
                                                    <Star size={14} /> Add to Favorites
                                                </button>
                                                <div className="h-px bg-slate-100 my-1"></div>
                                                <button className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 rounded-lg text-xs font-medium flex items-center gap-2">
                                                    <Trash2 size={14} /> Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // List View
                <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-sm border border-white/50 overflow-hidden animate-slide-up pb-24">
                    <table className="w-full">
                        <thead className="bg-white/40 border-b border-white/40">
                            <tr>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/2">Name</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Owner</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Last Modified</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Size</th>
                                <th className="w-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map(file => (
                                <tr key={file.id} className="border-b border-white/30 last:border-0 hover:bg-white/60 transition-colors cursor-pointer group">
                                    <td className="py-4 px-6 flex items-center gap-4">
                                        <div className={`p-2 rounded-xl bg-white/70 shadow-sm ${file.folder ? 'text-amber-500' : ''}`}>
                                            {getIcon(file, 20)}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold text-slate-700 truncate">{file.title}</span>
                                                {file.starred && <Star size={10} className="fill-orange-400 text-orange-400" />}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-slate-500">{file.owner}</td>
                                    <td className="py-4 px-6 text-sm text-slate-500">{file.lastModified}</td>
                                    <td className="py-4 px-6 text-sm text-slate-500">{file.size}</td>
                                    <td className="py-4 px-6 relative">
                                        <button 
                                            data-menu-trigger
                                            onClick={(e) => toggleMenu(e, file.id)}
                                            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white rounded-lg text-slate-400 hover:text-slate-600 transition-all shadow-sm"
                                        >
                                            <MoreHorizontal size={16} />
                                        </button>
                                        
                                        {/* Dropdown Menu (List View) */}
                                        {menuOpenId === file.id && (
                                            <div ref={menuRef} className="absolute right-8 top-8 w-48 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/50 p-1.5 z-50 animate-in fade-in zoom-in-95 origin-top-right">
                                                <button onClick={(e) => handleShare(e, file)} className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-xs font-medium text-slate-700 flex items-center gap-2">
                                                    <Share2 size={14} /> Share
                                                </button>
                                                <button onClick={(e) => handleDownload(e, file)} className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-xs font-medium text-slate-700 flex items-center gap-2">
                                                    <Download size={14} /> Download
                                                </button>
                                                <button className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-xs font-medium text-slate-700 flex items-center gap-2">
                                                    <Edit2 size={14} /> Rename
                                                </button>
                                                <div className="h-px bg-slate-100 my-1"></div>
                                                <button className="w-full text-left px-3 py-2 hover:bg-red-50 text-red-600 rounded-lg text-xs font-medium flex items-center gap-2">
                                                    <Trash2 size={14} /> Delete
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
      </div>

      {/* Share Modal */}
      {shareModalOpen && activeFile && (
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-6 border-b border-gray-100">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-lg font-bold text-gray-900">Share "{activeFile.title}"</h3>
                        <button onClick={() => setShareModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                            <X size={20} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">Invite people to view or edit this file.</p>
                  </div>
                  
                  <div className="p-6 space-y-6">
                      <div className="flex gap-2">
                          <div className="flex-1 relative">
                              <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                              <input 
                                type="text" 
                                placeholder="Add people, groups, or emails..." 
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300" 
                              />
                          </div>
                          <select className="bg-gray-50 border border-gray-200 rounded-xl px-3 text-sm font-medium text-gray-700 outline-none focus:border-brand-300">
                              <option>Can edit</option>
                              <option>Can view</option>
                              <option>Can comment</option>
                          </select>
                      </div>

                      <div>
                          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">People with access</h4>
                          <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xs">
                                          AT
                                      </div>
                                      <div>
                                          <p className="text-sm font-bold text-gray-800">Alexandra T. (You)</p>
                                          <p className="text-xs text-gray-500">alex.t@acme.com</p>
                                      </div>
                                  </div>
                                  <span className="text-xs text-gray-400 italic">Owner</span>
                              </div>
                              <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                      <img src="https://i.pravatar.cc/150?u=sarah" className="w-8 h-8 rounded-full" />
                                      <div>
                                          <p className="text-sm font-bold text-gray-800">Sarah Miller</p>
                                          <p className="text-xs text-gray-500">sarah@acme.com</p>
                                      </div>
                                  </div>
                                  <span className="text-xs text-gray-500">Editor</span>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                      <button 
                        onClick={copyLink}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-white rounded-xl text-sm font-semibold text-brand-600 transition-colors"
                      >
                          {copiedLink ? <Check size={16} /> : <Link size={16} />}
                          {copiedLink ? 'Copied!' : 'Copy Link'}
                      </button>
                      <button onClick={() => setShareModalOpen(false)} className="px-5 py-2 bg-brand-600 text-white rounded-xl text-sm font-bold hover:bg-brand-700 shadow-sm transition-colors">
                          Done
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Upload Modal */}
      {isUploadModalOpen && (
          <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="text-lg font-bold text-gray-900">Upload Files</h3>
                      <button onClick={() => setIsUploadModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                          <X size={20} />
                      </button>
                  </div>
                  <div className="p-8">
                      <div 
                        className="border-2 border-dashed border-brand-200 bg-brand-50/50 rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-brand-50 hover:border-brand-300 transition-all group"
                        onClick={handleFileUpload}
                      >
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                              <UploadCloud size={32} className="text-brand-500" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">Click to upload</h4>
                          <p className="text-sm text-gray-500 mb-4">or drag and drop files here</p>
                          <p className="text-xs text-gray-400">Supported formats: PDF, DOCX, XLSX, JPG, PNG</p>
                      </div>
                  </div>
                  <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                      <button onClick={() => setIsUploadModalOpen(false)} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                          Cancel
                      </button>
                      <button onClick={handleFileUpload} className="px-4 py-2 bg-brand-600 text-white rounded-xl text-sm font-medium hover:bg-brand-700 shadow-sm">
                          Select Files
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Upload Progress Queue */}
      {uploadQueue.length > 0 && (
          <div className="absolute bottom-6 right-6 w-96 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden z-40 animate-slide-up">
              <div className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center">
                  <span className="text-sm font-semibold flex items-center gap-2">
                      <Cloud size={14} /> Uploads ({uploadQueue.filter(f => f.status === 'completed').length}/{uploadQueue.length})
                  </span>
                  <button onClick={() => setUploadQueue([])} className="p-1 hover:bg-white/20 rounded-full">
                      <X size={14} />
                  </button>
              </div>
              <div className="max-h-60 overflow-y-auto">
                  {uploadQueue.map(file => (
                      <div key={file.id} className="p-3 border-b border-gray-100 last:border-0 hover:bg-white/50">
                          <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-3 overflow-hidden">
                                  <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                                      <File size={16} />
                                  </div>
                                  <div className="min-w-0">
                                      <p className="text-sm font-medium text-gray-800 truncate" title={file.name}>{file.name}</p>
                                      <p className="text-xs text-gray-400">{file.size}</p>
                                  </div>
                              </div>
                              <div className="flex-shrink-0">
                                  {file.status === 'completed' && <CheckCircle2 size={16} className="text-green-500" />}
                                  {file.status === 'error' && <AlertCircle size={16} className="text-red-500" />}
                                  {file.status === 'uploading' && <span className="text-xs font-bold text-brand-600">{Math.round(file.progress)}%</span>}
                              </div>
                          </div>
                          {file.status === 'uploading' && (
                              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-brand-500 rounded-full transition-all duration-300"
                                    style={{ width: `${file.progress}%` }}
                                  ></div>
                              </div>
                          )}
                      </div>
                  ))}
              </div>
          </div>
      )}

      {/* Download Toast Simulation */}
      {downloadingFile && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-4 flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Downloading "{downloadingFile}"...</span>
          </div>
      )}
    </div>
  );
};

export default Drive;

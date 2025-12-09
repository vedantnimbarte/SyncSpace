
import React, { useState } from 'react';
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
    Filter
} from 'lucide-react';
import { AppView, FileItem } from '../../types';

const Drive: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const files: FileItem[] = [
    { id: '1', title: 'Marketing Assets', type: AppView.DRIVE, lastModified: '2025-12-01', owner: 'Me', folder: true, size: '--' },
    { id: '2', title: 'Q1 Reports', type: AppView.DRIVE, lastModified: '2025-11-20', owner: 'Me', folder: true, size: '--' },
    { id: '3', title: 'Project Archive', type: AppView.DRIVE, lastModified: '2025-10-15', owner: 'Admin', folder: true, size: '--' },
    { id: '4', title: 'Q2 Roadmap.docx', type: AppView.DOCS, lastModified: '2025-12-14', owner: 'Me', size: '2.4 MB', starred: true },
    { id: '5', title: 'Budget 2026.xlsx', type: AppView.SHEETS, lastModified: '2025-12-12', owner: 'Raj', size: '1.1 MB' },
    { id: '6', title: 'UX Flow.canvas', type: AppView.CANVAS, lastModified: '2025-12-10', owner: 'Sarah', size: '5.6 MB' },
    { id: '7', title: 'Pitch Deck.pptx', type: AppView.PRESENTATIONS, lastModified: '2025-12-08', owner: 'Me', size: '12 MB', starred: true },
    { id: '8', title: 'Campaign Brief.docx', type: AppView.DOCS, lastModified: '2025-12-05', owner: 'Marketing', size: '840 KB' },
  ];

  const getIcon = (item: FileItem) => {
      if (item.folder) return <Folder size={viewMode === 'grid' ? 40 : 20} className="text-blue-400 fill-blue-50" />;
      switch (item.type) {
          case AppView.DOCS: return <FileText size={viewMode === 'grid' ? 40 : 20} className="text-blue-500" />;
          case AppView.SHEETS: return <Table2 size={viewMode === 'grid' ? 40 : 20} className="text-green-500" />;
          case AppView.CANVAS: return <PenTool size={viewMode === 'grid' ? 40 : 20} className="text-purple-500" />;
          case AppView.PRESENTATIONS: return <PenTool size={viewMode === 'grid' ? 40 : 20} className="text-orange-500" />; // Fallback icon or add Presentation icon import
          default: return <FileText size={viewMode === 'grid' ? 40 : 20} className="text-gray-500" />;
      }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Drive Toolbar */}
      <div className="border-b border-gray-100 px-6 py-3 flex items-center justify-between bg-white sticky top-0 z-10">
         <div className="flex items-center gap-2 text-sm text-gray-500">
             <span className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">My Drive</span>
             <ChevronRight size={14} />
             <span className="font-semibold text-gray-900 px-2 py-1 rounded cursor-pointer bg-gray-50">Marketing</span>
         </div>
         
         <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Grid size={16} />
                </button>
                <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <ListIcon size={16} />
                </button>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors">
                <Filter size={16} />
                Filter
            </button>
         </div>
      </div>

      {/* File Content */}
      <div className="flex-1 overflow-y-auto p-6">
        
        {/* Quick Access / Suggested */}
        <div className="mb-8">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Suggested</h2>
            <div className="grid grid-cols-4 gap-4">
                {files.filter(f => f.starred).map(file => (
                    <div key={file.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-center gap-4 cursor-pointer">
                        <div className="p-2 bg-gray-50 rounded-lg">
                            {getIcon(file)}
                        </div>
                        <div className="overflow-hidden">
                            <h4 className="font-semibold text-gray-800 text-sm truncate">{file.title}</h4>
                            <p className="text-xs text-gray-400 mt-0.5">Edited {file.lastModified}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* All Files */}
        <div>
            <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Files & Folders</h2>
                <ArrowDown size={12} className="text-gray-400" />
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {files.map(file => (
                        <div key={file.id} className="group relative bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-100 transition-all cursor-pointer flex flex-col aspect-[4/3.5]">
                            <div className="flex justify-between items-start mb-2">
                                <div className={`${file.folder ? '' : 'bg-gray-50'} p-3 rounded-xl flex items-center justify-center w-full h-24`}>
                                   {getIcon(file)}
                                </div>
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1 hover:bg-gray-100 rounded text-gray-500">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-auto">
                                <h3 className="font-semibold text-gray-800 text-sm truncate" title={file.title}>{file.title}</h3>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-[10px] text-gray-400">{file.size}</span>
                                    {file.starred && <Star size={10} className="fill-orange-400 text-orange-400" />}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase w-1/2">Name</th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Owner</th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Last Modified</th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Size</th>
                                <th className="w-10"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map(file => (
                                <tr key={file.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/80 transition-colors cursor-pointer group">
                                    <td className="py-3 px-4 flex items-center gap-3">
                                        {getIcon(file)}
                                        <span className="text-sm font-medium text-gray-700">{file.title}</span>
                                        {file.starred && <Star size={12} className="fill-orange-400 text-orange-400 ml-2" />}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-500">{file.owner}</td>
                                    <td className="py-3 px-4 text-sm text-gray-500">{file.lastModified}</td>
                                    <td className="py-3 px-4 text-sm text-gray-500">{file.size}</td>
                                    <td className="py-3 px-4">
                                        <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded text-gray-500">
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
    </div>
  );
};

export default Drive;

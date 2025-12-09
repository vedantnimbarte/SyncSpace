import React from 'react';
import { Play, Plus, Clock, FileText, Mail, ArrowRight, Settings2, MoreVertical } from 'lucide-react';
import { WorkflowNode } from '../types';

const Workflows: React.FC = () => {
  const nodes: WorkflowNode[] = [
    { id: '1', type: 'trigger', label: 'Every Monday @ 9AM', x: 100, y: 300, status: 'success' },
    { id: '2', type: 'action', label: 'Fetch Sales Data', x: 400, y: 300, status: 'success' },
    { id: '3', type: 'condition', label: 'Revenue > Target?', x: 700, y: 300, status: 'pending' },
    { id: '4', type: 'action', label: 'Send Slack Alert', x: 1000, y: 150, status: 'pending' },
    { id: '5', type: 'action', label: 'Generate Report', x: 1000, y: 450, status: 'pending' },
  ];

  const renderNodeIcon = (type: string, label: string) => {
    if (type === 'trigger') return <Clock size={16} className="text-purple-600" />;
    if (label.includes('Slack')) return <div className="w-4 h-4 bg-red-500 rounded-sm"></div>; // Mock slack icon
    if (label.includes('Report')) return <FileText size={16} className="text-blue-600" />;
    return <Settings2 size={16} className="text-gray-600" />;
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
           <div className="flex items-center gap-2 mb-1">
             <h2 className="text-lg font-bold text-gray-900">Weekly Revenue Report</h2>
             <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">Active</span>
           </div>
           <p className="text-xs text-gray-500">Last run: Today at 9:01 AM</p>
        </div>
        <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                <Clock size={16} />
                History
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                <Play size={16} />
                Run Now
            </button>
        </div>
      </div>

      {/* Editor Canvas */}
      <div className="flex-1 relative overflow-auto custom-scrollbar">
        <svg className="w-full h-[1000px] min-w-[1200px]">
           {/* Connecting Lines */}
           <path d="M 300 340 L 400 340" stroke="#CBD5E1" strokeWidth="2" />
           <path d="M 600 340 L 700 340" stroke="#CBD5E1" strokeWidth="2" />
           {/* Branching */}
           <path d="M 900 340 C 950 340, 950 190, 1000 190" stroke="#CBD5E1" strokeWidth="2" fill="none" />
           <path d="M 900 340 C 950 340, 950 490, 1000 490" stroke="#CBD5E1" strokeWidth="2" fill="none" />
           
           {/* Logic Labels */}
           <rect x="920" y="240" width="40" height="20" rx="4" fill="#F0FDF4" stroke="#86EFAC" />
           <text x="940" y="253" textAnchor="middle" className="text-[10px] fill-green-700 font-bold">YES</text>

           <rect x="920" y="420" width="40" height="20" rx="4" fill="#FEF2F2" stroke="#FECACA" />
           <text x="940" y="433" textAnchor="middle" className="text-[10px] fill-red-700 font-bold">NO</text>
        </svg>

        {/* Nodes Layered on Top */}
        {nodes.map((node) => (
            <div 
                key={node.id}
                className="absolute w-48 bg-white rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)] border border-gray-200 p-0 hover:border-brand-400 transition-colors group"
                style={{ left: node.x, top: node.y }}
            >
                <div className="flex items-center justify-between p-3 border-b border-gray-50">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-gray-50 rounded-lg">
                            {renderNodeIcon(node.type, node.label)}
                        </div>
                        <span className="font-semibold text-sm text-gray-800">{node.label}</span>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity">
                        <MoreVertical size={14} />
                    </button>
                </div>
                <div className="p-2 bg-gray-50/50 rounded-b-xl flex justify-between items-center">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">{node.type}</span>
                    {node.status === 'success' && <div className="w-2 h-2 rounded-full bg-green-500" />}
                    {node.status === 'pending' && <div className="w-2 h-2 rounded-full bg-gray-300" />}
                </div>
            </div>
        ))}

        {/* Floating Add Button */}
        <div className="absolute right-8 bottom-8">
             <button className="w-12 h-12 bg-brand-600 hover:bg-brand-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105">
                 <Plus size={24} />
             </button>
        </div>
      </div>
    </div>
  );
};

export default Workflows;
import React from 'react';
import { Bold, Italic, Underline, List, AlignLeft, Image as ImageIcon, Download, Share2 } from 'lucide-react';

const Docs: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-2 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-lg border border-gray-100">
          <button className="p-1.5 hover:bg-white hover:shadow-sm rounded text-gray-600 transition-all"><Bold size={16} /></button>
          <button className="p-1.5 hover:bg-white hover:shadow-sm rounded text-gray-600 transition-all"><Italic size={16} /></button>
          <button className="p-1.5 hover:bg-white hover:shadow-sm rounded text-gray-600 transition-all"><Underline size={16} /></button>
          <div className="w-px h-4 bg-gray-300 mx-1"></div>
          <button className="p-1.5 hover:bg-white hover:shadow-sm rounded text-gray-600 transition-all"><AlignLeft size={16} /></button>
          <button className="p-1.5 hover:bg-white hover:shadow-sm rounded text-gray-600 transition-all"><List size={16} /></button>
          <div className="w-px h-4 bg-gray-300 mx-1"></div>
          <button className="p-1.5 hover:bg-white hover:shadow-sm rounded text-gray-600 transition-all"><ImageIcon size={16} /></button>
        </div>
        
        <div className="flex items-center gap-2">
           <span className="text-xs text-gray-400 mr-2">Last saved just now</span>
           <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition-colors">
              <Download size={16} />
              Export
           </button>
           <button className="flex items-center gap-2 px-3 py-1.5 bg-brand-600 text-white hover:bg-brand-700 rounded-lg text-sm transition-colors">
              <Share2 size={16} />
              Share
           </button>
        </div>
      </div>

      {/* Editor Surface */}
      <div className="flex-1 overflow-y-auto p-8 flex justify-center">
        <div className="w-full max-w-[850px] bg-white min-h-[1000px] shadow-sm border border-gray-200 p-16 outline-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Q2 Product Roadmap</h1>
          
          <div className="space-y-4 text-gray-800 leading-relaxed">
            <p className="text-gray-500 italic mb-8">Drafted by Alexandra T. on Dec 15, 2025</p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Executive Summary</h2>
            <p>
              The primary focus of Q2 is to consolidate our position in the enterprise market while maintaining our velocity in the SMB segment. We will focus on three key pillars: 
              <span className="bg-yellow-100 px-1 rounded">Performance, Security, and AI Integration.</span>
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Key Initiatives</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Launch of the new collaborative engine (Project Sync).</li>
              <li>Enterprise SSO and audit logs implementation.</li>
              <li>Beta release of the mobile application for iOS.</li>
            </ul>

            <div className="my-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-sm text-blue-800 font-medium">
                Note: The mobile app timeline is contingent on the API stabilization scheduled for Week 4.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Success Metrics</h2>
            <p>
              We are targeting a 20% increase in DAU (Daily Active Users) and a 15% reduction in churn rate for our mid-market customers.
            </p>
             <p className="mt-4">
              <span className="text-gray-400">[cursor]</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
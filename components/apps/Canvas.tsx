import React, { useState } from 'react';
import { MousePointer2, Square, Circle, Type, Image, Hand, Eraser, Minus } from 'lucide-react';

const Canvas: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState('select');
  const [elements, setElements] = useState([
    { id: 1, type: 'rect', x: 100, y: 100, w: 200, h: 120, color: '#FEF3C7', stroke: '#F59E0B', text: 'User Journey' },
    { id: 2, type: 'circle', x: 400, y: 200, w: 140, h: 140, color: '#DBEAFE', stroke: '#3B82F6', text: 'Sign Up' },
    { id: 3, type: 'rect', x: 650, y: 150, w: 180, h: 100, color: '#D1FAE5', stroke: '#10B981', text: 'Onboarding' },
    { id: 4, type: 'sticky', x: 300, y: 400, w: 150, h: 150, color: '#FEE2E2', stroke: 'transparent', text: 'Remember to check GDPR compliance!' },
  ]);

  const tools = [
    { id: 'select', icon: MousePointer2 },
    { id: 'hand', icon: Hand },
    { id: 'rect', icon: Square },
    { id: 'circle', icon: Circle },
    { id: 'text', icon: Type },
    { id: 'line', icon: Minus },
  ];

  return (
    <div className="h-full relative bg-[#F9FAFB] overflow-hidden cursor-crosshair">
      {/* Dot Grid Background */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
            backgroundImage: 'radial-gradient(#9CA3AF 1px, transparent 1px)',
            backgroundSize: '20px 20px'
        }}
      />

      {/* Floating Toolbar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1.5 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-200 flex items-center gap-1 z-10">
        {tools.map((tool) => {
            const Icon = tool.icon;
            return (
                <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`p-2 rounded-lg transition-colors ${
                        selectedTool === tool.id 
                        ? 'bg-brand-100 text-brand-600' 
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                >
                    <Icon size={20} />
                </button>
            )
        })}
      </div>

      {/* Canvas Elements */}
      <svg className="w-full h-full">
         {/* Connections */}
         <path d="M 300 160 L 400 270" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="5,5" fill="none" />
         <path d="M 540 270 L 650 200" stroke="#9CA3AF" strokeWidth="2" fill="none" />

         {/* Shapes */}
         {elements.map((el) => {
            if (el.type === 'rect') {
                return (
                    <g key={el.id} style={{ transform: `translate(${el.x}px, ${el.y}px)` }}>
                        <rect width={el.w} height={el.h} fill={el.color} stroke={el.stroke} strokeWidth="2" rx="8" className="filter drop-shadow-sm" />
                        <text x={el.w/2} y={el.h/2} textAnchor="middle" dominantBaseline="middle" className="text-sm font-medium fill-gray-700 pointer-events-none">{el.text}</text>
                    </g>
                );
            } else if (el.type === 'circle') {
                return (
                    <g key={el.id} style={{ transform: `translate(${el.x}px, ${el.y}px)` }}>
                        <circle cx={el.w/2} cy={el.h/2} r={el.w/2} fill={el.color} stroke={el.stroke} strokeWidth="2" className="filter drop-shadow-sm" />
                        <text x={el.w/2} y={el.h/2} textAnchor="middle" dominantBaseline="middle" className="text-sm font-medium fill-gray-700 pointer-events-none">{el.text}</text>
                    </g>
                );
            } else if (el.type === 'sticky') {
                return (
                     <g key={el.id} style={{ transform: `translate(${el.x}px, ${el.y}px)` }}>
                        <rect width={el.w} height={el.h} fill={el.color} className="filter drop-shadow-md" />
                        <foreignObject width={el.w} height={el.h}>
                            <div className="p-4 text-xs font-handwriting text-gray-800 h-full overflow-hidden leading-relaxed">
                                {el.text}
                            </div>
                        </foreignObject>
                    </g>
                )
            }
            return null;
         })}

         {/* Live Cursor Simulation */}
         <g style={{ transform: 'translate(520px, 320px)' }}>
            <MousePointer2 size={16} fill="#EF4444" color="white" className="drop-shadow-sm" />
            <rect x="12" y="12" width="40" height="20" rx="4" fill="#EF4444" />
            <text x="32" y="26" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Raj</text>
         </g>
      </svg>
    </div>
  );
};

export default Canvas;
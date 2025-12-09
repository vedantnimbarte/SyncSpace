import React, { useState } from 'react';
import { Play, Plus, Image as ImageIcon, Type, Layout } from 'lucide-react';

const Presentations: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { id: 1, title: 'Q2 Strategy', layout: 'title' },
    { id: 2, title: 'Market Analysis', layout: 'content' },
    { id: 3, title: 'Growth Vectors', layout: 'two-col' },
    { id: 4, title: 'Next Steps', layout: 'content' },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-100">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
             <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 flex flex-col items-center gap-1">
                <Plus size={18} />
                <span className="text-[10px]">New Slide</span>
             </button>
             <div className="w-px h-8 bg-gray-200 mx-2"></div>
             <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 flex flex-col items-center gap-1">
                <Layout size={18} />
                <span className="text-[10px]">Layout</span>
             </button>
             <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 flex flex-col items-center gap-1">
                <ImageIcon size={18} />
                <span className="text-[10px]">Media</span>
             </button>
             <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 flex flex-col items-center gap-1">
                <Type size={18} />
                <span className="text-[10px]">Text</span>
             </button>
          </div>
          <div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                <Play size={14} fill="white" />
                Present
            </button>
          </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Slide Sorter */}
        <div className="w-56 bg-white border-r border-gray-200 p-4 overflow-y-auto space-y-4 flex-shrink-0">
             {slides.map((slide, idx) => (
                <div 
                    key={slide.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`cursor-pointer group relative ${currentSlide === idx ? 'ring-2 ring-brand-500' : ''}`}
                >
                    <div className="aspect-video bg-white border border-gray-200 shadow-sm rounded flex items-center justify-center overflow-hidden">
                        <div className="transform scale-[0.25] origin-center w-full text-center">
                            <h1 className="text-4xl font-bold text-gray-800">{slide.title}</h1>
                            <div className="mt-4 w-3/4 h-2 bg-gray-200 mx-auto rounded"></div>
                            <div className="mt-2 w-1/2 h-2 bg-gray-200 mx-auto rounded"></div>
                        </div>
                    </div>
                    <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-xs font-medium text-gray-400 w-4 text-right">
                        {idx + 1}
                    </span>
                </div>
             ))}
        </div>

        {/* Main Stage */}
        <div className="flex-1 bg-gray-100 p-12 flex items-center justify-center overflow-auto">
             <div className="aspect-video w-full max-w-4xl bg-white shadow-2xl rounded-sm p-16 flex flex-col relative">
                 {/* Slide Content */}
                 {slides[currentSlide].layout === 'title' && (
                     <div className="flex-1 flex flex-col justify-center items-center text-center">
                         <h1 className="text-6xl font-bold text-gray-900 tracking-tight mb-6">{slides[currentSlide].title}</h1>
                         <p className="text-xl text-gray-500">Confidential - Internal Use Only</p>
                     </div>
                 )}
                 {slides[currentSlide].layout !== 'title' && (
                     <div>
                         <h2 className="text-4xl font-bold text-gray-900 mb-8">{slides[currentSlide].title}</h2>
                         <div className="grid grid-cols-2 gap-8">
                             <div className="space-y-4">
                                 <div className="w-full h-4 bg-gray-100 rounded animate-pulse"></div>
                                 <div className="w-full h-4 bg-gray-100 rounded animate-pulse"></div>
                                 <div className="w-3/4 h-4 bg-gray-100 rounded animate-pulse"></div>
                             </div>
                             <div className="bg-brand-50 rounded-xl flex items-center justify-center h-64 border-2 border-dashed border-brand-200">
                                 <span className="text-brand-400 font-medium">Chart / Image Placeholder</span>
                             </div>
                         </div>
                     </div>
                 )}

                 {/* Resize Handles (Visual only) */}
                 <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-500 -mt-1 -ml-1"></div>
                 <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-500 -mt-1 -mr-1"></div>
                 <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-500 -mb-1 -ml-1"></div>
                 <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-500 -mb-1 -mr-1"></div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Presentations;
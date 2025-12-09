import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Filter, ArrowUpDown, Plus } from 'lucide-react';

const data = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 2000, expenses: 9800 },
  { name: 'Apr', revenue: 2780, expenses: 3908 },
  { name: 'May', revenue: 1890, expenses: 4800 },
  { name: 'Jun', revenue: 2390, expenses: 3800 },
  { name: 'Jul', revenue: 3490, expenses: 4300 },
];

const Sheets: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Formula Bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-200 bg-gray-50">
        <div className="text-gray-400 font-mono text-xs w-8 text-center">fx</div>
        <div className="flex-1 bg-white border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 font-mono">
          =SUM(B2:B8)
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Split View: Chart Top, Grid Bottom (or Side by Side depending on need, sticking to vertical stack for clarity) */}
        <div className="h-1/3 border-b border-gray-200 p-6 bg-white flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                    cursor={{fill: '#F3F4F6'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                />
                <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="w-12 border-r border-gray-200 p-2 text-xs text-gray-500 font-normal"></th>
                <th className="border-r border-gray-200 p-2 text-xs text-gray-600 font-semibold text-left w-32 bg-brand-50/50">
                  <div className="flex items-center justify-between">Month <ArrowUpDown size={12} /></div>
                </th>
                <th className="border-r border-gray-200 p-2 text-xs text-gray-600 font-semibold text-left w-32">
                  <div className="flex items-center justify-between">Revenue <Filter size={12} /></div>
                </th>
                <th className="border-r border-gray-200 p-2 text-xs text-gray-600 font-semibold text-left w-32">
                   <div className="flex items-center justify-between">Expenses <Filter size={12} /></div>
                </th>
                <th className="border-r border-gray-200 p-2 text-xs text-gray-600 font-semibold text-left w-32">
                    Profit
                </th>
                <th className="border-r border-gray-200 bg-white"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors group">
                  <td className="border-r border-gray-200 p-2 text-xs text-gray-400 text-center bg-gray-50">{i + 1}</td>
                  <td className="border-r border-gray-200 p-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-brand-500 inset-0">{row.name}</td>
                  <td className="border-r border-gray-200 p-2 text-sm text-right text-gray-800 font-mono">${row.revenue.toLocaleString()}</td>
                  <td className="border-r border-gray-200 p-2 text-sm text-right text-gray-800 font-mono">${row.expenses.toLocaleString()}</td>
                  <td className="border-r border-gray-200 p-2 text-sm text-right font-mono font-medium" style={{ color: row.revenue - row.expenses > 0 ? '#10B981' : '#EF4444' }}>
                    ${(row.revenue - row.expenses).toLocaleString()}
                  </td>
                  <td className="border-r border-gray-200"></td>
                </tr>
              ))}
               {/* Empty Rows Filler */}
               {[...Array(10)].map((_, i) => (
                <tr key={`empty-${i}`} className="border-b border-gray-100">
                  <td className="border-r border-gray-200 p-2 text-xs text-gray-400 text-center bg-gray-50">{data.length + 1 + i}</td>
                  <td className="border-r border-gray-200 p-2"></td>
                  <td className="border-r border-gray-200 p-2"></td>
                  <td className="border-r border-gray-200 p-2"></td>
                  <td className="border-r border-gray-200 p-2"></td>
                  <td className="border-r border-gray-200"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Sheet Tabs */}
        <div className="flex items-center px-2 py-1 bg-gray-100 border-t border-gray-200">
            <button className="px-4 py-1.5 bg-white rounded-t-lg text-sm font-medium text-brand-600 shadow-sm border-t border-l border-r border-gray-200 -mb-2 z-10">Q2 Financials</button>
            <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-200 rounded-t-lg transition-colors ml-1">Projections</button>
            <button className="p-1.5 text-gray-500 hover:text-gray-700"><Plus size={14}/></button>
        </div>
      </div>
    </div>
  );
};

export default Sheets;
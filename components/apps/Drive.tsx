import React, { useState } from "react";
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
} from "lucide-react";
import { AppView, FileItem } from "../../types";

const Drive: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Extended mock data to demonstrate Masonry layout
  const files: FileItem[] = [
    {
      id: "1",
      title: "Marketing Assets",
      type: AppView.DRIVE,
      lastModified: "2025-12-01",
      owner: "Me",
      folder: true,
      size: "--",
      description: "Brand logos and fonts",
    },
    {
      id: "2",
      title: "Q1 Reports",
      type: AppView.DRIVE,
      lastModified: "2025-11-20",
      owner: "Me",
      folder: true,
      size: "--",
      description: "Financial statements",
    },
    {
      id: "3",
      title: "Project Archive",
      type: AppView.DRIVE,
      lastModified: "2025-10-15",
      owner: "Admin",
      folder: true,
      size: "--",
    },
    {
      id: "7",
      title: "Pitch Deck.pptx",
      type: AppView.PRESENTATIONS,
      lastModified: "2025-12-08",
      owner: "Me",
      size: "12 MB",
      starred: true,
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
      description: "Series B funding deck v3",
    },
    {
      id: "4",
      title: "Q2 Roadmap.docx",
      type: AppView.DOCS,
      lastModified: "2025-12-14",
      owner: "Me",
      size: "2.4 MB",
      starred: true,
      description:
        "Strategic initiatives for the upcoming quarter including mobile app launch.",
    },
    {
      id: "6",
      title: "UX Flow.canvas",
      type: AppView.CANVAS,
      lastModified: "2025-12-10",
      owner: "Sarah",
      size: "5.6 MB",
      image:
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80",
    },
    {
      id: "5",
      title: "Budget 2026.xlsx",
      type: AppView.SHEETS,
      lastModified: "2025-12-12",
      owner: "Raj",
      size: "1.1 MB",
    },
    {
      id: "8",
      title: "Campaign Brief.docx",
      type: AppView.DOCS,
      lastModified: "2025-12-05",
      owner: "Marketing",
      size: "840 KB",
    },
    {
      id: "9",
      title: "Team Offsite photos",
      type: AppView.DRIVE,
      lastModified: "2 days ago",
      owner: "Alex",
      size: "45 MB",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
      description: "Photos from the retreat",
    },
    {
      id: "10",
      title: "Q4 Review",
      type: AppView.PRESENTATIONS,
      lastModified: "1 week ago",
      owner: "Exec",
      size: "15 MB",
    },
  ];

  const getIcon = (item: FileItem, size: number = 24) => {
    if (item.folder)
      return <Folder size={size} className="text-amber-400 fill-amber-100" />;
    switch (item.type) {
      case AppView.DOCS:
        return <FileText size={size} className="text-blue-500" />;
      case AppView.SHEETS:
        return <Table2 size={size} className="text-green-500" />;
      case AppView.CANVAS:
        return <PenTool size={size} className="text-purple-500" />;
      case AppView.PRESENTATIONS:
        return <Presentation size={size} className="text-orange-500" />;
      default:
        return <FileText size={size} className="text-gray-400" />;
    }
  };

  const getFileColor = (type: AppView) => {
    switch (type) {
      case AppView.DOCS:
        return "bg-blue-50 text-blue-600";
      case AppView.SHEETS:
        return "bg-green-50 text-green-600";
      case AppView.CANVAS:
        return "bg-purple-50 text-purple-600";
      case AppView.PRESENTATIONS:
        return "bg-orange-50 text-orange-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="h-full flex flex-col bg-transparent">
      {/* Drive Toolbar - Glass Effect */}
      <div className="px-8 py-5 flex items-center justify-between sticky top-0 z-20 bg-white/60 backdrop-blur-xl border-b border-white/20">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="hover:bg-white/50 px-2 py-1 rounded-lg cursor-pointer hover:text-slate-900 transition-colors">
            My Drive
          </span>
          <ChevronRight size={14} />
          <span className="font-semibold text-slate-900 px-2 py-1 rounded-lg cursor-pointer bg-white/50 shadow-sm border border-white/40">
            Marketing
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-white/40 backdrop-blur-sm rounded-xl border border-white/40 shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700 hover:bg-white/50"}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700 hover:bg-white/50"}`}
            >
              <ListIcon size={18} />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/50 hover:bg-white border border-white/40 rounded-xl text-sm font-medium text-slate-600 transition-all shadow-sm hover:shadow-md">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-brand-500/20">
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
            {
              label: "Storage Used",
              value: "45%",
              sub: "22GB of 50GB",
              color: "bg-blue-500",
            },
            {
              label: "Shared Files",
              value: "128",
              sub: "+12 this week",
              color: "bg-purple-500",
            },
            {
              label: "Trash",
              value: "14",
              sub: "Auto-delete in 30 days",
              color: "bg-red-500",
            },
            {
              label: "Offline",
              value: "8",
              sub: "Available locally",
              color: "bg-green-500",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/60 transition-colors cursor-default"
            >
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {stat.label}
                </p>
                <h3 className="text-xl font-bold text-slate-800">
                  {stat.value}
                </h3>
                <p className="text-[10px] text-slate-500 mt-1">{stat.sub}</p>
              </div>
              <div
                className={`w-1.5 h-8 rounded-full ${stat.color} opacity-20 group-hover:opacity-100 transition-opacity`}
              ></div>
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              All Files
            </h2>
            <ArrowDown size={12} className="text-slate-400" />
          </div>

          {viewMode === "grid" ? (
            // Masonry Layout using CSS Columns
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 pb-20">
              {files.map((file, index) => (
                <div
                  key={file.id}
                  className="break-inside-avoid group relative bg-white/60 backdrop-blur-md rounded-3xl p-1 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] hover:bg-white/80 border border-white/50 hover:border-white/80 transition-all duration-500 cursor-pointer overflow-hidden animate-slide-up hover:-translate-y-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Liquid Gloss Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"></div>

                  {/* Image Header if present */}
                  {file.image ? (
                    <div className="rounded-2xl overflow-hidden mb-3 relative">
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                      <img
                        src={file.image}
                        alt={file.title}
                        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Type Badge on Image */}
                      <div className="absolute top-3 left-3 z-20 bg-white/30 backdrop-blur-md p-1.5 rounded-xl border border-white/30 shadow-sm">
                        {getIcon(file, 16)}
                      </div>
                      {file.starred && (
                        <div className="absolute top-3 right-3 z-20 bg-white/30 backdrop-blur-md p-1.5 rounded-full border border-white/30">
                          <Star
                            size={12}
                            className="fill-orange-400 text-orange-400"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    // No Image - Icon Header
                    <div className="flex justify-between items-start p-4 pb-0">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${file.folder ? "bg-amber-100/50" : getFileColor(file.type).replace("text-", "bg-").replace("600", "50")} ${file.folder ? "text-amber-500" : ""}`}
                      >
                        {getIcon(file, 28)}
                      </div>
                      {file.starred && (
                        <Star
                          size={16}
                          className="fill-orange-400 text-orange-400"
                        />
                      )}
                    </div>
                  )}

                  <div className="p-4 pt-2 relative z-10">
                    <h3
                      className="font-bold text-slate-800 text-sm leading-snug mb-1 truncate"
                      title={file.title}
                    >
                      {file.title}
                    </h3>

                    {file.description && (
                      <p className="text-xs text-slate-500 line-clamp-3 mb-3 font-medium opacity-80 leading-relaxed">
                        {file.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/40">
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                        <span>{file.size || "2 MB"}</span>
                        <span>•</span>
                        <span>{file.lastModified}</span>
                      </div>

                      {/* Hover Actions */}
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-200">
                        <button className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-slate-600 shadow-sm">
                          <Share2 size={12} />
                        </button>
                        <button className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-slate-600 shadow-sm">
                          <Download size={12} />
                        </button>
                        <button className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-slate-600 shadow-sm">
                          <MoreHorizontal size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-sm border border-white/50 overflow-hidden animate-slide-up">
              <table className="w-full">
                <thead className="bg-white/40 border-b border-white/40">
                  <tr>
                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/2">
                      Name
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Owner
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Last Modified
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr
                      key={file.id}
                      className="border-b border-white/30 last:border-0 hover:bg-white/60 transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-6 flex items-center gap-4">
                        <div
                          className={`p-2 rounded-xl bg-white/70 shadow-sm ${file.folder ? "text-amber-500" : ""}`}
                        >
                          {getIcon(file, 20)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-700 truncate">
                              {file.title}
                            </span>
                            {file.starred && (
                              <Star
                                size={10}
                                className="fill-orange-400 text-orange-400"
                              />
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-500">
                        {file.owner}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-500">
                        {file.lastModified}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-500">
                        {file.size}
                      </td>
                      <td className="py-4 px-6">
                        <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white rounded-lg text-slate-400 hover:text-slate-600 transition-all shadow-sm">
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

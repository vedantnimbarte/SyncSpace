import React, { useState, useRef } from "react";
import {
  Plus,
  MoreHorizontal,
  Calendar,
  Paperclip,
  MessageSquare,
  Filter,
  User,
  X,
  Check,
  Bold,
  Italic,
  List,
  AlignLeft,
  Image as ImageIcon,
  Link,
  Clock,
  ChevronDown,
  Trash2,
  Smile,
  Tag,
} from "lucide-react";
import { KanbanColumn, KanbanTask } from "../../types";

const Kanban: React.FC = () => {
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);
  const [columns, setColumns] = useState<KanbanColumn[]>([
    {
      id: "todo",
      title: "To Do",
      tasks: [
        {
          id: "t1",
          title: "Research competitor analysis",
          tag: "Strategy",
          tagColor: "bg-blue-100 text-blue-700",
          assignees: ["u1"],
          comments: 2,
          attachments: 1,
        },
        {
          id: "t2",
          title: "Draft user interview questions",
          tag: "Research",
          tagColor: "bg-purple-100 text-purple-700",
          assignees: ["u2"],
          comments: 0,
          attachments: 0,
        },
      ],
    },
    {
      id: "progress",
      title: "In Progress",
      tasks: [
        {
          id: "t3",
          title: "Design system update v2",
          tag: "Design",
          tagColor: "bg-pink-100 text-pink-700",
          assignees: ["u1", "u3"],
          comments: 5,
          attachments: 3,
        },
      ],
    },
    {
      id: "review",
      title: "Review",
      tasks: [
        {
          id: "t4",
          title: "Mobile app accessibility audit",
          tag: "Dev",
          tagColor: "bg-amber-100 text-amber-700",
          assignees: ["u4"],
          comments: 1,
          attachments: 0,
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      tasks: [
        {
          id: "t5",
          title: "Q1 Budget Finalization",
          tag: "Finance",
          tagColor: "bg-green-100 text-green-700",
          assignees: ["u2"],
          comments: 8,
          attachments: 2,
        },
      ],
    },
  ]);

  // Drag and Drop State
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [draggedTaskSourceColumn, setDraggedTaskSourceColumn] = useState<
    string | null
  >(null);
  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);

  // Form State
  const [taskStatus, setTaskStatus] = useState("todo");
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>(["Product"]);
  const [newTag, setNewTag] = useState("");

  const users = [
    {
      id: "u1",
      name: "Sarah Miller",
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    { id: "u2", name: "Raj Patel", avatar: "https://i.pravatar.cc/150?u=raj" },
    { id: "u3", name: "Alex Chen", avatar: "https://i.pravatar.cc/150?u=alex" },
    { id: "u4", name: "You", avatar: "https://picsum.photos/32/32" },
  ];

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const toggleAssignee = (userId: string) => {
    if (selectedAssignees.includes(userId)) {
      setSelectedAssignees(selectedAssignees.filter((id) => id !== userId));
    } else {
      setSelectedAssignees([...selectedAssignees, userId]);
    }
  };

  // Drag Handlers
  const onDragStart = (
    e: React.DragEvent,
    taskId: string,
    sourceColId: string,
  ) => {
    setDraggedTaskId(taskId);
    setDraggedTaskSourceColumn(sourceColId);
    e.dataTransfer.effectAllowed = "move";
    // Create a ghost image if needed, or rely on browser default
    // e.dataTransfer.setDragImage(e.target as Element, 0, 0);
    setTimeout(() => {
      // Optional: add a class to the dragged element to hide it or style it
    }, 0);
  };

  const onDragOver = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    if (dragOverColumnId !== colId) {
      setDragOverColumnId(colId);
    }
  };

  const onDragLeave = (e: React.DragEvent) => {
    // Optional: Logic to clear dragOverColumnId if leaving the valid drop zone completely
  };

  const onDrop = (e: React.DragEvent, targetColId: string) => {
    e.preventDefault();
    setDragOverColumnId(null);

    if (!draggedTaskId || !draggedTaskSourceColumn) return;
    if (draggedTaskSourceColumn === targetColId) return;

    // Find the task
    const sourceCol = columns.find((c) => c.id === draggedTaskSourceColumn);
    const taskToMove = sourceCol?.tasks.find((t) => t.id === draggedTaskId);

    if (sourceCol && taskToMove) {
      setColumns((prev) =>
        prev.map((col) => {
          if (col.id === draggedTaskSourceColumn) {
            return {
              ...col,
              tasks: col.tasks.filter((t) => t.id !== draggedTaskId),
            };
          }
          if (col.id === targetColId) {
            return { ...col, tasks: [...col.tasks, taskToMove] };
          }
          return col;
        }),
      );
    }

    setDraggedTaskId(null);
    setDraggedTaskSourceColumn(null);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50/50 relative overflow-hidden">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-xl font-bold text-gray-900">Sprint 24 Board</h2>
            <div className="flex -space-x-2">
              {users.slice(0, 3).map((u) => (
                <div
                  key={u.id}
                  className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                +4
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 font-medium">
            Oct 24 - Nov 7 • 12 days remaining
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-medium transition-colors">
            <Filter size={16} />
            Filter
          </button>
          <button
            onClick={() => setIsTaskDrawerOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm shadow-brand-200"
          >
            <Plus size={16} />
            New Task
          </button>
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-6 custom-scrollbar">
        <div className="flex h-full gap-6 min-w-max">
          {columns.map((column) => (
            <div
              key={column.id}
              className={`w-80 flex flex-col h-full max-h-full rounded-2xl transition-colors duration-300 ${
                dragOverColumnId === column.id
                  ? "bg-brand-50/50 ring-2 ring-brand-200"
                  : ""
              }`}
              onDragOver={(e) => onDragOver(e, column.id)}
              onDragLeave={onDragLeave}
              onDrop={(e) => onDrop(e, column.id)}
            >
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-700 text-sm">
                    {column.title}
                  </h3>
                  <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full font-medium">
                    {column.tasks.length}
                  </span>
                </div>
                <div className="flex gap-1">
                  <button className="p-1 hover:bg-gray-200 rounded-lg text-gray-400">
                    <Plus size={16} />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded-lg text-gray-400">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 pb-2 space-y-3 custom-scrollbar min-h-[100px]">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, task.id, column.id)}
                    className={`bg-white p-4 rounded-xl border shadow-sm transition-all cursor-grab active:cursor-grabbing group relative ${
                      draggedTaskId === task.id
                        ? "opacity-50 rotate-3 scale-95 shadow-xl border-brand-300 z-20"
                        : "border-gray-200 hover:shadow-md hover:border-brand-300"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${task.tagColor}`}
                      >
                        {task.tag}
                      </span>
                      <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-3 leading-snug">
                      {task.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-1.5">
                        {task.assignees.map((aId, i) => {
                          const u = users.find((u) => u.id === aId);
                          return (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden"
                            >
                              {u ? (
                                <img
                                  src={u.avatar}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <User size={10} className="text-gray-500" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex items-center gap-3 text-gray-400">
                        {(task.comments > 0 || task.attachments > 0) && (
                          <>
                            {task.comments > 0 && (
                              <div className="flex items-center gap-1 text-xs">
                                <MessageSquare size={12} />
                                <span>{task.comments}</span>
                              </div>
                            )}
                            {task.attachments > 0 && (
                              <div className="flex items-center gap-1 text-xs">
                                <Paperclip size={12} />
                                <span>{task.attachments}</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setTaskStatus(column.id);
                    setIsTaskDrawerOpen(true);
                  }}
                  className="w-full py-2 flex items-center justify-center gap-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 rounded-xl border border-dashed border-gray-300 transition-colors text-sm font-medium"
                >
                  <Plus size={16} />
                  Add Task
                </button>
              </div>
            </div>
          ))}
          <div className="w-80 flex-shrink-0 pt-10 px-4">
            <button className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors">
              <Plus size={18} />
              Add Section
            </button>
          </div>
        </div>
      </div>

      {/* Task Drawer Backdrop */}
      {isTaskDrawerOpen && (
        <div
          className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsTaskDrawerOpen(false)}
        ></div>
      )}

      {/* Task Drawer - Slide from Right */}
      <div
        className={`absolute top-0 right-0 h-full w-[600px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isTaskDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-gray-100 rounded text-xs font-mono text-gray-500">
              PROJ-124
            </div>
            <div className="h-4 w-px bg-gray-200"></div>
            <div className="flex items-center text-sm text-gray-500">
              <span>Last updated just now</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
              <MoreHorizontal size={18} />
            </button>
            <button
              onClick={() => setIsTaskDrawerOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="space-y-8">
            {/* Title & Status */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                className="w-full text-3xl font-bold text-gray-900 placeholder-gray-300 border-none outline-none bg-transparent"
                autoFocus
              />

              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <option value="todo">To Do</option>
                    <option value="progress">In Progress</option>
                    <option value="review">In Review</option>
                    <option value="done">Done</option>
                  </select>
                  <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                    <ChevronDown size={14} />
                  </div>
                </div>

                <div className="h-6 w-px bg-gray-200"></div>

                {/* Assignee Selector */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setShowAssigneeDropdown(!showAssigneeDropdown)
                    }
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-500 text-sm transition-all"
                  >
                    <User size={14} />
                    <span>
                      {selectedAssignees.length > 0
                        ? `${selectedAssignees.length} Assignees`
                        : "Assign"}
                    </span>
                  </button>

                  {showAssigneeDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-20 animate-in fade-in zoom-in-95">
                      <input
                        type="text"
                        placeholder="Search people..."
                        className="w-full px-3 py-2 bg-gray-50 rounded-lg text-sm border-none outline-none mb-2"
                      />
                      <div className="space-y-1">
                        {users.map((user) => (
                          <button
                            key={user.id}
                            onClick={() => toggleAssignee(user.id)}
                            className="w-full flex items-center justify-between px-2 py-1.5 hover:bg-gray-50 rounded-lg transition-colors group"
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={user.avatar}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                              <span className="text-sm text-gray-700">
                                {user.name}
                              </span>
                            </div>
                            {selectedAssignees.includes(user.id) && (
                              <Check size={14} className="text-brand-600" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description WYSIWYG */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <AlignLeft size={14} /> Description
              </h3>
              <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
                <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex items-center gap-1">
                  <button className="p-1.5 hover:bg-gray-200 rounded text-gray-500">
                    <Bold size={14} />
                  </button>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-gray-500">
                    <Italic size={14} />
                  </button>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-gray-500">
                    <List size={14} />
                  </button>
                  <div className="w-px h-4 bg-gray-300 mx-1"></div>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-gray-500">
                    <Link size={14} />
                  </button>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-gray-500">
                    <ImageIcon size={14} />
                  </button>
                </div>
                <textarea
                  rows={6}
                  placeholder="Add a detailed description..."
                  className="w-full p-4 text-sm text-gray-700 outline-none resize-none bg-white"
                ></textarea>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Tags */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Tag size={14} /> Tags
                </h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium flex items-center gap-1 group"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="opacity-0 group-hover:opacity-100 hover:text-red-500"
                      >
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="+ Add tag"
                    className="bg-transparent text-sm outline-none w-24 placeholder-gray-400 focus:placeholder-gray-300"
                  />
                </div>
              </div>

              {/* Attachments */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Paperclip size={14} /> Attachments
                </h3>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <p className="text-xs text-gray-500">
                    Drag files here or{" "}
                    <span className="text-brand-600 font-medium">browse</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <MessageSquare size={14} /> Activity
              </h3>

              <div className="space-y-6">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-xs font-bold">
                    AT
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-xl rounded-tl-none p-3 border border-gray-100">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-gray-700">
                          Alexandra T.
                        </span>
                        <span className="text-[10px] text-gray-400">
                          2h ago
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Initial requirements gathered. Waiting for design
                        review.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src="https://i.pravatar.cc/150?u=sarah"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <textarea
                        rows={2}
                        placeholder="Write a comment..."
                        className="w-full bg-white border border-gray-200 rounded-xl p-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition-all resize-none"
                      />
                      <div className="absolute right-2 bottom-2 flex gap-1">
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Smile size={16} />
                        </button>
                        <button className="p-1 text-brand-600 hover:text-brand-700">
                          <Check size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 sticky bottom-0">
          <button
            onClick={() => setIsTaskDrawerOpen(false)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setIsTaskDrawerOpen(false)}
            className="px-6 py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700 shadow-sm transition-colors"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Kanban;

import React from 'react';

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  DOCS = 'DOCS',
  SHEETS = 'SHEETS',
  CANVAS = 'CANVAS',
  PRESENTATIONS = 'PRESENTATIONS',
  WORKFLOWS = 'WORKFLOWS',
  PROJECTS = 'PROJECTS',
  DRIVE = 'DRIVE',
  CHAT = 'CHAT',
  CALLS = 'CALLS',
  VIEW_ALL = 'VIEW_ALL',
  SETTINGS = 'SETTINGS',
}

export interface FileItem {
  id: string;
  title: string;
  type: AppView;
  lastModified: string;
  owner: string;
  thumbnail?: string;
  folder?: boolean;
  size?: string;
  starred?: boolean;
  description?: string;
  image?: string;
  progress?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition';
  label: string;
  x: number;
  y: number;
  status?: 'success' | 'pending' | 'error';
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

export interface FileSystemItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: FileSystemItem[];
  appType?: AppView;
  isOpen?: boolean;
}

export interface KanbanTask {
  id: string;
  title: string;
  tag: string;
  tagColor: string;
  assignees: string[];
  comments: number;
  attachments: number;
}

export interface KanbanColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
}

export interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  prompt: string;
}

export interface SidebarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}
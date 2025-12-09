
import React, { useState } from 'react';
import { 
  Inbox, 
  Send, 
  File, 
  Trash2, 
  Archive, 
  Star, 
  MoreHorizontal, 
  Search, 
  Plus, 
  RefreshCcw, 
  Paperclip, 
  Smile, 
  Reply, 
  ReplyAll, 
  Forward,
  ChevronLeft,
  ChevronRight,
  Tag,
  ChevronDown,
  FileText,
  X,
  Image as ImageIcon
} from 'lucide-react';

interface Email {
    id: string;
    sender: string;
    subject: string;
    preview: string;
    date: string;
    isUnread: boolean;
    isStarred: boolean;
    tag?: { label: string; color: string };
    avatar: string;
    body: string;
}

const Email: React.FC = () => {
    const [selectedFolder, setSelectedFolder] = useState('inbox');
    const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
    const [isComposeOpen, setIsComposeOpen] = useState(false);

    // Mock Data
    const emails: Email[] = [
        { 
            id: '1', 
            sender: 'Sarah Miller', 
            subject: 'Q2 Roadmap Review Meeting', 
            preview: 'Hi team, just wanted to confirm the time for our roadmap review tomorrow...', 
            date: '10:45 AM', 
            isUnread: true, 
            isStarred: true,
            tag: { label: 'Work', color: 'bg-blue-100 text-blue-700' },
            avatar: 'https://i.pravatar.cc/150?u=sarah',
            body: `Hi team,

Just wanted to confirm the time for our roadmap review tomorrow. We will be going over the Q2 strategic initiatives and finalizing the feature set for the mobile app launch.

Please review the attached documents before the meeting.

Best,
Sarah`
        },
        { 
            id: '2', 
            sender: 'Raj Patel', 
            subject: 'Updated Design Assets', 
            preview: 'I have uploaded the new icons to the shared drive. Let me know if you need...', 
            date: 'Yesterday', 
            isUnread: false, 
            isStarred: false,
            tag: { label: 'Design', color: 'bg-purple-100 text-purple-700' },
            avatar: 'https://i.pravatar.cc/150?u=raj',
            body: `Hey everyone,

I have uploaded the new icons to the shared drive. These include the updated navigation set and the new empty state illustrations.

Let me know if you need exports in different formats.

Cheers,
Raj`
        },
        { 
            id: '3', 
            sender: 'Acme HR', 
            subject: 'Holiday Schedule Update', 
            preview: 'Please note the following changes to the holiday schedule for the upcoming...', 
            date: 'Dec 12', 
            isUnread: false, 
            isStarred: false,
            avatar: '',
            body: `Dear Team,

Please note the following changes to the holiday schedule for the upcoming quarter. The office will be closed on...`
        },
         { 
            id: '4', 
            sender: 'Alex Chen', 
            subject: 'Feedback on Sprint 24', 
            preview: 'Great work on the last sprint. I think we can improve our velocity by...', 
            date: 'Dec 10', 
            isUnread: true, 
            isStarred: true,
             tag: { label: 'Urgent', color: 'bg-red-100 text-red-700' },
            avatar: 'https://i.pravatar.cc/150?u=alex',
            body: `Great work on the last sprint. I think we can improve our velocity by simplifying the QA process for minor UI tweaks.`
        },
    ];

    const folders = [
        { id: 'inbox', label: 'Inbox', icon: Inbox, count: 2 },
        { id: 'starred', label: 'Starred', icon: Star, count: 0 },
        { id: 'sent', label: 'Sent', icon: Send, count: 0 },
        { id: 'drafts', label: 'Drafts', icon: File, count: 1 },
        { id: 'archive', label: 'Archive', icon: Archive, count: 0 },
        { id: 'trash', label: 'Trash', icon: Trash2, count: 0 },
    ];

    const toggleStar = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        // Mock toggle logic would go here
    };

    return (
        <div className="h-full flex bg-white/50 backdrop-blur-sm relative overflow-hidden">
            
            {/* Sidebar */}
            <div className="w-60 bg-gray-50/80 border-r border-gray-200 flex flex-col pt-6 pb-4">
                <div className="px-4 mb-6">
                    <button 
                        onClick={() => setIsComposeOpen(true)}
                        className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 font-semibold transition-all hover:scale-[1.02]"
                    >
                        <Plus size={20} />
                        Compose
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-3 space-y-1">
                    {folders.map(folder => (
                        <button
                            key={folder.id}
                            onClick={() => setSelectedFolder(folder.id)}
                            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                selectedFolder === folder.id 
                                ? 'bg-white shadow-sm text-brand-700' 
                                : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <folder.icon size={18} className={selectedFolder === folder.id ? 'text-brand-600' : 'text-gray-400'} />
                                {folder.label}
                            </div>
                            {folder.count > 0 && (
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                    selectedFolder === folder.id ? 'bg-brand-100 text-brand-600' : 'bg-gray-200 text-gray-600'
                                }`}>
                                    {folder.count}
                                </span>
                            )}
                        </button>
                    ))}

                    <div className="pt-6 mt-2 px-4">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Labels</h3>
                        <div className="space-y-2">
                             {['Work', 'Design', 'Personal', 'Urgent'].map(label => (
                                 <button key={label} className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 w-full p-1 rounded-lg hover:bg-white/40 transition-colors">
                                     <Tag size={14} className="text-gray-400" />
                                     {label}
                                 </button>
                             ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Message List */}
            <div className={`w-80 bg-white border-r border-gray-200 flex flex-col ${selectedEmail ? 'hidden lg:flex' : 'flex'}`}>
                {/* Search Header */}
                <div className="h-16 px-4 border-b border-gray-100 flex items-center gap-2">
                    <div className="relative flex-1">
                        <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search mail" 
                            className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-100 transition-all placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {emails.map(email => (
                        <div 
                            key={email.id}
                            onClick={() => setSelectedEmail(email)}
                            className={`p-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50/80 transition-all group ${
                                selectedEmail?.id === email.id ? 'bg-brand-50/50 hover:bg-brand-50/50' : ''
                            } ${email.isUnread ? 'bg-white' : 'bg-gray-50/30'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center gap-2">
                                    {email.isUnread && <div className="w-2 h-2 rounded-full bg-brand-500"></div>}
                                    <h4 className={`text-sm text-gray-900 truncate max-w-[140px] ${email.isUnread ? 'font-bold' : 'font-medium'}`}>
                                        {email.sender}
                                    </h4>
                                </div>
                                <span className={`text-xs ${email.isUnread ? 'text-brand-600 font-bold' : 'text-gray-400'}`}>{email.date}</span>
                            </div>
                            
                            <h5 className={`text-sm mb-1 truncate ${email.isUnread ? 'text-gray-800 font-semibold' : 'text-gray-600'}`}>
                                {email.subject}
                            </h5>
                            
                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-2">
                                {email.preview}
                            </p>

                            <div className="flex items-center justify-between">
                                {email.tag ? (
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${email.tag.color}`}>
                                        {email.tag.label}
                                    </span>
                                ) : <div></div>}
                                
                                <button 
                                    onClick={(e) => toggleStar(e, email.id)}
                                    className={`p-1 rounded-full hover:bg-white transition-colors ${
                                        email.isStarred ? 'text-orange-400 fill-orange-400' : 'text-gray-300 hover:text-orange-400'
                                    }`}
                                >
                                    <Star size={14} className={email.isStarred ? 'fill-orange-400' : ''} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reading Pane */}
            <div className={`flex-1 flex-col bg-white ${selectedEmail ? 'flex' : 'hidden lg:flex'}`}>
                {selectedEmail ? (
                    <>
                        {/* Reading Header */}
                        <div className="h-16 px-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setSelectedEmail(null)}
                                    className="lg:hidden p-2 hover:bg-gray-100 rounded-full text-gray-500"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800" title="Archive"><Archive size={18} /></button>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800" title="Trash"><Trash2 size={18} /></button>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800" title="Mark as Unread"><File size={18} /></button>
                                    <div className="w-px h-6 bg-gray-200 mx-1 my-auto"></div>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800"><ChevronLeft size={18} /></button>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800"><ChevronRight size={18} /></button>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">1 of 34</span>
                            </div>
                        </div>

                        {/* Mail Content */}
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            <div className="flex justify-between items-start mb-6">
                                <h1 className="text-2xl font-bold text-gray-900 leading-tight">{selectedEmail.subject}</h1>
                                <div className="flex gap-2">
                                    {selectedEmail.tag && (
                                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wide ${selectedEmail.tag.color}`}>
                                            {selectedEmail.tag.label}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                                <div className="flex items-center gap-4">
                                    {selectedEmail.avatar ? (
                                        <img src={selectedEmail.avatar} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-100 to-purple-100 flex items-center justify-center text-brand-600 font-bold text-lg">
                                            {selectedEmail.sender.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <div className="flex items-baseline gap-2">
                                            <h3 className="text-sm font-bold text-gray-900">{selectedEmail.sender}</h3>
                                            <span className="text-xs text-gray-500">&lt;sarah@acme.com&gt;</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                                            <span>to me</span>
                                            <ChevronDown size={10} />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-sm text-gray-500 font-medium">Dec 15, 10:45 AM (2 hours ago)</span>
                                    <div className="flex gap-1">
                                        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"><Star size={16} /></button>
                                        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"><Reply size={16} /></button>
                                        <button className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600"><MoreHorizontal size={16} /></button>
                                    </div>
                                </div>
                            </div>

                            <div className="text-gray-800 leading-relaxed space-y-4 whitespace-pre-wrap font-serif text-lg">
                                {selectedEmail.body}
                            </div>

                            {/* Attachments Area if needed */}
                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <h4 className="text-sm font-bold text-gray-900 mb-4">2 Attachments</h4>
                                <div className="flex gap-4">
                                     <div className="w-48 p-3 border border-gray-200 rounded-xl hover:shadow-md transition-all cursor-pointer bg-gray-50/50">
                                         <div className="h-24 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                                             <FileText className="text-gray-400" />
                                         </div>
                                         <p className="text-sm font-medium text-gray-700 truncate">Q2_Roadmap.pdf</p>
                                         <p className="text-xs text-gray-400">2.4 MB</p>
                                     </div>
                                     <div className="w-48 p-3 border border-gray-200 rounded-xl hover:shadow-md transition-all cursor-pointer bg-gray-50/50">
                                         <div className="h-24 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
                                             <FileText className="text-gray-400" />
                                         </div>
                                         <p className="text-sm font-medium text-gray-700 truncate">Meeting_Notes.docx</p>
                                         <p className="text-xs text-gray-400">145 KB</p>
                                     </div>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-3">
                                <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                                    <Reply size={16} /> Reply
                                </button>
                                <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                                    <ReplyAll size={16} /> Reply All
                                </button>
                                <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                                    <Forward size={16} /> Forward
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Inbox size={48} className="opacity-50" />
                        </div>
                        <p className="text-lg font-medium">Select an item to read</p>
                    </div>
                )}
            </div>

            {/* Compose Modal */}
            {isComposeOpen && (
                <div className="absolute bottom-0 right-10 w-[600px] h-[500px] bg-white rounded-t-2xl shadow-2xl border border-gray-200 flex flex-col z-50 animate-in slide-in-from-bottom-10">
                    <div className="px-4 py-3 bg-gray-900 text-white rounded-t-xl flex justify-between items-center">
                        <span className="font-semibold text-sm">New Message</span>
                        <div className="flex gap-2">
                             <button onClick={() => setIsComposeOpen(false)} className="hover:bg-white/20 p-1 rounded"><MoreHorizontal size={14} /></button>
                             <button onClick={() => setIsComposeOpen(false)} className="hover:bg-white/20 p-1 rounded"><X size={14} /></button>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col p-4 overflow-hidden">
                        <input type="text" placeholder="Recipients" className="w-full py-2 border-b border-gray-100 focus:outline-none text-sm" />
                        <input type="text" placeholder="Subject" className="w-full py-2 border-b border-gray-100 focus:outline-none text-sm font-medium" />
                        <textarea className="flex-1 py-4 focus:outline-none resize-none text-sm leading-relaxed" placeholder="Type your message..."></textarea>
                    </div>
                    <div className="p-3 border-t border-gray-100 flex justify-between items-center">
                         <div className="flex gap-2 text-gray-500">
                             <button className="p-2 hover:bg-gray-100 rounded"><Paperclip size={18} /></button>
                             <button className="p-2 hover:bg-gray-100 rounded"><Smile size={18} /></button>
                             <button className="p-2 hover:bg-gray-100 rounded"><ImageIcon size={18} /></button>
                         </div>
                         <div className="flex gap-3 items-center">
                             <button onClick={() => setIsComposeOpen(false)} className="p-2 hover:bg-gray-100 rounded text-gray-500"><Trash2 size={18} /></button>
                             <button onClick={() => setIsComposeOpen(false)} className="px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg shadow-sm flex items-center gap-2">
                                 Send <Send size={14} />
                             </button>
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Email;

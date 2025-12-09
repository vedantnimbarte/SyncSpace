
import React, { useState } from 'react';
import { 
  User, 
  Settings as SettingsIcon, 
  CreditCard, 
  Bell, 
  Shield, 
  Users, 
  Globe, 
  Moon, 
  Smartphone,
  Check,
  Zap,
  Mail,
  Slack
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'integrations', label: 'Integrations', icon: Zap },
  ];

  return (
    <div className="h-full flex bg-white/50 backdrop-blur-sm">
      {/* Settings Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-white/60 p-6 flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">Settings</h2>
        
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-brand-50 text-brand-700 shadow-sm'
                : 'text-gray-600 hover:bg-white/60 hover:text-gray-900'
            }`}
          >
            <tab.icon size={18} className={activeTab === tab.id ? 'text-brand-600' : 'text-gray-400'} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-12">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Header */}
          <div>
             <h1 className="text-3xl font-bold text-gray-900 mb-2">{tabs.find(t => t.id === activeTab)?.label}</h1>
             <p className="text-gray-500">Manage your workspace preferences and account details.</p>
          </div>

          {/* GENERAL TAB */}
          {activeTab === 'general' && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                   <h3 className="text-lg font-semibold text-gray-800 mb-4">Workspace Details</h3>
                   <div className="space-y-4">
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Workspace Name</label>
                         <input type="text" defaultValue="Acme Corp" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all" />
                      </div>
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Workspace URL</label>
                         <div className="flex">
                            <span className="px-4 py-2 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-gray-500 text-sm flex items-center">syncspace.app/</span>
                            <input type="text" defaultValue="acme-corp" className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all" />
                         </div>
                      </div>
                   </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                   <h3 className="text-lg font-semibold text-gray-800 mb-4">Appearance</h3>
                   <div className="flex items-center justify-between py-2">
                       <div className="flex items-center gap-3">
                           <div className="p-2 bg-gray-100 rounded-lg text-gray-600"><Moon size={20} /></div>
                           <div>
                               <p className="font-medium text-gray-900">Dark Mode</p>
                               <p className="text-xs text-gray-500">Adjust the appearance of the application</p>
                           </div>
                       </div>
                       <button className="relative w-11 h-6 bg-gray-200 rounded-full transition-colors focus:outline-none">
                            <span className="absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-sm transition-transform"></span>
                       </button>
                   </div>
                   <div className="h-px bg-gray-100 my-4"></div>
                   <div className="flex items-center justify-between py-2">
                       <div className="flex items-center gap-3">
                           <div className="p-2 bg-gray-100 rounded-lg text-gray-600"><Globe size={20} /></div>
                           <div>
                               <p className="font-medium text-gray-900">Language</p>
                               <p className="text-xs text-gray-500">Select your preferred language</p>
                           </div>
                       </div>
                       <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 outline-none">
                           <option>English (US)</option>
                           <option>French</option>
                           <option>Spanish</option>
                       </select>
                   </div>
                </div>
             </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6">
                      <div className="relative">
                          <img src="https://picsum.photos/100/100" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
                          <button className="absolute bottom-0 right-0 p-1.5 bg-brand-600 text-white rounded-full border-2 border-white hover:bg-brand-700 transition-colors shadow-sm">
                              <SettingsIcon size={14} />
                          </button>
                      </div>
                      <div>
                          <h3 className="text-xl font-bold text-gray-900">Alexandra T.</h3>
                          <p className="text-gray-500 text-sm">Product Manager</p>
                          <div className="mt-3 flex gap-2">
                              <button className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors">Change Avatar</button>
                              <button className="px-4 py-1.5 bg-white border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-xs font-semibold transition-colors">Remove</button>
                          </div>
                      </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                              <input type="text" defaultValue="Alexandra" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" />
                          </div>
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                              <input type="text" defaultValue="Thompson" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" />
                          </div>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <input type="email" defaultValue="alex.t@acmecorp.com" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500" />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                          <textarea rows={3} defaultValue="Product enthusiast and design lover." className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none" />
                      </div>
                  </div>
              </div>
          )}

          {/* BILLING TAB */}
          {activeTab === 'billing' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Current Plan Card */}
                  <div className="bg-gradient-to-br from-brand-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                      
                      <div className="flex justify-between items-start relative z-10">
                          <div>
                              <p className="text-brand-100 font-medium mb-1">Current Plan</p>
                              <h2 className="text-3xl font-bold mb-4">Pro Plan</h2>
                              <div className="flex items-center gap-2 text-sm text-brand-100">
                                  <span className="px-2 py-0.5 bg-white/20 rounded text-white font-semibold">$29/mo</span>
                                  <span>•</span>
                                  <span>Billed annually</span>
                              </div>
                          </div>
                          <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                             <Shield size={32} className="text-brand-200" />
                          </div>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-white/10">
                          <div className="flex justify-between text-sm mb-2">
                              <span className="text-brand-100">AI Credits Usage</span>
                              <span className="font-bold">750 / 1000</span>
                          </div>
                          <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-yellow-300 to-orange-400 w-3/4 rounded-full"></div>
                          </div>
                      </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                          <div className="flex items-center gap-4">
                              <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                                  <CreditCard size={24} className="text-gray-600" />
                              </div>
                              <div>
                                  <p className="font-bold text-gray-800">Visa ending in 4242</p>
                                  <p className="text-xs text-gray-500">Expires 12/28</p>
                              </div>
                          </div>
                          <button className="text-sm font-semibold text-brand-600 hover:text-brand-700">Edit</button>
                      </div>
                      <button className="mt-4 w-full py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                          <CreditCard size={16} /> Add Payment Method
                      </button>
                  </div>
              </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Notification Preferences</h3>
                  
                  <div className="space-y-6">
                      <div className="flex items-start gap-4">
                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Mail size={20} /></div>
                          <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                  <p className="font-medium text-gray-900">Email Notifications</p>
                                  <button className="w-10 h-5 bg-brand-600 rounded-full relative"><span className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></span></button>
                              </div>
                              <p className="text-sm text-gray-500">Receive weekly digests and important updates.</p>
                          </div>
                      </div>

                      <div className="h-px bg-gray-100"></div>

                      <div className="flex items-start gap-4">
                          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Smartphone size={20} /></div>
                          <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                  <p className="font-medium text-gray-900">Push Notifications</p>
                                  <button className="w-10 h-5 bg-brand-600 rounded-full relative"><span className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></span></button>
                              </div>
                              <p className="text-sm text-gray-500">Receive mobile push notifications for mentions and tasks.</p>
                          </div>
                      </div>

                      <div className="h-px bg-gray-100"></div>

                      <div className="flex items-start gap-4">
                          <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Slack size={20} /></div>
                          <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                  <p className="font-medium text-gray-900">Slack Notifications</p>
                                  <button className="w-10 h-5 bg-gray-200 rounded-full relative"><span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></span></button>
                              </div>
                              <p className="text-sm text-gray-500">Get updates directly in your team's Slack channel.</p>
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {/* Placeholder for other tabs */}
          {(activeTab === 'team' || activeTab === 'integrations') && (
              <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-gray-100 border-dashed animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="p-4 bg-gray-50 rounded-full mb-4">
                      <SettingsIcon size={32} className="text-gray-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-500">Work in Progress</h3>
                  <p className="text-sm text-gray-400">This section is coming soon.</p>
              </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-4">
              <button className="px-6 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                  <Check size={18} /> Save Changes
              </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;

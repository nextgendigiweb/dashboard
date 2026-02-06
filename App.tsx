
import React, { useState, useEffect, useRef } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import Sidebar from './components/Sidebar';
import Auth from './components/Auth';
import ModuleA_Builder from './components/ModuleA_Builder';
import ModuleB_AIGenerator from './components/ModuleB_AIGenerator';
import ModuleC_Deployment from './components/ModuleC_Deployment';
import ModuleD_Analytics from './components/ModuleD_Analytics';
import ModuleE_Performance from './components/ModuleE_Performance';
import ModuleF_Notifications from './components/ModuleF_Notifications';
import ModuleG_Settings from './components/ModuleG_Settings';
import ModuleH_DeviceLab from './components/ModuleH_DeviceLab';
import ModuleI_AssetVault from './components/ModuleI_AssetVault';
import ModuleJ_APITerminal from './components/ModuleJ_APITerminal';
import ModuleK_UserHub from './components/ModuleK_UserHub';
import ModuleL_Marketplace from './components/ModuleL_Marketplace';
import ModuleM_ProtocolDocs from './components/ModuleM_ProtocolDocs';
import ModuleN_PlatformFeatures from './components/ModuleN_PlatformFeatures';
import { Search, Bell, Command, User, ShieldCheck, Globe, Wifi, Menu, X, Loader2, RefreshCw, LogOut, ShieldAlert, ChevronRight, Layers, BarChart3, Database, Cpu, Rocket, Zap, ShoppingBag, BookOpen, Settings, Trash2, Check } from 'lucide-react';

const SEARCH_INDEX = [
  // SECTIONS
  { id: 'analytics', label: 'Neural Analytics', type: 'SECTION', icon: BarChart3 },
  { id: 'builder', label: 'App Architect', type: 'SECTION', icon: Layers },
  { id: 'ai', label: 'GenAI Engine', type: 'SECTION', icon: Cpu },
  { id: 'deploy', label: 'CI/CD Pipeline', type: 'SECTION', icon: Rocket },
  { id: 'storage', label: 'Asset Vault', type: 'SECTION', icon: Database },
  { id: 'users', label: 'User Hub', type: 'SECTION', icon: User },
  { id: 'perf', label: 'Engine Health', type: 'SECTION', icon: Zap },
  { id: 'api', label: 'API Terminal', type: 'SECTION', icon: Command },
  { id: 'marketplace', label: 'Plugin Market', type: 'SECTION', icon: ShoppingBag },
  { id: 'docs', label: 'Protocol Docs', type: 'SECTION', icon: BookOpen },
  { id: 'testing', label: 'Device Lab', type: 'SECTION', icon: User },
  { id: 'alerts', label: 'System Alerts', type: 'SECTION', icon: Bell },
  { id: 'settings', label: 'Kernel Config', type: 'SECTION', icon: Settings },

  // PROJECTS & ASSETS
  { id: 'proj_alpha', label: 'Project Alpha v1', type: 'PROJECT', icon: Layers },
  { id: 'proj_beta', label: 'Beta Protocol', type: 'PROJECT', icon: Globe },
  { id: 'proj_gamma', label: 'Gamma Ray Ops', type: 'PROJECT', icon: Wifi },
  { id: 'asset_core', label: 'Core_UI_Kit', type: 'ASSET', icon: Database },
  { id: 'asset_auth', label: 'Auth_Flow_v2', type: 'ASSET', icon: ShieldCheck },
];

const App: React.FC = () => {
  const { isSignedIn, isLoaded: isUserLoaded, user } = useUser();
  const { signOut } = useClerk();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('analytics');
  const [mounted, setMounted] = useState(false);
  const [isReloading, setIsReloading] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  const [registryPanel, setRegistryPanel] = useState<'repo' | 'api' | 'vault' | 'search' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState(SEARCH_INDEX);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Build_Complete', message: 'Project Alpha v4 build finished successfully.', time: '2m ago', type: 'success' },
    { id: 2, title: 'Security_Alert', message: 'Unusual access attempt detected from IP 192.168.x.x', time: '15m ago', type: 'error' },
    { id: 3, title: 'New_Asset', message: '3D_Model_Pack_v2 added to asset vault.', time: '1h ago', type: 'info' },
    { id: 4, title: 'Sys_Overload', message: 'Node_7 reaching 92% CPU capacity.', time: '2h ago', type: 'warning' },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    // Listen for navigation events from child components
    const handleNavigate = (e: CustomEvent) => {
      const tab = e.detail;
      if (tab && typeof tab === 'string') {
        setActiveTab(tab);
      }
    };

    // Listen for toast notifications from child components
    const handleToast = (e: CustomEvent) => {
      const { message, type } = e.detail;
      if (message) {
        showToast(message, type || 'success');
      }
    };

    window.addEventListener('navigateToTab', handleNavigate as EventListener);
    window.addEventListener('showToast', handleToast as EventListener);

    return () => {
      window.removeEventListener('navigateToTab', handleNavigate as EventListener);
      window.removeEventListener('showToast', handleToast as EventListener);
    };
  }, []);

  // Force scroll to top when tab changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [activeTab, isReloading]);

  // Handle search query filtering
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults(SEARCH_INDEX);
    } else {
      const lower = searchQuery.toLowerCase();
      const filtered = SEARCH_INDEX.filter(item =>
        item.label.toLowerCase().includes(lower) ||
        item.type.toLowerCase().includes(lower)
      );
      setSearchResults(filtered);
    }
  }, [searchQuery]);

  if (!mounted || !isUserLoaded) return null;

  // If not logged in, show Auth screen
  if (!isSignedIn) {
    return <Auth onLogin={() => { }} />;
  }

  const handleReload = () => {
    setIsReloading(true);
    // Simulate a hard engine reload
    setTimeout(() => {
      setIsReloading(false);
    }, 1200);
  };

  const handleLogout = async () => {
    setIsReloading(true);
    await signOut();
    setIsReloading(false);
  };

  const handleAudit = () => {
    setShowAudit(true);
    // Auto-hide audit toast after 4s
    setTimeout(() => setShowAudit(false), 4000);
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleInstallPackage = (packageName: string) => {
    setSelectedPackage(packageName);
    showToast(`Installing ${packageName}...`, 'info');

    // Simulate installation
    setTimeout(() => {
      setSelectedPackage(null);
      showToast(`${packageName} installed successfully!`, 'success');
    }, 2000);
  };

  const handleTestEndpoint = (endpoint: string, method: string) => {
    showToast(`Testing ${method} ${endpoint}...`, 'info');

    // Simulate API call
    setTimeout(() => {
      const mockResponse = {
        status: 200,
        data: { success: true, message: 'API endpoint working correctly' },
        timestamp: new Date().toISOString()
      };
      setApiResponse(JSON.stringify(mockResponse, null, 2));
      showToast(`${method} ${endpoint} - Response: 200 OK`, 'success');
    }, 1500);
  };

  const handleAccessVault = (resourceName: string, isLocked: boolean) => {
    if (isLocked) {
      showToast(`${resourceName} requires authentication. Please verify your credentials.`, 'error');
    } else {
      showToast(`Accessing ${resourceName}... Download starting.`, 'success');
      // Simulate download
      setTimeout(() => {
        showToast(`${resourceName} downloaded successfully!`, 'success');
      }, 2000);
    }
  };

  const handleGlobalSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (searchQuery.trim()) {
        showToast(`Searching for "${searchQuery}"...`, 'info');
        setRegistryPanel('search');
        setIsSearchFocused(false);
      }
    }
  };



  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
  };

  const clearNotifications = () => {
    setNotifications([]);
    showToast('All notifications cleared', 'info');
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true }))); // Simplified for visual
    showToast('Marked all as read', 'success');
  };

  const renderContent = () => {
    if (isReloading) {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] animate-in fade-in zoom-in duration-500">
          <div className="relative mb-6">
            <Loader2 className="w-16 h-16 text-cyan-500 animate-spin" strokeWidth={1} />
            <div className="absolute inset-0 bg-cyan-500/10 blur-2xl rounded-full animate-pulse" />
          </div>
          <span className="text-[12px] font-mono text-cyan-500 uppercase tracking-[0.8em] font-black">Re-Syncing_Kernel_Caches_v4.2</span>
          <div className="mt-4 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 animate-[shimmer_2s_infinite] w-full" />
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'analytics': return <ModuleD_Analytics />;
      case 'builder': return <ModuleA_Builder />;
      case 'ai': return <ModuleB_AIGenerator />;
      case 'deploy': return <ModuleC_Deployment />;
      case 'perf': return <ModuleE_Performance />;
      case 'storage': return <ModuleI_AssetVault />;
      case 'users': return <ModuleK_UserHub />;
      case 'testing': return <ModuleH_DeviceLab />;
      case 'api': return <ModuleJ_APITerminal />;
      case 'marketplace': return <ModuleL_Marketplace />;
      case 'docs': return <ModuleM_ProtocolDocs />;
      case 'alerts': return <ModuleF_Notifications />;
      case 'settings': return <ModuleG_Settings />;
      case 'features': return <ModuleN_PlatformFeatures />;
      default: return <ModuleD_Analytics />;
    }
  };

  const getPageTitle = () => {
    const labels: Record<string, string> = {
      analytics: 'NEURAL_ANALYTICS_SUITE',
      builder: 'AI_APP_ARCHITECT',
      ai: 'GENERATIVE_ENGINE_V4',
      deploy: 'CLOUD_DEPLOY_PIPELINE',
      perf: 'ENGINE_HEALTH_METRICS',
      storage: 'HEX_ASSET_VAULT',
      users: 'ENTITY_HUB_MANAGEMENT',
      testing: 'REMOTE_DEVICE_FARM',
      api: 'KERNEL_API_TERMINAL',
      marketplace: 'PROTOCOL_INTEGRATIONS',
      docs: 'PROTOCOL_DOCUMENTATION',
      alerts: 'SYSTEM_ALERTS_NODE',
      settings: 'KERNEL_CONFIG_ROOT'
    };
    return labels[activeTab] || 'DASHBOARD_CORE';
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="h-screen bg-black text-white flex overflow-hidden font-inter selection:bg-cyan-500 selection:text-black">
      {/* HUD Background Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(0,246,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,246,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      </div>

      {/* Audit Notification Toast */}
      {showAudit && (
        <div className="fixed top-24 right-8 z-[100] bg-zinc-950 border border-cyan-500/50 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.8)] animate-in slide-in-from-right-12 fade-in duration-500">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-cyan-500/10 rounded-sm">
              <ShieldCheck className="text-cyan-400" size={20} />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Security_Audit_Protocol</div>
              <div className="text-[9px] font-mono text-cyan-400/60 mt-0.5 uppercase">Log_X42_Generated_And_Signed</div>
            </div>
            <button onClick={() => setShowAudit(false)} className="ml-4 text-white/20 hover:text-white transition-colors">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Dynamic Toast Notifications */}
      {toast && (
        <div className={`fixed top-20 sm:top-24 right-4 sm:right-8 z-[100] bg-zinc-950 border p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.8)] animate-in slide-in-from-right-12 fade-in duration-500 max-w-[calc(100vw-2rem)] sm:max-w-md ${toast.type === 'success' ? 'border-green-500/50' :
          toast.type === 'error' ? 'border-red-500/50' :
            'border-blue-500/50'
          }`}>
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-sm ${toast.type === 'success' ? 'bg-green-500/10' :
              toast.type === 'error' ? 'bg-red-500/10' :
                'bg-blue-500/10'
              }`}>
              {toast.type === 'success' && <ShieldCheck className="text-green-400" size={20} />}
              {toast.type === 'error' && <ShieldAlert className="text-red-400" size={20} />}
              {toast.type === 'info' && <Loader2 className="text-blue-400 animate-spin" size={20} />}
            </div>
            <div className="flex-1">
              <div className={`text-[10px] font-black uppercase tracking-[0.1em] ${toast.type === 'success' ? 'text-green-400' :
                toast.type === 'error' ? 'text-red-400' :
                  'text-blue-400'
                }`}>{toast.message}</div>
            </div>
            <button onClick={() => setToast(null)} className="ml-4 text-white/20 hover:text-white transition-colors">
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Registry Panels */}
      {registryPanel && (
        <>
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[90] animate-in fade-in duration-300"
            onClick={() => setRegistryPanel(null)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[95] w-[95vw] sm:w-[90vw] max-w-6xl max-h-[90vh] sm:max-h-[85vh] bg-black border border-white/10 shadow-[0_0_100px_rgba(0,246,255,0.2)] animate-in zoom-in-95 fade-in duration-500 rounded-sm">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-gradient-to-r from-cyan-500/5 to-transparent">
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 shrink-0 bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center rounded-sm">
                  {registryPanel === 'repo' && <Globe size={20} className="text-cyan-500" />}
                  {registryPanel === 'api' && <Command size={20} className="text-cyan-500" />}
                  {registryPanel === 'vault' && <ShieldCheck size={20} className="text-cyan-500" />}
                  {registryPanel === 'search' && <Search size={20} className="text-cyan-500" />}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm sm:text-xl font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] truncate">
                    {registryPanel === 'repo' && 'CENTRAL_REPO_X'}
                    {registryPanel === 'api' && 'NEURAL_API_INTERFACE'}
                    {registryPanel === 'vault' && 'DEVELOPER_VAULT_0X'}
                    {registryPanel === 'search' && 'GLOBAL_QUERY_RESULTS'}
                  </h2>
                  <p className="text-[7px] sm:text-[8px] font-mono text-white/30 uppercase tracking-wider sm:tracking-widest mt-1 hidden sm:block">
                    {registryPanel === 'repo' && 'Global Package Repository // 24,891 Modules'}
                    {registryPanel === 'api' && 'Live API Documentation & Testing Suite'}
                    {registryPanel === 'vault' && 'Secure Developer Resources & Tools'}
                    {registryPanel === 'search' && `Search Results for "${searchQuery}" // ${Math.floor(Math.random() * 50) + 5} Matches Found`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setRegistryPanel(null)}
                className="p-2 hover:bg-white/5 transition-colors rounded-sm shrink-0"
              >
                <X size={20} className="text-white/40 hover:text-white" />
              </button>
            </div>

            {/* Panel Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)] sm:max-h-[calc(85vh-80px)] p-4 sm:p-6 md:p-8 custom-scroll">

              {/* CENTRAL REPO X */}
              {registryPanel === 'repo' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {[
                      { name: '@ngdw/react-native-core', version: '4.2.1', downloads: '892K', category: 'Core' },
                      { name: '@ngdw/neural-components', version: '2.8.0', downloads: '445K', category: 'UI' },
                      { name: '@ngdw/ai-inference-sdk', version: '1.5.2', downloads: '234K', category: 'AI/ML' },
                      { name: '@ngdw/cloud-sync', version: '3.1.0', downloads: '567K', category: 'Backend' },
                      { name: '@ngdw/analytics-engine', version: '2.4.8', downloads: '189K', category: 'Analytics' },
                      { name: '@ngdw/device-farm-client', version: '1.9.3', downloads: '98K', category: 'Testing' },
                    ].map((pkg, i) => (
                      <div key={i} className="p-5 bg-zinc-950 border border-white/5 hover:border-cyan-500/30 transition-all group cursor-pointer">
                        <div className="flex items-start justify-between mb-3">
                          <div className="text-[11px] font-black text-cyan-400 font-mono">{pkg.name}</div>
                          <div className="text-[9px] px-2 py-0.5 bg-cyan-500/10 text-cyan-500 rounded-sm">{pkg.category}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[9px] font-mono">
                            <span className="text-white/30">VERSION</span>
                            <span className="text-white/60">{pkg.version}</span>
                          </div>
                          <div className="flex items-center justify-between text-[9px] font-mono">
                            <span className="text-white/30">DOWNLOADS</span>
                            <span className="text-green-500">{pkg.downloads}/month</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleInstallPackage(pkg.name)}
                          disabled={selectedPackage === pkg.name}
                          className={`w-full mt-4 py-2 border text-[8px] font-black uppercase tracking-[0.3em] transition-all ${selectedPackage === pkg.name
                            ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400 cursor-wait'
                            : 'bg-white/5 hover:bg-cyan-500/10 border-white/5 hover:border-cyan-500/30'
                            }`}
                        >
                          {selectedPackage === pkg.name ? 'Installing...' : 'Install_Package'}
                        </button>
                      </div>
                    ))}
                  </div>
                  <div
                    onClick={() => copyToClipboard('npm install @ngdw/react-native-core --save')}
                    className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-sm cursor-pointer hover:bg-cyan-500/10 transition-all group relative"
                  >
                    <div className="text-[9px] font-mono text-cyan-400">
                      <span className="opacity-60">$ </span>npm install @ngdw/react-native-core --save
                    </div>
                    <div className="absolute top-2 right-2 text-[7px] font-mono text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      CLICK_TO_COPY
                    </div>
                  </div>
                </div>
              )}

              {/* NEURAL API INTERFACE */}
              {registryPanel === 'api' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {[
                      { endpoint: '/api/v4/inference', method: 'POST', desc: 'Run AI model inference', status: 'active' },
                      { endpoint: '/api/v4/analytics/metrics', method: 'GET', desc: 'Fetch real-time metrics', status: 'active' },
                      { endpoint: '/api/v4/deploy/trigger', method: 'POST', desc: 'Trigger deployment pipeline', status: 'active' },
                      { endpoint: '/api/v4/users/sync', method: 'GET', desc: 'Synchronize user data', status: 'active' },
                      { endpoint: '/api/v4/storage/upload', method: 'POST', desc: 'Upload asset to vault', status: 'beta' },
                      { endpoint: '/api/v4/device/remote', method: 'GET', desc: 'Connect to remote device', status: 'active' },
                    ].map((api, i) => (
                      <div key={i} className="p-5 bg-zinc-950 border border-white/5 hover:border-blue-500/30 transition-all">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`px-2 py-1 text-[9px] font-black rounded-sm ${api.method === 'GET' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                              }`}>
                              {api.method}
                            </div>
                            <div className="text-[10px] font-mono text-white/80">{api.endpoint}</div>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${api.status === 'active' ? 'bg-green-500 shadow-[0_0_10px_#38FF8B]' : 'bg-yellow-500 shadow-[0_0_10px_#FFD700]'
                            }`} />
                        </div>
                        <p className="text-[9px] text-white/40 mb-4">{api.desc}</p>
                        <button
                          onClick={() => handleTestEndpoint(api.endpoint, api.method)}
                          className="w-full py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[8px] font-black uppercase tracking-[0.3em] transition-all hover:scale-[1.02] active:scale-95"
                        >
                          Test_Endpoint
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div
                      onClick={() => copyToClipboard(`curl -X POST https://api.ngdw.io/v4/inference -H "Authorization: Bearer YOUR_API_KEY" -H "Content-Type: application/json" -d '{"model": "neural-v4", "input": "data"}'`)}
                      className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-sm cursor-pointer hover:bg-blue-500/10 transition-all group relative"
                    >
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-3">Example Request</div>
                      <pre className="text-[9px] font-mono text-white/60 overflow-x-auto">
                        {`curl -X POST https://api.ngdw.io/v4/inference \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model": "neural-v4", "input": "data"}'`}
                      </pre>
                      <div className="absolute top-4 right-4 text-[7px] font-mono text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        CLICK_TO_COPY
                      </div>
                    </div>

                    {apiResponse && (
                      <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-sm">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-green-400 mb-3 flex items-center gap-2">
                          <ShieldCheck size={12} /> Live Response
                        </div>
                        <pre className="text-[9px] font-mono text-white/60 overflow-x-auto">{apiResponse}</pre>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* DEVELOPER VAULT 0X */}
              {registryPanel === 'vault' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {[
                      { title: 'SDK Documentation', icon: '📚', size: '142 MB', files: 284, locked: false },
                      { title: 'Code Templates', icon: '💻', size: '38 MB', files: 156, locked: false },
                      { title: 'Design System', icon: '🎨', size: '89 MB', files: 421, locked: false },
                      { title: 'Architecture Guides', icon: '🏗️', size: '65 MB', files: 93, locked: false },
                      { title: 'API Keys & Secrets', icon: '🔐', size: '2 MB', files: 18, locked: true },
                      { title: 'Performance Tools', icon: '⚡', size: '124 MB', files: 78, locked: false },
                    ].map((resource, i) => (
                      <div key={i} className="p-6 bg-zinc-950 border border-white/5 hover:border-green-500/30 transition-all group cursor-pointer relative">
                        {resource.locked && (
                          <div className="absolute top-3 right-3">
                            <ShieldAlert size={16} className="text-yellow-500" />
                          </div>
                        )}
                        <div className="text-3xl mb-3">{resource.icon}</div>
                        <div className="text-[12px] font-black uppercase tracking-wider mb-2">{resource.title}</div>
                        <div className="flex items-center gap-4 text-[9px] font-mono text-white/40 mb-4">
                          <span>{resource.size}</span>
                          <span>•</span>
                          <span>{resource.files} Files</span>
                        </div>
                        <button
                          onClick={() => handleAccessVault(resource.title, resource.locked)}
                          className={`w-full py-2 border text-[8px] font-black uppercase tracking-[0.3em] transition-all hover:scale-[1.02] active:scale-95 ${resource.locked
                            ? 'bg-yellow-500/5 hover:bg-yellow-500/10 border-yellow-500/30 text-yellow-500'
                            : 'bg-green-500/10 hover:bg-green-500/20 border-green-500/30 text-green-400'
                            }`}>
                          {resource.locked ? 'Requires_Auth' : 'Access_Vault'}
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-sm flex items-start gap-4">
                    <ShieldCheck size={20} className="text-green-500 flex-shrink-0" />
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-green-400 mb-2">Vault Security Notice</div>
                      <p className="text-[9px] text-white/60 leading-relaxed">
                        All resources are encrypted end-to-end using AES-256. Access logs are maintained for audit compliance.
                        Locked resources require additional authentication via NGDW Trust-Protocol v9.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* GLOBAL SEARCH RESULTS */}
              {registryPanel === 'search' && (
                <div className="space-y-6">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">Top_Relevance_Matches</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { type: 'MODULE', label: 'Analytics_Engine_Core', tab: 'analytics', relevance: '98%' },
                      { type: 'ASSET', label: 'User_Authentication_Flow', tab: 'builder', relevance: '92%' },
                      { type: 'USER', label: 'Admin_User_X42', tab: 'users', relevance: '89%' },
                      { type: 'API', label: 'GET /api/v4/inference', tab: 'api', relevance: '85%' },
                    ].map((result, i) => (
                      <div key={i} onClick={() => { setActiveTab(result.tab); setRegistryPanel(null); }} className="p-4 bg-zinc-950 border border-white/5 hover:border-cyan-500/30 cursor-pointer group transition-all">
                        <div className="flex justify-between items-start mb-2">
                          <div className="px-2 py-0.5 bg-white/5 text-[8px] font-black uppercase tracking-widest text-cyan-400 rounded-sm mb-2">{result.type}</div>
                          <div className="text-[9px] font-mono text-green-500">{result.relevance} match</div>
                        </div>
                        <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-wider">{result.label}</div>
                        <div className="mt-4 flex items-center justify-between text-[8px] font-mono text-white/30">
                          <span>LOCATION: /ROOT/{result.tab.toUpperCase()}</span>
                          <span className="group-hover:translate-x-1 transition-transform">NAVIGATE -&gt;</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border border-dashed border-white/10 rounded-sm">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Extended_Query_Logs</div>
                    <div className="font-mono text-[9px] text-white/20 space-y-1">
                      <div>&gt; Searching index [0x8922]... DONE</div>
                      <div>&gt; Parsing vector space... DONE</div>
                      <div>&gt; aggregating results... COMPLETE</div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </>
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-[80] transition-transform duration-500 ease-in-out bg-black border-r border-white/5
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        ${collapsed ? 'md:w-16' : 'md:w-64'}
      `}>
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen flex flex-col relative overflow-hidden bg-black">
        {/* Advanced Topbar */}
        <header className="h-16 shrink-0 bg-black/60 backdrop-blur-3xl border-b border-white/5 px-4 flex items-center justify-between z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white/40 hover:text-cyan-400 transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-sm">
              <Command size={10} className="text-cyan-500" />
              <span className="text-[8px] font-black tracking-[0.3em] uppercase opacity-40">System_Root</span>
            </div>

            <div className="relative group">
              <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)} // Delay for click
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleGlobalSearch}
                placeholder="Search..."
                className="bg-[#050505] border border-white/5 focus:border-cyan-500/20 outline-none pl-10 pr-4 py-2 text-[10px] font-mono w-40 sm:w-64 lg:w-96 transition-all rounded-sm placeholder:text-white/20"
              />

              {/* DROPDOWN RESULTS */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 w-full mt-2 bg-zinc-950 border border-white/10 shadow-2xl rounded-sm overflow-hidden z-[100] animate-in slide-in-from-top-2 duration-200">
                  <div className="max-h-64 overflow-y-auto custom-scroll">
                    {searchResults.length > 0 ? searchResults.map((item, idx) => (
                      <button
                        key={idx}
                        onMouseDown={(e) => {
                          e.preventDefault(); // Prevent focus loss immediately
                          if (item.type === 'SECTION') {
                            setActiveTab(item.id);
                          } else {
                            showToast(`Opening ${item.label}...`, 'info');
                          }
                          setIsSearchFocused(false);
                          setSearchQuery('');
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 border-b border-white/5 last:border-0 group transition-all text-left"
                      >
                        <div className={`p-1.5 rounded-sm ${item.type === 'SECTION' ? 'bg-cyan-500/10 text-cyan-500' : 'bg-green-500/10 text-green-500'}`}>
                          <item.icon size={12} />
                        </div>
                        <div className="flex-1">
                          <div className="text-[10px] font-black uppercase tracking-wider text-white/80 group-hover:text-cyan-400 transition-colors">{item.label}</div>
                          <div className="text-[8px] font-mono text-white/30">{item.type}</div>
                        </div>
                        <ChevronRight size={12} className="text-white/10 group-hover:text-white/60 transition-colors" />
                      </button>
                    )) : (
                      <div className="p-4 text-center">
                        <div className="text-[10px] font-mono text-white/30">NO_DATA_FOUND_IN_INDEX</div>
                      </div>
                    )}
                  </div>
                  <div className="p-2 bg-white/5 text-[8px] font-mono text-center text-white/20 border-t border-white/5">
                    PRESS ENTER FOR ADVANCED QUERY
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-6 pr-6 border-r border-white/5 h-8">
              <div className="flex flex-col items-end">
                <span className="text-[7px] font-mono text-white/20 uppercase tracking-widest">Global_Throughput</span>
                <div className="flex items-center gap-1">
                  <Wifi size={10} className="text-green-500" />
                  <span className="text-[9px] font-black text-white/80 tracking-widest uppercase">1.2 GB/S</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[7px] font-mono text-white/20 uppercase tracking-widest">Core_Temp</span>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_5px_#00F6FF]" />
                  <span className="text-[9px] font-black text-white/80 tracking-widest uppercase">32&deg;C</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  onBlur={() => setTimeout(() => setIsNotificationsOpen(false), 200)}
                  className={`relative p-2 transition-all ${isNotificationsOpen ? 'text-cyan-400' : 'text-white/40 hover:text-cyan-400'}`}
                >
                  <Bell size={16} />
                  {notifications.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_10px_#00F6FF]" />
                  )}
                </button>

                {isNotificationsOpen && (
                  <div className="fixed top-16 right-4 left-4 sm:absolute sm:top-full sm:right-0 sm:left-auto sm:w-80 sm:mt-2 bg-zinc-950 border border-white/10 shadow-2xl rounded-sm overflow-hidden z-[100] animate-in slide-in-from-top-2 duration-200">
                    <div className="p-3 border-b border-white/5 flex justify-between items-center bg-white/5">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/60">System_Notifications</span>
                      <div className="flex gap-2">
                        <button
                          onMouseDown={(e) => { e.preventDefault(); markAllRead(); }}
                          className="p-1 text-white/20 hover:text-green-400 transition-colors rounded-sm hover:bg-white/5"
                          title="Mark Read"
                        >
                          <Check size={12} />
                        </button>
                        <button
                          onMouseDown={(e) => { e.preventDefault(); clearNotifications(); }}
                          className="p-1 text-white/20 hover:text-red-400 transition-colors rounded-sm hover:bg-white/5"
                          title="Clear All"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="max-h-64 overflow-y-auto custom-scroll">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center flex flex-col items-center gap-2">
                          <Bell size={20} className="text-white/10" />
                          <div className="text-[9px] font-mono text-white/20">NO_ACTIVE_ALERTS</div>
                        </div>
                      ) : (
                        notifications.map(n => (
                          <div key={n.id} className="p-3 border-b border-white/5 hover:bg-white/5 transition-colors group cursor-default">
                            <div className="flex items-start gap-3">
                              <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${n.type === 'success' ? 'bg-green-500 shadow-[0_0_5px_#22c55e]' : n.type === 'error' ? 'bg-red-500 shadow-[0_0_5px_#ef4444]' : 'bg-blue-500 shadow-[0_0_5px_#3b82f6]'}`} />
                              <div>
                                <div className="text-[10px] font-black text-white/90 mb-0.5 uppercase tracking-wide">{n.title}</div>
                                <div className="text-[9px] font-mono text-white/50 leading-relaxed mb-1">{n.message}</div>
                                <div className="text-[8px] font-mono text-white/20">{n.time}</div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="p-2 bg-white/5 text-[8px] font-mono text-center text-white/20 border-t border-white/5 hover:text-cyan-400 hover:bg-white/10 transition-colors cursor-pointer">
                        VIEW_FULL_LOGS
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 pl-2 group">
                <div className="hidden sm:flex flex-col text-right">
                  <div className="text-[10px] font-black uppercase tracking-widest truncate max-w-[120px]">
                    {user?.primaryEmailAddress?.emailAddress?.split('@')[0] || 'ARCHITECT_X'}
                  </div>
                  <div className="text-[7px] font-mono text-cyan-400/60">BETA_V4_NGDW</div>
                </div>
                <div className="w-9 h-9 border border-white/10 p-0.5 rounded-sm hover:border-cyan-500/50 transition-all cursor-pointer relative overflow-hidden group">
                  <div className="w-full h-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                    <img src="https://picsum.photos/100/100?random=x" className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700" alt="Avatar" />
                  </div>
                  <button
                    onClick={handleLogout}
                    className="absolute inset-0 bg-red-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-white"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content Container */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overflow-x-hidden custom-scroll p-4 md:p-8 lg:p-12 space-y-12 max-w-[1700px] mx-auto w-full relative z-10"
        >

          {/* Dynamic Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 lg:gap-8 relative">
            <div className="space-y-2 sm:space-y-3 flex-1 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <div className="w-6 sm:w-8 h-[1px] bg-cyan-500/60 shrink-0"></div>
                <span className="text-[8px] sm:text-[10px] font-mono text-cyan-500 tracking-[0.4em] sm:tracking-[0.8em] uppercase font-bold truncate">Session: ACTIVE_NODE_{Math.random().toString(16).slice(2, 6).toUpperCase()}</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter uppercase leading-tight flex items-baseline gap-2 sm:gap-4 max-w-full overflow-hidden">
                <span className="text-white/5 font-mono text-lg sm:text-xl md:text-2xl shrink-0">/</span>
                <span className="whitespace-nowrap truncate flex-1 min-w-0">{getPageTitle()}</span>
              </h1>
              <div className="flex items-center gap-2 sm:gap-4 text-[8px] sm:text-[10px] font-mono text-white/30 bg-white/5 inline-flex px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm border border-white/5 max-w-full">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#38FF8B] shrink-0" />
                <span className="tracking-[0.15em] sm:tracking-[0.3em] uppercase truncate">SYSTEM_STABLE // ARCH_v4 // NODES_1,892_LINKED</span>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
              <button
                onClick={handleAudit}
                className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-zinc-950 border border-white/5 text-[8px] sm:text-[9px] uppercase font-black tracking-[0.3em] sm:tracking-[0.4em] text-white/40 hover:text-white hover:border-cyan-500/50 hover:bg-zinc-900 active:scale-95 transition-all flex items-center gap-2 sm:gap-3 group whitespace-nowrap"
              >
                <ShieldCheck size={12} className="text-cyan-500 group-hover:scale-110 transition-transform shrink-0" />
                <span className="hidden sm:inline">Auth_Audit</span>
                <span className="sm:hidden">Audit</span>
              </button>
              <button
                onClick={handleReload}
                className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-white text-black text-[8px] sm:text-[9px] uppercase font-black tracking-[0.3em] sm:tracking-[0.4em] hover:bg-zinc-200 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.05)] flex items-center gap-2 sm:gap-3 whitespace-nowrap"
              >
                <RefreshCw size={12} className={`shrink-0 ${isReloading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Reload_Engine</span>
                <span className="sm:hidden">Reload</span>
              </button>
            </div>
          </div>

          {/* Module Dynamic Injection */}
          <div className="relative min-h-[70vh] animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out fill-mode-forwards">
            {renderContent()}
          </div>

          {/* High-Fidelity Technical Footer */}
          <footer className="pt-24 pb-12 border-t border-white/5 mt-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 opacity-30 text-[9px] font-mono uppercase tracking-[0.3em]">
              <div className="col-span-1 md:col-span-2 space-y-5">
                <div className="font-black text-sm text-white/70">NextGenDigiWeb // System_Core_v4.2.1</div>
                <p className="normal-case leading-loose max-w-lg tracking-tight font-sans text-xs opacity-60">
                  Distributed AI-powered orchestration platform for cross-platform mobile entity development. All neural computations verified via NGDW Trust-Protocol v9. Infrastructure stabilized across 24 global nodes.
                </p>
              </div>
              <div className="space-y-5">
                <div className="font-black text-white/70">Registry_Index</div>
                <div className="flex flex-col gap-4">
                  <button onClick={() => setRegistryPanel('repo')} className="hover:text-cyan-400 transition-all w-fit text-left">Central_Repo_X</button>
                  <button onClick={() => setRegistryPanel('api')} className="hover:text-cyan-400 transition-all w-fit text-left">Neural_API_Interface</button>
                  <button onClick={() => setRegistryPanel('vault')} className="hover:text-cyan-400 transition-all w-fit text-left">Developer_Vault_0x</button>
                </div>
              </div>
              <div className="text-right space-y-5">
                <div className="font-black text-white/70">Legal_Directives</div>
                <div className="space-y-2">
                  <div>&copy; {new Date().getFullYear()} NGDW_HOLDINGS</div>
                  <div className="text-cyan-400/60">Node: NYC_DATACENTER_7</div>
                  <div className="text-green-500/60 font-black">Status: 100%_OPERATIONAL</div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default App;

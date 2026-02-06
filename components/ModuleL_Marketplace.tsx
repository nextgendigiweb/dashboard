
import React, { useState, useMemo } from 'react';
import FuturisticCard from './FuturisticCard';
import { COLORS } from '../constants';
import { 
  ShoppingBag, Star, Zap, Shield, Cpu, ExternalLink, 
  Filter, Search, CheckCircle2, Package, Globe,
  Activity, ArrowUpRight, Plus, Info, Download,
  Layers, Lock, Sparkles, ChevronRight, Menu,
  Database, RefreshCw, Settings, MessageSquare,
  TrendingUp, Clock, SortAsc
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All_Protocols', icon: Layers },
  { id: 'ai', label: 'Neural_Engines', icon: Sparkles },
  { id: 'security', label: 'Security_Gates', icon: Shield },
  { id: 'ui', label: 'Visual_Kits', icon: Activity },
  { id: 'data', label: 'Storage_Meshes', icon: Database },
];

const PLUGINS = [
  { 
    id: 'PL_01',
    name: 'Neural Auth SDK', 
    provider: 'NGDW_CORE', 
    rating: 4.9, 
    reviewCount: 1240,
    cost: 'PRO', 
    category: 'security',
    icon: Shield, 
    downloads: 1400000,
    version: 'v4.2.1',
    dateAdded: '2024-03-15',
    isFeatured: true,
    desc: 'Biometric and behavioral identity protocol for cross-platform apps using adaptive hardware-bound encryption.',
    features: ['Face_Gate', 'Mesh_Auth', 'L9_Crypto'],
    reviews: [
      { user: 'arch_0x2', comment: 'Flawless integration with NGDW kernel.', rating: 5 },
      { user: 'dev_proto', comment: 'Best-in-class haptic auth.', rating: 4 }
    ]
  },
  { 
    id: 'PL_02',
    name: 'Vector Map Pro', 
    provider: 'CARTO_LABS', 
    rating: 4.7, 
    reviewCount: 842,
    cost: 'FREE', 
    category: 'ui',
    icon: Globe, 
    downloads: 842000,
    version: 'v1.0.4',
    dateAdded: '2024-02-10',
    isFeatured: false,
    desc: 'High-performance offline map rendering engine with tile streaming and sub-millisecond route optimization.',
    features: ['8K_Render', 'Off_Link', 'Path_Sync'],
    reviews: []
  },
  { 
    id: 'PL_03',
    name: 'VisionAI_Pack', 
    provider: 'VISION_SYST', 
    rating: 5.0, 
    reviewCount: 122,
    cost: 'PRO', 
    category: 'ai',
    icon: Cpu, 
    downloads: 22000,
    version: 'v2.0.0',
    dateAdded: '2024-04-01',
    isFeatured: true,
    desc: 'Real-time object detection and OCR optimized for mobile NPU clusters. Supports 120fps inferencing.',
    features: ['NPU_Delegation', 'OCR_Synth', 'Mesh_Link'],
    reviews: [
      { user: 'vision_lord', comment: 'Unparalleled speed on iOS NPU.', rating: 5 }
    ]
  },
  { 
    id: 'PL_04',
    name: 'Edge Sync Lite', 
    provider: 'NGDW_CORE', 
    rating: 4.8, 
    reviewCount: 4200,
    cost: 'FREE', 
    category: 'data',
    icon: RefreshCw, 
    downloads: 4200000,
    version: 'v3.1.2',
    dateAdded: '2023-12-20',
    isFeatured: false,
    desc: 'Offline-first database synchronization with automated conflict resolution and global mesh caching.',
    features: ['Auto_Flush', 'Zero_Lat', 'Sync_Mesh'],
    reviews: []
  },
  { 
    id: 'PL_05',
    name: 'Kinetic UI Kit', 
    provider: 'MOTION_DYN', 
    rating: 4.9, 
    reviewCount: 109,
    cost: 'PRO', 
    category: 'ui',
    icon: Activity, 
    downloads: 109000,
    version: 'v9.0.1',
    dateAdded: '2024-01-05',
    isFeatured: true,
    desc: 'Advanced animation primitives for high-fidelity mobile experiences. 120Hz native-performance fluid motion.',
    features: ['Fluid_60', 'Spring_V8', 'Gest_Link'],
    reviews: []
  },
  { 
    id: 'PL_06',
    name: 'Vault Key G5', 
    provider: 'HEX_SECURE', 
    rating: 4.6, 
    reviewCount: 52,
    cost: 'PRO', 
    category: 'security',
    icon: Lock, 
    downloads: 5200,
    version: 'v5.0.0',
    dateAdded: '2024-03-28',
    isFeatured: false,
    desc: 'Hardware-backed secret management for enterprise applications. FIPS 140-2 Level 3 compliant storage.',
    features: ['TPM_Bind', 'Key_Rot', 'Secure_I/O'],
    reviews: []
  }
];

const ModuleL_Marketplace: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [installingId, setInstallingId] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<'ALL' | 'FREE' | 'PRO'>('ALL');
  const [sortBy, setSortBy] = useState<'NEW' | 'POP' | 'RATE'>('POP');
  const [expandedReviews, setExpandedReviews] = useState<string | null>(null);

  const handleInstall = (id: string) => {
    const plugin = PLUGINS.find(p => p.id === id);
    setInstallingId(id);
    
    // Show toast notification
    const event = new CustomEvent('showToast', { 
      detail: { 
        message: `Installing ${plugin?.name || 'plugin'}...`, 
        type: 'info' 
      } 
    });
    window.dispatchEvent(event);
    
    setTimeout(() => {
      setInstallingId(null);
      const successEvent = new CustomEvent('showToast', { 
        detail: { 
          message: `${plugin?.name || 'Plugin'} installed successfully!`, 
          type: 'success' 
        } 
      });
      window.dispatchEvent(successEvent);
    }, 2500);
  };

  const filteredAndSortedPlugins = useMemo(() => {
    let result = PLUGINS.filter(p => {
      const matchesCat = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.provider.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = priceFilter === 'ALL' || p.cost === priceFilter;
      return matchesCat && matchesSearch && matchesPrice;
    });

    if (sortBy === 'NEW') result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    if (sortBy === 'POP') result.sort((a, b) => b.downloads - a.downloads);
    if (sortBy === 'RATE') result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [activeCategory, searchQuery, priceFilter, sortBy]);

  const featuredPlugins = useMemo(() => PLUGINS.filter(p => p.isFeatured), []);

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in duration-700 max-w-[1700px] mx-auto w-full">
      
      {/* 1. HERO BANNER */}
      <div className="relative overflow-hidden bg-black border border-white/5 p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center text-center gap-4 sm:gap-6 rounded-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,246,255,0.05),transparent)] pointer-events-none opacity-50" />
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
          
          <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6">
             <div className="p-3 sm:p-4 md:p-5 bg-black border border-white/5 rounded-sm shadow-2xl relative group">
                <ShoppingBag className="text-cyan-400 group-hover:scale-110 transition-transform duration-700" size={40} strokeWidth={1} />
                <div className="absolute inset-0 bg-cyan-500/10 blur-2xl rounded-full opacity-50" />
             </div>
             <div className="space-y-2 px-4">
                <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-none break-words">PROTOCOL_MARKETPLACE_V4</h2>
                <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                   <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse flex-shrink-0" />
                   <p className="text-[8px] sm:text-[9px] md:text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] sm:tracking-[0.4em] font-bold break-all text-center">Registry: NGDW_GLOBAL_REPOSITORY_v9</p>
                </div>
             </div>
          </div>
      </div>

      {/* 2. FEATURED SECTION */}
      <section className="space-y-6 px-2">
        <div className="flex items-center gap-4">
          <TrendingUp size={16} className="text-cyan-500" />
          <h3 className="text-lg font-black uppercase tracking-widest text-white">FEATURED_PROTOCOLS</h3>
          <div className="flex-1 h-[1px] bg-white/5" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredPlugins.map((plugin) => (
            <FuturisticCard key={`featured-${plugin.id}`} accentColor={COLORS.cyan} className="!p-0 overflow-hidden group/featured">
              <div className="p-6 bg-gradient-to-br from-cyan-500/5 to-transparent h-full flex items-center gap-6">
                <div className="p-4 bg-zinc-950 border border-white/10 rounded-sm">
                  <plugin.icon size={24} className="text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[8px] font-black text-cyan-500 uppercase tracking-widest mb-1">NEW_RELEASE</div>
                  <h4 className="text-sm font-black text-white uppercase truncate">{plugin.name}</h4>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] font-mono text-white/30 uppercase">{plugin.provider}</span>
                    <div className="flex items-center gap-1 text-[9px] text-yellow-500 font-bold">
                       <Star size={10} fill="currentColor" /> {plugin.rating}
                    </div>
                  </div>
                </div>
                <ChevronRight size={20} className="text-white/20 group-hover/featured:translate-x-1 group-hover/featured:text-cyan-400 transition-all" />
              </div>
            </FuturisticCard>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start px-2">
         
         {/* 3. LEFT SIDEBAR: GRANULAR FILTERS */}
         <div className="lg:col-span-3 flex flex-col gap-6">
            <FuturisticCard title="PROTOCOL_FILTERS" accentColor={COLORS.gray}>
               <div className="space-y-6 pt-2">
                  <div className="relative group">
                     <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors" />
                     <input 
                      type="text" 
                      placeholder="Search repository..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-black border border-white/10 p-3 pl-10 text-[10px] font-mono outline-none focus:border-cyan-500/30 rounded-sm transition-all text-white"
                     />
                  </div>
                  
                  {/* Category Filter */}
                  <div className="space-y-1">
                     <div className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] mb-3 ml-1">Logic_Sectors</div>
                     {CATEGORIES.map(cat => (
                       <button 
                         key={cat.id}
                         onClick={() => setActiveCategory(cat.id)}
                         className={`w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] border transition-all rounded-sm flex justify-between items-center group ${
                           activeCategory === cat.id ? 'bg-white text-black border-white' : 'border-white/5 text-white/40 hover:bg-white/5'
                         }`}
                       >
                         <div className="flex items-center gap-3">
                            <cat.icon size={14} className={activeCategory === cat.id ? 'text-black' : 'text-white/20 group-hover:text-white transition-colors'} />
                            <span>{cat.label}</span>
                         </div>
                       </button>
                     ))}
                  </div>

                  {/* Price Filter */}
                  <div className="space-y-2">
                    <div className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] mb-3 ml-1">Licensing</div>
                    <div className="flex bg-zinc-950 border border-white/5 p-1 rounded-sm gap-1">
                      {['ALL', 'FREE', 'PRO'].map(p => (
                        <button
                          key={p}
                          onClick={() => setPriceFilter(p as any)}
                          className={`flex-1 py-2 text-[8px] font-black uppercase tracking-widest rounded-sm transition-all ${
                            priceFilter === p ? 'bg-white/10 text-white border border-white/10' : 'text-white/20 hover:text-white'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sorting */}
                  <div className="space-y-2">
                    <div className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] mb-3 ml-1">Sort_Order</div>
                    <div className="grid grid-cols-1 gap-1">
                      {[
                        { id: 'POP', label: 'By_Popularity', icon: TrendingUp },
                        { id: 'NEW', label: 'By_Newest', icon: Clock },
                        { id: 'RATE', label: 'By_Rating', icon: SortAsc },
                      ].map(s => (
                        <button
                          key={s.id}
                          onClick={() => setSortBy(s.id as any)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-[9px] font-bold uppercase tracking-widest border transition-all rounded-sm ${
                            sortBy === s.id ? 'border-cyan-500/40 bg-cyan-500/5 text-cyan-400' : 'border-transparent text-white/20 hover:text-white'
                          }`}
                        >
                          <s.icon size={12} />
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
               </div>
            </FuturisticCard>
         </div>

         {/* 4. MAIN REGISTRY GRID */}
         <div className="lg:col-span-9 space-y-8 w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 px-2">
               <div className="flex flex-col">
                  <h3 className="text-base sm:text-lg md:text-xl font-black uppercase tracking-tighter text-white break-words">RELIANCE_PROTOCOL_INDEX</h3>
                  <div className="flex items-center gap-2 sm:gap-3 mt-1 flex-wrap">
                     <span className="text-[8px] sm:text-[9px] font-mono text-white/20 uppercase tracking-[0.3em] sm:tracking-[0.6em]">Displaying {filteredAndSortedPlugins.length} Protocols</span>
                  </div>
               </div>
               <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      const event = new CustomEvent('showToast', { 
                        detail: { message: 'View options menu', type: 'info' } 
                      });
                      window.dispatchEvent(event);
                    }}
                    className="p-2 border border-white/10 text-white/40 hover:text-white transition-all rounded-sm"
                  >
                    <Menu size={16} />
                  </button>
                  <button 
                    onClick={() => {
                      const event = new CustomEvent('navigateToTab', { detail: 'builder' });
                      window.dispatchEvent(event);
                    }}
                    className="p-2 border border-white/10 text-white/40 hover:text-white transition-all rounded-sm"
                  >
                    <Plus size={16} />
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
               {filteredAndSortedPlugins.map((plugin) => (
                  <FuturisticCard 
                    key={plugin.id} 
                    accentColor={plugin.cost === 'PRO' ? COLORS.cyan : COLORS.green} 
                    className="flex flex-col h-full !p-0 overflow-hidden group/item shadow-2xl"
                    idTag={plugin.id}
                  >
                     <div className="p-8 flex flex-col h-full bg-black relative">
                        <div className="flex justify-between items-start mb-8 z-10">
                           <div className="p-4 bg-zinc-950 border border-white/10 rounded-sm relative group/icon shadow-xl">
                              <plugin.icon size={28} className={plugin.cost === 'PRO' ? 'text-cyan-400' : 'text-green-400'} />
                           </div>
                           <div className="flex flex-col items-end gap-1">
                              <div className="flex items-center gap-1.5 text-[9px] font-mono text-yellow-500 font-bold tracking-widest">
                                 <Star size={10} fill="currentColor" /> {plugin.rating}
                              </div>
                              <span className="text-[7px] font-mono text-white/10 uppercase tracking-widest">
                                {(plugin.downloads / 1000).toFixed(0)}K DEPLOYED
                              </span>
                           </div>
                        </div>

                        <div className="space-y-2 z-10 flex-1">
                           <h3 className="text-lg font-black uppercase text-white tracking-tight leading-tight group-hover/item:text-current transition-colors duration-500" style={{ color: plugin.cost === 'PRO' ? COLORS.cyan : COLORS.green }}>{plugin.name}</h3>
                           <div className="text-[8px] font-black uppercase text-white/20 tracking-[0.4em] mb-4">BY {plugin.provider} // {plugin.version}</div>
                           <p className="text-[11px] text-white/40 font-mono leading-relaxed mb-6">
                              {plugin.desc}
                           </p>
                           
                           <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                              {plugin.features.map(feat => (
                                 <span key={feat} className="text-[7px] font-mono px-2 py-1 bg-white/5 border border-white/5 text-white/30 uppercase rounded-[1px]">{feat}</span>
                              ))}
                           </div>

                           {/* Review Summary */}
                           {plugin.reviews.length > 0 && (
                             <div className="mt-6">
                                <button 
                                  onClick={() => setExpandedReviews(expandedReviews === plugin.id ? null : plugin.id)}
                                  className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors"
                                >
                                   <MessageSquare size={10} /> 
                                   {expandedReviews === plugin.id ? 'Hide_Reviews' : `View_${plugin.reviewCount}_Reviews`}
                                </button>
                                {expandedReviews === plugin.id && (
                                  <div className="mt-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                     {plugin.reviews.map((rev, idx) => (
                                       <div key={idx} className="p-3 bg-white/5 border border-white/5 rounded-sm">
                                          <div className="flex justify-between items-center mb-1">
                                             <span className="text-[8px] font-mono text-cyan-400">{rev.user}</span>
                                             <div className="flex gap-0.5">
                                               {Array.from({ length: 5 }).map((_, i) => (
                                                 <Star key={i} size={8} fill={i < rev.rating ? COLORS.cyan : 'transparent'} stroke={i < rev.rating ? 'none' : COLORS.gray} />
                                               ))}
                                             </div>
                                          </div>
                                          <p className="text-[9px] font-mono text-white/40 italic">"{rev.comment}"</p>
                                       </div>
                                     ))}
                                  </div>
                                )}
                             </div>
                           )}
                        </div>

                        <div className="flex items-center justify-between pt-8 mt-auto z-10">
                           <div className={`text-[10px] font-black tracking-[0.4em] uppercase ${plugin.cost === 'PRO' ? 'text-cyan-500' : 'text-green-500'}`}>
                              {plugin.cost}_VERSION
                           </div>
                           <div className="flex gap-2">
                              <button 
                                onClick={() => handleInstall(plugin.id)}
                                disabled={installingId === plugin.id}
                                className={`px-5 py-2.5 font-black uppercase text-[10px] tracking-widest flex items-center gap-2 transition-all active:scale-95 shadow-xl rounded-sm ${
                                   installingId === plugin.id 
                                   ? 'bg-zinc-900 border border-white/10 text-white/20' 
                                   : 'bg-white text-black hover:bg-zinc-200'
                                }`}
                              >
                                 {installingId === plugin.id ? <RefreshCw size={14} className="animate-spin"/> : <Download size={14} />}
                                 {installingId === plugin.id ? 'SYNCING' : 'INSTALL'}
                              </button>
                           </div>
                        </div>
                     </div>
                  </FuturisticCard>
               ))}
            </div>
         </div>
      </div>

      {/* FOOTER: STATS HUD */}
      <div className="p-8 bg-black border border-white/5 rounded-sm flex flex-col md:flex-row justify-between items-center gap-10 opacity-40 hover:opacity-100 transition-all duration-700 mx-2">
         <div className="flex flex-wrap items-center gap-12">
            <div className="flex items-center gap-4">
               <Package size={20} className="text-cyan-500" />
               <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">4.2k_PROTOCOLS</span>
                  <span className="text-[7px] font-mono text-white/20 uppercase">Available_In_Cache</span>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <Activity size={20} className="text-green-500" />
               <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">STABLE_UPTIME</span>
                  <span className="text-[7px] font-mono text-white/20 uppercase tracking-widest">Registry_Heartbeat: Active</span>
               </div>
            </div>
         </div>
         <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
               <span className="text-[7px] font-mono text-white/20 uppercase tracking-[0.4em]">Node_Security</span>
               <div className="flex items-center gap-2 text-cyan-400 text-xs font-black font-mono">
                  <Shield size={12}/> ENCRYPTED_TUNNEL
               </div>
            </div>
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white hover:text-cyan-400 transition-all group">
               Full_Manifest <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
         </div>
      </div>

    </div>
  );
};

export default ModuleL_Marketplace;

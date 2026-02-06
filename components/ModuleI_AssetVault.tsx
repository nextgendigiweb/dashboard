
import React, { useState } from 'react';
import FuturisticCard from './FuturisticCard';
import { COLORS } from '../constants';
import {
   Smartphone, Tablet, Laptop, ShoppingBag,
   ExternalLink, Search, Filter, Cpu,
   Layers, Download, Plus, Zap,
   Eye, Monitor, Box, Sparkles,
   ChevronRight, Globe, ShieldCheck, Database,
   Maximize2, Share2, Info, LayoutTemplate,
   Settings2, Activity, Fingerprint
} from 'lucide-react';

const APP_ARCHETYPES = [
   {
      id: 'ARC_901',
      name: 'Neo_Fintech',
      category: 'FINANCE',
      platform: 'IOS_PRO_17',
      complexity: 'L9_QUANTUM',
      kernel: 'X-99_NGDW',
      features: ['Spatial_Auth', 'Neural_Graph', 'Zero_Lat_Sync'],
      stats: { downloads: '14.2k', rating: 4.9 },
      accent: COLORS.cyan,
      preview: '/Finance.png'
   },
   {
      id: 'ARC_882',
      name: 'Aether_Social',
      category: 'SOCIAL',
      platform: 'VISION_OS_X',
      complexity: 'L8_MESH',
      kernel: 'V_KERNEL_4',
      features: ['AR_Overlay', 'Spatial_Audio', 'Mesh_Link'],
      stats: { downloads: '22.8k', rating: 4.8 },
      accent: COLORS.blue,
      preview: '/Social.png'
   },
   {
      id: 'ARC_654',
      name: 'Hex_DEX',
      category: 'CRYPTO',
      platform: 'ANDROID_15_G',
      complexity: 'L7_BASE',
      kernel: 'BLOCK_CORE_2',
      features: ['DEX_Protocol', 'MPC_Vault', 'Liquidity_Grid'],
      stats: { downloads: '45.1k', rating: 4.7 },
      accent: COLORS.gray,
      preview: '/Crypto.png'
   },
   {
      id: 'ARC_425',
      name: 'Nexus_Auto',
      category: 'LOGISTICS',
      platform: 'AUTO_HUB_OS',
      complexity: 'L9_QUANTUM',
      kernel: 'DRIVE_V9',
      features: ['Lidar_Mesh', 'Fleet_Sync', 'Predictive_I/O'],
      stats: { downloads: '2.1k', rating: 4.9 },
      accent: COLORS.cyan,
      preview: '/Logistics.png'
   },
   {
      id: 'ARC_316',
      name: 'Cyber_Stream',
      category: 'MEDIA',
      platform: 'TV_OS_ULTRA',
      complexity: 'L8_MESH',
      kernel: 'AV_SYNTH_9',
      features: ['8K_Decorum', 'AI_Upscale', 'Lossless_X'],
      stats: { downloads: '109k', rating: 4.6 },
      accent: COLORS.blue,
      preview: '/Media.png'
   }
];

const ModuleI_AssetVault: React.FC = () => {
   const [activeFilter, setActiveFilter] = useState('ALL');
   const [searchQuery, setSearchQuery] = useState('');
   const [archetypes, setArchetypes] = useState(APP_ARCHETYPES);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [customName, setCustomName] = useState('');

   const handleInjectBlueprint = () => {
      setIsModalOpen(true);
   };

   const confirmInjection = () => {
      if (!customName.trim()) return;

      const newId = Math.floor(Math.random() * 1000);
      const newBlueprint = {
         id: `ARC_${newId}`,
         name: customName,
         category: 'CUSTOM',
         platform: 'NEXUS_OS_V1',
         complexity: 'L1_GENESIS',
         kernel: 'DEV_KERNEL',
         features: ['Auto_Gen', 'Hot_Swap', 'Live_Sync'],
         stats: { downloads: '0', rating: 5.0 },
         accent: COLORS.cyan,
         preview: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=400&h=800'
      };

      setArchetypes([newBlueprint, ...archetypes]);
      setIsModalOpen(false);
      setCustomName('');
   };

   const handleClone = (app: typeof APP_ARCHETYPES[0]) => {
      const newId = Math.floor(Math.random() * 10000);
      const clonedApp = {
         ...app,
         id: `CLONE_${newId}`,
         name: `${app.name}_(COPY)`,
         category: 'CLONED',
         stats: { ...app.stats, downloads: '0' }
      };
      setArchetypes([clonedApp, ...archetypes]);
   };

   const filteredArchetypes = archetypes.filter(app => {
      const matchesCategory = activeFilter === 'ALL' || app.category === activeFilter;
      const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
   });

   return (
      <div className="flex flex-col gap-6 animate-in fade-in duration-700 pb-20 max-w-[1700px] mx-auto">

         {/* 1. TACTICAL HUD HEADER */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
               { label: 'ARCHETYPE_RESERVE', val: '512_ENTITIES', icon: Layers, color: COLORS.cyan },
               { label: 'NODE_DISTRIBUTION', val: 'GLOBAL_MESH', icon: Globe, color: COLORS.green },
               { label: 'INTEGRITY_INDEX', val: 'STABLE_99.9', icon: ShieldCheck, color: COLORS.blue },
               { label: 'STORAGE_ALLOC', val: '1.2_PB_FREE', icon: Database, color: COLORS.gray },
            ].map((stat, i) => (
               <div key={i} className="bg-black border border-white/5 p-4 flex flex-col gap-1 hover:border-white/15 transition-all group rounded-sm">
                  <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-all">
                     <stat.icon size={12} style={{ color: stat.color }} />
                     <span className="text-[8px] font-black uppercase tracking-[0.3em] font-mono">{stat.label}</span>
                  </div>
                  <div className="text-lg font-black font-mono text-white/70 group-hover:text-white transition-colors">{stat.val}</div>
               </div>
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* 2. LEFT: CATEGORY FILTER MATRIX (3 Columns) */}
            <div className="lg:col-span-3 flex flex-col gap-6 sticky top-24">
               <FuturisticCard title="VAULT_CONTROLS" accentColor={COLORS.gray}>
                  <div className="space-y-6 pt-2">
                     <div className="relative group">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors" />
                        <input
                           type="text"
                           placeholder="Search blueprints..."
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           className="w-full bg-black border border-white/10 p-3 pl-10 text-[10px] font-mono outline-none focus:border-cyan-500/30 rounded-sm transition-all text-white"
                        />
                     </div>

                     <div className="space-y-1.5">
                        <div className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] mb-3 ml-1">Logic_Sectors</div>
                        {['ALL', 'FINANCE', 'SOCIAL', 'HEALTH', 'CRYPTO', 'MEDIA', 'LOGISTICS'].map(cat => (
                           <button
                              key={cat}
                              onClick={() => setActiveFilter(cat)}
                              className={`w-full text-left px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.2em] border transition-all rounded-sm flex justify-between items-center group ${activeFilter === cat ? 'bg-white text-black border-white' : 'border-white/5 text-white/40 hover:bg-white/5 hover:border-white/10'
                                 }`}
                           >
                              <span>{cat}</span>
                              {activeFilter === cat && <ChevronRight size={12} />}
                           </button>
                        ))}
                     </div>

                     <div className="pt-6 border-t border-white/5 space-y-4">
                        <div className="flex items-center justify-between">
                           <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">Target_Hardware</span>
                           <Settings2 size={12} className="text-cyan-500 opacity-40" />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                           {[
                              { icon: Smartphone, label: 'Mobile' },
                              { icon: Tablet, label: 'Slate' },
                              { icon: Monitor, label: 'Edge' }
                           ].map((hw, i) => (
                              <button key={i} className="flex flex-col items-center gap-2 p-3 border border-white/5 bg-zinc-950/50 hover:bg-zinc-900 hover:border-white/20 transition-all rounded-sm group/hw">
                                 <hw.icon size={16} className="text-white/20 group-hover/hw:text-cyan-400 transition-colors" />
                                 <span className="text-[6px] font-bold uppercase tracking-widest text-white/10 group-hover/hw:text-white/40">{hw.label}</span>
                              </button>
                           ))}
                        </div>
                     </div>
                  </div>
               </FuturisticCard>

               <FuturisticCard title="VAULT_HEALTH" accentColor={COLORS.blue}>
                  <div className="space-y-5">
                     <div className="space-y-2">
                        <div className="flex justify-between text-[8px] font-black text-white/20 uppercase">
                           <span>Sync_Integrity</span>
                           <span className="text-blue-400">98%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500 w-[98%]" />
                        </div>
                     </div>
                     <div className="flex items-center gap-4 text-white/40">
                        <Activity size={14} className="text-blue-400" />
                        <span className="text-[9px] font-mono leading-relaxed">System running optimal parameters. No vault fragmentation detected.</span>
                     </div>
                  </div>
               </FuturisticCard>
            </div>

            {/* 3. RIGHT: ARCHETYPE GRID (9 Columns) */}
            <div className="lg:col-span-9 space-y-8">
               <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-2">
                  <div className="flex flex-col">
                     <h2 className="text-3xl font-black uppercase tracking-tighter text-white">APP_ARCHETYPE_VAULT</h2>
                     <div className="flex items-center gap-3 mt-1">
                        <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.6em]">Registry: NGDW_CORE_V4</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                     </div>
                  </div>
                  <button
                     onClick={handleInjectBlueprint}
                     className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all shadow-2xl active:scale-95 rounded-sm"
                  >
                     <Plus size={16} /> Inject_New_Blueprint
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredArchetypes.length > 0 ? filteredArchetypes.map((app, i) => (
                     <FuturisticCard
                        key={app.id}
                        accentColor={app.accent}
                        className="!p-0 group/app overflow-hidden aspect-[4/6] md:aspect-[4/6.5] lg:aspect-[4/7]"
                        idTag={app.id}
                     >
                        <div className="h-full relative flex flex-col bg-black">
                           {/* Mockup Preview */}
                           <div className="absolute inset-0 w-full h-full overflow-hidden">
                              <img
                                 src={app.preview}
                                 alt={app.name}
                                 className="w-full h-full object-cover opacity-20 group-hover/app:opacity-60 group-hover/app:scale-105 grayscale group-hover/app:grayscale-0 transition-all duration-[1.5s] ease-out"
                              />
                              {/* Interactive Scanlines on Hover */}
                              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] opacity-0 group-hover/app:opacity-10 pointer-events-none" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                           </div>

                           {/* Tactical Overlay */}
                           <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
                              <div className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-sm">
                                 <span className="text-[8px] font-mono text-white/60 tracking-widest font-bold">{app.platform}</span>
                              </div>
                              <div className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-sm">
                                 <span className="text-[8px] font-mono text-white/60 tracking-widest font-bold">{app.kernel}</span>
                              </div>
                           </div>

                           <div className="absolute top-6 right-6 z-20 flex flex-col gap-3 opacity-0 group-hover/app:opacity-100 translate-x-4 group-hover/app:translate-x-0 transition-all duration-500">
                              <button className="px-5 py-2.5 bg-black/60 backdrop-blur-md border border-white/10 hover:border-white transition-colors text-white shadow-xl">
                                 <Maximize2 size={16} />
                              </button>
                              <button className="p-2.5 bg-black/60 backdrop-blur-md border border-white/10 hover:border-white transition-colors text-white shadow-xl">
                                 <Share2 size={16} />
                              </button>
                           </div>

                           {/* Metadata Tags */}
                           <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4 opacity-0 group-hover/app:opacity-100 transition-all duration-700">
                              {app.features.map((feat, idx) => (
                                 <div key={idx} className="flex items-center gap-3">
                                    <div className="w-1 h-3 rounded-full" style={{ backgroundColor: app.accent }} />
                                    <span className="text-[7px] font-mono text-white/40 uppercase tracking-[0.3em]">{feat}</span>
                                 </div>
                              ))}
                           </div>

                           {/* Content Info */}
                           <div className="mt-auto relative z-20 p-8 space-y-6">
                              <div className="space-y-2">
                                 <div className="flex items-center gap-3">
                                    <div className="px-2 py-0.5 border border-current text-[7px] font-black tracking-widest uppercase rounded-[2px]" style={{ color: app.accent }}>{app.category}</div>
                                    <div className="h-[1px] flex-1 bg-white/10" />
                                 </div>
                                 <h4 className="text-xl font-black uppercase text-white tracking-tight leading-tight group-hover/app:text-current transition-colors duration-500" style={{ color: app.accent }}>{app.name}</h4>
                              </div>

                              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                                 <div className="flex flex-col gap-1">
                                    <span className="text-[7px] font-mono text-white/20 uppercase tracking-widest">Global_Nodes</span>
                                    <span className="text-[10px] font-bold text-white/60 font-mono">{app.stats.downloads}</span>
                                 </div>
                                 <div className="flex flex-col gap-1 text-right">
                                    <span className="text-[7px] font-mono text-white/20 uppercase tracking-widest">Stability_RT</span>
                                    <span className="text-[10px] font-bold text-white/60 font-mono flex items-center justify-end gap-1">
                                       <Fingerprint size={10} style={{ color: app.accent }} /> {app.stats.rating}/5
                                    </span>
                                 </div>
                              </div>

                              <div className="grid grid-cols-1 gap-3 pt-4">
                                 <button
                                    onClick={() => handleClone(app)}
                                    className="py-3 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all active:scale-95"
                                 >
                                    <Download size={14} /> Clone
                                 </button>
                              </div>
                           </div>
                        </div>
                     </FuturisticCard>
                  )) : (
                     <div className="col-span-full py-32 flex flex-col items-center justify-center border border-dashed border-white/5 text-center space-y-6">
                        <div className="p-8 bg-white/5 rounded-full">
                           <Search size={48} className="text-white/10" strokeWidth={1} />
                        </div>
                        <div className="space-y-2">
                           <h3 className="text-xl font-black uppercase tracking-widest text-white/40">No_Blueprints_Matched</h3>
                           <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Adjust your filters or query vector</p>
                        </div>
                        <button onClick={() => { setSearchQuery(''); setActiveFilter('ALL'); }} className="px-6 py-2 border border-white/10 text-[9px] font-black uppercase text-white/40 hover:text-white transition-all">Clear_Directives</button>
                     </div>
                  )}
               </div>
            </div>
         </div>

         {/* FOOTER METRICS */}
         <div className="p-8 bg-black border border-white/5 rounded-sm flex flex-col md:flex-row justify-between items-center gap-8 opacity-40 hover:opacity-100 transition-all duration-500">
            <div className="flex flex-wrap items-center gap-10">
               <div className="flex items-center gap-4">
                  <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-sm">
                     <Cpu size={18} className="text-cyan-500" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Kernel_4.2.0_LATEST</span>
                     <span className="text-[8px] font-mono text-white/20 uppercase">Core_Orchestration_Active</span>
                  </div>
               </div>
               <div className="hidden md:block w-[1px] h-10 bg-white/5" />
               <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                     <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Sync_Latency</span>
                     <span className="text-xs font-black text-white/60 font-mono">14ms_STABLE</span>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Vault_Integrity</span>
                     <span className="text-xs font-black text-green-500 font-mono uppercase">Verified</span>
                  </div>
               </div>
            </div>
            <div className="flex items-center gap-6">
               <button className="text-[9px] font-black uppercase tracking-[0.3em] text-cyan-400 hover:text-white transition-all flex items-center gap-2 group">
                  Release_Protocol_X <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
         </div>

         {/* MODAL OVERLAY */}
         {
            isModalOpen && (
               <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                  <div className="w-full max-w-md bg-black border border-white/10 p-1 animate-in zoom-in-95 duration-200">
                     <div className="border border-white/5 bg-zinc-950 p-6 space-y-6">
                        <div className="flex items-center justify-between">
                           <h3 className="text-xl font-black uppercase tracking-widest text-white">Initialize_Blueprint</h3>
                           <div className="flex gap-1">
                              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-75" />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Blueprint_Designation</label>
                           <input
                              type="text"
                              autoFocus
                              value={customName}
                              onChange={(e) => setCustomName(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && confirmInjection()}
                              placeholder="ENTER_PROTOCOL_NAME..."
                              className="w-full bg-black border border-white/10 p-4 text-sm font-mono text-cyan-500 outline-none focus:border-cyan-500/50 transition-colors uppercase placeholder:text-white/10"
                           />
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                           <button
                              onClick={() => setIsModalOpen(false)}
                              className="py-3 border border-white/10 text-white/40 hover:text-white hover:border-white/40 font-black text-[10px] uppercase tracking-[0.2em] transition-all"
                           >
                              Abort
                           </button>
                           <button
                              onClick={confirmInjection}
                              disabled={!customName.trim()}
                              className="py-3 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                           >
                              Initialize
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            )
         }
      </div >
   );
};

export default ModuleI_AssetVault;

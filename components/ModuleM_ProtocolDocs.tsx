
import React, { useState } from 'react';
import FuturisticCard from './FuturisticCard';
import { COLORS } from '../constants';
import { 
  BookOpen, Search, ChevronRight, Code2, Layers, 
  Cpu, Shield, Database, Terminal, FileText,
  Share2, ExternalLink, Hash, Info, Sparkles,
  Workflow, Zap, Box, Compass
} from 'lucide-react';

const DOC_SECTIONS = [
  { 
    id: 'kernel', 
    title: 'KERNEL_ORCHESTRATION', 
    icon: Cpu,
    pages: ['Boot_Sequence', 'Memory_Partitioning', 'Process_Priority', 'Entropy_Logic']
  },
  { 
    id: 'api_protocols', 
    title: 'API_TERMINAL_PROTOCOLS', 
    icon: Terminal,
    pages: ['RESTful_Calls', 'gRPC_Streams', 'WebSockets_Sync']
  },
  { 
    id: 'ui', 
    title: 'VISUAL_PRIMITIVES', 
    icon: Layers,
    pages: ['Kinetic_Motion', 'Glass_Refraction', 'Haptic_Mapping', 'Spatial_Grid']
  },
  { 
    id: 'security', 
    title: 'AUTH_PROTOCOLS', 
    icon: Shield,
    pages: ['RSA_4096_Link', 'Bio_Mesh_Handshake', 'Quantum_Vaulting', 'Token_Rotation']
  },
  { 
    id: 'data', 
    title: 'DATA_MESH_v4', 
    icon: Database,
    pages: ['Cluster_Sync', 'Blob_Storage', 'Cache_Invalidation', 'Edge_Directives']
  }
];

const ModuleM_ProtocolDocs: React.FC = () => {
  const [activePage, setActivePage] = useState('Boot_Sequence');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = DOC_SECTIONS.map(section => ({
    ...section,
    pages: section.pages.filter(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
  })).filter(section => section.pages.length > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20 animate-in fade-in duration-700 max-w-[1700px] mx-auto">
      
      {/* 1. LEFT: DOC NAVIGATOR (3 COLUMNS) */}
      <div className="lg:col-span-3 flex flex-col gap-6 sticky top-24">
        <FuturisticCard title="PROTOCOL_EXPLORER" accentColor={COLORS.gray} className="flex-1 p-0 overflow-hidden flex flex-col">
          <div className="p-4 bg-white/5 border-b border-white/5 shrink-0">
             <div className="relative">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                <input 
                  type="text" 
                  placeholder="Query index..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-sm py-2 pl-9 pr-4 text-[9px] font-mono focus:border-cyan-500/40 outline-none text-white/60"
                />
             </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scroll p-2 space-y-6">
             {filteredSections.map(section => (
               <div key={section.id} className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-2 mb-1">
                     <section.icon size={12} className="text-white/20" />
                     <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">{section.title}</span>
                  </div>
                  <div className="space-y-0.5">
                     {section.pages.map(page => (
                       <button 
                         key={page}
                         onClick={() => setActivePage(page)}
                         className={`w-full text-left px-4 py-2 text-[10px] font-mono border transition-all rounded-sm flex items-center justify-between group ${
                           activePage === page ? 'bg-white/5 border-white/10 text-cyan-400' : 'border-transparent text-white/40 hover:text-white/70'
                         }`}
                       >
                         <span className="truncate">{page}</span>
                         {activePage === page && <ChevronRight size={10} className="text-cyan-500" />}
                       </button>
                     ))}
                  </div>
               </div>
             ))}
          </div>
        </FuturisticCard>

        <FuturisticCard title="VERSION_HISTORY" accentColor={COLORS.blue}>
           <div className="space-y-4 pt-1">
              {[
                { v: 'v4.2.1', date: 'CURRENT', stable: true },
                { v: 'v4.1.8', date: 'JAN_24', stable: true },
                { v: 'v4.0.0', date: 'DEC_23', stable: false }
              ].map((ver, i) => (
                <div key={i} className="flex justify-between items-center group cursor-pointer">
                   <div className="flex items-center gap-3">
                      <Hash size={12} className="text-white/20 group-hover:text-blue-500 transition-colors" />
                      <span className="text-[10px] font-mono text-white/40 group-hover:text-white transition-colors uppercase">{ver.v}</span>
                   </div>
                   <span className={`text-[8px] font-black tracking-widest ${ver.stable ? 'text-green-500/40' : 'text-white/10'}`}>{ver.date}</span>
                </div>
              ))}
           </div>
        </FuturisticCard>
      </div>

      {/* 2. CENTER/RIGHT: CONTENT VIEWPORT (9 COLUMNS) */}
      <div className="lg:col-span-9 flex flex-col gap-6">
         
         {/* HEADER BREADCRUMBS */}
         <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-4 text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">
               <span className="hover:text-white cursor-pointer transition-all">Protocol_Index</span>
               <ChevronRight size={10} />
               <span className="text-white/60">Specification</span>
               <ChevronRight size={10} />
               <span className="text-cyan-400 font-black underline underline-offset-4">{activePage}</span>
            </div>
            <div className="flex gap-2">
               <button className="p-2 border border-white/5 text-white/20 hover:text-white transition-all"><Share2 size={14}/></button>
               <button className="p-2 border border-white/5 text-white/20 hover:text-white transition-all"><ExternalLink size={14}/></button>
            </div>
         </div>

         {/* MAIN DOCUMENTATION PANEL */}
         <FuturisticCard title={`SPEC_FILE_0X${activePage.toUpperCase()}`} accentColor={COLORS.cyan} className="min-h-[700px] flex flex-col !p-0 overflow-hidden bg-[radial-gradient(#111_1px,transparent_1px)] bg-[size:40px_40px]">
            <div className="flex-1 p-8 md:p-12 space-y-12 overflow-y-auto custom-scroll max-w-4xl mx-auto">
               
               <div className="space-y-4">
                  <div className="inline-flex items-center gap-3 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-sm mb-4">
                     <Sparkles size={14} className="text-cyan-500" />
                     <span className="text-[10px] font-black text-cyan-400 tracking-[0.3em] uppercase">Core_Directive</span>
                  </div>
                  <h1 className="text-5xl font-black uppercase tracking-tighter text-white leading-none">
                     {activePage.replace('_', ' ')}
                  </h1>
                  <p className="text-sm font-mono text-white/40 leading-relaxed uppercase tracking-tight max-w-2xl">
                     Defining the fundamental operational logic for the NextGenDigiWeb kernel execution path. 
                     This protocol governs how resources are allocated during high-throughput neural inference cycles.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                     <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                        <Workflow size={16} className="text-cyan-500" />
                        <h3 className="text-[11px] font-black uppercase text-white/60 tracking-widest">Logic_Cycle_v4</h3>
                     </div>
                     <ul className="space-y-4">
                        {[
                          'Initialize secure hardware tunnel via RSA-4096 handshake.',
                          'Allocating high-priority V8 heap segments for neural weighing.',
                          'Synchronize visual primitives with the Global_Mesh_Node cluster.',
                          'Execute haptic-feedback protocol on biometric validation failure.'
                        ].map((item, i) => (
                          <li key={i} className="flex gap-4 text-[11px] text-white/40 font-mono leading-relaxed">
                             <span className="text-cyan-500/40">0{i+1}.</span>
                             <span className="uppercase">{item}</span>
                          </li>
                        ))}
                     </ul>
                  </div>
                  <div className="bg-black/40 border border-white/5 p-6 rounded-sm space-y-6">
                     <div className="flex items-center gap-3">
                        <Zap size={16} className="text-yellow-500" />
                        <h3 className="text-[11px] font-black uppercase text-white/60 tracking-widest">Performance_Constants</h3>
                     </div>
                     <div className="space-y-4">
                        {[
                          { label: 'Target_Latency', val: '12ms', color: COLORS.cyan },
                          { label: 'Neural_Overhead', val: '0.042', color: COLORS.blue },
                          { label: 'Buffer_Coherence', val: '99.8%', color: COLORS.green }
                        ].map((stat, i) => (
                          <div key={i} className="space-y-1">
                             <div className="flex justify-between text-[8px] font-mono text-white/20 uppercase tracking-widest">
                                <span>{stat.label}</span>
                                <span className="text-white/60">{stat.val}</span>
                             </div>
                             <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full" style={{ width: stat.val.includes('%') ? stat.val : '60%', backgroundColor: stat.color }} />
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* CODE BLOCK EXAMPLE */}
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <Code2 size={16} className="text-cyan-500" />
                        <h3 className="text-[11px] font-black uppercase text-white/60 tracking-widest">Integration_Snippet</h3>
                     </div>
                     <div className="text-[9px] font-mono text-white/20">LANG: TYPESCRIPT // ENCRYPT: AES_256</div>
                  </div>
                  <div className="relative group/code">
                     <pre className="p-8 bg-black border border-white/5 rounded-sm font-mono text-[11px] text-cyan-500/50 leading-loose overflow-x-auto shadow-inner">
{`/**
 * @protocol NGDW_KERNEL_v4
 * @method initBootstrap
 */
async function initiate_mesh_link() {
  const tunnel = await NGDW.Security.openTunnel('X-99');
  const session = await tunnel.establish_session({
    mode: 'HIGH_THROUGHPUT',
    resilience: 0.992,
    entropy: 'STABLE_004'
  });

  return session.inject_directive('${activePage.toUpperCase()}');
}`}
                     </pre>
                     <button className="absolute top-4 right-4 p-2 bg-white/5 border border-white/10 hover:border-white text-white/20 hover:text-white transition-all opacity-0 group-hover/code:opacity-100">
                        <Share2 size={14}/>
                     </button>
                  </div>
               </div>

               {/* METADATA FOOTER */}
               <div className="pt-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col gap-1">
                     <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">Authored_By</span>
                     <span className="text-[10px] font-mono text-white/60 uppercase">Architect_Core_0x99</span>
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">Last_Modified</span>
                     <span className="text-[10px] font-mono text-white/60 uppercase">14_APR_2024_14:20:01</span>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                     <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">Node_Compliance</span>
                     <div className="flex items-center justify-end gap-2 text-green-500 font-black text-[10px]">
                        <Shield size={10}/> VERIFIED_STABLE
                     </div>
                  </div>
               </div>
            </div>
         </FuturisticCard>
         
         {/* TECHNICAL CALLOUTS */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
               { title: 'MESH_ROUTING', icon: Compass, color: COLORS.cyan, val: 'ACTIVE_V4' },
               { title: 'LATENCY_FLOOR', icon: Zap, color: COLORS.blue, val: '8.2MS_SYNC' },
               { title: 'KERNEL_RECOVERY', icon: Box, color: COLORS.green, val: 'AUTO_FLUSH' }
            ].map((box, i) => (
               <div key={i} className="p-6 bg-black border border-white/5 flex items-center justify-between group hover:border-white/20 transition-all rounded-sm">
                  <div className="flex items-center gap-4">
                     <box.icon size={20} style={{ color: box.color }} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                     <div className="flex flex-col">
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{box.title}</span>
                        <span className="text-xs font-mono font-black text-white/80">{box.val}</span>
                     </div>
                  </div>
                  <ExternalLink size={12} className="text-white/5 group-hover:text-white/30" />
               </div>
            ))}
         </div>

      </div>
    </div>
  );
};

export default ModuleM_ProtocolDocs;

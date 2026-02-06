
import React, { useState } from 'react';
import FuturisticCard from './FuturisticCard';
import { COLORS } from '../constants';
import { 
  Key, Shield, Users, List, RefreshCcw, Cpu, 
  Layers, Lock, Database, Globe, Zap, 
  Terminal, ShieldCheck, Activity, Settings2,
  Sliders, Fingerprint, Network, Binary
} from 'lucide-react';

const ModuleG_Settings: React.FC = () => {
  const [entropy, setEntropy] = useState(0.042);
  const [weighting, setWeighting] = useState(0.85);
  const [propagation, setPropagation] = useState(0.62);
  const [isRotating, setIsRotating] = useState(false);

  const handleKeyRotation = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700 max-w-[1700px] mx-auto pb-20">
      
      {/* 1. TACTICAL HUD HEADER */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'KERNEL_REVISION', val: 'V4.2.1-LTS', icon: Binary, color: COLORS.cyan },
          { label: 'TRUST_COHERENCE', val: '99.98%', icon: ShieldCheck, color: COLORS.green },
          { label: 'AUTH_PROTOCOL', val: 'X-99_NGDW', icon: Lock, color: COLORS.blue },
          { label: 'MESH_ORCHESTRATOR', val: 'ACTIVE', icon: Network, color: COLORS.gray },
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 2. LEFT: KERNEL PARAMETERS & TUNING (8 COLUMNS) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          <FuturisticCard title="ADVANCED_KERNEL_TUNING" accentColor={COLORS.cyan}>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-4">
                <div className="space-y-8">
                   <div className="space-y-4">
                      <div className="flex justify-between items-center mb-2">
                         <div className="flex items-center gap-3">
                            <Activity size={16} className="text-cyan-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Entropy_Buffer_Coherence</span>
                         </div>
                         <span className="text-xs font-mono font-black text-cyan-400">{entropy.toFixed(3)}</span>
                      </div>
                      <input 
                        type="range" min="0" max="0.1" step="0.001" value={entropy} onChange={(e) => setEntropy(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-zinc-950 appearance-none rounded-full accent-cyan-500 cursor-pointer border border-white/10"
                      />
                      <div className="flex justify-between text-[8px] font-mono text-white/10 uppercase tracking-widest">
                         <span>STABLE_FLOOR</span>
                         <span>CHAOS_MAX</span>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="flex justify-between items-center mb-2">
                         <div className="flex items-center gap-3">
                            <Cpu size={16} className="text-blue-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Neural_Weight_Bias</span>
                         </div>
                         <span className="text-xs font-mono font-black text-blue-400">{weighting.toFixed(2)}</span>
                      </div>
                      <input 
                        type="range" min="0" max="1" step="0.05" value={weighting} onChange={(e) => setWeighting(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-zinc-950 appearance-none rounded-full accent-blue-500 cursor-pointer border border-white/10"
                      />
                      <div className="flex justify-between text-[8px] font-mono text-white/10 uppercase tracking-widest">
                         <span>LINEAR_BIAS</span>
                         <span>NEURAL_MAX</span>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="flex justify-between items-center mb-2">
                         <div className="flex items-center gap-3">
                            <Globe size={16} className="text-green-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Mesh_Propagation_Rate</span>
                         </div>
                         <span className="text-xs font-mono font-black text-green-400">{(propagation * 100).toFixed(0)}%</span>
                      </div>
                      <input 
                        type="range" min="0" max="1" step="0.01" value={propagation} onChange={(e) => setPropagation(parseFloat(e.target.value))}
                        className="w-full h-1.5 bg-zinc-950 appearance-none rounded-full accent-green-500 cursor-pointer border border-white/10"
                      />
                      <div className="flex justify-between text-[8px] font-mono text-white/10 uppercase tracking-widest">
                         <span>NODE_ISOLATION</span>
                         <span>GLOBAL_FLOOD</span>
                      </div>
                   </div>
                </div>

                <div className="bg-white/[0.02] border border-white/5 p-8 flex flex-col justify-center gap-8 rounded-sm shadow-inner relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl pointer-events-none" />
                   <div className="space-y-2 relative z-10 text-center">
                      <div className="text-[8px] font-black uppercase tracking-[0.6em] text-white/20 mb-4">Orchestration_Preset</div>
                      <h4 className="text-2xl font-black uppercase tracking-tighter text-white">HIGH_PERFORMANCE_v9</h4>
                      <p className="text-[10px] font-mono text-white/30 uppercase leading-relaxed max-w-xs mx-auto">Optimized for sub-12ms latency across global edge-nodes. Neural weighting prioritized for real-time visual primitives.</p>
                   </div>
                   <div className="grid grid-cols-3 gap-2">
                      {['BALANCED', 'RELIABLE', 'KINETIC'].map(p => (
                        <button key={p} className="py-3 border border-white/5 hover:border-cyan-500/30 hover:bg-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all rounded-sm">
                           {p}
                        </button>
                      ))}
                   </div>
                </div>
             </div>
          </FuturisticCard>

          <FuturisticCard title="SECURITY_GATEWAY_V4" accentColor={COLORS.blue}>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-4">
                <div className="space-y-6">
                   <div className="flex items-center justify-between p-5 bg-black border border-white/5 group hover:border-white/10 transition-all rounded-sm">
                      <div className="flex items-center gap-4">
                         <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-sm">
                            <Fingerprint size={20} className="text-blue-500" />
                         </div>
                         <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-white">2-Factor_Biometrics</div>
                            <div className="text-[8px] font-mono text-white/20 uppercase tracking-widest mt-0.5">Hardware-bound encryption</div>
                         </div>
                      </div>
                      <div className="w-10 h-5 bg-blue-500 rounded-full flex items-center justify-end px-1 cursor-pointer shadow-[0_0_10px_rgba(58,123,255,0.2)]">
                         <div className="w-3.5 h-3.5 bg-black rounded-full" />
                      </div>
                   </div>

                   <div className="flex items-center justify-between p-5 bg-black border border-white/5 group hover:border-white/10 transition-all rounded-sm opacity-40">
                      <div className="flex items-center gap-4">
                         <div className="p-2 bg-white/5 border border-white/10 rounded-sm">
                            <Shield size={20} className="text-white/20" />
                         </div>
                         <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/60">Quantum_Key_Shield</div>
                            <div className="text-[8px] font-mono text-white/10 uppercase tracking-widest mt-0.5">Post-quantum cryptography</div>
                         </div>
                      </div>
                      <div className="w-10 h-5 bg-zinc-900 rounded-full flex items-center justify-start px-1 cursor-pointer">
                         <div className="w-3.5 h-3.5 bg-white/10 rounded-full" />
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex items-center justify-between mb-2">
                      <label className="text-[10px] font-black uppercase text-white/30 tracking-[0.4em]">Master_Protocol_Key</label>
                      <button className="text-[8px] font-black text-blue-500 uppercase tracking-widest hover:text-white transition-colors underline underline-offset-4">Reset_Access</button>
                   </div>
                   <div className="flex gap-2 relative group/key">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10"><Key size={14}/></div>
                      <input 
                        readOnly 
                        className="flex-1 bg-[#050505] border border-white/10 rounded-sm pl-12 pr-4 py-3 text-[11px] font-mono text-white/60 focus:border-blue-500/30 outline-none shadow-inner" 
                        value="sk_live_v2_9a8h2f8j3k99x02a77f..." 
                      />
                      <button 
                        onClick={handleKeyRotation}
                        disabled={isRotating}
                        className="p-3 border border-white/10 hover:border-blue-500 bg-black transition-all rounded-sm group/rot"
                      >
                         <RefreshCcw size={16} className={`text-blue-500 group-hover/rot:text-white transition-all ${isRotating ? 'animate-spin' : ''}`} />
                      </button>
                   </div>
                   <div className="text-[8px] font-mono text-white/10 uppercase leading-relaxed text-right tracking-[0.2em]">Key_Rotation: LAST_SYNC_14_APR</div>
                </div>
             </div>
          </FuturisticCard>
        </div>

        {/* 3. RIGHT: ACCESS LOGS & IDENTITY (4 COLUMNS) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          <FuturisticCard title="IDENTITY_PROFILE" accentColor={COLORS.gray}>
             <div className="flex flex-col items-center py-6 text-center">
                <div className="relative mb-6">
                   <div className="w-24 h-24 rounded-full border border-white/10 p-1 flex items-center justify-center relative group">
                      <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                         <img src="https://picsum.photos/200/200?random=82" className="w-full h-full object-cover opacity-40 hover:opacity-100 transition-opacity" alt="Profile" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 p-2 bg-green-500 border-2 border-black rounded-full shadow-[0_0_15px_rgba(56,255,139,0.3)]" />
                   </div>
                </div>
                <h4 className="text-xl font-black uppercase tracking-tighter text-white">ARCHITECT_X_99</h4>
                <div className="flex items-center gap-3 mt-1">
                   <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">Root_Level_Tier_9</span>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full mt-8 pt-8 border-t border-white/5">
                   <div className="flex flex-col gap-1">
                      <span className="text-[7px] font-black text-white/20 uppercase tracking-widest">Global_Score</span>
                      <span className="text-sm font-black font-mono text-cyan-400">992</span>
                   </div>
                   <div className="flex flex-col gap-1 text-right">
                      <span className="text-[7px] font-black text-white/20 uppercase tracking-widest">Active_Nodes</span>
                      <span className="text-sm font-black font-mono text-white/80">14/14</span>
                   </div>
                </div>
             </div>
          </FuturisticCard>

          <FuturisticCard title="AUDIT_TRAIL_LOG" accentColor={COLORS.blue} className="flex-1 flex flex-col p-0">
             <div className="flex-1 overflow-y-auto custom-scroll p-6 space-y-6">
                {[
                  { user: 'admin@dgweb.com', action: 'DEPLOY_PROD', time: '14:22:01', status: 'SUCCESS' },
                  { user: 'dev_01@dgweb.com', action: 'EDIT_ARCHITECT', time: '14:10:45', status: 'SUCCESS' },
                  { user: 'sys_root', action: 'AUTH_ROTATE', time: '13:55:22', status: 'WARNING' },
                  { user: 'admin@dgweb.com', action: 'VIEW_VAULT', time: '13:42:10', status: 'SUCCESS' },
                  { user: 'guest_42', action: 'TRY_ACCESS', time: '13:10:05', status: 'FAILED' }
                ].map((log, i) => (
                  <div key={i} className="flex items-start gap-4 border-l border-white/5 pl-4 py-1 group cursor-pointer hover:border-blue-500/40 transition-all">
                     <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                           <span className={`text-[10px] font-black uppercase tracking-widest group-hover:text-white transition-colors ${log.status === 'FAILED' ? 'text-red-500' : 'text-blue-400'}`}>{log.action}</span>
                           <span className="text-[8px] font-mono text-white/10 uppercase tracking-tighter">{log.time}</span>
                        </div>
                        <div className="text-[9px] font-mono text-white/20 uppercase truncate">USR: {log.user} // STAT: {log.status}</div>
                     </div>
                  </div>
                ))}
             </div>
             <div className="p-4 border-t border-white/5 bg-zinc-950/20 text-center">
                <button className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-white transition-all flex items-center justify-center gap-2 mx-auto">
                   <List size={14}/> View_Full_Audit_Manifest
                </button>
             </div>
          </FuturisticCard>

          <FuturisticCard title="KERNEL_INTEGRITY" accentColor={COLORS.green}>
             <div className="flex items-center gap-6 py-2">
                <div className="relative">
                   <ShieldCheck size={32} className="text-green-500" />
                   <div className="absolute inset-0 bg-green-500/10 blur-xl rounded-full" />
                </div>
                <div className="flex-1 space-y-2">
                   <div className="flex justify-between text-[8px] font-black uppercase text-white/20">
                      <span>Integrity_Index</span>
                      <span className="text-green-500">99.9%</span>
                   </div>
                   <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[99.9%]" />
                   </div>
                </div>
             </div>
          </FuturisticCard>
        </div>

      </div>
    </div>
  );
};

export default ModuleG_Settings;

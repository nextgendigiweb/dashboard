
import React, { useState, useEffect, useRef } from 'react';
import FuturisticCard from './FuturisticCard';
import { COLORS } from '../constants';
import { 
  Activity, ShieldCheck, Zap, Globe, Lock, Layers, 
  CheckCircle2, Loader2, CpuIcon, Database, Network, 
  HardDrive, GitBranch, Cloud, Play, StopCircle, 
  ArrowUpRight, Gauge, Terminal, Cpu
} from 'lucide-react';

interface PipelineStage {
  id: string;
  name: string;
  status: 'pending' | 'active' | 'success' | 'failed';
  log: string;
  duration: string;
}

const ModuleC_Deployment: React.FC = () => {
  const [activeEnv, setActiveEnv] = useState<'dev' | 'staging' | 'prod'>('dev');
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "KERNEL_INIT: System ready.",
    "SCAN_NODES: 24 active points verified.",
    "AWAITING: Pipeline execution command..."
  ]);
  
  const [stages, setStages] = useState<PipelineStage[]>([
    { id: '1', name: 'SOURCE_SYNC', status: 'pending', log: 'Syncing remote HEAD...', duration: '1.2s' },
    { id: '2', name: 'NEURAL_LINT', status: 'pending', log: 'Validating logic gates...', duration: '4.5s' },
    { id: '3', name: 'ASSET_COMPRESS', status: 'pending', log: 'Minifying visual buffer...', duration: '2.8s' },
    { id: '4', name: 'SECURITY_SCAN', status: 'pending', log: 'Auditing auth protocols...', duration: '5.1s' },
    { id: '5', name: 'EDGE_PROPAGATE', status: 'pending', log: 'Global CDN distribution...', duration: '0.8s' },
  ]);

  const logEndRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs]);

  const addLog = (msg: string) => {
    setTerminalLogs(prev => [...prev.slice(-15), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const abortPipeline = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsBuilding(false);
    addLog("BUILD_ABORTED: Pipeline killed by user.");
    setStages(prev => prev.map(s => s.status === 'active' ? { ...s, status: 'failed' as const } : s));
  };

  const startPipeline = () => {
    if (isBuilding) return;
    setIsBuilding(true);
    setBuildProgress(0);
    setTerminalLogs([]);
    addLog(`PIPELINE_INIT: TARGET=${activeEnv.toUpperCase()}`);
    
    setStages(prev => prev.map(s => ({ ...s, status: 'pending' as const })));

    let currentStageIndex = 0;
    intervalRef.current = window.setInterval(() => {
      setBuildProgress(p => {
        const newP = p + 2;
        
        if (newP >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsBuilding(false);
          setStages(prev => prev.map(s => ({ ...s, status: 'success' as const })));
          addLog("DEPLOY_SUCCESS: Instance online at edge nodes.");
          return 100;
        }

        const stageThreshold = 100 / stages.length;
        const targetIndex = Math.floor(newP / stageThreshold);

        if (targetIndex > currentStageIndex && currentStageIndex < stages.length) {
          setStages(prev => {
            const next = [...prev];
            if (next[currentStageIndex]) next[currentStageIndex].status = 'success';
            if (next[targetIndex]) {
               next[targetIndex].status = 'active';
               addLog(`EXECUTING: ${next[targetIndex].name}`);
            }
            return next;
          });
          currentStageIndex = targetIndex;
        }

        // Add some "noise" logs occasionally
        if (Math.random() > 0.8) {
          addLog(`PACKET_PUSH: Node_${Math.floor(Math.random()*100)}... OK`);
        }

        return newP;
      });
    }, 100);
  };

  return (
    <div className="flex flex-col gap-3 animate-in fade-in duration-500 pb-12 max-w-[1600px] mx-auto">
      
      {/* 1. COMPACT HUD STATS BAR */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {[
          { label: 'NODE_UPTIME', value: '99.99%', icon: Activity, color: COLORS.cyan },
          { label: 'BUILD_RATE', value: '98.4%', icon: Zap, color: COLORS.green },
          { label: 'LATENCY', value: '12ms', icon: ShieldCheck, color: COLORS.blue },
          { label: 'MESH_NODES', value: '1.2K', icon: Globe, color: COLORS.cyan },
          { label: 'AUTH_GATE', value: 'RSA_4096', icon: Lock, color: COLORS.green },
          { label: 'PIPE_QUEUE', value: isBuilding ? '1_BUSY' : '0_IDLE', icon: Layers, color: COLORS.gray },
        ].map((item, idx) => (
          <div key={idx} className="bg-zinc-950/40 border border-white/5 p-2.5 flex flex-col gap-0.5 hover:border-white/15 transition-all group cursor-default">
             <div className="flex items-center gap-1.5 opacity-20 group-hover:opacity-100 transition-opacity">
                <item.icon size={10} style={{ color: item.color }} />
                <span className="text-[6px] font-black uppercase tracking-[0.2em] text-white/50">{item.label}</span>
             </div>
             <div className="text-[11px] font-black font-mono text-white/80">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        
        {/* 2. LEFT: ORCHESTRATION HUB (8 COLUMNS) */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          
          <FuturisticCard title="PIPELINE_RECONSTRUCTION_ENGINE" accentColor={COLORS.cyan} className="!p-0 overflow-hidden">
            <div className="p-3 flex flex-col gap-3">
               
               {/* STAGES GRID */}
               <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-1.5">
                  {stages.map((stage, idx) => (
                    <div key={stage.id} className={`relative flex flex-col p-3 border transition-all rounded-[2px] ${
                      stage.status === 'active' ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(0,246,255,0.05)]' : 
                      stage.status === 'success' ? 'bg-green-500/5 border-green-500/20' : 
                      stage.status === 'failed' ? 'bg-red-500/5 border-red-500/30' :
                      'border-white/5 bg-black/40'
                    }`}>
                       <div className="flex justify-between items-start mb-2">
                          <div className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-all ${
                            stage.status === 'success' ? 'bg-green-500 border-green-400 text-black shadow-[0_0_10px_#38FF8B]' :
                            stage.status === 'active' ? 'bg-cyan-500 border-cyan-400 text-black animate-pulse' :
                            stage.status === 'failed' ? 'bg-red-500 border-red-400 text-black' :
                            'bg-black border-white/10 text-white/20'
                          }`}>
                             {stage.status === 'success' ? <CheckCircle2 size={10} /> : 
                              stage.status === 'active' ? <Loader2 size={10} className="animate-spin" /> : 
                              stage.status === 'failed' ? <StopCircle size={10} /> :
                              <span className="text-[7px] font-black">{idx + 1}</span>}
                          </div>
                          <span className="text-[6px] font-mono text-white/20 uppercase tracking-widest">{stage.duration}</span>
                       </div>
                       <div className={`text-[8px] font-black tracking-[0.2em] uppercase mb-0.5 ${stage.status !== 'pending' ? 'text-white' : 'text-white/20'}`}>
                          {stage.name}
                       </div>
                       <div className={`text-[7px] font-mono leading-tight truncate ${stage.status === 'active' ? 'text-cyan-400' : 'text-white/10'}`}>
                          {stage.status === 'active' ? stage.log : stage.status === 'success' ? 'STABLE' : stage.status === 'failed' ? 'ABORTED' : 'WAITING'}
                       </div>
                    </div>
                  ))}
               </div>

               {/* COMPACT PROGRESS BAR */}
               <div className="p-3 bg-zinc-950 border border-white/5 flex flex-col gap-2 rounded-sm">
                  <div className="flex justify-between items-end">
                     <div className="flex items-center gap-2">
                        <CpuIcon size={12} className="text-cyan-500 opacity-40" />
                        <span className="text-[7px] font-black uppercase tracking-[0.4em] text-white/20">Throughput_Vector</span>
                     </div>
                     <span className="text-sm font-black font-mono text-cyan-400">{Math.round(buildProgress)}%</span>
                  </div>
                  <div className="h-1 w-full bg-black rounded-full overflow-hidden border border-white/10 shadow-inner">
                     <div className="h-full bg-cyan-500 shadow-[0_0_12px_#00F6FF] transition-all duration-300 relative" style={{ width: `${buildProgress}%` }}>
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-[shimmer_2s_infinite]" />
                     </div>
                  </div>
               </div>

            </div>
          </FuturisticCard>

          {/* DUAL TERMINAL / TELEMETRY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
             <FuturisticCard title="PIPELINE_STDOUT" accentColor={COLORS.gray} className="h-56 flex flex-col !p-0 overflow-hidden">
                <div className="flex-1 overflow-y-auto custom-scroll p-3 space-y-1 font-mono text-[8px] bg-[#020202]">
                   {terminalLogs.map((log, i) => (
                     <div key={i} className="flex gap-2 group/log">
                        <span className="text-cyan-500/40 group-hover/log:text-cyan-400 shrink-0 uppercase tracking-tighter">NGDW:</span>
                        <span className="text-white/30 group-hover/log:text-white/70 transition-colors uppercase truncate">{log}</span>
                     </div>
                   ))}
                   <div ref={logEndRef} />
                </div>
                <div className="px-3 py-1.5 border-t border-white/5 bg-zinc-950 flex justify-between items-center text-[6px] font-mono text-white/15 uppercase tracking-[0.3em]">
                   <span>IO_BUFFER_X99</span>
                   <span className={isBuilding ? 'animate-pulse text-cyan-500/40' : ''}>{isBuilding ? '_SYSIO_ACTIVE' : '_AWAITING_'}</span>
                </div>
             </FuturisticCard>

             <FuturisticCard title="CLUSTER_LOAD_MATRIX" accentColor={COLORS.blue} className="h-56 flex flex-col !p-0">
                <div className="flex-1 p-3 grid grid-cols-2 gap-2">
                   {[
                     { label: 'CORE_4', val: isBuilding ? `${40 + Math.floor(Math.random()*10)}%` : '4%', icon: Cpu },
                     { label: 'MEM_B', val: isBuilding ? '64%' : '12%', icon: Database },
                     { label: 'NET_P', val: isBuilding ? '1.4ms' : '0.1ms', icon: Network },
                     { label: 'DSK_I', val: isBuilding ? '12MB/s' : '0B/s', icon: HardDrive },
                   ].map((stat, i) => (
                     <div key={i} className="p-2 bg-black border border-white/5 flex flex-col justify-center gap-0.5 hover:border-blue-500/20 transition-all group/s">
                        <div className="flex items-center gap-1.5">
                           <stat.icon size={8} className="text-blue-500 opacity-20 group-hover/s:opacity-100 transition-opacity" />
                           <span className="text-[6px] font-black text-white/20 uppercase tracking-widest">{stat.label}</span>
                        </div>
                        <div className="text-[10px] font-black font-mono text-white/60">{stat.val}</div>
                     </div>
                   ))}
                </div>
                <div className="p-2 border-t border-white/5 flex items-center justify-between px-3">
                   <div className="flex flex-col">
                     <span className="text-[6px] font-black text-white/10 uppercase tracking-[0.2em]">Efficiency_Index</span>
                     <span className="text-[9px] font-black text-blue-500 font-mono tracking-tighter">98.2%_OPT</span>
                   </div>
                   <Gauge size={14} className="text-blue-500 opacity-20" />
                </div>
             </FuturisticCard>
          </div>
        </div>

        {/* 3. RIGHT: DIRECTIVES & ARCHIVE (4 COLUMNS) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          
          <FuturisticCard title="SYNC_DIRECTIVES" accentColor={COLORS.blue}>
             <div className="space-y-3 pt-1">
                <div className="grid grid-cols-1 gap-1.5">
                   {[
                     { id: 'dev', icon: HardDrive, tag: 'SANDBOX' },
                     { id: 'staging', icon: Layers, tag: 'MIRROR' },
                     { id: 'prod', icon: Cloud, tag: 'LIVE' },
                   ].map((e) => (
                     <div 
                       key={e.id}
                       onClick={() => !isBuilding && setActiveEnv(e.id as any)}
                       className={`px-3 py-2 border rounded-sm cursor-pointer transition-all flex items-center justify-between group/e ${
                         activeEnv === e.id ? 'bg-blue-500/10 border-blue-500/40' : 'border-white/5 bg-black hover:border-white/10'
                       } ${isBuilding ? 'opacity-30 cursor-not-allowed' : ''}`}
                     >
                        <div className="flex items-center gap-3">
                           <div className={`p-1.5 border transition-all ${activeEnv === e.id ? 'border-blue-500/50 text-blue-400' : 'border-white/5 text-white/10'}`}>
                              <e.icon size={12} />
                           </div>
                           <div className="flex flex-col">
                              <span className={`text-[9px] font-black uppercase tracking-widest ${activeEnv === e.id ? 'text-white' : 'text-white/20'}`}>{e.id}_NODE</span>
                           </div>
                        </div>
                        <div className={`px-1.5 py-0.5 text-[6px] font-black border rounded-[1px] transition-all ${
                          activeEnv === e.id ? 'border-blue-500/40 text-blue-400' : 'border-white/10 text-white/5'
                        }`}>
                           {e.tag}
                        </div>
                     </div>
                   ))}
                </div>

                <div className="pt-3 border-t border-white/5 space-y-3">
                   <div className="bg-black/20 p-2.5 border border-white/5 flex justify-between items-center rounded-sm">
                      <div className="flex items-center gap-2">
                         <GitBranch size={10} className="text-white/20" />
                         <span className="text-[7px] font-black text-white/20 tracking-widest uppercase">Target_HEAD</span>
                      </div>
                      <span className="text-[8px] font-mono font-bold text-blue-400">main_v4</span>
                   </div>

                   <div className="flex gap-1.5">
                      <button 
                        onClick={startPipeline}
                        disabled={isBuilding}
                        className="flex-1 py-3 bg-white text-black font-black uppercase tracking-[0.3em] text-[9px] hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-20 flex items-center justify-center gap-2 shadow-lg group"
                      >
                        {isBuilding ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} className="group-hover:scale-125 transition-transform" />}
                        {isBuilding ? 'PUSHING' : 'EXECUTE'}
                      </button>
                      {isBuilding && (
                        <button 
                          onClick={abortPipeline}
                          className="w-10 py-3 border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-all flex items-center justify-center"
                        >
                           <StopCircle size={14} />
                        </button>
                      )}
                   </div>
                </div>
             </div>
          </FuturisticCard>

          <FuturisticCard title="PIPELINE_ARCHIVE" accentColor={COLORS.gray} className="flex-1 min-h-[220px]">
             <div className="space-y-1.5 max-h-[220px] overflow-y-auto custom-scroll pr-1">
                {[
                  { v: 'V4.2.0', e: 'PROD', s: 'SUCCESS', t: '2h' },
                  { v: 'V4.1.9', e: 'STAGE', s: 'SUCCESS', t: '9h' },
                  { v: 'V4.1.8', e: 'DEV', s: 'FAILED', t: '1d' },
                  { v: 'V4.1.7', e: 'PROD', s: 'SUCCESS', t: '4d' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 bg-black border border-white/5 hover:border-white/10 transition-all group cursor-pointer rounded-sm">
                     <div className="flex items-center gap-2.5">
                        <div className={`w-0.5 h-3 ${item.s === 'SUCCESS' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <div>
                           <div className="text-[9px] font-black uppercase text-white/60 group-hover:text-cyan-400 transition-colors">{item.v}</div>
                           <div className="text-[6px] font-mono text-white/10 uppercase tracking-widest">{item.e} GATE // {item.t}</div>
                        </div>
                     </div>
                     <ArrowUpRight size={10} className="text-white/10 group-hover:text-white/30 transition-all" />
                  </div>
                ))}
             </div>
             <button className="w-full mt-3 py-1.5 border border-white/5 text-[7px] font-black uppercase tracking-[0.3em] text-white/15 hover:text-white transition-all">
                Full_History_Log
             </button>
          </FuturisticCard>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default ModuleC_Deployment;

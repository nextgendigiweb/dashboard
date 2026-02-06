
import React, { useState, useEffect } from 'react';
import FuturisticCard from './FuturisticCard';
import { COLORS } from '../constants';
import { Zap, Cpu, MemoryStick as Memory, Gauge, Wind, Thermometer, Box, RefreshCcw } from 'lucide-react';

const ModuleE_Performance: React.FC = () => {
  const [metrics, setMetrics] = useState({
    cpu: 45,
    memory: 72,
    loadTime: 1.2,
    battery: 98,
    temp: 32,
    npu: 14
  });

  // Simulated live fluctuating data
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: Math.max(10, Math.min(95, prev.cpu + (Math.random() - 0.5) * 5)),
        npu: Math.max(5, Math.min(60, prev.npu + (Math.random() - 0.5) * 2)),
        temp: Math.max(30, Math.min(45, prev.temp + (Math.random() - 0.5) * 0.5))
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FuturisticCard title="CPU_THERMAL_BRIDGE" accentColor={COLORS.cyan}>
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <Thermometer size={20} className={metrics.temp > 40 ? 'text-red-500' : 'text-cyan-500'} />
                   <div className="text-2xl font-black font-mono">{metrics.temp.toFixed(1)}&deg;C</div>
                </div>
                <div className="text-[8px] font-mono text-white/20 uppercase">Thermal_Envelop</div>
             </div>
             
             <div className="space-y-3">
                <div className="flex justify-between text-[9px] font-mono uppercase">
                   <span className="text-white/30">P-Core Load</span>
                   <span className="text-cyan-400">{(metrics.cpu * 0.8).toFixed(1)}%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-cyan-500 transition-all duration-700" style={{ width: `${metrics.cpu * 0.8}%` }} />
                </div>
             </div>

             <div className="p-2 bg-white/5 border border-white/5 text-[9px] font-mono text-white/30 italic">
                Active Cooling: PASSIVE_ONLY
             </div>
          </div>
        </FuturisticCard>

        <FuturisticCard title="MEMORY_HEAP_SWAP" accentColor={COLORS.green}>
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <Memory size={20} className="text-green-500" />
                   <div className="text-2xl font-black font-mono">{metrics.memory}%</div>
                </div>
                <div className="text-[8px] font-mono text-white/20 uppercase">Ram_Efficiency</div>
             </div>
             
             <div className="space-y-3">
                <div className="flex justify-between text-[9px] font-mono uppercase">
                   <span className="text-white/30">Heap Usage</span>
                   <span className="text-green-400">{Math.round(metrics.memory * 1.2)}MB</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-green-500 transition-all duration-700" style={{ width: `${metrics.memory}%` }} />
                </div>
             </div>

             <button className="w-full py-1 text-[8px] font-black uppercase tracking-widest text-white/40 border border-white/10 hover:border-green-500/40 hover:text-green-500 transition-all flex items-center justify-center gap-2">
                <RefreshCcw size={10} /> Garbage_Collect
             </button>
          </div>
        </FuturisticCard>

        <FuturisticCard title="NEURAL_NPU_ENGINE" accentColor={COLORS.blue}>
          <div className="flex flex-col items-center justify-center h-full py-2">
             <div className="relative">
                <Cpu className="text-blue-500 mb-2" size={48} strokeWidth={1} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-20" />
             </div>
             <div className="text-3xl font-mono font-bold tracking-tighter">{metrics.npu.toFixed(1)}%</div>
             <div className="text-[10px] text-white/30 uppercase tracking-[0.3em] mt-2">Inference_Active</div>
             <div className="mt-4 flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
             </div>
          </div>
        </FuturisticCard>

        <FuturisticCard title="DYNAMIC_TUNING" accentColor={COLORS.cyan}>
          <div className="space-y-4">
             {[
               { label: 'JIT Compilation', active: true, color: 'text-cyan-400' },
               { label: 'Hardware Accel', active: true, color: 'text-green-400' },
               { label: 'NPU Delegation', active: true, color: 'text-blue-400' },
               { label: 'Asset Caching', active: false, color: 'text-white/20' },
               { label: 'Binary Shaking', active: true, color: 'text-cyan-400' },
             ].map((opt, i) => (
               <div key={i} className="flex items-center justify-between group/opt">
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${opt.active ? 'text-white/70' : 'text-white/20'}`}>{opt.label}</span>
                  <div className={`w-7 h-3.5 rounded-full p-0.5 cursor-pointer transition-all border border-white/10 ${opt.active ? 'bg-cyan-500/20 border-cyan-500/40' : 'bg-black'}`}>
                     <div className={`w-2 h-2 rounded-full transition-all ${opt.active ? 'translate-x-3.5 bg-cyan-400' : 'bg-white/10'}`} />
                  </div>
               </div>
             ))}
          </div>
        </FuturisticCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <FuturisticCard title="ENGINE_RESOURCE_DISTRIBUTION" accentColor={COLORS.cyan}>
            <div className="space-y-4 mt-4">
               {[
                 { label: 'Main Thread', val: 12, max: 100, color: COLORS.cyan },
                 { label: 'Render Pipeline', val: 42, max: 100, color: COLORS.green },
                 { label: 'AI Inference', val: 88, max: 100, color: COLORS.blue },
                 { label: 'I/O Workers', val: 5, max: 100, color: COLORS.gray },
               ].map((bar, i) => (
                 <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono">
                       <span className="text-white/30 uppercase tracking-widest">{bar.label}</span>
                       <span className="font-bold" style={{ color: bar.color }}>{bar.val}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full transition-all duration-1000" style={{ width: `${bar.val}%`, backgroundColor: bar.color }} />
                    </div>
                 </div>
               ))}
            </div>
         </FuturisticCard>

         <FuturisticCard title="SYSTEM_OPTIMIZATION_LOG" accentColor={COLORS.gray}>
            <div className="h-[180px] overflow-y-auto font-mono text-[9px] space-y-2 pr-2 custom-scroll mt-2">
               <div className="flex gap-4 text-white/20"><span>[09:12:01]</span> <span className="text-cyan-500">OPTIMIZER</span> <span>Reallocating pool buffers for Asset_Vault...</span></div>
               <div className="flex gap-4 text-white/20"><span>[09:12:05]</span> <span className="text-green-500">RENDERER</span> <span>Frame skip detected at node Home_Screen. Adjusting pacing.</span></div>
               <div className="flex gap-4 text-white/20"><span>[09:12:12]</span> <span className="text-blue-500">NPU_CORE</span> <span>Inference task "Face_Recog_V2" prioritized on high-perf cluster.</span></div>
               <div className="flex gap-4 text-white/20"><span>[09:12:18]</span> <span className="text-yellow-500">THERMAL</span> <span>Entering stage 1 throttle. Reducing clock from 3.2GHz to 2.8GHz.</span></div>
               <div className="flex gap-4 text-white/20"><span>[09:12:25]</span> <span className="text-cyan-500">NETWORK</span> <span>Switching to Proto_X-99 for low-latency telemetry streaming.</span></div>
               <div className="animate-pulse flex gap-2 text-white/20 italic"><span>_</span> <span>Awaiting next hardware interrupt...</span></div>
            </div>
         </FuturisticCard>
      </div>
    </div>
  );
};

export default ModuleE_Performance;

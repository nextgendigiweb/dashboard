
import React, { useState, useEffect } from 'react';
import FuturisticCard from './FuturisticCard';
import { COLORS } from '../constants';
import {
   Smartphone, Tablet, Watch, Monitor, CheckCircle2,
   AlertCircle, RefreshCw, Cpu, Gauge, Zap,
   HardDrive, Terminal, Maximize2, Play,
   Pause, RotateCcw, Box, Signal, Battery,
   Camera, CameraOff, Video, Sliders
} from 'lucide-react';
import {
   ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
   Tooltip, BarChart, Bar, CartesianGrid, PieChart, Pie, Cell
} from 'recharts';

const deviceHealthData = [
   { time: '10s', load: 45, thermal: 32 },
   { time: '20s', load: 52, thermal: 34 },
   { time: '30s', load: 88, thermal: 42 },
   { time: '40s', load: 65, thermal: 38 },
   { time: '50s', load: 42, thermal: 35 },
   { time: '60s', load: 38, thermal: 33 },
];

const osDistData = [
   { name: 'iOS_17', value: 45, fill: COLORS.cyan },
   { name: 'ANDROID_14', value: 35, fill: COLORS.blue },
   { name: 'VISION_OS', value: 15, fill: COLORS.green },
   { name: 'OTHER', value: 5, fill: COLORS.gray },
];

const ModuleH_DeviceLab: React.FC = () => {
   const [activeDevice, setActiveDevice] = useState('IP15P');
   const [isTesting, setIsTesting] = useState(false);
   const [testProgress, setTestProgress] = useState(0);

   const startTest = () => {
      setIsTesting(true);
      setTestProgress(0);
      const interval = setInterval(() => {
         setTestProgress(p => {
            if (p >= 100) {
               clearInterval(interval);
               setIsTesting(false);
               return 100;
            }
            return p + 5;
         });
      }, 200);
   };

   return (
      <div className="space-y-6 pb-20 animate-in fade-in duration-700">

         {/* 1. TACTICAL OVERVIEW GRID */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
               { label: 'DEVICE_AVAILABILITY', val: '18/24', icon: Smartphone, color: COLORS.cyan },
               { label: 'FARM_LATENCY', val: '42ms', icon: Signal, color: COLORS.blue },
               { label: 'THERMAL_STABILITY', val: '38°C', icon: Zap, color: COLORS.green },
               { label: 'TOTAL_TEST_RUNS', val: '12,842', icon: Box, color: COLORS.gray },
            ].map((stat, i) => (
               <div key={i} className="bg-zinc-950/40 border border-white/5 p-4 flex flex-col gap-1 hover:border-white/15 transition-all group">
                  <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-all">
                     <stat.icon size={12} style={{ color: stat.color }} />
                     <span className="text-[8px] font-black uppercase tracking-[0.3em] font-mono">{stat.label}</span>
                  </div>
                  <div className="text-xl font-black font-mono text-white/70">{stat.val}</div>
               </div>
            ))}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* 2. LEFT: REMOTE DEBUGGING CONSOLE (8 COLUMNS) */}
            <div className="lg:col-span-8 flex flex-col gap-6">

               {/* DEVICE SIMULATOR HUD */}
               <FuturisticCard title="REMOTE_DEVICE_FARM" accentColor={COLORS.cyan} className="!p-0 overflow-hidden min-h-[500px]">
                  <div className="flex flex-col md:flex-row h-full">
                     {/* Visual Emulator Mockup */}
                     <div className="flex-1 bg-black p-8 flex items-center justify-center relative bg-[radial-gradient(#111_1px,transparent_1px)] bg-[size:30px_30px]">
                        <div className="w-[280px] h-[580px] border-[8px] border-[#0a0a0a] rounded-[42px] bg-zinc-900 relative shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden">
                           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#0a0a0a] rounded-b-2xl z-10" />
                           <div className="h-full w-full opacity-60 grayscale hover:grayscale-0 transition-all duration-1000 group/screen relative">
                              <img src="/Mobile.png" className="w-full h-full object-cover" alt="Remote Screen" />
                              <div className="absolute inset-0 bg-cyan-500/5 animate-pulse pointer-events-none" />
                              <div className="absolute bottom-10 left-6 right-6 p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg">
                                 <div className="text-[7px] font-mono text-cyan-400 uppercase mb-2">Build_Target: NEXTGEN_V4</div>
                                 <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-cyan-500" style={{ width: '65%' }} />
                                 </div>
                              </div>
                           </div>
                        </div>
                        {/* HUD Overlays */}
                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                           <div className="px-3 py-1.5 bg-black/80 border border-white/5 rounded-sm flex items-center gap-2">
                              <Camera size={12} className="text-white/40" />
                              <span className="text-[8px] font-mono text-white/20 tracking-widest uppercase">Cam_Feed: ACTIVE</span>
                           </div>
                           <div className="px-3 py-1.5 bg-black/80 border border-white/5 rounded-sm flex items-center gap-2">
                              <Battery size={12} className="text-green-500" />
                              <span className="text-[8px] font-mono text-white/20 tracking-widest uppercase">Battery: 98.4%</span>
                           </div>
                        </div>
                     </div>

                     {/* Debug Side Panel */}
                     <div className="w-full md:w-80 border-l border-white/5 flex flex-col bg-zinc-950/20">
                        <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                           <div className="flex items-center gap-2">
                              <Terminal size={14} className="text-cyan-500" />
                              <span className="text-[10px] font-black uppercase tracking-widest">REALTIME_LOGS</span>
                           </div>
                           <div className="flex gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                           </div>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto custom-scroll font-mono text-[9px] text-white/30 space-y-2 uppercase leading-relaxed">
                           <div>[14:42:01] <span className="text-cyan-500">SYS:</span> ENGINE_ATTACHED_0XFF</div>
                           <div>[14:42:05] <span className="text-green-500">I/O:</span> TOUCH_EVENT_COORDS(142, 592)</div>
                           <div>[14:42:12] <span className="text-white/10">BUF:</span> Pushing 1.2MB visual slice...</div>
                           <div>[14:42:15] <span className="text-cyan-500">SYS:</span> HAPTIC_TRIGGER_LEVEL_2</div>
                           <div>[14:42:22] <span className="text-yellow-500">WRN:</span> FRAME_DROP_DETECTED_12MS</div>
                           <div>[14:42:28] <span className="text-cyan-500">SYS:</span> RE-SYNC_COMPLETE</div>
                           <div className="animate-pulse">_ AWAITING_INTERRUPT...</div>
                        </div>
                        <div className="p-6 border-t border-white/10 space-y-4">
                           <div className="grid grid-cols-2 gap-2">
                              <button onClick={startTest} className="py-2.5 bg-cyan-500 text-black font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all">
                                 <Play size={12} /> STRESS_TEST
                              </button>
                              <button className="py-2.5 border border-white/10 text-white/40 font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/5 active:scale-95 transition-all">
                                 <Camera size={12} /> SNAPSHOT
                              </button>
                           </div>
                           {isTesting && (
                              <div className="space-y-1.5">
                                 <div className="flex justify-between text-[8px] font-black text-cyan-400">
                                    <span>TESTING_IN_PROGRESS</span>
                                    <span>{testProgress}%</span>
                                 </div>
                                 <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-cyan-500" style={{ width: `${testProgress}%` }} />
                                 </div>
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               </FuturisticCard>
            </div>

            {/* 3. RIGHT: TELEMETRY & OS MIX (4 COLUMNS) */}
            <div className="lg:col-span-4 flex flex-col gap-6">

               {/* HARDWARE PROFILE CHART */}
               <FuturisticCard title="HARDWARE_UTIL_SPECTRUM" accentColor={COLORS.blue}>
                  <div className="h-48 mt-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={deviceHealthData}>
                           <defs>
                              <linearGradient id="loadGrad" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor={COLORS.blue} stopOpacity={0.4} />
                                 <stop offset="95%" stopColor={COLORS.blue} stopOpacity={0} />
                              </linearGradient>
                           </defs>
                           <XAxis dataKey="time" hide />
                           <YAxis hide />
                           <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #222' }} />
                           <Area type="monotone" dataKey="load" stroke={COLORS.blue} fill="url(#loadGrad)" strokeWidth={2} />
                           <Area type="monotone" dataKey="thermal" stroke={COLORS.green} fill="transparent" strokeWidth={1} strokeDasharray="3 3" />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
                  <div className="flex justify-between mt-4 border-t border-white/5 pt-4">
                     <div className="flex flex-col gap-1">
                        <span className="text-[7px] font-black text-white/20 uppercase tracking-widest">Mean_CPU_Load</span>
                        <span className="text-xs font-black font-mono text-blue-400">62.1%</span>
                     </div>
                     <div className="flex flex-col gap-1 text-right">
                        <span className="text-[7px] font-black text-white/20 uppercase tracking-widest">NPU_Delegation</span>
                        <span className="text-xs font-black font-mono text-green-400">OPTIMAL</span>
                     </div>
                  </div>
               </FuturisticCard>

               {/* OS DISTRIBUTION PIE */}
               <FuturisticCard title="FARM_OS_DISTRIBUTION" accentColor={COLORS.gray}>
                  <div className="h-48 mt-2">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                           <Pie data={osDistData} innerRadius={40} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">
                              {osDistData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                           </Pie>
                           <Tooltip />
                        </PieChart>
                     </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 mt-4">
                     {osDistData.map(d => (
                        <div key={d.name} className="flex justify-between items-center group">
                           <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.fill }} />
                              <span className="text-[8px] font-black text-white/30 uppercase tracking-widest group-hover:text-white transition-colors">{d.name}</span>
                           </div>
                           <span className="text-[10px] font-mono text-white/60">{d.value}%</span>
                        </div>
                     ))}
                  </div>
               </FuturisticCard>

               {/* QUICK DEVICE ACTIONS */}
               <FuturisticCard title="LAB_DIRECTIVES" accentColor={COLORS.green}>
                  <div className="space-y-3">
                     {[
                        { label: 'Flush_Farm_Cache', icon: RotateCcw, color: COLORS.cyan },
                        { label: 'Sync_Global_Assets', icon: RefreshCw, color: COLORS.green },
                        { label: 'Calibrate_Optics', icon: Sliders, color: COLORS.blue },
                        { label: 'Force_Reboot_Nodes', icon: Zap, color: COLORS.gray },
                     ].map((act, i) => (
                        <button key={i} className="w-full flex items-center justify-between p-3 bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all group text-left">
                           <div className="flex items-center gap-3">
                              <act.icon size={14} className="text-white/20 group-hover:text-current transition-colors" style={{ color: act.color }} />
                              <span className="text-[9px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{act.label}</span>
                           </div>
                           <ArrowUpRight size={12} className="text-white/5 group-hover:text-white/30" />
                        </button>
                     ))}
                  </div>
               </FuturisticCard>
            </div>

         </div>

         <style>{`
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #000;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #222;
          border-radius: 10px;
        }
      `}</style>
      </div>
   );
};

// Internal utility component missing from previous versions
const ArrowUpRight = ({ size, className }: { size: number, className: string }) => (
   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
   </svg>
);

export default ModuleH_DeviceLab;

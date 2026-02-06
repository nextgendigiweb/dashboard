
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, 
  PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, Legend, LineChart, Line, ComposedChart,
  CartesianGrid
} from 'recharts';
import FuturisticCard from './FuturisticCard';
import { COLORS } from '../constants';
import { 
  Activity, Zap, Battery, Smartphone, Cpu, AlertOctagon, Signal, Layers,
  MousePointer2, Infinity, ShieldCheck, Code, Box, Binary, Microchip, Globe,
  Waves, Radio, Crosshair, Compass, Server, Database, TrendingUp, ShieldAlert,
  Sparkles, FileText, RefreshCw, Plug, CheckCircle2, ArrowRight, Play, Settings,
  Terminal, Cloud, Shield, GitBranch, BarChart3
} from 'lucide-react';

// Enhanced Mock Data
const throughputData = [
  { time: '00:00', nps: 120, latency: 18, fps: 59, entropy: 0.12 },
  { time: '04:00', nps: 450, latency: 22, fps: 60, entropy: 0.15 },
  { time: '08:00', nps: 890, latency: 15, fps: 58, entropy: 0.22 },
  { time: '12:00', nps: 1200, latency: 12, fps: 54, entropy: 0.28 },
  { time: '16:00', nps: 1500, latency: 28, fps: 60, entropy: 0.35 },
  { time: '20:00', nps: 1100, latency: 19, fps: 59, entropy: 0.31 },
  { time: '23:59', nps: 600, latency: 16, fps: 60, entropy: 0.18 },
];

const geoMeshNodes = [
  { x: 10, y: 30, z: 200, name: 'NA_EAST_NODE' },
  { x: 25, y: 70, z: 450, name: 'EU_CENTRAL_NODE' },
  { x: 45, y: 45, z: 120, name: 'ASIA_SOUTH_NODE' },
  { x: 60, y: 85, z: 800, name: 'JP_TOK_GATE' },
  { x: 80, y: 20, z: 340, name: 'AU_SYD_PULSE' },
  { x: 15, y: 15, z: 50, name: 'SA_BRAS_LINK' },
  { x: 50, y: 10, z: 180, name: 'AFR_CAPE_MESH' },
  { x: 35, y: 90, z: 620, name: 'EU_NORD_VAULT' },
];

const entropyNoise = Array.from({ length: 40 }, (_, i) => ({
  idx: i,
  val: Math.random() * 100,
  base: 50 + Math.sin(i / 5) * 20
}));

const synapseLatency = [
  { name: 'Layer_01', core: 4, edge: 12, gap: 8 },
  { name: 'Layer_02', core: 8, edge: 18, gap: 10 },
  { name: 'Layer_03', core: 15, edge: 24, gap: 9 },
  { name: 'Layer_04', core: 22, edge: 32, gap: 10 },
  { name: 'Layer_05', core: 38, edge: 45, gap: 7 },
  { name: 'Layer_06', core: 12, edge: 20, gap: 8 },
];

const heapSegments = [
  { type: 'NEW_SPACE', addr: '0x10A2B', size: '24.1 MB', usage: 42, color: COLORS.cyan },
  { type: 'OLD_SPACE', addr: '0x3F1D4', size: '128.5 MB', usage: 68, color: COLORS.blue },
  { type: 'CODE_SPACE', addr: '0xA91E2', size: '42.0 MB', usage: 12, color: COLORS.green },
  { type: 'MAP_SPACE', addr: '0xB00C1', size: '8.4 MB', usage: 85, color: COLORS.gray },
];

const threadActivity = [
  { thread: 'Main', pid: 4882, cpu: 12, state: 'WAITING', prio: 'HIGH' },
  { thread: 'Compositor', pid: 4890, cpu: 32, state: 'RUNNING', prio: 'MAX' },
  { thread: 'AI_Inference', pid: 4901, cpu: 88, state: 'RUNNING', prio: 'MAX' },
  { thread: 'Network_IO', pid: 4912, cpu: 4, state: 'SLEEPING', prio: 'LOW' },
];

const ModuleD_Analytics: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<string | null>(null);
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(new Set());

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-1000">
      
      {/* 1. GLOBAL HUD KPI GRID (10 TRACKERS) */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {[
          { label: 'CRASH_RESILIENCE', val: '99.98%', delta: '+0.01%', icon: ShieldCheck, color: COLORS.green },
          { label: 'NEURAL_PULSE_AVG', val: '142ms', delta: '-12ms', icon: Zap, color: COLORS.cyan },
          { label: 'IO_THROUGHPUT', val: '1.2GB/s', delta: '+200MB', icon: Signal, color: COLORS.blue },
          { label: 'THERMAL_ENVELOPE', val: '38°C', delta: 'STABLE', icon: Activity, color: COLORS.gray },
          { label: 'KERNEL_ENTROPY', val: '0.042', delta: '-0.001', icon: Waves, color: COLORS.cyan },
          { label: 'SYNC_DRIFT_LAT', val: '4.2ms', delta: '+0.1ms', icon: Radio, color: COLORS.blue },
          { label: 'PACKET_COHERENCE', val: '98.4%', delta: '+1.2%', icon: Crosshair, color: COLORS.green },
          { label: 'GPU_INST_BUFFER', val: '4.8GB', delta: 'OPTIMAL', icon: Layers, color: COLORS.gray },
          { label: 'NPU_CLUSTER_LOAD', val: '62%', delta: '+4%', icon: Cpu, color: COLORS.cyan },
          { label: 'EDGE_NODE_COUNT', val: '1,892', delta: '+12', icon: Globe, color: COLORS.blue },
        ].map((kpi, idx) => (
          <FuturisticCard key={idx} accentColor={kpi.color} className="!p-3 sm:!p-4 min-h-[110px] sm:min-h-[120px] hover:scale-[1.02] transition-transform" idTag={`KPI_${idx}`}>
            <div className="flex flex-col h-full justify-between gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                <kpi.icon size={11} className="shrink-0" style={{ color: kpi.color }} />
                <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] leading-tight break-words">{kpi.label}</span>
              </div>
              <div className="mt-auto">
                <div className="text-lg sm:text-xl font-black font-mono tracking-tighter leading-none">{kpi.val}</div>
                <div className="text-[7px] font-mono opacity-30 group-hover:opacity-70 flex items-center gap-1 mt-1.5 uppercase whitespace-nowrap">
                  <TrendingUp size={7} className="shrink-0" /> 
                  <span className="truncate">{kpi.delta} Δ</span>
                </div>
              </div>
            </div>
          </FuturisticCard>
        ))}
      </div>

      {/* 2. ADVANCED DATA VISUALIZATION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        
        {/* BIG CHART: NEURAL COMPUTE MESH */}
        <FuturisticCard title="NEURAL_COMPUTE_MESH_ORCHESTRATION" accentColor={COLORS.cyan} className="lg:col-span-8 h-[400px] sm:h-[500px]">
          <div className="h-full flex flex-col pt-2 sm:pt-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-3 sm:px-4 mb-3 sm:mb-4 gap-2 sm:gap-0">
               <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_#00F6FF]" />
                     <span className="text-[8px] font-mono text-white/40 uppercase">Inference_Rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3A7BFF]" />
                     <span className="text-[8px] font-mono text-white/40 uppercase">Memory_Latency</span>
                  </div>
               </div>
               <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em]">Freq: 124Hz // Protocol: X-99</span>
            </div>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={throughputData}>
                  <defs>
                    <linearGradient id="colorNps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.cyan} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={COLORS.cyan} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#111" vertical={false} />
                  <XAxis dataKey="time" stroke="#222" fontSize={9} tickLine={false} axisLine={false} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #222', fontSize: '10px', fontFamily: 'JetBrains Mono' }}
                    cursor={{ stroke: COLORS.cyan, strokeWidth: 1 }}
                  />
                  <Area type="monotone" dataKey="nps" stroke={COLORS.cyan} strokeWidth={2} fillOpacity={1} fill="url(#colorNps)" />
                  <Area type="step" dataKey="latency" stroke={COLORS.blue} strokeWidth={1} fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </FuturisticCard>

        {/* RADAR: ARCHITECTURE SYNTHESIS */}
        <FuturisticCard title="HARDWARE_SYNTH_REPORT" accentColor={COLORS.blue} className="lg:col-span-4 h-[400px] sm:h-[500px]">
          <div className="h-full flex flex-col pt-4">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                  { subject: 'CPU', A: 120, B: 110, fullMark: 150 },
                  { subject: 'GPU', A: 98, B: 130, fullMark: 150 },
                  { subject: 'NPU', A: 86, B: 130, fullMark: 150 },
                  { subject: 'IO', A: 99, B: 100, fullMark: 150 },
                  { subject: 'RAM', A: 85, B: 90, fullMark: 150 },
                  { subject: 'THRM', A: 65, B: 85, fullMark: 150 },
                ]}>
                  <PolarGrid stroke="#222" />
                  <PolarAngleAxis dataKey="subject" stroke="#444" fontSize={8} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} hide />
                  <Radar name="Current" dataKey="A" stroke={COLORS.cyan} fill={COLORS.cyan} fillOpacity={0.2} />
                  <Radar name="Baseline" dataKey="B" stroke={COLORS.blue} fill={COLORS.blue} fillOpacity={0.1} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="p-4 bg-zinc-950/50 border-t border-white/5 space-y-2">
               <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Coherence_Rating</span>
                  <span className="text-[10px] font-black text-cyan-400">92%_OPTIMAL</span>
               </div>
               <div className="w-full h-1 bg-white/5 rounded-full">
                  <div className="h-full bg-cyan-500 w-[92%]" />
               </div>
            </div>
          </div>
        </FuturisticCard>

        {/* 3. NEW ADVANCED SECTION: GLOBAL EDGE MESH (MAP-LIKE SCATTER) */}
        <FuturisticCard title="GLOBAL_EDGE_INFERENCE_MESH" accentColor={COLORS.green} className="lg:col-span-12 h-[600px] sm:h-[500px] md:h-[450px]">
           <div className="grid grid-cols-1 lg:grid-cols-4 h-full gap-4 lg:gap-0">
              <div className="lg:col-span-3 h-full p-4 relative bg-black/30">
                <div className="absolute top-8 left-8 flex flex-col gap-1 z-10">
                   <div className="text-[10px] font-black uppercase text-green-500 tracking-[0.2em] flex items-center gap-2">
                      <Compass size={12} /> Edge_Geo_Coordinate_Matrix
                   </div>
                   <div className="text-[8px] font-mono text-white/20 uppercase">Lat: 0.00 | Lng: 0.00 | Zoom: 1.0x</div>
                </div>
                <div className="w-full h-full min-h-[400px] relative" style={{ height: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                     <ScatterChart margin={{ top: 50, right: 30, bottom: 50, left: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#38FF8B" strokeOpacity={0.2} />
                        <XAxis 
                          type="number" 
                          dataKey="x" 
                          name="longitude" 
                          stroke="#38FF8B" 
                          strokeOpacity={0.5} 
                          fontSize={11}
                          tick={{ fill: '#38FF8B', opacity: 0.7 }}
                          domain={[0, 100]}
                          tickCount={6}
                        />
                        <YAxis 
                          type="number" 
                          dataKey="y" 
                          name="latitude" 
                          stroke="#38FF8B" 
                          strokeOpacity={0.5} 
                          fontSize={11}
                          tick={{ fill: '#38FF8B', opacity: 0.7 }}
                          domain={[0, 100]}
                          tickCount={6}
                        />
                        <ZAxis type="number" dataKey="z" range={[60, 500]} name="intensity" />
                        <Tooltip 
                          cursor={{ strokeDasharray: '3 3', stroke: COLORS.green, strokeWidth: 2 }} 
                          contentStyle={{ backgroundColor: '#000', border: '2px solid #38FF8B', fontSize: '11px', fontFamily: 'monospace', color: '#38FF8B', padding: '8px' }} 
                        />
                        <Scatter name="Nodes" data={geoMeshNodes} fill={COLORS.green} shape="circle">
                          {geoMeshNodes.map((entry, index) => {
                            const radius = Math.max(6, Math.min(16, entry.z / 40));
                            return (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={COLORS.green} 
                                fillOpacity={0.9} 
                                stroke={COLORS.green} 
                                strokeWidth={3}
                                r={radius}
                              />
                            );
                          })}
                        </Scatter>
                     </ScatterChart>
                  </ResponsiveContainer>
                </div>
                {/* Simulated Grid overlay for map feel */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(56,255,139,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(56,255,139,0.2)_1px,transparent_1px)] bg-[size:50px_50px]" />
              </div>

              <div className="lg:col-span-1 border-l border-white/5 p-6 flex flex-col gap-6">
                 <div className="space-y-4">
                    <div className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">Active_Node_Registry</div>
                    <div className="space-y-3">
                       {geoMeshNodes.slice(0, 5).map((node, i) => (
                         <div key={i} className="flex items-center justify-between group/node cursor-pointer">
                            <div className="flex items-center gap-3">
                               <div className="w-1.5 h-1.5 rounded-full bg-green-500/20 group-hover/node:bg-green-500 transition-colors" />
                               <span className="text-[10px] font-mono text-white/50 group-hover/node:text-white transition-colors">{node.name}</span>
                            </div>
                            <span className="text-[9px] font-mono text-white/20">+{node.z}ms</span>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="mt-auto p-4 bg-green-500/5 border border-green-500/10 rounded-sm">
                    <div className="flex items-center gap-2 mb-2">
                       <Database size={12} className="text-green-500" />
                       <span className="text-[8px] font-black uppercase tracking-widest text-green-500">Node_Affinity</span>
                    </div>
                    <div className="text-[10px] text-white/40 italic leading-relaxed">
                       Dynamic rerouting enabled. 12% shift to JP_TOK_GATE detected to optimize latency spectrum.
                    </div>
                 </div>
              </div>
           </div>
        </FuturisticCard>

        {/* 4. SYNAPSE LATENCY SPECTRUM & ENTROPY MONITOR */}
        <FuturisticCard title="NEURAL_SYNAPSE_LATENCY_SPECTRUM" accentColor={COLORS.blue} className="lg:col-span-7 h-[350px] sm:h-[400px]">
           <div className="h-full flex flex-col pt-4">
              <div className="flex-1">
                 <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={synapseLatency}>
                       <XAxis dataKey="name" stroke="#333" fontSize={9} axisLine={false} tickLine={false} />
                       <YAxis hide />
                       <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #222', fontSize: '10px' }} />
                       <Bar dataKey="edge" fill={COLORS.blue} opacity={0.3} radius={[4, 4, 0, 0]} />
                       <Line type="monotone" dataKey="core" stroke={COLORS.cyan} strokeWidth={2} dot={{ fill: COLORS.cyan, r: 3 }} />
                       <Area type="monotone" dataKey="gap" fill={COLORS.blue} fillOpacity={0.05} stroke="none" />
                    </ComposedChart>
                 </ResponsiveContainer>
              </div>
              <div className="flex justify-between p-4 text-[8px] font-mono text-white/20 uppercase tracking-widest border-t border-white/5">
                 <div className="flex gap-4">
                    <span>L1_Pacing: Optim</span>
                    <span>L4_Pacing: Delay_Low</span>
                 </div>
                 <span className="text-blue-400">Spectrum_Coherence: 0.989</span>
              </div>
           </div>
        </FuturisticCard>

        <FuturisticCard title="QUANTUM_ENTROPY_MONITOR" accentColor={COLORS.gray} className="lg:col-span-5 h-[350px] sm:h-[400px]">
           <div className="h-full flex flex-col pt-4">
              <div className="flex-1">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={entropyNoise}>
                       <Line type="basis" dataKey="val" stroke={COLORS.gray} strokeWidth={1} dot={false} strokeDasharray="3 3" />
                       <Line type="monotone" dataKey="base" stroke={COLORS.cyan} strokeWidth={2} dot={false} opacity={0.6} />
                       <Tooltip hide />
                    </LineChart>
                 </ResponsiveContainer>
              </div>
              <div className="p-6 bg-white/5 space-y-4">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                       <ShieldAlert size={12} className="text-cyan-500" /> Entropy_Noise_Floor
                    </span>
                    <span className="text-lg font-black font-mono text-cyan-400">0.00128</span>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <span className="text-[7px] font-mono text-white/20 uppercase">Chaos_Rating</span>
                       <div className="text-[10px] font-black text-white/60 font-mono">STABLE_004</div>
                    </div>
                    <div className="space-y-1">
                       <span className="text-[7px] font-mono text-white/20 uppercase">Noise_Delta</span>
                       <div className="text-[10px] font-black text-white/60 font-mono">-0.12%</div>
                    </div>
                 </div>
              </div>
           </div>
        </FuturisticCard>

        {/* 5. LOW-LEVEL ANALYTICS: V8 HEAP & THREADS */}
        <FuturisticCard title="V8_MEMORY_HEAP_PARTITION" accentColor={COLORS.cyan} className="lg:col-span-6 h-[350px] sm:h-[400px] overflow-hidden">
           <div className="h-full flex flex-col pt-4">
              <div className="flex-1 overflow-y-auto custom-scroll px-2">
                 <table className="w-full text-left font-mono text-[9px]">
                    <thead className="sticky top-0 bg-black text-white/20 uppercase border-b border-white/5">
                       <tr>
                          <th className="py-2">Segment</th>
                          <th className="py-2">Addr_Block</th>
                          <th className="py-2">Load</th>
                          <th className="py-2 text-right">Capacity</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                       {heapSegments.map((seg, i) => (
                          <tr key={i} className="hover:bg-white/5 transition-colors group">
                             <td className="py-4 flex items-center gap-2 font-black text-white/60 group-hover:text-white">{seg.type}</td>
                             <td className="py-4 text-white/20">{seg.addr}</td>
                             <td className="py-4">
                                <div className="flex items-center gap-2">
                                   <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                                      <div className="h-full bg-cyan-500" style={{ width: `${seg.usage}%` }} />
                                   </div>
                                   <span className="text-[8px] text-white/40">{seg.usage}%</span>
                                </div>
                             </td>
                             <td className="py-4 text-right text-white/40">{seg.size}</td>
                          </tr>
                       ))}
                       {/* Duplicates to fill space */}
                       {heapSegments.map((seg, i) => (
                          <tr key={`d-${i}`} className="opacity-30">
                             <td className="py-4 font-black text-white/20 italic">{seg.type}_BUF</td>
                             <td className="py-4 text-white/10">0x00A..FF</td>
                             <td className="py-4"><div className="w-16 h-1 bg-white/5" /></td>
                             <td className="py-4 text-right text-white/10">-- MB</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </FuturisticCard>

        <FuturisticCard title="NEURAL_THREAD_SCHEDULER" accentColor={COLORS.green} className="lg:col-span-6 h-[350px] sm:h-[400px] overflow-hidden">
           <div className="h-full flex flex-col pt-4">
              <div className="flex-1 overflow-y-auto custom-scroll px-4 space-y-3">
                 {threadActivity.map((t, i) => (
                    <div key={i} className="p-4 bg-zinc-950/50 border border-white/5 rounded-sm flex items-center justify-between group/thread">
                       <div className="flex items-center gap-4">
                          <div className={`p-2.5 bg-black border border-white/5 rounded-sm ${t.cpu > 50 ? 'text-cyan-500 shadow-[0_0_10px_rgba(0,246,255,0.2)]' : 'text-white/20'}`}>
                             <Binary size={16} />
                          </div>
                          <div>
                             <div className="text-[10px] font-black uppercase tracking-widest text-white/80">{t.thread}</div>
                             <div className="text-[8px] font-mono text-white/20">PID: {t.pid} | PRIO: {t.prio}</div>
                          </div>
                       </div>
                       <div className="flex gap-8 items-center">
                          <div className="text-right">
                             <div className="text-[7px] font-mono text-white/20 uppercase tracking-widest">CPU_UTIL</div>
                             <div className={`text-[12px] font-black font-mono ${t.cpu > 50 ? 'text-cyan-400' : 'text-white/40'}`}>{t.cpu}%</div>
                          </div>
                          <div className={`px-2 py-0.5 text-[8px] font-black tracking-widest rounded-sm ${t.state === 'RUNNING' ? 'bg-green-500/10 text-green-500' : 'bg-white/5 text-white/20'}`}>
                             {t.state}
                          </div>
                       </div>
                    </div>
                 ))}
                 {/* Duplicates to fill space */}
                 {[1, 2, 3].map(i => (
                    <div key={i} className="p-4 bg-zinc-950/20 border border-white/5 rounded-sm opacity-20 grayscale">
                       <div className="h-4 w-32 bg-white/10 rounded-sm mb-2" />
                       <div className="h-2 w-16 bg-white/10 rounded-sm" />
                    </div>
                 ))}
              </div>
           </div>
        </FuturisticCard>

      </div>

      {/* PLATFORM FEATURES SECTION */}
      <div className="space-y-8 pt-8 border-t border-white/10">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-cyan-500/60"></div>
            <span className="text-[10px] font-mono text-cyan-500 tracking-[0.8em] uppercase font-bold">PLATFORM_CORE_FEATURES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter uppercase leading-tight">
            Platform Features
          </h2>
          <p className="text-sm text-white/60 max-w-3xl leading-relaxed">
            Comprehensive suite of AI-powered development tools, analytics, and deployment infrastructure 
            designed to accelerate mobile app creation from concept to production.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            {
              id: 'ai-engine',
              title: 'AI App Creation Engine',
              description: 'Automatically generate mobile app structures and logic using AI.',
              icon: Sparkles,
              color: COLORS.cyan,
              details: [
                'Neural code generation from natural language',
                'Automatic component architecture synthesis',
                'Smart logic flow optimization',
                'Real-time AI-assisted development',
                'Multi-platform code generation (iOS, Android, Web)'
              ],
              status: 'ACTIVE',
              usage: '12,847 apps generated'
            },
            {
              id: 'templates',
              title: 'Smart Development Templates',
              description: 'Pre-built, customizable templates for common app use cases and industries.',
              icon: FileText,
              color: COLORS.green,
              details: [
                'Industry-specific templates (E-commerce, Healthcare, Finance)',
                'Fully customizable component libraries',
                'Best practices pre-configured',
                'One-click template deployment',
                'Template marketplace integration'
              ],
              status: 'ACTIVE',
              usage: '284 templates available'
            },
            {
              id: 'analytics',
              title: 'Real-Time App Analytics',
              description: 'Live performance, usage, and engagement tracking dashboards.',
              icon: BarChart3,
              color: COLORS.blue,
              details: [
                'Real-time user behavior tracking',
                'Performance metrics monitoring',
                'Engagement analytics dashboard',
                'Custom event tracking',
                'Exportable reports and insights'
              ],
              status: 'ACTIVE',
              usage: '1.2M events tracked today'
            },
            {
              id: 'iteration',
              title: 'Rapid Iteration Tools',
              description: 'AI-assisted updates, feature optimization, and deployment workflows.',
              icon: RefreshCw,
              color: COLORS.cyan,
              details: [
                'AI-powered feature suggestions',
                'Automated A/B testing framework',
                'Hot-reload development environment',
                'Instant deployment pipelines',
                'Version control integration'
              ],
              status: 'ACTIVE',
              usage: '3,421 deployments this week'
            },
            {
              id: 'integration',
              title: 'Integration & Deployment Layer',
              description: 'Supports APIs, third-party services, and app store deployment pipelines.',
              icon: Plug,
              color: COLORS.green,
              details: [
                'RESTful API integration builder',
                'Third-party service connectors',
                'App Store Connect automation',
                'Google Play Console integration',
                'CI/CD pipeline orchestration'
              ],
              status: 'ACTIVE',
              usage: '156 integrations configured'
            }
          ].map((feature, index) => {
            const FeatureIcon = feature.icon;
            const isExpanded = expandedFeatures.has(feature.id);

            return (
              <FuturisticCard 
                key={feature.id}
                title={feature.title}
                accentColor={feature.color}
                className="cursor-pointer transition-all duration-500"
                idTag={`FEAT_${index + 1}`}
              >
                <div className="space-y-6">
                  {/* Feature Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div 
                        className="p-4 rounded-sm border transition-all duration-300"
                        style={{ 
                          backgroundColor: `${feature.color}10`,
                          borderColor: `${feature.color}30`
                        }}
                      >
                        <FeatureIcon size={24} style={{ color: feature.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">
                            {feature.status}
                          </span>
                          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: feature.color }} />
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Usage Stats */}
                  <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-sm">
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Usage</span>
                    <span className="text-[11px] font-black uppercase tracking-wider" style={{ color: feature.color }}>
                      {feature.usage}
                    </span>
                  </div>

                  {/* Feature Details - Expandable */}
                  {isExpanded && (
                    <div className="space-y-4 pt-4 border-t border-white/5 animate-in slide-in-from-top-4 duration-300">
                      <div className="text-[10px] font-black uppercase text-white/30 tracking-[0.3em] mb-3">
                        Capabilities
                      </div>
                      <div className="space-y-3">
                        {feature.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-3 group/detail">
                            <CheckCircle2 
                              size={16} 
                              className="mt-0.5 shrink-0 transition-all group-hover/detail:scale-110" 
                              style={{ color: feature.color }}
                            />
                            <span className="text-[11px] text-white/70 leading-relaxed flex-1">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            // Navigate to relevant section - we'll use App's setActiveTab via window event
                            const event = new CustomEvent('navigateToTab', { 
                              detail: feature.id === 'ai-engine' ? 'ai' :
                                      feature.id === 'templates' ? 'marketplace' :
                                      feature.id === 'analytics' ? 'analytics' :
                                      feature.id === 'iteration' ? 'deploy' :
                                      'api'
                            });
                            window.dispatchEvent(event);
                          }}
                          className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2"
                          style={{ 
                            borderColor: `${feature.color}40`,
                            backgroundColor: `${feature.color}10`
                          }}
                        >
                          <Play size={14} />
                          Explore Feature
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            const event = new CustomEvent('navigateToTab', { detail: 'settings' });
                            window.dispatchEvent(event);
                          }}
                          className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-[10px] font-black uppercase tracking-[0.3em] transition-all"
                          style={{ 
                            borderColor: `${feature.color}40`,
                            backgroundColor: `${feature.color}10`
                          }}
                        >
                          <Settings size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Expand Indicator */}
                  {!isExpanded && (
                    <button
                      onClick={() => {
                        setExpandedFeatures(prev => new Set([...prev, feature.id]));
                      }}
                      className="flex items-center justify-between pt-4 border-t border-white/5 text-[9px] font-mono text-white/20 uppercase tracking-widest w-full hover:text-white transition-colors"
                    >
                      <span>Click to expand</span>
                      <ArrowRight size={12} />
                    </button>
                  )}
                </div>
              </FuturisticCard>
            );
          })}
        </div>

        {/* Platform Statistics */}
        <FuturisticCard title="PLATFORM_STATISTICS" accentColor={COLORS.blue}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Apps', value: '12,847', icon: Smartphone, color: COLORS.cyan },
              { label: 'Templates', value: '284', icon: FileText, color: COLORS.green },
              { label: 'Daily Events', value: '1.2M', icon: Activity, color: COLORS.blue },
              { label: 'Integrations', value: '156', icon: Plug, color: COLORS.cyan },
            ].map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div key={idx} className="text-center space-y-3">
                  <div className="flex justify-center">
                    <div 
                      className="p-3 rounded-sm border"
                      style={{ 
                        backgroundColor: `${stat.color}10`,
                        borderColor: `${stat.color}30`
                      }}
                    >
                      <StatIcon size={20} style={{ color: stat.color }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-black uppercase tracking-tighter" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </FuturisticCard>

        {/* Integration Showcase */}
        <FuturisticCard title="INTEGRATION_SHOWCASE" accentColor={COLORS.green}>
          <div className="space-y-6">
            <p className="text-sm text-white/60 leading-relaxed">
              Seamlessly connect with popular services and platforms to extend your app's capabilities.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'REST APIs', icon: Terminal, tab: 'api' },
                { name: 'Firebase', icon: Cloud, tab: 'marketplace' },
                { name: 'Stripe', icon: Shield, tab: 'marketplace' },
                { name: 'AWS', icon: Database, tab: 'storage' },
                { name: 'GitHub', icon: GitBranch, tab: 'deploy' },
                { name: 'App Store', icon: Smartphone, tab: 'deploy' },
                { name: 'Google Play', icon: Globe, tab: 'deploy' },
                { name: 'Custom', icon: Plug, tab: 'api' },
              ].map((integration, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const event = new CustomEvent('navigateToTab', { detail: integration.tab });
                    window.dispatchEvent(event);
                  }}
                  className="p-4 bg-white/5 border border-white/5 hover:border-green-500/30 rounded-sm transition-all cursor-pointer group"
                >
                  <div className="flex flex-col items-center gap-3">
                    <integration.icon size={24} className="text-white/40 group-hover:text-green-400 transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-white/60 group-hover:text-white transition-colors">
                      {integration.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </FuturisticCard>
      </div>

      {/* FOOTER SYNC STATUS */}
      <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-white/5 border border-white/5 rounded-sm opacity-40 hover:opacity-100 transition-opacity">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
               <Server size={14} className="text-cyan-500" />
               <span className="text-[10px] font-black uppercase tracking-widest">NGDW_ANALYTICS_V4_CORE</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-2">
               <TrendingUp size={14} className="text-green-500" />
               <span className="text-[10px] font-mono text-white/40 uppercase">Load_Factor: 0.142</span>
            </div>
         </div>
         <div className="text-[9px] font-mono text-white/20 uppercase mt-4 md:mt-0 tracking-[0.4em]">
            Real-Time Stream: Active_Buffer_Flushed_14ms_Ago
         </div>
      </div>

    </div>
  );
};

export default ModuleD_Analytics;

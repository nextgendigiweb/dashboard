
import React, { useState } from 'react';
import FuturisticCard from './FuturisticCard';
import { COLORS } from '../constants';
import { 
  Users, ShieldCheck, Filter, 
  MoreHorizontal, Globe, Activity, 
  Fingerprint, Search, ShieldAlert, ChevronRight
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  XAxis, YAxis, Tooltip, AreaChart, Area
} from 'recharts';

const segmentData = [
  { name: 'POWER_ARCHITECTS', value: 35, fill: COLORS.cyan },
  { name: 'CORE_DEVELOPERS', value: 45, fill: COLORS.blue },
  { name: 'PROTOTYPERS', value: 20, fill: COLORS.green },
];

const retentionData = [
  { week: 'W1', value: 100 },
  { week: 'W2', value: 82 },
  { week: 'W3', value: 75 },
  { week: 'W4', value: 68 },
  { week: 'W5', value: 62 },
];

const activityStream = [
  { id: 1, user: 'dev_01', action: 'DEPLOY_KINETIC_UI', time: '14:20:01', node: 'NYC_01' },
  { id: 2, user: 'arch_99', action: 'SYNTH_NEURAL_AUTH', time: '14:19:45', node: 'LON_04' },
  { id: 3, user: 'sys_root', action: 'KERNEL_PATCH_V4', time: '14:18:12', node: 'TOK_02' },
  { id: 4, user: 'user_x', action: 'ASSET_VAULT_QUERY', time: '14:15:33', node: 'SGP_09' },
];

// Complete the ModuleK_UserHub component to resolve import errors in App.tsx
const ModuleK_UserHub: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-700 max-w-[1700px] mx-auto">
      
      {/* 1. TOP TACTICAL METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'TOTAL_IDENTITIES', val: '1.24M', icon: Users, color: COLORS.cyan },
          { label: 'ACTIVE_CONCURRENCY', val: '42.1K', icon: Activity, color: COLORS.green },
          { label: 'GEO_DISTRIBUTION', val: '24_NODES', icon: Globe, color: COLORS.blue },
          { label: 'TRUST_COHERENCE', val: '99.8%', icon: ShieldCheck, color: COLORS.gray },
        ].map((stat, i) => (
          <div key={i} className="bg-black border border-white/5 p-4 flex flex-col gap-1 hover:border-white/20 transition-all group rounded-sm cursor-default">
             <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-all">
                <stat.icon size={12} style={{ color: stat.color }} />
                <span className="text-[8px] font-black uppercase tracking-[0.3em] font-mono">{stat.label}</span>
             </div>
             <div className="text-lg font-black font-mono text-white/70 group-hover:text-white transition-colors">{stat.val}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 2. LEFT: BEHAVIORAL INTELLIGENCE (8 COLUMNS) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* USER JOURNEY ANALYSIS */}
          <FuturisticCard title="USER_BEHAVIOR_SYNAPSE" accentColor={COLORS.cyan}>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-[300px]">
                <div className="md:col-span-2 relative">
                   <div className="absolute top-0 left-0 z-10">
                      <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.4em]">Retention_Decay_Matrix</span>
                   </div>
                   <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={retentionData}>
                         <defs>
                            <linearGradient id="retentionGrad" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="5%" stopColor={COLORS.cyan} stopOpacity={0.3}/>
                               <stop offset="95%" stopColor={COLORS.cyan} stopOpacity={0}/>
                            </linearGradient>
                         </defs>
                         <XAxis dataKey="week" hide />
                         <YAxis hide domain={[0, 100]} />
                         <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #222', color: '#fff' }} />
                         <Area type="monotone" dataKey="value" stroke={COLORS.cyan} fill="url(#retentionGrad)" strokeWidth={2} />
                      </AreaChart>
                   </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center gap-6 border-l border-white/5 pl-6">
                   {[
                     { label: 'AVERAGE_SESSION', val: '24.2m', delta: '+12%' },
                     { label: 'RETENTION_W4', val: '68%', delta: '-2%' },
                     { label: 'INTERACTION_PULSE', val: '1.4k', delta: '+44%' },
                   ].map((m, i) => (
                     <div key={i} className="space-y-1 group">
                        <div className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em] group-hover:text-white/40 transition-colors">{m.label}</div>
                        <div className="text-xl font-black font-mono text-white/80 flex items-baseline gap-2">
                           {m.val}
                           <span className={`text-[10px] ${m.delta.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{m.delta}</span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </FuturisticCard>

          {/* IDENTITY REGISTRY TABLE */}
          <FuturisticCard title="GLOBAL_IDENTITY_REGISTRY" accentColor={COLORS.blue} className="!p-0 overflow-hidden">
             <div className="p-4 border-b border-white/5 bg-zinc-950/50 flex justify-between items-center gap-4">
                <div className="relative flex-1 max-w-md">
                   <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                   <input 
                    type="text" 
                    placeholder="Search entities by UID, Email, or Node..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-sm py-2 pl-10 pr-4 text-[10px] font-mono focus:border-blue-500/40 outline-none text-white/60"
                   />
                </div>
                <div className="flex gap-2">
                   <button className="p-2 border border-white/5 hover:border-white/20 transition-all text-white/40"><Filter size={14} /></button>
                   <button className="px-4 py-2 bg-white text-black font-black text-[9px] uppercase tracking-widest hover:bg-zinc-200 transition-all">INJECT_ENTITY</button>
                </div>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[10px]">
                   <thead className="bg-white/5 text-white/20 uppercase">
                      <tr>
                         <th className="p-4 pl-6">IDENTIFIER</th>
                         <th className="p-4">TRUST_TIER</th>
                         <th className="p-4">CORE_LOAD</th>
                         <th className="p-4">UPTIME</th>
                         <th className="p-4 text-right pr-6">PROTOCOL</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                      {[
                        { id: 'USR_8812', email: 'v_smith@ngdw.io', tier: 'ENTERPRISE', load: 82, uptime: '142d', node: 'US_EAST' },
                        { id: 'USR_9001', email: 'k_chan@corp.jp', tier: 'PROTOTYPE', load: 12, uptime: '12d', node: 'JP_TOK' },
                        { id: 'USR_1102', email: 'admin@mesh.net', tier: 'ROOT', load: 45, uptime: '1.2k d', node: 'GLOBAL' },
                        { id: 'USR_4251', email: 's_jones@dev.io', tier: 'DEVELOPER', load: 61, uptime: '45d', node: 'EU_LON' },
                      ].map((u, i) => (
                        <tr key={i} className="group hover:bg-white/5 transition-colors cursor-pointer">
                           <td className="p-4 pl-6">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-sm bg-black border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 transition-all">
                                    <Fingerprint size={16} className="text-white/20 group-hover:text-blue-400" />
                                 </div>
                                 <div className="flex flex-col min-w-0">
                                    <span className="text-white/80 font-bold uppercase truncate">{u.email}</span>
                                    <span className="text-[8px] text-white/20">UID: {u.id} // NODE: {u.node}</span>
                                 </div>
                              </div>
                           </td>
                           <td className="p-4">
                              <span className={`px-2 py-0.5 rounded-[2px] text-[8px] font-black tracking-widest ${
                                u.tier === 'ROOT' ? 'bg-cyan-500 text-black' : 
                                u.tier === 'ENTERPRISE' ? 'bg-blue-500/10 text-blue-400' :
                                'bg-white/5 text-white/30'
                              }`}>{u.tier}</span>
                           </td>
                           <td className="p-4">
                              <div className="flex items-center gap-2">
                                 <div className="flex-1 w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500" style={{ width: `${u.load}%` }} />
                                 </div>
                                 <span className="text-[8px] text-white/30">{u.load}%</span>
                              </div>
                           </td>
                           <td className="p-4 text-white/40">{u.uptime}</td>
                           <td className="p-4 text-right pr-6">
                              <button className="text-white/20 hover:text-white transition-colors">
                                 <MoreHorizontal size={14} />
                              </button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </FuturisticCard>
        </div>

        {/* 3. RIGHT: REAL-TIME ACTIVITY & SEGMENTS (4 COLUMNS) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          <FuturisticCard title="ENTITY_SEGMENT_MIX" accentColor={COLORS.green}>
             <div className="h-48 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                      <Pie data={segmentData} innerRadius={40} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">
                         {segmentData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #222' }} />
                   </PieChart>
                </ResponsiveContainer>
             </div>
             <div className="space-y-3 mt-4">
                {segmentData.map(s => (
                  <div key={s.name} className="flex justify-between items-center group">
                     <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.fill }} />
                        <span className="text-[8px] font-black text-white/30 uppercase tracking-widest group-hover:text-white transition-colors">{s.name}</span>
                     </div>
                     <span className="text-[10px] font-mono text-white/60">{s.value}%</span>
                  </div>
                ))}
             </div>
          </FuturisticCard>

          <FuturisticCard title="REALTIME_ACTIVITY_PULSE" accentColor={COLORS.gray}>
             <div className="space-y-4">
                {activityStream.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 group">
                     <div className="mt-1 w-1 h-3 rounded-full bg-cyan-500/40 group-hover:bg-cyan-500 transition-colors" />
                     <div className="flex-1">
                        <div className="flex justify-between items-start">
                           <span className="text-[10px] font-black text-white/80 uppercase tracking-tight">{activity.user} // {activity.action}</span>
                           <span className="text-[8px] font-mono text-white/20">{activity.time}</span>
                        </div>
                        <div className="text-[8px] font-mono text-white/10 uppercase tracking-widest">Node: {activity.node}</div>
                     </div>
                  </div>
                ))}
             </div>
             <button className="w-full mt-6 py-2 border border-white/5 text-[8px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-all">
                Access_Full_Audit_Trail
             </button>
          </FuturisticCard>

          <FuturisticCard title="SECURITY_COHERENCE" accentColor={COLORS.blue}>
             <div className="flex items-center gap-4 py-2">
                <div className="relative">
                   <ShieldAlert size={32} className="text-blue-500" />
                   <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full" />
                </div>
                <div className="flex-1 space-y-2">
                   <div className="flex justify-between text-[8px] font-black uppercase text-white/20">
                      <span>Trust_Index</span>
                      <span className="text-blue-500">99.8%</span>
                   </div>
                   <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[99.8%]" />
                   </div>
                </div>
             </div>
          </FuturisticCard>
        </div>

      </div>
    </div>
  );
};

export default ModuleK_UserHub;

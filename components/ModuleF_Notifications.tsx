
import React, { useState } from 'react';
import FuturisticCard from './FuturisticCard';
import { COLORS } from '../constants';
import { 
  Bell, AlertTriangle, CheckCircle, Info, X, 
  Filter, Search, Trash2, CheckSquare, RefreshCw,
  Activity, ShieldAlert, Cpu, Share2, MoreVertical
} from 'lucide-react';
import { 
  BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area 
} from 'recharts';

const eventFrequencyData = [
  { time: '00:00', alerts: 12, critical: 2 },
  { time: '04:00', alerts: 8, critical: 0 },
  { time: '08:00', alerts: 45, critical: 5 },
  { time: '12:00', alerts: 32, critical: 1 },
  { time: '16:00', alerts: 68, critical: 12 },
  { time: '20:00', alerts: 22, critical: 3 },
  { time: '23:59', alerts: 14, critical: 1 },
];

const NOTIFICATIONS = [
  { id: 1, type: 'critical', title: 'KERNEL_THERMAL_THROTTLE', msg: 'System node #42 is exceeding thermal limits. Entering recovery phase.', time: '2m ago', node: 'NYC_01' },
  { id: 2, type: 'success', title: 'PIPELINE_PUSH_COMPLETE', msg: 'V2.4.1 has been pushed to production successfully across all mesh nodes.', time: '14m ago', node: 'GLOBAL' },
  { id: 3, type: 'info', title: 'ANALYTICS_DUMP_READY', msg: 'Daily user reports for 14-APR are now ready for download from secure vault.', time: '1h ago', node: 'STORAGE_A' },
  { id: 4, type: 'warning', title: 'API_ENDPOINT_EXPIRY', msg: 'Legacy endpoint /v1/users will expire in 48h. Transition to /v2 is mandatory.', time: '3h ago', node: 'GATEWAY_CORE' },
  { id: 5, type: 'critical', title: 'NEURAL_LINK_DROPPED', msg: 'Hardware-bound tunnel disconnection on TOK_04. Re-routing to backup node.', time: '5h ago', node: 'TOK_04' },
  { id: 6, type: 'success', title: 'SECURITY_PATCH_APPLIED', msg: 'Mesh integrity verified after kernel patch rotation. Stability 99.99%.', time: '12h ago', node: 'SYS_ROOT' },
];

const ModuleF_Notifications: React.FC = () => {
  const [filter, setFilter] = useState('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  const filteredNotifs = NOTIFICATIONS.filter(n => filter === 'ALL' || n.type === filter.toLowerCase());

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700 max-w-[1700px] mx-auto pb-20">
      
      {/* 1. TACTICAL SUMMARY GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'TOTAL_ALERTS', val: '1,482', color: COLORS.cyan, icon: Bell },
          { label: 'CRITICAL_EVENTS', val: '12_ACTV', color: COLORS.gray, icon: ShieldAlert },
          { label: 'SYNC_STABILITY', val: '99.98%', color: COLORS.green, icon: Activity },
          { label: 'NODE_UPTIME', val: '142d_STBL', color: COLORS.blue, icon: Cpu },
        ].map((stat, i) => (
          <div key={i} className="bg-black border border-white/5 p-4 flex flex-col gap-1 hover:border-white/15 transition-all group rounded-sm">
             <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-all">
                <stat.icon size={12} style={{ color: stat.color }} />
                <span className="text-[8px] font-black uppercase tracking-[0.3em] font-mono">{stat.label}</span>
             </div>
             <div className="text-xl font-black font-mono text-white/70 group-hover:text-white transition-colors">{stat.val}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 2. LEFT: ALERT LIST & FILTERS (8 COLUMNS) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <FuturisticCard title="LIVE_SYSTEM_ALERTS" accentColor={COLORS.blue} className="p-0 overflow-hidden flex flex-col min-h-[600px]">
             <div className="p-4 border-b border-white/5 bg-zinc-950/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex bg-black border border-white/10 p-0.5 rounded-sm">
                   {['ALL', 'CRITICAL', 'WARNING', 'SUCCESS', 'INFO'].map(f => (
                     <button 
                       key={f}
                       onClick={() => setFilter(f)}
                       className={`px-4 py-1.5 text-[8px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-white text-black' : 'text-white/30 hover:text-white'}`}
                     >
                       {f}
                     </button>
                   ))}
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                   <button onClick={handleRefresh} className="p-2.5 border border-white/5 text-white/40 hover:text-cyan-400 hover:border-cyan-500/20 transition-all rounded-sm flex-1 sm:flex-none justify-center flex items-center gap-2">
                      <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
                      <span className="sm:hidden text-[8px] font-black uppercase tracking-widest">Refresh</span>
                   </button>
                   <button className="p-2.5 border border-white/5 text-white/40 hover:text-white transition-all rounded-sm flex-1 sm:flex-none justify-center flex items-center gap-2">
                      <CheckSquare size={14} />
                      <span className="sm:hidden text-[8px] font-black uppercase tracking-widest">Mark All</span>
                   </button>
                   <button className="p-2.5 border border-white/5 text-white/40 hover:text-red-500 transition-all rounded-sm flex-1 sm:flex-none justify-center flex items-center gap-2">
                      <Trash2 size={14} />
                      <span className="sm:hidden text-[8px] font-black uppercase tracking-widest">Clear</span>
                   </button>
                </div>
             </div>

             <div className="flex-1 overflow-y-auto custom-scroll">
                {filteredNotifs.length > 0 ? (
                  <div className="divide-y divide-white/5">
                    {filteredNotifs.map((notif) => (
                      <div key={notif.id} className="p-6 flex items-start gap-6 group/item hover:bg-white/[0.02] transition-all relative cursor-pointer">
                         <div className={`mt-1 p-3 rounded-sm border flex items-center justify-center transition-all ${
                           notif.type === 'critical' ? 'border-red-500/50 text-red-500 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.1)]' :
                           notif.type === 'warning' ? 'border-yellow-500/50 text-yellow-500 bg-yellow-500/10' :
                           notif.type === 'success' ? 'border-green-500/50 text-green-500 bg-green-500/10' :
                           'border-blue-500/50 text-blue-500 bg-blue-500/10'
                         }`}>
                           {notif.type === 'critical' && <ShieldAlert size={18} className="animate-pulse" />}
                           {notif.type === 'warning' && <AlertTriangle size={18} />}
                           {notif.type === 'success' && <CheckCircle size={18} />}
                           {notif.type === 'info' && <Info size={18} />}
                         </div>
                         <div className="flex-1 space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                               <div className="flex items-center gap-3">
                                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/80 group-hover/item:text-white transition-colors">{notif.title}</h4>
                                  <span className="px-2 py-0.5 border border-white/5 text-[7px] font-mono text-white/20 uppercase tracking-widest">{notif.node}</span>
                               </div>
                               <span className="text-[9px] font-mono text-white/20 uppercase tracking-tighter shrink-0">{notif.time}</span>
                            </div>
                            <p className="text-[11px] text-white/40 leading-relaxed font-mono uppercase tracking-tight max-w-2xl group-hover/item:text-white/60 transition-colors">
                               {notif.msg}
                            </p>
                            <div className="flex items-center gap-4 pt-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                               <button className="text-[9px] font-black uppercase tracking-[0.3em] text-cyan-500 hover:text-white transition-colors">Acknowledge</button>
                               <button className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors">Route_To_Eng</button>
                            </div>
                         </div>
                         <div className="flex flex-col gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity translate-x-2 group-hover/item:translate-x-0">
                            <button className="p-2 text-white/10 hover:text-white transition-colors"><X size={14} /></button>
                            <button className="p-2 text-white/10 hover:text-white transition-colors"><MoreVertical size={14} /></button>
                         </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-32 text-center opacity-20">
                     <Bell size={48} className="mb-6" strokeWidth={1} />
                     <h3 className="text-xl font-black uppercase tracking-widest mb-2">No_Active_Alerts</h3>
                     <p className="text-[9px] font-mono tracking-widest uppercase">System status is currently stable.</p>
                  </div>
                )}
             </div>
             <div className="p-4 border-t border-white/5 bg-zinc-950/20 text-center">
                <button className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 hover:text-white transition-all">Download_Raw_System_Log_Dumps</button>
             </div>
          </FuturisticCard>
        </div>

        {/* 3. RIGHT: TELEMETRY CHART & TRENDS (4 COLUMNS) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
           <FuturisticCard title="EVENT_FREQUENCY_HUD" accentColor={COLORS.cyan}>
              <div className="h-48 mt-4">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={eventFrequencyData}>
                       <defs>
                          <linearGradient id="alertGrad" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor={COLORS.cyan} stopOpacity={0.3}/>
                             <stop offset="95%" stopColor={COLORS.cyan} stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis dataKey="time" hide />
                       <YAxis hide />
                       <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #222', color: '#fff' }} />
                       <Area type="monotone" dataKey="alerts" stroke={COLORS.cyan} fill="url(#alertGrad)" strokeWidth={2} />
                       <Area type="monotone" dataKey="critical" stroke="#ef4444" fill="transparent" strokeWidth={1} strokeDasharray="3 3" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-6 pt-6 border-t border-white/5">
                 <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">P95_Daily_Pulse</span>
                    <span className="text-sm font-black font-mono text-cyan-400">124_EVTS</span>
                 </div>
                 <div className="flex flex-col gap-1 text-right">
                    <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Mean_Response</span>
                    <span className="text-sm font-black font-mono text-white/80">42s</span>
                 </div>
              </div>
           </FuturisticCard>

           <FuturisticCard title="ALERT_SUBSCRIPTIONS" accentColor={COLORS.gray}>
              <div className="space-y-4">
                 {[
                   { label: 'Push_Directives', active: true },
                   { label: 'E-Mail_Summary', active: false },
                   { label: 'Slack_Mesh_Bridge', active: true },
                   { label: 'Audit_Logs_SFTP', active: true }
                 ].map((opt, i) => (
                   <div key={i} className="flex items-center justify-between group/opt cursor-pointer">
                      <div className="flex items-center gap-3">
                         <div className={`w-1 h-3 rounded-full transition-all ${opt.active ? 'bg-cyan-500' : 'bg-white/10'}`} />
                         <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${opt.active ? 'text-white' : 'text-white/20'}`}>{opt.label}</span>
                      </div>
                      <div className={`w-8 h-4 rounded-full p-0.5 transition-all border border-white/10 ${opt.active ? 'bg-cyan-500/20 border-cyan-500/40' : 'bg-black'}`}>
                         <div className={`w-2.5 h-2.5 rounded-full transition-all ${opt.active ? 'translate-x-4 bg-cyan-400' : 'bg-white/10'}`} />
                      </div>
                   </div>
                 ))}
              </div>
           </FuturisticCard>

           <FuturisticCard title="NODE_HEALTH_MATRIX" accentColor={COLORS.green}>
              <div className="grid grid-cols-5 gap-2 mt-2">
                 {Array.from({ length: 25 }).map((_, i) => (
                   <div key={i} className={`aspect-square border border-white/10 rounded-[1px] group relative hover:border-white transition-all cursor-pointer ${
                     i === 4 || i === 12 ? 'bg-red-500/20 animate-pulse' : 
                     i % 7 === 0 ? 'bg-yellow-500/10' : 'bg-green-500/10'
                   }`}>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/80 text-[6px] font-black font-mono">
                         ID_{i+1}
                      </div>
                   </div>
                 ))}
              </div>
              <div className="mt-6 flex justify-between text-[8px] font-black uppercase text-white/20 tracking-[0.3em]">
                 <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> STABLE</div>
                 <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> SYNCING</div>
                 <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /> FAULT</div>
              </div>
           </FuturisticCard>
        </div>

      </div>
    </div>
  );
};

export default ModuleF_Notifications;

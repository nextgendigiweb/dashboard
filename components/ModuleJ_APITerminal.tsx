
import React, { useState } from 'react';
import FuturisticCard from './FuturisticCard';
import { COLORS } from '../constants';
import { 
  Terminal, Send, ChevronRight, Play, Copy, Save, 
  Search, Database, Shield, History, Code2, 
  Settings, RefreshCw, Layers, Cpu, Globe,
  FileCode, TerminalSquare, Share2
} from 'lucide-react';

const ENDPOINTS = [
  { group: 'AUTH_GATEWAY', items: [
    { method: 'POST', path: '/v2/auth/login', desc: 'Identity verification' },
    { method: 'GET', path: '/v2/auth/session', desc: 'Session validation' },
    { method: 'POST', path: '/v2/auth/rotate', desc: 'Key rotation' }
  ]},
  { group: 'NEURAL_STORAGE', items: [
    { method: 'GET', path: '/v2/storage/blobs', desc: 'Fetch asset clusters' },
    { method: 'PUT', path: '/v2/storage/inject', desc: 'Binary data injection' }
  ]},
  { group: 'KERNEL_TASKS', items: [
    { method: 'POST', path: '/v2/kernel/reboot', desc: 'Engine cold restart' },
    { method: 'GET', path: '/v2/kernel/health', desc: 'Metric aggregation' }
  ]}
];

const ModuleJ_APITerminal: React.FC = () => {
  const [method, setMethod] = useState('POST');
  const [endpoint, setEndpoint] = useState('/api/v2/auth/sync');
  const [activeEnv, setActiveEnv] = useState('PROD');
  const [snippetLang, setSnippetLang] = useState('Typescript');
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => setIsExecuting(false), 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20 animate-in fade-in duration-700">
      
      {/* 1. LEFT: ENDPOINT REGISTRY EXPLORER (3 COLUMNS) */}
      <div className="lg:col-span-3 flex flex-col gap-6">
        <FuturisticCard title="ENDPOINT_REGISTRY" accentColor={COLORS.gray} className="flex-1 p-0 overflow-hidden flex flex-col">
          <div className="p-4 bg-white/5 border-b border-white/5 shrink-0">
             <div className="relative">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                <input 
                  type="text" 
                  placeholder="Filter routes..." 
                  className="w-full bg-black border border-white/10 rounded-sm py-2 pl-9 pr-4 text-[9px] font-mono focus:border-cyan-500/40 outline-none"
                />
             </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scroll p-2 space-y-6">
             {ENDPOINTS.map(group => (
               <div key={group.group} className="space-y-2">
                  <div className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] px-2">{group.group}</div>
                  <div className="space-y-1">
                     {group.items.map(item => (
                       <button 
                        key={item.path}
                        onClick={() => { setMethod(item.method); setEndpoint(item.path); }}
                        className="w-full text-left p-2.5 rounded-sm hover:bg-white/5 transition-all group flex items-start gap-3 border border-transparent hover:border-white/5"
                       >
                          <span className={`text-[8px] font-black font-mono mt-0.5 ${item.method === 'POST' ? 'text-cyan-400' : 'text-green-400'}`}>{item.method}</span>
                          <div className="flex flex-col min-w-0">
                             <span className="text-[10px] font-mono text-white/60 truncate group-hover:text-white transition-colors">{item.path}</span>
                             <span className="text-[7px] font-mono text-white/10 uppercase tracking-tighter">{item.desc}</span>
                          </div>
                       </button>
                     ))}
                  </div>
               </div>
             ))}
          </div>
        </FuturisticCard>

        <FuturisticCard title="COLLECTION_HISTORY" accentColor={COLORS.blue} className="h-48">
           <div className="space-y-3">
              {[
                { time: '14:22', route: '/auth/sync', status: '200' },
                { time: '14:10', route: '/storage/blobs', status: '200' },
                { time: '13:55', route: '/kernel/reboot', status: '500' },
              ].map((h, i) => (
                <div key={i} className="flex items-center justify-between text-[9px] font-mono group cursor-pointer">
                   <div className="flex gap-3 items-center">
                      <span className="text-white/10">{h.time}</span>
                      <span className="text-white/40 group-hover:text-blue-400 transition-colors uppercase">{h.route}</span>
                   </div>
                   <span className={h.status === '200' ? 'text-green-500/40' : 'text-red-500/40'}>{h.status}</span>
                </div>
              ))}
           </div>
        </FuturisticCard>
      </div>

      {/* 2. CENTER: REQUEST BUILDER (5 COLUMNS) */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <FuturisticCard title="REQUEST_CONSTRUCTOR" accentColor={COLORS.cyan} className="p-0 flex flex-col overflow-hidden">
          <div className="p-4 bg-white/5 border-b border-white/5 flex gap-2 shrink-0">
             <select 
               value={method} 
               onChange={(e) => setMethod(e.target.value)}
               className="bg-black border border-white/10 text-[10px] font-mono p-2 outline-none text-cyan-400 font-black rounded-sm"
             >
               <option>GET</option>
               <option>POST</option>
               <option>PUT</option>
               <option>DELETE</option>
             </select>
             <div className="flex-1 relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/10 font-mono text-[9px] uppercase tracking-widest">{activeEnv}://</div>
                <input 
                  className="w-full bg-black border border-white/10 text-[10px] font-mono p-2 pl-16 outline-none text-white/60 focus:border-cyan-500/30 rounded-sm"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                />
             </div>
             <button 
               onClick={handleExecute}
               disabled={isExecuting}
               className="px-6 bg-cyan-500 text-black font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-cyan-400 transition-all rounded-sm disabled:opacity-50"
             >
                {isExecuting ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                {isExecuting ? 'SYNCING' : 'EXEC'}
             </button>
          </div>
          
          <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scroll">
             <div className="space-y-3">
                <div className="flex justify-between items-center">
                   <label className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/30 flex items-center gap-2">
                      <Layers size={12} /> PROTOCOL_HEADERS
                   </label>
                   <button className="text-[8px] font-black text-cyan-500 uppercase tracking-widest hover:text-white transition-colors">Add_Header</button>
                </div>
                <div className="space-y-2">
                   {[
                     { k: 'Authorization', v: 'Bearer 0x992...28A' },
                     { k: 'X-Kernel-Version', v: '4.2.1-STABLE' }
                   ].map((h, i) => (
                     <div key={i} className="grid grid-cols-2 gap-2">
                        <input defaultValue={h.k} className="bg-black border border-white/5 p-2 text-[9px] font-mono text-white/40" />
                        <input defaultValue={h.v} className="bg-black border border-white/5 p-2 text-[9px] font-mono text-cyan-500/60" />
                     </div>
                   ))}
                </div>
             </div>

             <div className="space-y-3">
                <label className="text-[8px] font-bold uppercase tracking-[0.4em] text-white/30 flex items-center gap-2">
                   <TerminalSquare size={12} /> PAYLOAD_BODY_JSON
                </label>
                <textarea 
                  className="w-full h-48 bg-black border border-white/10 text-[10px] font-mono p-4 outline-none text-white/60 focus:border-cyan-500/30 resize-none rounded-sm shadow-inner"
                  defaultValue={`{\n  "entity_uid": "IDENT_0042",\n  "op": "RECOVERY_MODE",\n  "vector": [0.12, 0.99, -0.42],\n  "secure_mask": true\n}`}
                />
             </div>
          </div>
        </FuturisticCard>

        <FuturisticCard title="SNIPPET_GENERATOR" accentColor={COLORS.gray}>
           <div className="flex items-center justify-between mb-4">
              <div className="flex bg-black border border-white/10 p-0.5 rounded-sm">
                 {['Typescript', 'Python', 'cURL'].map(lang => (
                   <button 
                     key={lang}
                     onClick={() => setSnippetLang(lang)}
                     className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest transition-all ${snippetLang === lang ? 'bg-white text-black' : 'text-white/30 hover:text-white'}`}
                   >
                     {lang}
                   </button>
                 ))}
              </div>
              <button className="p-2 border border-white/10 hover:border-white transition-all text-white/40 hover:text-white">
                 <Copy size={12} />
              </button>
           </div>
           <div className="p-4 bg-zinc-950/50 border border-white/5 font-mono text-[9px] text-white/20 leading-relaxed overflow-x-auto rounded-sm">
              {snippetLang === 'Typescript' ? (
                <pre>{`const response = await fetch('https://api.ngdw.io/v2/auth/sync', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ entity_uid: 'IDENT_0042' })\n});`}</pre>
              ) : snippetLang === 'Python' ? (
                <pre>{`import requests\n\nresp = requests.post('https://api.ngdw.io/v2/auth/sync', \n  json={'entity_uid': 'IDENT_0042'})\nprint(resp.json())`}</pre>
              ) : (
                <pre>{`curl -X POST https://api.ngdw.io/v2/auth/sync \\ \n  -H "Content-Type: application/json" \\ \n  -d '{"entity_uid": "IDENT_0042"}'`}</pre>
              )}
           </div>
        </FuturisticCard>
      </div>

      {/* 3. RIGHT: RESPONSE TELEMETRY (4 COLUMNS) */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <FuturisticCard title="LIVE_RESPONSE_STREAM" accentColor={COLORS.green} className="flex-1 flex flex-col p-0 overflow-hidden">
          <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between shrink-0">
             <div className="flex gap-4">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#38FF8B]" />
                   <span className="text-[10px] font-mono text-green-500 font-bold uppercase tracking-widest">200_OK</span>
                </div>
                <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest font-black">124ms</div>
             </div>
             <div className="flex gap-1.5">
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'API Response',
                        text: 'Check out this API response from NGDW Platform',
                        url: window.location.href
                      }).catch(() => {});
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      const event = new CustomEvent('showToast', { 
                        detail: { message: 'Link copied to clipboard!', type: 'success' } 
                      });
                      window.dispatchEvent(event);
                    }
                  }}
                  className="p-2 bg-black border border-white/10 text-white/40 hover:text-white transition-all rounded-sm"
                >
                  <Share2 size={12}/>
                </button>
                <button 
                  onClick={() => {
                    const event = new CustomEvent('showToast', { 
                      detail: { message: 'Response saved to history', type: 'success' } 
                    });
                    window.dispatchEvent(event);
                  }}
                  className="p-2 bg-black border border-white/10 text-white/40 hover:text-white transition-all rounded-sm"
                >
                  <Save size={12}/>
                </button>
             </div>
          </div>
          
          <div className="flex-1 overflow-y-auto font-mono text-[10px] bg-black/20 p-6 custom-scroll leading-loose">
             <div className="text-white/40">
               <span className="text-cyan-500">{"{"}</span><br />
               &nbsp;&nbsp;<span className="text-white/80">"directive"</span>: <span className="text-green-400">"RECOVERY_ACTIVE"</span>,<br />
               &nbsp;&nbsp;<span className="text-white/80">"kernel_lock"</span>: <span className="text-cyan-500">true</span>,<br />
               &nbsp;&nbsp;<span className="text-white/80">"payload"</span>: <span className="text-cyan-500">{"{"}</span><br />
               &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white/80">"session_uuid"</span>: <span className="text-orange-400">"0x9A..FF2"</span>,<br />
               &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white/80">"access_tier"</span>: <span className="text-orange-400">"ROOT_LEVEL_9"</span>,<br />
               &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white/80">"sync_nodes"</span>: <span className="text-cyan-500">[</span><span className="text-green-400">"NYC_01"</span>, <span className="text-green-400">"TOK_09"</span><span className="text-cyan-500">]</span>,<br />
               &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white/80">"metadata"</span>: <span className="text-cyan-500">{"{"}</span><br />
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white/80">"timestamp"</span>: <span className="text-orange-400">1714522800</span>,<br />
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white/80">"integrity_sum"</span>: <span className="text-green-400">"SHA_256_VALID"</span><br />
               &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-cyan-500">{"}"}</span><br />
               &nbsp;&nbsp;<span className="text-cyan-500">{"}"}</span>,<br />
               &nbsp;&nbsp;<span className="text-white/80">"telemetry"</span>: <span className="text-cyan-500">{"{"}</span><br />
               &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white/80">"p99_latency"</span>: <span className="text-orange-400">12ms</span>,<br />
               &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white/80">"throughput"</span>: <span className="text-orange-400">1.4GB/s</span><br />
               &nbsp;&nbsp;<span className="text-cyan-500">{"}"}</span><br />
               <span className="text-cyan-500">{"}"}</span>
             </div>
             
             <div className="mt-8 pt-8 border-t border-white/5 space-y-3 opacity-20">
                <div className="flex gap-3"><ChevronRight size={12} className="text-cyan-500"/> <span className="italic uppercase">Tunnel encryption verified via Protocol X-99.</span></div>
                <div className="flex gap-3"><ChevronRight size={12} className="text-cyan-500"/> <span className="italic uppercase">Asset clusters synchronized across NYC/TOK.</span></div>
                <div className="flex gap-3"><ChevronRight size={12} className="text-cyan-500"/> <span className="italic animate-pulse uppercase">Awaiting next instruction...</span></div>
             </div>
          </div>
        </FuturisticCard>

        <FuturisticCard title="TERMINAL_METADATA" accentColor={COLORS.gray}>
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                 <div className="text-[7px] font-black text-white/20 uppercase tracking-[0.2em]">API_Base_Node</div>
                 <div className="text-[10px] font-mono text-white/60">api-cluster-v4-02.ngdw.io</div>
              </div>
              <div className="space-y-1">
                 <div className="text-[7px] font-black text-white/20 uppercase tracking-[0.2em]">Protocol_Mesh</div>
                 <div className="text-[10px] font-mono text-white/60">X-99_ENCRYPTED_v2</div>
              </div>
           </div>
           <div className="mt-6 flex flex-col gap-2">
              <div className="flex justify-between items-center text-[8px] font-black uppercase text-white/20">
                 <span>Sync_Coherence</span>
                 <span className="text-cyan-400">99.8%</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-cyan-500 w-[99.8%]" />
              </div>
           </div>
        </FuturisticCard>
      </div>
    </div>
  );
};

export default ModuleJ_APITerminal;

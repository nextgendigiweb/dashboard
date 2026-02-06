
import React, { useState, useEffect, useRef } from 'react';
import FuturisticCard from './FuturisticCard';
import { COLORS } from '../constants';
import groqService from '../services/groqService';
import { 
  Sparkles, Terminal, Play, Loader2, Cpu, 
  Zap, Brain, Layers, Activity, Database, Shield, 
  ChevronRight, Share2, Download, Maximize2, Settings2,
  Binary, Microchip, Waves, RefreshCcw, Gauge,
  Lock, Globe, Search, CheckCircle2, Copy
} from 'lucide-react';

const AI_MODELS = [
  { id: 'llama-3.1-70b-versatile', label: 'LLAMA_3.1_70B', speed: 'ULTRA', precision: 'MAX' },
  { id: 'llama-3.1-8b-instant', label: 'LLAMA_3.1_8B', speed: 'INSTANT', precision: 'BALANCED' },
  { id: 'mixtral-8x7b-32768', label: 'MIXTRAL_8X7B', speed: 'FAST', precision: 'HIGH' },
  { id: 'gemma2-9b-it', label: 'GEMMA2_9B', speed: 'OPTIMAL', precision: 'BALANCED' },
];

const PRESETS = [
  { label: 'GLASS_UI', prompt: 'Synthesize a glassmorphic user interface with 0.4 blur.' },
  { label: 'BIO_GATE', prompt: 'Construct a biometric authorization portal with haptic feedback.' },
  { label: 'HEX_VAULT', prompt: 'Design a high-security asset vault with rotating keys.' },
];

const ModuleB_AIGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0].id);
  const [temp, setTemp] = useState(0.7);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [logs, setLogs] = useState<string[]>([
    "[10:42:01] KERNEL_IDLE_READY",
    "[10:42:05] WAITING_FOR_DIRECTIVE_INPUT..."
  ]);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Test Groq connection on mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        const connected = await groqService.testConnection();
        setIsConnected(connected);
        if (connected) {
          addLog("GROQ_API_CONNECTED_SUCCESSFULLY");
        } else {
          addLog("GROQ_API_CONNECTION_FAILED");
        }
      } catch (error) {
        setIsConnected(false);
        addLog("GROQ_API_CONNECTION_ERROR");
      }
    };
    testConnection();
  }, []);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-15), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setProgress(0);
    setGeneratedContent('');
    addLog(`INIT_LINK: GROQ_${selectedModel.split('-')[0].toUpperCase()}`);
    
    const steps = ["DECODING_VECTORS", "SYNTH_LAYOUT", "INJECT_CONSTANTS", "VALIDATE_SCHEMA", "FINAL_ARTIFACT"];
    let currentStep = 0;
    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        if (p % 18 === 0 && currentStep < steps.length) {
          addLog(steps[currentStep]);
          currentStep++;
        }
        return p + 3;
      });
    }, 60);

    try {
      addLog("CONNECTING_TO_GROQ_API...");
      
      const response = await groqService.generateResponse([
        {
          role: 'system',
          content: 'You are an expert mobile app developer and UI/UX designer. Generate detailed, actionable code and design suggestions for mobile applications. Provide clear explanations and code examples when relevant.'
        },
        {
          role: 'user',
          content: prompt
        }
      ], selectedModel, temp, 2048);

      clearInterval(progressInterval);
      setProgress(100);
      setGeneratedContent(response);
      addLog("SYNTHESIS_COMPLETE_STABLE");
      addLog(`RESPONSE_LENGTH: ${response.length} chars`);
      
      // Scroll to content
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      
      // Show success toast
      const event = new CustomEvent('showToast', { 
        detail: { message: 'AI generation completed successfully!', type: 'success' } 
      });
      window.dispatchEvent(event);
    } catch (error: any) {
      clearInterval(progressInterval);
      setProgress(0);
      const errorMsg = error.message || 'Unknown error';
      addLog(`ERR: ${errorMsg}`);
      
      // Show error toast
      const event = new CustomEvent('showToast', { 
        detail: { message: `Generation failed: ${errorMsg}`, type: 'error' } 
      });
      window.dispatchEvent(event);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    const event = new CustomEvent('showToast', { 
      detail: { message: 'Copied to clipboard!', type: 'success' } 
    });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      
      {/* Connection Status */}
      {isConnected !== null && (
        <div className={`p-4 border rounded-sm flex items-center gap-3 ${
          isConnected 
            ? 'bg-green-500/10 border-green-500/30' 
            : 'bg-red-500/10 border-red-500/30'
        }`}>
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
          <span className="text-[10px] font-mono uppercase tracking-widest">
            {isConnected ? 'GROQ_API_CONNECTED' : 'GROQ_API_DISCONNECTED'}
          </span>
        </div>
      )}

      {/* 1. NEURAL SYNTHESIS GATE - THE STARTING POINT */}
      <FuturisticCard title="NEURAL_SYNTHESIS_GATE" accentColor={COLORS.cyan}>
        <div className="space-y-8 p-2">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Terminal size={16} className="text-cyan-500" />
                <span className="text-[10px] font-black uppercase text-cyan-400 tracking-[0.3em]">Architect_Directive_Terminal</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse shadow-[0_0_10px_${isConnected ? '#38FF8B' : '#FF4444'}]`} />
                <span className="text-[9px] font-mono text-cyan-400/50 uppercase tracking-widest">
                  {isConnected ? 'Groq_Linked' : 'Link_Failed'}
                </span>
              </div>
            </div>
            <textarea 
              className="w-full h-44 bg-[#050505] border border-white/10 p-6 text-sm font-mono text-white/80 focus:border-cyan-500/40 outline-none transition-all rounded-sm resize-none shadow-inner"
              placeholder="Input Directive Vector: 'Synthesize a glassmorphic biometric portal with real-time hardware synchronization...'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  handleGenerate();
                }
              }}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            <div className="flex-1 space-y-4">
               <div className="text-[8px] font-black uppercase text-white/20 tracking-[0.5em] mb-2">Heuristic_Seeds</div>
               <div className="flex flex-wrap gap-2">
                {PRESETS.map(p => (
                  <button 
                    key={p.label}
                    onClick={() => setPrompt(p.prompt)}
                    className="px-5 py-2.5 bg-white/5 border border-white/5 hover:border-cyan-500/40 text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all rounded-sm hover:bg-cyan-500/5"
                  >
                    + {p.label}
                  </button>
                ))}
              </div>
            </div>
            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !prompt || !isConnected}
              className="w-full md:w-64 bg-cyan-500 text-black font-black uppercase tracking-[0.3em] flex flex-col items-center justify-center gap-3 py-10 md:py-0 shadow-[0_15px_40px_rgba(0,246,255,0.25)] hover:bg-cyan-400 transition-all disabled:opacity-20 disabled:cursor-not-allowed active:scale-95 group/gen"
            >
              {isGenerating ? <Loader2 className="animate-spin" size={32}/> : <Sparkles size={32} className="group-hover/gen:scale-110 transition-transform" />}
              <span className="text-[11px]">{isGenerating ? 'SYNTH_IN_PROGRESS' : 'EXECUTE_SYNTH'}</span>
            </button>
          </div>

          {isGenerating && (
            <div className="space-y-4 pt-4">
               <div className="flex justify-between text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-black">
                  <div className="flex items-center gap-3">
                    <Waves size={16} className="animate-pulse" />
                    <span>Neural_Coherence_Matrix</span>
                  </div>
                  <span>{progress}%</span>
               </div>
               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                  <div className="h-full bg-cyan-500 transition-all duration-300 shadow-[0_0_15px_#00F6FF]" style={{ width: `${progress}%` }} />
               </div>
            </div>
          )}
        </div>
      </FuturisticCard>

      {/* Generated Content Display */}
      {generatedContent && (
        <FuturisticCard title="GENERATED_OUTPUT" accentColor={COLORS.green} ref={contentRef}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest">AI_Response_Ready</span>
              </div>
              <button
                onClick={() => copyToClipboard(generatedContent)}
                className="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-green-500/40 text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all rounded-sm flex items-center gap-2"
              >
                <Copy size={12} />
                Copy
              </button>
            </div>
            <div className="p-6 bg-[#050505] border border-white/5 rounded-sm max-h-[600px] overflow-y-auto custom-scroll">
              <pre className="text-sm font-mono text-white/80 whitespace-pre-wrap leading-relaxed">
                {generatedContent}
              </pre>
            </div>
          </div>
        </FuturisticCard>
      )}

      {/* 2. SYNTHESIZED VAULT (IMAGE GALLERY) - FRONT AND CENTER */}
      <div className="space-y-8">
         <div className="flex items-center gap-6">
            <h2 className="text-3xl font-black uppercase tracking-tighter shrink-0">Synthesized_Vault</h2>
            <div className="flex-1 h-[1px] bg-white/10" />
            <div className="flex items-center gap-4 bg-zinc-950 px-6 py-3 border border-white/5 rounded-sm">
               <span className="text-[10px] font-black uppercase text-white/30 tracking-[0.4em]">Active_Cache</span>
               <span className="text-xs font-mono text-cyan-400 font-black">128_NODES</span>
            </div>
         </div>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 'ART_01', title: 'Haptic_Auth_Gate', icon: Shield, date: '2h ago' },
              { id: 'ART_02', title: 'Neural_Feed_v2', icon: Brain, date: '5h ago' },
              { id: 'ART_03', title: 'Quantum_Vault', icon: Lock, date: '1d ago' },
              { id: 'ART_04', title: 'Edge_Mesh_HUD', icon: Globe, date: '3d ago' },
            ].map((art, i) => (
              <FuturisticCard key={art.id} accentColor={i % 2 === 0 ? COLORS.cyan : COLORS.blue} className="aspect-[3/4] p-0 overflow-hidden group/card shadow-2xl" idTag={art.id}>
                <div className="relative h-full flex flex-col bg-black">
                   <img 
                    src={`https://picsum.photos/600/800?random=${i + 150}`} 
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 group-hover/card:grayscale-0 group-hover/card:scale-110 group-hover/card:opacity-90 transition-all duration-1000 ease-out" 
                    alt="Synthesis Artifact"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                  
                  <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover/card:translate-x-0 group-hover/card:opacity-100 transition-all duration-500 z-20">
                     <button 
                       onClick={(e) => {
                         e.stopPropagation();
                         if (navigator.share) {
                           navigator.share({
                             title: art.title,
                             text: `Check out ${art.title} from NGDW Platform`,
                             url: window.location.href
                           }).catch(() => {});
                         } else {
                           navigator.clipboard.writeText(window.location.href);
                           const event = new CustomEvent('showToast', { 
                             detail: { message: 'Link copied!', type: 'success' } 
                           });
                           window.dispatchEvent(event);
                         }
                       }}
                       className="p-3 bg-black/80 backdrop-blur-xl border border-white/10 hover:border-cyan-500 text-white rounded-sm transition-all"
                     >
                       <Share2 size={16}/>
                     </button>
                     <button 
                       onClick={(e) => {
                         e.stopPropagation();
                         const event = new CustomEvent('showToast', { 
                           detail: { message: `Downloading ${art.title}...`, type: 'info' } 
                         });
                         window.dispatchEvent(event);
                       }}
                       className="p-3 bg-black/80 backdrop-blur-xl border border-white/10 hover:border-cyan-500 text-white rounded-sm transition-all"
                     >
                       <Download size={16}/>
                     </button>
                  </div>

                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 flex items-center gap-2 rounded-sm shadow-xl">
                      <art.icon size={12} className="text-cyan-400" />
                      <span className="text-[9px] font-mono text-white/60 tracking-widest uppercase">{art.id}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 space-y-5 z-20">
                     <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-cyan-400">Ver_0{i}.1_Stable</span>
                        <h4 className="text-lg font-black uppercase text-white truncate group-hover/card:text-cyan-400 transition-colors">{art.title}</h4>
                        <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">{art.date}</span>
                     </div>
                        <div className="flex items-center justify-between pt-5 border-t border-white/10">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setPrompt(`Apply ${art.title} template`);
                            const event = new CustomEvent('navigateToTab', { detail: 'builder' });
                            window.dispatchEvent(event);
                          }}
                          className="flex items-center gap-3 text-white/40 hover:text-white transition-colors cursor-pointer group/action"
                        >
                           <Play size={18} className="group-hover/action:text-cyan-400 group-hover/action:scale-110 transition-all" />
                           <span className="text-[11px] font-black uppercase tracking-[0.3em]">Apply_Vector</span>
                        </button>
                        <ChevronRight size={20} className="text-white/20 group-hover/card:translate-x-2 transition-all group-hover/card:text-cyan-400" />
                     </div>
                  </div>
                </div>
              </FuturisticCard>
            ))}
         </div>
      </div>

      {/* 3. DIAGNOSTICS & CONTROLS - REFINED AT THE BOTTOM */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* PROTOCOL_SYSLOG */}
         <FuturisticCard title="PROTOCOL_SYSLOG" accentColor={COLORS.gray} className="h-80 flex flex-col p-0">
            <div ref={logContainerRef} className="flex-1 overflow-y-auto custom-scroll p-6 space-y-2 font-mono text-[10px] text-white/40 uppercase">
               {logs.map((log, i) => (
                 <div key={i} className="flex gap-4 hover:bg-white/5 p-1.5 rounded-sm transition-colors group">
                    <span className="text-cyan-500 font-bold opacity-30 group-hover:opacity-100">GROQ:</span>
                    <span className="truncate leading-relaxed">{log}</span>
                 </div>
               ))}
            </div>
            <div className="p-4 border-t border-white/5 bg-[#050505] flex justify-between items-center px-6">
               <span className="text-[8px] font-mono text-white/15 uppercase tracking-[0.2em]">Stream_ID: GROQ_X99</span>
               <button onClick={() => setLogs(["[INIT] BUFFER_FLUSHED"])} className="text-[8px] font-mono text-cyan-400/50 hover:text-cyan-400 transition-colors uppercase font-black underline underline-offset-4">Flush_Registry</button>
            </div>
         </FuturisticCard>

         {/* INFERENCE_HUD */}
         <FuturisticCard title="INFERENCE_HUD" accentColor={COLORS.green} className="h-80">
            <div className="flex flex-col items-center justify-center h-full py-6 text-center">
               <div className="relative mb-8">
                  <Activity size={48} className="text-green-500 animate-pulse" strokeWidth={1} />
                  <div className="absolute inset-0 bg-green-500/10 blur-2xl rounded-full" />
               </div>
               <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.6em] mb-2 font-bold">Latency_P99_Stable</span>
               <span className="text-5xl font-black font-mono tracking-tighter text-white">12.4ms</span>
               <div className="mt-10 w-full space-y-4">
                  <div className="flex justify-between text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
                    <span>NPU_Cluster_Load</span>
                    <span className="text-green-500 font-black">14.2%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden border border-white/10 shadow-inner">
                     <div className="h-full bg-green-500 w-[14%] shadow-[0_0_12px_#38FF8B]" />
                  </div>
               </div>
            </div>
         </FuturisticCard>

         {/* KERNEL_CONFIG */}
         <FuturisticCard title="KERNEL_CONFIG" accentColor={COLORS.blue} className="h-80">
            <div className="space-y-6 h-full flex flex-col justify-between py-2">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-white/30 tracking-[0.3em]">Neural_Target_Core</label>
                <div className="space-y-2">
                  {AI_MODELS.map(model => (
                    <div 
                      key={model.id}
                      onClick={() => setSelectedModel(model.id)}
                      className={`px-4 py-3 border rounded-sm cursor-pointer transition-all flex justify-between items-center group/m ${
                        selectedModel === model.id ? 'bg-blue-500/10 border-blue-500/40 shadow-[inset_0_0_15px_rgba(58,123,255,0.05)]' : 'border-white/5 hover:bg-zinc-950'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className={`text-[11px] font-black uppercase tracking-widest ${selectedModel === model.id ? 'text-white' : 'text-white/30'}`}>{model.label}</span>
                        <span className="text-[8px] font-mono text-white/10 group-hover/m:text-blue-400/40 uppercase">{model.precision} • {model.speed}</span>
                      </div>
                      <div className={`w-3 h-3 rounded-full border-2 ${selectedModel === model.id ? 'bg-blue-500 border-blue-400 shadow-[0_0_10px_#3A7BFF]' : 'bg-black border-white/10'}`} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 space-y-4 mt-auto">
                 <div className="flex justify-between items-center text-[11px] font-black uppercase text-white/30 tracking-widest">
                    <span>Synth_Temp</span>
                    <span className="font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-sm">{temp.toFixed(1)}</span>
                 </div>
                 <input 
                  type="range" min="0" max="1" step="0.1" value={temp} onChange={(e) => setTemp(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-zinc-950 appearance-none rounded-full accent-blue-500 cursor-pointer border border-white/10"
                 />
              </div>
            </div>
         </FuturisticCard>
      </div>

      <div className="flex justify-center pt-10">
         <button className="px-12 py-5 bg-zinc-950 border border-white/10 text-[10px] font-black uppercase tracking-[0.6em] text-white/30 hover:text-white hover:border-cyan-500/30 hover:bg-zinc-900 transition-all rounded-sm flex items-center gap-5 shadow-2xl group">
           RECOVER_HISTORICAL_CACHE <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-1000 ease-in-out" />
         </button>
      </div>

    </div>
  );
};

export default ModuleB_AIGenerator;

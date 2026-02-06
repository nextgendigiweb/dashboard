
import React, { useState } from 'react';
import FuturisticCard from './FuturisticCard';
import { COLORS } from '../constants';
import { 
  Sparkles, Cpu, Layers, BarChart3, Zap, 
  Rocket, Code2, FileText, Activity, TrendingUp,
  RefreshCw, GitBranch, Globe, Plug, Cloud,
  CheckCircle2, ArrowRight, Play, Settings,
  Database, Shield, Terminal, Smartphone
} from 'lucide-react';

const PLATFORM_FEATURES = [
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
];

const ModuleN_PlatformFeatures: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      
      {/* Header Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-cyan-500/60"></div>
          <span className="text-[10px] font-mono text-cyan-500 tracking-[0.8em] uppercase font-bold">PLATFORM_CORE_FEATURES</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-tight">
          Platform Features
        </h1>
        <p className="text-sm text-white/60 max-w-3xl leading-relaxed">
          Comprehensive suite of AI-powered development tools, analytics, and deployment infrastructure 
          designed to accelerate mobile app creation from concept to production.
        </p>
      </div>

      {/* Main Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PLATFORM_FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          const isSelected = selectedFeature === feature.id;
          const isHovered = hoveredFeature === feature.id;

          return (
            <FuturisticCard 
              key={feature.id}
              title={feature.title}
              accentColor={feature.color}
              className={`cursor-pointer transition-all duration-500 ${
                isSelected ? 'ring-2 ring-offset-2 ring-offset-black' : ''
              }`}
              idTag={`FEAT_${index + 1}`}
            >
              <div 
                className="space-y-6"
                onClick={() => setSelectedFeature(isSelected ? null : feature.id)}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
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
                      <Icon size={24} style={{ color: feature.color }} />
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
                {isSelected && (
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
                        className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 group/btn"
                        style={{ 
                          borderColor: isHovered ? `${feature.color}40` : undefined,
                          backgroundColor: isHovered ? `${feature.color}10` : undefined
                        }}
                      >
                        <Play size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        Explore Feature
                      </button>
                      <button 
                        className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-[10px] font-black uppercase tracking-[0.3em] transition-all"
                        style={{ 
                          borderColor: isHovered ? `${feature.color}40` : undefined,
                          backgroundColor: isHovered ? `${feature.color}10` : undefined
                        }}
                      >
                        <Settings size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Expand Indicator */}
                {!isSelected && (
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[9px] font-mono text-white/20 uppercase tracking-widest">
                    <span>Click to expand</span>
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </div>
                )}
              </div>
            </FuturisticCard>
          );
        })}
      </div>

      {/* Quick Stats Overview */}
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
              { name: 'REST APIs', icon: Terminal },
              { name: 'Firebase', icon: Cloud },
              { name: 'Stripe', icon: Shield },
              { name: 'AWS', icon: Database },
              { name: 'GitHub', icon: GitBranch },
              { name: 'App Store', icon: Smartphone },
              { name: 'Google Play', icon: Globe },
              { name: 'Custom', icon: Plug },
            ].map((integration, idx) => (
              <div 
                key={idx}
                className="p-4 bg-white/5 border border-white/5 hover:border-green-500/30 rounded-sm transition-all cursor-pointer group"
              >
                <div className="flex flex-col items-center gap-3">
                  <integration.icon size={24} className="text-white/40 group-hover:text-green-400 transition-colors" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-white/60 group-hover:text-white transition-colors">
                    {integration.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FuturisticCard>

      {/* Call to Action */}
      <div className="flex justify-center pt-8">
        <button className="px-12 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] hover:bg-zinc-200 transition-all shadow-[0_15px_40px_rgba(255,255,255,0.1)] flex items-center gap-4 group">
          Start Building Your App
          <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>

    </div>
  );
};

export default ModuleN_PlatformFeatures;

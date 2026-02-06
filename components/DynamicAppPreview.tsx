import React, { useState } from 'react';

interface Component {
  id: string;
  type: string;
  props?: any;
  styles?: any;
  children?: Component[];
}

interface Screen {
  id: string;
  name: string;
  components?: Component[];
}

interface DynamicAppPreviewProps {
  screens?: Screen[];
  selectedScreenId?: string | null;
  appName?: string;
  onScreenSelect?: (screenId: string) => void;
}

const DynamicAppPreview: React.FC<DynamicAppPreviewProps> = ({ 
  screens = [], 
  selectedScreenId,
  appName = 'App',
  onScreenSelect 
}) => {
  const [componentStates, setComponentStates] = useState<Record<string, any>>({});
  
  // Get the current screen to display
  const currentScreen = selectedScreenId 
    ? screens.find(s => s.id === selectedScreenId || s.name === selectedScreenId)
    : screens[0];

  // Update component state
  const updateComponentState = (componentId: string, updates: any) => {
    setComponentStates(prev => ({
      ...prev,
      [componentId]: { ...prev[componentId], ...updates }
    }));
  };

  // Get modern color palette based on component type
  const getComponentColors = (componentType: string, customColor?: string) => {
    if (customColor) return customColor;
    
    const colorMap: Record<string, string> = {
      'button': '#3b82f6', // blue
      'primary': '#3b82f6',
      'secondary': '#8b5cf6', // purple
      'success': '#10b981', // green
      'danger': '#ef4444', // red
      'warning': '#f59e0b', // orange
      'info': '#06b6d4', // cyan
    };
    
    return colorMap[componentType.toLowerCase()] || '#3b82f6';
  };

  // Convert hex to RGB for opacity
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Render a component dynamically with PREMIUM styling
  const renderComponent = (component: Component, depth: number = 0): React.ReactNode => {
    if (!component) return null;

    const state = componentStates[component.id] || {};
    const style = component.styles || {};
    const props = component.props || {};

    // Enhanced style conversion with better defaults
    const getStyles = (rnStyles: any): React.CSSProperties => {
      const bgColor = rnStyles.backgroundColor || 'transparent';
      const textColor = rnStyles.color || '#ffffff';
      const padding = typeof rnStyles.padding === 'number' ? rnStyles.padding : 16;
      const margin = typeof rnStyles.margin === 'number' ? rnStyles.margin : 0;
      const borderRadius = typeof rnStyles.borderRadius === 'number' ? rnStyles.borderRadius : 12;
      const fontSize = typeof rnStyles.fontSize === 'number' ? rnStyles.fontSize : 16;
      
      return {
        padding: `${padding}px`,
        margin: `${margin}px`,
        backgroundColor: bgColor === 'transparent' ? 'transparent' : bgColor,
        color: textColor,
        fontSize: `${fontSize}px`,
        fontWeight: rnStyles.fontWeight || 'normal',
        textAlign: rnStyles.textAlign || 'left',
        borderRadius: `${borderRadius}px`,
        borderWidth: rnStyles.borderWidth || '0',
        borderColor: rnStyles.borderColor || 'transparent',
        width: typeof rnStyles.width === 'number' ? `${rnStyles.width}px` : (rnStyles.width || 'auto'),
        height: typeof rnStyles.height === 'number' ? `${rnStyles.height}px` : (rnStyles.height || 'auto'),
        flexDirection: rnStyles.flexDirection || 'column',
        justifyContent: rnStyles.justifyContent || 'flex-start',
        alignItems: rnStyles.alignItems || 'stretch',
        gap: typeof rnStyles.gap === 'number' ? `${rnStyles.gap}px` : (rnStyles.gap || '12px'),
        display: 'flex',
        flexWrap: rnStyles.flexWrap || 'nowrap',
        boxShadow: rnStyles.shadowColor ? `0 4px 6px -1px ${rnStyles.shadowColor}40` : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      };
    };

    const cssStyles = getStyles(style);
    const baseClassName = "transition-all duration-200";

    switch (component.type?.toLowerCase()) {
      case 'text':
      case 'label':
        const textSize = style.fontSize || 16;
        const textWeight = style.fontWeight || 'normal';
        return (
          <div
            key={component.id}
            className={`
              ${baseClassName}
              ${textSize >= 24 ? 'text-2xl sm:text-3xl' : textSize >= 20 ? 'text-xl sm:text-2xl' : textSize >= 18 ? 'text-lg' : 'text-base'}
              ${textWeight === 'bold' ? 'font-bold' : textWeight === 'semibold' ? 'font-semibold' : 'font-normal'}
              text-white leading-relaxed
            `}
            style={cssStyles}
          >
            {props.value || props.text || props.children || props.label || component.id}
          </div>
        );

      case 'button':
      case 'touchableopacity':
        const btnColor = getComponentColors('button', style.backgroundColor);
        const rgb = hexToRgb(btnColor);
        const isPressed = state.pressed;
        
        return (
          <button
            key={component.id}
            onClick={() => {
              updateComponentState(component.id, { pressed: true });
              setTimeout(() => updateComponentState(component.id, { pressed: false }), 150);
            }}
            className={`
              ${baseClassName}
              font-semibold rounded-xl
              shadow-lg hover:shadow-xl active:shadow-md
              active:scale-95 transform
              px-6 py-3
              text-white
            `}
            style={{
              backgroundColor: isPressed ? btnColor : btnColor,
              background: isPressed 
                ? `linear-gradient(135deg, ${btnColor} 0%, ${btnColor}dd 100%)`
                : `linear-gradient(135deg, ${btnColor} 0%, ${btnColor}ee 100%)`,
              boxShadow: isPressed 
                ? `0 2px 4px rgba(0,0,0,0.2)`
                : `0 8px 16px ${rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)` : 'rgba(59, 130, 246, 0.3)'}`,
              ...cssStyles,
            }}
          >
            {props.title || props.label || props.text || 'Button'}
          </button>
        );

      case 'input':
      case 'textinput':
        return (
          <div key={component.id} className="w-full">
            {props.label && (
              <label className="block text-sm font-medium text-white/70 mb-2">
                {props.label}
              </label>
            )}
            <input
              type={props.type || 'text'}
              placeholder={props.placeholder || ''}
              value={state.value || props.value || ''}
              onChange={(e) => updateComponentState(component.id, { value: e.target.value })}
              className={`
                ${baseClassName}
                w-full
                bg-white/10 backdrop-blur-sm
                border border-white/20 rounded-xl
                text-white placeholder:text-white/40
                px-4 py-3 outline-none
                focus:border-blue-500 focus:bg-white/15
                focus:ring-2 focus:ring-blue-500/20
                shadow-inner
              `}
              style={{
                fontSize: cssStyles.fontSize,
                ...cssStyles,
              }}
            />
          </div>
        );

      case 'view':
      case 'container':
      case 'div':
        const hasBackground = style.backgroundColor && style.backgroundColor !== 'transparent';
        return (
          <div
            key={component.id}
            className={`
              ${baseClassName}
              ${hasBackground ? 'rounded-xl shadow-md' : ''}
            `}
            style={cssStyles}
          >
            {component.children?.map(child => renderComponent(child, depth + 1))}
          </div>
        );

      case 'image':
      case 'img':
        return (
          <div
            key={component.id}
            className={`
              ${baseClassName}
              bg-gradient-to-br from-white/10 to-white/5
              border border-white/20 rounded-xl
              flex items-center justify-center overflow-hidden
              shadow-lg
            `}
            style={{
              ...cssStyles,
              minHeight: cssStyles.height || '120px',
            }}
          >
            {props.source?.uri ? (
              <img 
                src={props.source.uri} 
                alt={props.alt || ''}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center p-4">
                <div className="text-4xl mb-2">📷</div>
                <span className="text-white/40 text-xs">Image</span>
              </div>
            )}
          </div>
        );

      case 'scrollview':
      case 'scroll':
        return (
          <div
            key={component.id}
            className={`${baseClassName} overflow-y-auto custom-scroll rounded-xl`}
            style={{ 
              ...cssStyles, 
              maxHeight: cssStyles.height || '400px',
              backgroundColor: cssStyles.backgroundColor || 'transparent',
            }}
          >
            {component.children?.map(child => renderComponent(child, depth + 1))}
          </div>
        );

      case 'card':
      case 'box':
        return (
          <div
            key={component.id}
            className={`
              ${baseClassName}
              bg-gradient-to-br from-white/10 to-white/5
              backdrop-blur-sm
              border border-white/20 rounded-xl p-4 sm:p-6
              shadow-lg hover:shadow-xl
            `}
            style={cssStyles}
          >
            {component.children?.map(child => renderComponent(child, depth + 1))}
          </div>
        );

      case 'list':
      case 'flatlist':
        const listData = props.data || state.data || [];
        return (
          <div
            key={component.id}
            className={`${baseClassName} space-y-3`}
            style={cssStyles}
          >
            {listData.length > 0 ? (
              listData.map((item: any, idx: number) => (
                <div
                  key={idx}
                  className="
                    bg-gradient-to-r from-white/10 to-white/5
                    backdrop-blur-sm
                    border border-white/20 rounded-xl p-4
                    hover:bg-white/15 hover:border-white/30
                    transition-all cursor-pointer
                    shadow-md hover:shadow-lg
                  "
                >
                  {typeof item === 'string' ? (
                    <div className="text-white font-medium">{item}</div>
                  ) : (
                    <div className="space-y-1">
                      {item.title && <div className="text-white font-semibold">{item.title}</div>}
                      {item.description && <div className="text-white/60 text-sm">{item.description}</div>}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-white/40 text-sm">
                No items in list
              </div>
            )}
          </div>
        );

      default:
        // Generic component with premium styling
        return (
          <div
            key={component.id}
            className={`
              ${baseClassName}
              bg-gradient-to-br from-white/10 to-white/5
              backdrop-blur-sm
              border border-white/20 rounded-xl p-4
              shadow-md
            `}
            style={cssStyles}
          >
            <div className="text-[10px] text-cyan-400 font-mono mb-2 uppercase tracking-wider">
              {component.type || 'Component'}
            </div>
            {(props.label || props.title || props.text) && (
              <div className="text-white font-medium">
                {props.label || props.title || props.text}
              </div>
            )}
            {component.children?.map(child => renderComponent(child, depth + 1))}
          </div>
        );
    }
  };

  if (!currentScreen && screens.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-b from-zinc-900 via-black to-zinc-900 p-4">
        <div className="text-center">
          <div className="text-6xl mb-4">📱</div>
          <div className="text-white/40 text-sm font-mono mb-2">No screens available</div>
          <div className="text-white/20 text-xs">Generate an app to see preview</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-b from-zinc-900 via-black to-zinc-900 overflow-y-auto custom-scroll">
      {/* Premium Header */}
      <div className="sticky top-0 bg-black/90 backdrop-blur-xl border-b border-white/10 p-4 z-10 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white mb-1">{appName}</h2>
            <p className="text-xs text-white/60 font-mono">{currentScreen?.name || 'Screen'}</p>
          </div>
          {screens.length > 1 && (
            <select
              value={selectedScreenId || screens[0]?.id}
              onChange={(e) => onScreenSelect?.(e.target.value)}
              className="
                bg-white/10 backdrop-blur-sm
                border border-white/20 rounded-lg
                px-3 py-2 text-xs text-white
                outline-none focus:border-blue-500
                focus:ring-2 focus:ring-blue-500/20
                cursor-pointer
              "
            >
              {screens.map(screen => (
                <option key={screen.id} value={screen.id} className="bg-black">
                  {screen.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Screen Content with Premium Styling */}
      <div className="p-4 sm:p-6 space-y-4">
        {currentScreen?.components && currentScreen.components.length > 0 ? (
          currentScreen.components.map(component => renderComponent(component))
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🎨</div>
            <div className="text-white/40 text-sm font-mono mb-2">No components</div>
            <div className="text-white/20 text-xs">This screen has no components yet</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicAppPreview;

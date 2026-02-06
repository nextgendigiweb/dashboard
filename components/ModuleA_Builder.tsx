
import React, { useState, useCallback, useRef } from 'react';
import FuturisticCard from './FuturisticCard';
import { COLORS } from '../constants';
import groqService from '../services/groqService';
import ChessGamePreview from './ChessGamePreview';
import CalculatorPreview from './CalculatorPreview';
import SnakeGamePreview from './SnakeGamePreview';
import DynamicAppPreview from './DynamicAppPreview';
import {
  Smartphone, Layout, Zap, Type, Image as ImageIcon,
  Fingerprint, Eye, Cpu, Sparkles, Terminal,
  Layers, RotateCw, Maximize2, ChevronRight,
  Search, Code2, Box, Sliders, HardDrive, Share2,
  Database, Activity, Lock, Globe, Move, Palette,
  MoreVertical, Trash2, Plus, Monitor, ListTree, Settings2,
  RefreshCw, Haze, GripVertical, Loader2, Navigation,
  GitBranch, Cloud, Shield, Smartphone as Phone, Tablet,
  FileCode, Network, Bell, Camera, MapPin, ShoppingCart,
  User, Mail, CreditCard, BarChart3, Video, Music,
  BookOpen, Calendar, MessageSquare, CheckCircle2, Copy,
  Menu, Circle, ChevronDown, Download, Play, Save,
  Edit, Eye as EyeIcon, X, ArrowRight, FileText,
  Folder, FolderOpen, GitCommit, Package, TestTube,
  TrendingUp, AlertCircle, CheckCircle, Info, Wand2
} from 'lucide-react';

// Enhanced Component Library
const componentLibrary = [
  {
    group: 'LAYOUT_NODES', items: [
      { id: 'flex', label: 'Flex_Box', icon: Box },
      { id: 'grid', label: 'Grid_Layout', icon: Layout },
      { id: 'scroll', label: 'Scroll_Area', icon: Move },
      { id: 'stack', label: 'Stack_View', icon: Layers },
    ]
  },
  {
    group: 'UI_PRIMITIVES', items: [
      { id: 'btn', label: 'Action_Button', icon: Zap },
      { id: 'txt', label: 'Label_Node', icon: Type },
      { id: 'img', label: 'Asset_Frame', icon: ImageIcon },
      { id: 'input', label: 'Text_Input', icon: Type },
      { id: 'card', label: 'Card_View', icon: Box },
    ]
  },
  {
    group: 'NAVIGATION', items: [
      { id: 'nav', label: 'Nav_Bar', icon: Navigation },
      { id: 'tab', label: 'Tab_Bar', icon: Layers },
      { id: 'drawer', label: 'Drawer', icon: Menu },
    ]
  },
  {
    group: 'FORMS', items: [
      { id: 'form', label: 'Form_Container', icon: FileCode },
      { id: 'checkbox', label: 'Checkbox', icon: CheckCircle2 },
      { id: 'radio', label: 'Radio_Group', icon: Circle },
      { id: 'select', label: 'Select_Dropdown', icon: ChevronDown },
    ]
  },
  {
    group: 'DATA_DISPLAY', items: [
      { id: 'list', label: 'List_View', icon: ListTree },
      { id: 'table', label: 'Data_Table', icon: Layout },
      { id: 'chart', label: 'Chart_View', icon: BarChart3 },
    ]
  },
  {
    group: 'HARDWARE_IO', items: [
      { id: 'face', label: 'Vision_Gate', icon: Eye },
      { id: 'scan', label: 'Bio_Reader', icon: Fingerprint },
      { id: 'camera', label: 'Camera_Module', icon: Camera },
      { id: 'location', label: 'GPS_Tracker', icon: MapPin },
    ]
  },
  {
    group: 'FEATURES', items: [
      { id: 'auth', label: 'Auth_Screen', icon: Shield },
      { id: 'profile', label: 'Profile_View', icon: User },
      { id: 'chat', label: 'Chat_Interface', icon: MessageSquare },
      { id: 'ecommerce', label: 'E_Commerce', icon: ShoppingCart },
      { id: 'media', label: 'Media_Player', icon: Video },
    ]
  },
];

// Mobile Development Sections
const DEV_SECTIONS = [
  { id: 'screens', label: 'Screens & Pages', icon: Smartphone, color: COLORS.cyan },
  { id: 'navigation', label: 'Navigation Flow', icon: Navigation, color: COLORS.blue },
  { id: 'state', label: 'State Management', icon: Database, color: COLORS.green },
  { id: 'api', label: 'API Integration', icon: Cloud, color: COLORS.cyan },
  { id: 'styling', label: 'Styling & Theme', icon: Palette, color: COLORS.blue },
  { id: 'platform', label: 'Platform Features', icon: Phone, color: COLORS.green },
  { id: 'code', label: 'Code Generation', icon: Code2, color: COLORS.cyan },
];

// Advanced Groq Prompt Templates with Parameters
const ADVANCED_PROMPT_TEMPLATES = {
  screens: [
    {
      label: 'Login Screen',
      prompt: 'Generate a modern login screen with email/password fields, biometric option, and forgot password link. Include validation and error handling.',
      params: { platform: 'both', includeBiometric: true, includeSocial: false }
    },
    {
      label: 'Dashboard',
      prompt: 'Create a dashboard screen with stats cards, charts, and quick actions. Responsive grid layout with dark theme.',
      params: { platform: 'both', chartType: 'bar', cardCount: 6 }
    },
    {
      label: 'Profile Screen',
      prompt: 'Design a user profile screen with avatar, edit button, settings list, and logout option.',
      params: { platform: 'both', includeAvatar: true, includeSettings: true }
    },
    {
      label: 'Product List',
      prompt: 'Generate a product listing screen with search, filters, grid/list view toggle, and infinite scroll.',
      params: { platform: 'both', viewMode: 'grid', includeFilters: true }
    },
    {
      label: 'Checkout Flow',
      prompt: 'Create a multi-step checkout screen with cart summary, shipping form, payment method, and order confirmation.',
      params: { platform: 'both', steps: 4, includePayment: true }
    },
  ],
  navigation: [
    {
      label: 'Tab Navigation',
      prompt: 'Create a bottom tab navigation with 5 tabs: Home, Search, Create, Notifications, Profile. Include icons and badges.',
      params: { tabCount: 5, position: 'bottom', includeBadges: true }
    },
    {
      label: 'Stack Navigation',
      prompt: 'Design a stack navigation flow: List → Detail → Edit → Save. Include back buttons and transitions.',
      params: { screens: ['List', 'Detail', 'Edit'], transitionType: 'slide' }
    },
    {
      label: 'Drawer Menu',
      prompt: 'Generate a side drawer navigation with user header, menu items, and footer actions.',
      params: { position: 'left', includeHeader: true, includeFooter: true }
    },
    {
      label: 'Deep Linking',
      prompt: 'Set up deep linking configuration for navigation with URL schemes and universal links.',
      params: { platform: 'both', includeUniversalLinks: true }
    },
  ],
  state: [
    {
      label: 'Redux Setup',
      prompt: 'Create Redux store setup with user slice, auth slice, and API middleware. Include TypeScript types.',
      params: { slices: ['user', 'auth'], includeMiddleware: true, useRTK: true }
    },
    {
      label: 'Context API',
      prompt: 'Generate React Context for theme management with light/dark mode toggle and persistence.',
      params: { contextType: 'theme', includePersistence: true, includeAnimation: true }
    },
    {
      label: 'Zustand Store',
      prompt: 'Create Zustand store for cart management with add, remove, update, and clear actions.',
      params: { storeType: 'cart', actions: ['add', 'remove', 'update', 'clear'] }
    },
    {
      label: 'Local Storage',
      prompt: 'Create hooks for async storage with encryption for sensitive data like tokens.',
      params: { includeEncryption: true, dataTypes: ['tokens', 'userPrefs'] }
    },
  ],
  api: [
    {
      label: 'REST Client',
      prompt: 'Generate a REST API client with interceptors, error handling, and token refresh logic.',
      params: { includeInterceptors: true, includeRetry: true, includeCache: false }
    },
    {
      label: 'GraphQL Setup',
      prompt: 'Create GraphQL client configuration with Apollo Client, queries, and mutations.',
      params: { client: 'apollo', includeSubscriptions: false, includeCache: true }
    },
    {
      label: 'WebSocket',
      prompt: 'Design WebSocket connection manager with reconnection logic and message queuing.',
      params: { includeReconnect: true, includeQueue: true, includeHeartbeat: true }
    },
    {
      label: 'API Testing',
      prompt: 'Generate API testing utilities with mock responses, error scenarios, and request/response logging.',
      params: { includeMocks: true, includeErrors: true, includeLogging: true }
    },
  ],
  styling: [
    {
      label: 'Theme System',
      prompt: 'Create a comprehensive theme system with colors, typography, spacing, and dark mode support.',
      params: { includeDarkMode: true, includeTypography: true, includeSpacing: true }
    },
    {
      label: 'Component Styles',
      prompt: 'Generate styled components library with buttons, inputs, cards, and animations.',
      params: { components: ['button', 'input', 'card'], includeAnimations: true }
    },
    {
      label: 'Responsive Design',
      prompt: 'Create responsive utilities for mobile, tablet, and desktop breakpoints.',
      params: { breakpoints: ['mobile', 'tablet', 'desktop'], includeHooks: true }
    },
    {
      label: 'Animation Library',
      prompt: 'Generate animation utilities with spring physics, transitions, and gesture animations.',
      params: { includeSpring: true, includeTransitions: true, includeGestures: true }
    },
  ],
  platform: [
    {
      label: 'iOS Features',
      prompt: 'Generate iOS-specific features: Face ID, Push Notifications, App Store integration, and iOS design guidelines.',
      params: { features: ['faceId', 'pushNotifications', 'appStore'], includeGuidelines: true }
    },
    {
      label: 'Android Features',
      prompt: 'Create Android-specific features: Fingerprint auth, Material Design, Play Store integration, and permissions handling.',
      params: { features: ['fingerprint', 'materialDesign', 'playStore'], includePermissions: true }
    },
    {
      label: 'Cross Platform',
      prompt: 'Design cross-platform features that work on both iOS and Android with platform detection.',
      params: { platform: 'both', includeDetection: true, includeFallbacks: true }
    },
    {
      label: 'Permissions Manager',
      prompt: 'Create a permissions manager for camera, location, contacts, and notifications with proper request flows.',
      params: { permissions: ['camera', 'location', 'contacts', 'notifications'], includeRationale: true }
    },
  ],
  code: [
    {
      label: 'Component Code',
      prompt: 'Generate complete React Native component code with TypeScript, props interface, and styling.',
      params: { language: 'typescript', includeTypes: true, includeStyles: true }
    },
    {
      label: 'Hook Creation',
      prompt: 'Create custom React hooks for common functionality like API calls, form handling, and animations.',
      params: { hookTypes: ['api', 'form', 'animation'], includeTypes: true }
    },
    {
      label: 'Utility Functions',
      prompt: 'Generate utility functions for date formatting, validation, encryption, and data transformation.',
      params: { utilities: ['date', 'validation', 'encryption', 'transform'], includeTests: false }
    },
    {
      label: 'Type Definitions',
      prompt: 'Generate TypeScript type definitions for API responses, component props, and state management.',
      params: { types: ['api', 'components', 'state'], includeGenerics: true }
    },
  ],
};

interface Node {
  id: string;
  name: string;
  type: string;
  styles: Record<string, any>;
  code?: string;
  platform?: 'ios' | 'android' | 'both';
  metadata?: Record<string, any>;
}

interface DraggedItem {
  id: string;
  source: 'library' | 'hierarchy';
  label?: string;
  [key: string]: any;
}

interface ScreenConfig {
  name: string;
  components: string[];
  navigation?: string;
  state?: string[];
}

interface NavigationFlow {
  routes: Array<{ name: string; screen: string; params?: any }>;
  type: 'stack' | 'tab' | 'drawer';
}

interface StateConfig {
  type: 'redux' | 'context' | 'zustand';
  slices?: string[];
  actions?: string[];
}

interface APIConfig {
  type: 'rest' | 'graphql' | 'websocket';
  endpoints?: Array<{ method: string; path: string; description: string }>;
  baseUrl?: string;
}

const ModuleA_Builder: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('screens');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('CONTENT_WRAPPER');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [codeAnalysis, setCodeAnalysis] = useState<string>('');
  const [deviceScale, setDeviceScale] = useState(0.85);
  const [viewMode, setViewMode] = useState<'blueprint' | 'render'>('render');
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet'>('mobile');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [editedCode, setEditedCode] = useState<string>('');

  // Section-specific states
  const [screenConfig, setScreenConfig] = useState<ScreenConfig>({ name: '', components: [] });
  const [navigationFlow, setNavigationFlow] = useState<NavigationFlow>({ routes: [], type: 'stack' });
  const [stateConfig, setStateConfig] = useState<StateConfig>({ type: 'redux', slices: [] });
  const [apiConfig, setApiConfig] = useState<APIConfig>({ type: 'rest', endpoints: [] });
  const [selectedPlatform, setSelectedPlatform] = useState<'ios' | 'android' | 'both'>('both');
  const [codeLanguage, setCodeLanguage] = useState<'typescript' | 'javascript'>('typescript');

  // Complete App Generation States
  const [completeAppPrompt, setCompleteAppPrompt] = useState<string>('');
  const [generatedApp, setGeneratedApp] = useState<any>(null);
  const [appPreviewMode, setAppPreviewMode] = useState<'code' | 'preview' | 'tree'>('preview');
  const [selectedScreen, setSelectedScreen] = useState<string | null>(null);

  const [appStructure, setAppStructure] = useState<Node[]>([
    { id: 'NAV_BAR', name: 'Global_Header_V4', type: 'component', styles: { padding: '20px', bg: 'glass' }, platform: 'both' },
    { id: 'CONTENT_WRAPPER', name: 'Main_Scroll_View', type: 'container', styles: { padding: '12px', bg: 'dark' }, platform: 'both' },
    { id: 'HERO_SLOT', name: 'Hero_Visual_Area', type: 'component', styles: { padding: '0px', bg: 'gradient' }, platform: 'both' },
    { id: 'TAB_BAR', name: 'Navigation_Root', type: 'component', styles: { padding: '15px', bg: 'black' }, platform: 'both' },
  ]);

  const selectedNode = appStructure.find(n => n.id === selectedNodeId);
  const currentTemplates = ADVANCED_PROMPT_TEMPLATES[activeSection as keyof typeof ADVANCED_PROMPT_TEMPLATES] || [];

  // DRAG AND DROP HANDLERS
  const onDragStart = (e: React.DragEvent, item: any, source: 'library' | 'hierarchy') => {
    setDraggedItem({ ...item, source });
    e.dataTransfer.setData('text/plain', item.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDropOnCanvas = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedItem) return;

    if (draggedItem.source === 'library') {
      // Add new component from library
      const newNode: Node = {
        id: `${draggedItem.id.toUpperCase()}_${Math.random().toString(36).substr(2, 6)}`,
        name: draggedItem.label || `New_${draggedItem.id}`,
        type: ['flex', 'grid', 'scroll', 'stack'].includes(draggedItem.id) ? 'container' : 'component',
        styles: { padding: '16px' },
        platform: selectedPlatform,
        code: '',
        components: []
      };

      setAppStructure([...appStructure, newNode]);
      setSelectedNodeId(newNode.id);

      const event = new CustomEvent('showToast', {
        detail: { message: `Added ${draggedItem.label}`, type: 'success' }
      });
      window.dispatchEvent(event);
    } else if (draggedItem.source === 'hierarchy') {
      // Reorder existing component
      // This is handled by onHierarchyDrop
    }

    setDraggedItem(null);
  };

  const onHierarchyDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const currentDragged = draggedItem;
    if (!currentDragged || currentDragged.source !== 'hierarchy') return;

    const items = [...appStructure];
    const draggedIdx = items.findIndex((item: Node) => item.id === currentDragged.id);
    if (draggedIdx === -1) return;

    const [reorderedItem] = items.splice(draggedIdx, 1);
    items.splice(targetIndex, 0, reorderedItem);

    setAppStructure(items);
    setDraggedItem(null);
  };

  // Generate Complete App Function - ENHANCED
  const handleGenerateCompleteApp = async () => {
    if (!completeAppPrompt.trim()) {
      const event = new CustomEvent('showToast', {
        detail: { message: 'Please enter an app description', type: 'warning' }
      });
      window.dispatchEvent(event);
      return;
    }

    setIsSynthesizing(true);
    setGeneratedApp(null);
    setGeneratedCode('');
    setSelectedScreen(null);

    try {
      console.log('🚀 Starting complete app generation...', { prompt: completeAppPrompt, platform: selectedPlatform });

      const event = new CustomEvent('showToast', {
        detail: { message: 'Connecting to Groq AI... Generating your app...', type: 'info' }
      });
      window.dispatchEvent(event);

      const appData = await groqService.generateCompleteApp(completeAppPrompt, selectedPlatform);

      console.log('✅ App data received:', appData);

      // Ensure we have valid data structure
      if (!appData) {
        throw new Error('No data received from Groq API');
      }

      // Set the generated app
      setGeneratedApp(appData);

      // Set the main code (prioritize mainCode, then code, then first screen code)
      let mainCode = appData.appStructure?.mainCode || appData.code ||
        (appData.screens && appData.screens.length > 0 ? appData.screens[0].code : '');

      // Detect app type for preview
      const appNameLower = (appData.appStructure?.appName || completeAppPrompt).toLowerCase();
      const promptLower = completeAppPrompt.toLowerCase();
      const isCalculator = /calculat/i.test(promptLower) || /calculat/i.test(appNameLower) ||
        appData.features?.some((f: string) => /calculat/i.test(f));
      const isChess = /chess/i.test(promptLower) || /chess/i.test(appNameLower);
      const isSnake = /snake/i.test(promptLower) || /snake/i.test(appNameLower) ||
        appData.features?.some((f: string) => /snake/i.test(f));

      // If it's a chess game and we don't have good code, generate a basic chess component
      if (isChess && (!mainCode || mainCode.length < 100)) {
        mainCode = `// React Native Chess Game Component
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ChessBoard = () => {
  const [board, setBoard] = useState([
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ]);
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);
  const [turn, setTurn] = useState<'white' | 'black'>('white');

  const getPieceSymbol = (piece: string) => {
    const symbols: { [key: string]: string } = {
      'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
      'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
    };
    return symbols[piece] || '';
  };

  const handleSquarePress = (row: number, col: number) => {
    if (selectedSquare) {
      const [fromRow, fromCol] = selectedSquare;
      const newBoard = [...board];
      newBoard[row][col] = newBoard[fromRow][fromCol];
      newBoard[fromRow][fromCol] = '';
      setBoard(newBoard);
      setSelectedSquare(null);
      setTurn(turn === 'white' ? 'black' : 'white');
    } else if (board[row][col]) {
      setSelectedSquare([row, col]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chess Game</Text>
      <Text style={styles.turn}>Turn: {turn}</Text>
      <View style={styles.board}>
        {board.map((row, rowIdx) =>
          row.map((piece, colIdx) => {
            const isLight = (rowIdx + colIdx) % 2 === 0;
            const isSelected = selectedSquare && selectedSquare[0] === rowIdx && selectedSquare[1] === colIdx;
            return (
              <TouchableOpacity
                key={\`\${rowIdx}-\${colIdx}\`}
                style={[
                  styles.square,
                  { backgroundColor: isLight ? '#f0d9b5' : '#b58863' },
                  isSelected && styles.selected
                ]}
                onPress={() => handleSquarePress(rowIdx, colIdx)}
              >
                {piece && <Text style={styles.piece}>{getPieceSymbol(piece)}</Text>}
              </TouchableOpacity>
            );
          })
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  turn: { fontSize: 16, marginBottom: 20 },
  board: { flexDirection: 'row', flexWrap: 'wrap', width: 320 },
  square: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  selected: { backgroundColor: '#ffff00' },
  piece: { fontSize: 30 }
});

export default ChessBoard;`;
      }

      setGeneratedCode(mainCode || '// Code generation in progress...');

      // Update app structure with screens
      if (appData.screens && appData.screens.length > 0) {
        setAppStructure(appData.screens.map((screen: any) => ({
          id: screen.id || `screen_${Math.random().toString(36).substr(2, 9)}`,
          name: screen.name || 'Unnamed Screen',
          type: 'screen',
          styles: {},
          platform: selectedPlatform,
          code: screen.code || '',
          components: screen.components || []
        })));

        // Select first screen for preview
        setSelectedScreen(appData.screens[0].id || appData.screens[0].name);
        setAppPreviewMode('preview');
      } else {
        // If no screens, create a default structure
        setAppStructure([{
          id: 'main_screen',
          name: appData.appStructure?.appName || 'Main Screen',
          type: 'screen',
          styles: {},
          platform: selectedPlatform,
          code: mainCode,
          components: appData.components || []
        }]);
        setSelectedScreen('main_screen');
      }

      console.log('✅ App structure updated:', {
        screens: appData.screens?.length || 0,
        components: appData.components?.length || 0,
        selectedScreen
      });

      const event2 = new CustomEvent('showToast', {
        detail: {
          message: `✅ App generated! ${appData.screens?.length || 0} screens created.`,
          type: 'success'
        }
      });
      window.dispatchEvent(event2);
    } catch (e: any) {
      console.error("❌ Complete App Generation Error:", e);
      console.error("Error details:", {
        message: e.message,
        stack: e.stack,
        response: e.response
      });

      const errorMessage = e.message || 'Failed to generate app. Please check your Groq API key and try again.';
      const event = new CustomEvent('showToast', {
        detail: { message: `❌ ${errorMessage}`, type: 'error' }
      });
      window.dispatchEvent(event);

      // Set error state
      setGeneratedCode(`// Error: ${errorMessage}\n\nPlease check:\n1. Groq API key is configured\n2. Internet connection\n3. Try again with a simpler prompt`);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleAiSynthesis = async (customPrompt?: string, templateParams?: any) => {
    const prompt = customPrompt || aiPrompt;
    if (!prompt) return;

    setIsSynthesizing(true);
    setGeneratedCode('');
    setCodeAnalysis('');

    try {
      let response = '';
      const params = templateParams || {};

      // Enhanced handling based on section with parameters
      switch (activeSection) {
        case 'screens':
          response = await groqService.generateMobileScreen(prompt, params.platform || selectedPlatform);
          setGeneratedCode(response);
          // Analyze code
          try {
            const analysis = await groqService.analyzeAndSuggest(response, 'Review this code and suggest improvements, best practices, and potential issues.');
            setCodeAnalysis(analysis);
          } catch (e) {
            console.log('Analysis skipped');
          }
          break;

        case 'navigation':
          response = await groqService.generateNavigationFlow(prompt);
          setGeneratedCode(response);
          // Parse navigation structure
          try {
            const navMatch = response.match(/routes?\s*[:=]\s*\[([\s\S]*?)\]/i);
            if (navMatch) {
              // Extract route information
              const routes = response.match(/(?:name|screen|route):\s*['"]([^'"]+)['"]/gi) || [];
              setNavigationFlow({
                routes: routes.map((r, i) => ({
                  name: r.match(/['"]([^'"]+)['"]/)?.[1] || `Route_${i}`,
                  screen: `Screen_${i}`,
                })),
                type: params.type || 'stack'
              });
            }
          } catch (e) {
            console.log('Navigation parsing skipped');
          }
          break;

        case 'state':
          response = await groqService.generateStateManagement(params.type || stateConfig.type, prompt);
          setGeneratedCode(response);
          // Extract state structure
          try {
            const slices = response.match(/(?:slice|reducer|store):\s*['"]([^'"]+)['"]/gi) || [];
            setStateConfig({
              type: params.type || stateConfig.type,
              slices: slices.map(s => s.match(/['"]([^'"]+)['"]/)?.[1] || '')
            });
          } catch (e) {
            console.log('State parsing skipped');
          }
          break;

        case 'api':
          response = await groqService.generateAPIIntegration(params.type || apiConfig.type, prompt);
          setGeneratedCode(response);
          // Extract endpoints
          try {
            const endpoints = response.match(/(?:GET|POST|PUT|DELETE|PATCH)\s+['"]([^'"]+)['"]/gi) || [];
            setApiConfig({
              type: params.type || apiConfig.type,
              endpoints: endpoints.map(e => {
                const method = e.match(/(GET|POST|PUT|DELETE|PATCH)/)?.[1] || 'GET';
                const path = e.match(/['"]([^'"]+)['"]/)?.[1] || '';
                return { method, path, description: `${method} ${path}` };
              })
            });
          } catch (e) {
            console.log('API parsing skipped');
          }
          break;

        case 'styling':
          response = await groqService.generateStylingSystem(prompt);
          setGeneratedCode(response);
          break;

        case 'platform':
          const features = params.features || ['basic'];
          response = await groqService.generatePlatformFeatures(params.platform || selectedPlatform, features);
          setGeneratedCode(response);
          break;

        case 'code':
          response = await groqService.generateCode(prompt, codeLanguage);
          setGeneratedCode(response);
          setEditedCode(response);
          // Code analysis
          try {
            const analysis = await groqService.analyzeAndSuggest(response, 'Review this code for best practices, performance, and potential bugs.');
            setCodeAnalysis(analysis);
          } catch (e) {
            console.log('Analysis skipped');
          }
          break;

        default:
          response = await groqService.generateResponse([
            {
              role: 'system',
              content: `You are an expert mobile app developer specializing in ${activeSection}. Provide detailed, actionable guidance and code examples with best practices.`
            },
            {
              role: 'user',
              content: prompt
            }
          ], 'llama-3.1-70b-versatile', 0.7, 3072);
          setGeneratedCode(response);
      }

      if (!customPrompt) setAiPrompt('');

      const event = new CustomEvent('showToast', {
        detail: { message: 'AI generation completed!', type: 'success' }
      });
      window.dispatchEvent(event);
    } catch (e: any) {
      console.error("AI Synthesis Error:", e);
      const event = new CustomEvent('showToast', {
        detail: { message: `AI Error: ${e.message}`, type: 'error' }
      });
      window.dispatchEvent(event);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleTemplateClick = (template: any) => {
    setSelectedTemplate(template.label);
    setAiPrompt(template.prompt);
    handleAiSynthesis(template.prompt, template.params);
  };

  const deleteNode = (id: string) => {
    setAppStructure(prev => prev.filter(n => n.id !== id));
    if (selectedNodeId === id) setSelectedNodeId(appStructure[0]?.id || '');
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    const event = new CustomEvent('showToast', {
      detail: { message: 'Code copied to clipboard!', type: 'success' }
    });
    window.dispatchEvent(event);
  };

  const exportCode = (format: 'tsx' | 'jsx' | 'json' | 'zip') => {
    const code = editedCode || generatedCode;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated_code.${format}`;
    a.click();
    URL.revokeObjectURL(url);

    const event = new CustomEvent('showToast', {
      detail: { message: `Code exported as ${format}!`, type: 'success' }
    });
    window.dispatchEvent(event);
  };

  const optimizeCode = async () => {
    if (!generatedCode) return;
    setIsSynthesizing(true);
    try {
      const optimized = await groqService.analyzeAndSuggest(
        generatedCode,
        'Optimize this code for performance, reduce bundle size, improve readability, and follow best practices. Provide the optimized version.'
      );
      setGeneratedCode(optimized);
      setEditedCode(optimized);

      const event = new CustomEvent('showToast', {
        detail: { message: 'Code optimized!', type: 'success' }
      });
      window.dispatchEvent(event);
    } catch (e: any) {
      const event = new CustomEvent('showToast', {
        detail: { message: `Optimization failed: ${e.message}`, type: 'error' }
      });
      window.dispatchEvent(event);
    } finally {
      setIsSynthesizing(false);
    }
  };

  // Render Section-Specific Advanced UI
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'screens':
        return (
          <FuturisticCard title="SCREENS" accentColor={COLORS.cyan} className="p-0 overflow-hidden">
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[8px] font-black uppercase text-white/40 mb-1 block">Screen Name</label>
                  <input
                    type="text"
                    value={screenConfig.name}
                    onChange={(e) => setScreenConfig({ ...screenConfig, name: e.target.value })}
                    className="w-full bg-black border border-white/10 p-2 text-xs font-mono text-white outline-none focus:border-cyan-500/40 rounded"
                    placeholder="LoginScreen"
                  />
                </div>
                <div>
                  <label className="text-[8px] font-black uppercase text-white/40 mb-1 block">Platform</label>
                  <div className="flex gap-1">
                    {['ios', 'android', 'both'].map((p) => (
                      <button
                        key={p}
                        onClick={() => setSelectedPlatform(p as any)}
                        className={`flex-1 px-2 py-1.5 border text-[8px] font-black uppercase transition-all ${selectedPlatform === p
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-white'
                          : 'border-white/5 text-white/30 hover:text-white'
                          }`}
                      >
                        {p === 'both' ? 'BOTH' : p.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FuturisticCard>
        );

      case 'navigation':
        return (
          <div className="space-y-6">
            <FuturisticCard title="NAVIGATION_FLOW_BUILDER" accentColor={COLORS.blue}>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2 block">Navigation Type</label>
                    <div className="flex flex-col gap-2">
                      {['stack', 'tab', 'drawer'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setNavigationFlow({ ...navigationFlow, type: type as any })}
                          className={`px-4 py-2 border text-[9px] font-black uppercase transition-all text-left ${navigationFlow.type === type
                            ? 'bg-blue-500/10 border-blue-500/30 text-white'
                            : 'border-white/5 text-white/30 hover:text-white'
                            }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2 block">Routes</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto custom-scroll">
                      {navigationFlow.routes.map((route, idx) => (
                        <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded-sm flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Navigation size={14} className="text-blue-400" />
                            <div>
                              <div className="text-[10px] font-mono text-white/80">{route.name}</div>
                              <div className="text-[8px] font-mono text-white/30">{route.screen}</div>
                            </div>
                          </div>
                          <X size={12} className="text-white/30 hover:text-white cursor-pointer" onClick={() => {
                            setNavigationFlow({
                              ...navigationFlow,
                              routes: navigationFlow.routes.filter((_, i) => i !== idx)
                            });
                          }} />
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const name = prompt('Route name:');
                          const screen = prompt('Screen component:');
                          if (name && screen) {
                            setNavigationFlow({
                              ...navigationFlow,
                              routes: [...navigationFlow.routes, { name, screen }]
                            });
                          }
                        }}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 hover:border-blue-500/30 text-[9px] font-black uppercase text-white/40 hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        <Plus size={12} /> Add Route
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </FuturisticCard>
          </div>
        );

      case 'state':
        return (
          <div className="space-y-6">
            <FuturisticCard title="STATE_MANAGEMENT_CONFIG" accentColor={COLORS.green}>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2 block">State Type</label>
                    <div className="flex flex-col gap-2">
                      {['redux', 'context', 'zustand'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setStateConfig({ ...stateConfig, type: type as any })}
                          className={`px-4 py-2 border text-[9px] font-black uppercase transition-all text-left ${stateConfig.type === type
                            ? 'bg-green-500/10 border-green-500/30 text-white'
                            : 'border-white/5 text-white/30 hover:text-white'
                            }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2 block">Slices/Stores</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto custom-scroll">
                      {(stateConfig.slices || []).map((slice, idx) => (
                        <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded-sm flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Database size={14} className="text-green-400" />
                            <span className="text-[10px] font-mono text-white/80">{slice}</span>
                          </div>
                          <X size={12} className="text-white/30 hover:text-white cursor-pointer" onClick={() => {
                            setStateConfig({
                              ...stateConfig,
                              slices: (stateConfig.slices || []).filter((_, i) => i !== idx)
                            });
                          }} />
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const slice = prompt('Slice/Store name:');
                          if (slice) {
                            setStateConfig({
                              ...stateConfig,
                              slices: [...(stateConfig.slices || []), slice]
                            });
                          }
                        }}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 hover:border-green-500/30 text-[9px] font-black uppercase text-white/40 hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        <Plus size={12} /> Add Slice
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </FuturisticCard>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-6">
            <FuturisticCard title="API_CLIENT_CONFIG" accentColor={COLORS.cyan}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2 block">API Type</label>
                    <div className="flex flex-col gap-2">
                      {['rest', 'graphql', 'websocket'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setApiConfig({ ...apiConfig, type: type as any })}
                          className={`px-4 py-2 border text-[9px] font-black uppercase transition-all text-left ${apiConfig.type === type
                            ? 'bg-cyan-500/10 border-cyan-500/30 text-white'
                            : 'border-white/5 text-white/30 hover:text-white'
                            }`}
                        >
                          {type.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2 block">Base URL</label>
                    <input
                      type="text"
                      value={apiConfig.baseUrl || ''}
                      onChange={(e) => setApiConfig({ ...apiConfig, baseUrl: e.target.value })}
                      className="w-full bg-black border border-white/10 p-3 text-[11px] font-mono text-white outline-none focus:border-cyan-500/40 rounded-sm"
                      placeholder="https://api.example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2 block">Endpoints</label>
                  <div className="space-y-2 max-h-64 overflow-y-auto custom-scroll">
                    {(apiConfig.endpoints || []).map((endpoint, idx) => (
                      <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`px-2 py-1 text-[8px] font-black rounded-sm ${endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400' :
                            endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                            {endpoint.method}
                          </div>
                          <span className="text-[10px] font-mono text-white/80">{endpoint.path}</span>
                        </div>
                        <X size={12} className="text-white/30 hover:text-white cursor-pointer" onClick={() => {
                          setApiConfig({
                            ...apiConfig,
                            endpoints: (apiConfig.endpoints || []).filter((_, i) => i !== idx)
                          });
                        }} />
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const method = prompt('Method (GET/POST/PUT/DELETE):')?.toUpperCase() || 'GET';
                        const path = prompt('Path:') || '/api/endpoint';
                        if (path) {
                          setApiConfig({
                            ...apiConfig,
                            endpoints: [...(apiConfig.endpoints || []), { method, path, description: `${method} ${path}` }]
                          });
                        }
                      }}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 hover:border-cyan-500/30 text-[9px] font-black uppercase text-white/40 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <Plus size={12} /> Add Endpoint
                    </button>
                  </div>
                </div>
              </div>
            </FuturisticCard>
          </div>
        );

      case 'styling':
        return (
          <div className="space-y-6">
            <FuturisticCard title="THEME_EDITOR" accentColor={COLORS.blue}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2 block">Primary Color</label>
                    <div className="flex gap-2">
                      <input type="color" defaultValue="#00F6FF" className="w-16 h-10 border border-white/10 rounded-sm" />
                      <input type="text" defaultValue="#00F6FF" className="flex-1 bg-black border border-white/10 p-2 text-[10px] font-mono text-white outline-none focus:border-blue-500/40 rounded-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2 block">Dark Mode</label>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-5 bg-white/10 border border-white/20 rounded-full flex items-center p-0.5">
                        <div className="w-4 h-4 bg-white rounded-full transition-transform translate-x-5" />
                      </div>
                      <span className="text-[9px] font-mono text-white/60">Enabled</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2 block">Typography Scale</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['xs', 'sm', 'md', 'lg'].map((size) => (
                      <div key={size} className="p-2 bg-white/5 border border-white/10 rounded-sm text-center">
                        <div className="text-[8px] font-mono text-white/40 uppercase mb-1">{size}</div>
                        <div className="text-[10px] font-black text-white">Aa</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FuturisticCard>
          </div>
        );

      case 'platform':
        return (
          <div className="space-y-6">
            <FuturisticCard title="PLATFORM_FEATURES_MANAGER" accentColor={COLORS.green}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2 block">Target Platform</label>
                    <div className="flex flex-col gap-2">
                      {['ios', 'android', 'both'].map((p) => (
                        <button
                          key={p}
                          onClick={() => setSelectedPlatform(p as any)}
                          className={`px-4 py-2 border text-[9px] font-black uppercase transition-all text-left ${selectedPlatform === p
                            ? 'bg-green-500/10 border-green-500/30 text-white'
                            : 'border-white/5 text-white/30 hover:text-white'
                            }`}
                        >
                          {p === 'both' ? 'Cross-Platform' : p.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-2 block">Features</label>
                    <div className="space-y-2">
                      {[
                        { name: 'Biometric Auth', icon: Fingerprint, enabled: true },
                        { name: 'Push Notifications', icon: Bell, enabled: true },
                        { name: 'Camera Access', icon: Camera, enabled: false },
                        { name: 'Location Services', icon: MapPin, enabled: false },
                      ].map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-white/5 border border-white/10 rounded-sm">
                          <div className="flex items-center gap-2">
                            <feature.icon size={14} className="text-green-400" />
                            <span className="text-[9px] font-mono text-white/70">{feature.name}</span>
                          </div>
                          <div className={`w-8 h-4 rounded-full flex items-center p-0.5 transition-all ${feature.enabled ? 'bg-green-500/20 border border-green-500/30' : 'bg-black border border-white/10'
                            }`}>
                            <div className={`w-3 h-3 rounded-full transition-all ${feature.enabled ? 'translate-x-4 bg-green-400' : 'bg-white/10'
                              }`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FuturisticCard>
          </div>
        );

      case 'code':
        return (
          <div className="space-y-6">
            <FuturisticCard title="CODE_EDITOR" accentColor={COLORS.cyan}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCodeLanguage('typescript')}
                      className={`px-3 py-1.5 border text-[9px] font-black uppercase transition-all ${codeLanguage === 'typescript'
                        ? 'bg-cyan-500/10 border-cyan-500/30 text-white'
                        : 'border-white/5 text-white/30'
                        }`}
                    >
                      TS
                    </button>
                    <button
                      onClick={() => setCodeLanguage('javascript')}
                      className={`px-3 py-1.5 border text-[9px] font-black uppercase transition-all ${codeLanguage === 'javascript'
                        ? 'bg-cyan-500/10 border-cyan-500/30 text-white'
                        : 'border-white/5 text-white/30'
                        }`}
                    >
                      JS
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={optimizeCode}
                      disabled={!generatedCode || isSynthesizing}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-cyan-500/30 text-[9px] font-black uppercase text-white/40 hover:text-white transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      <Wand2 size={12} /> Optimize
                    </button>
                    <button
                      onClick={() => setShowCodeEditor(!showCodeEditor)}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 hover:border-cyan-500/30 text-[9px] font-black uppercase text-white/40 hover:text-white transition-all flex items-center gap-2"
                    >
                      <Edit size={12} /> {showCodeEditor ? 'Hide' : 'Edit'}
                    </button>
                  </div>
                </div>
                {showCodeEditor && (
                  <textarea
                    value={editedCode}
                    onChange={(e) => setEditedCode(e.target.value)}
                    className="w-full h-64 bg-black border border-white/10 p-4 text-[11px] font-mono text-white outline-none focus:border-cyan-500/40 rounded-sm resize-none"
                    placeholder="Edit generated code here..."
                  />
                )}
              </div>
            </FuturisticCard>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1700px] mx-auto animate-in fade-in duration-1000 pb-20">

      {/* VS CODE/CURSOR STYLE INTERFACE - ENHANCED & RESPONSIVE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 min-h-[600px] lg:h-[calc(100vh-200px)]">
        {/* LEFT: CODE EDITOR (7 columns) - RESPONSIVE */}
        <div className="lg:col-span-7 flex flex-col bg-[#1e1e1e] border border-white/10 rounded-lg overflow-hidden shadow-xl">
          {/* VS Code Header */}
          <div className="bg-[#252526] border-b border-white/5 px-3 sm:px-4 py-2 flex items-center gap-2 shrink-0">
            <div className="flex gap-1.5 shrink-0">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></div>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="flex-1 text-center min-w-0">
              <span className="text-[9px] sm:text-[10px] font-mono text-white/60 truncate">AI_APP_ARCHITECT.tsx</span>
            </div>
            <div className="shrink-0 text-[8px] font-mono text-green-400/60 hidden sm:block">llama-3.3-70b</div>
          </div>

          {/* Terminal/Prompt Area */}
          <div className="flex-1 flex flex-col bg-[#1e1e1e] min-h-0">
            <div className="bg-[#252526] px-3 sm:px-4 py-2 border-b border-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-green-400 shrink-0" />
                <span className="text-[10px] sm:text-xs font-mono text-green-400">Terminal</span>
                <span className="text-[9px] sm:text-xs font-mono text-white/40 hidden sm:inline">Groq AI</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isSynthesizing ? 'bg-green-500 animate-pulse' : 'bg-white/20'}`}></div>
                <span className="text-[8px] font-mono text-white/40">{isSynthesizing ? 'Processing' : 'Ready'}</span>
              </div>
            </div>

            {/* Prompt Input - ENHANCED */}
            <div className="p-3 sm:p-4 space-y-3 shrink-0 border-b border-white/5">
              <div className="flex items-start gap-2">
                <span className="text-green-400 font-mono text-xs sm:text-sm mt-1 shrink-0">$</span>
                <textarea
                  value={completeAppPrompt}
                  onChange={(e) => setCompleteAppPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      handleGenerateCompleteApp();
                    }
                  }}
                  className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm font-mono text-white resize-none focus:ring-0 placeholder:text-white/30 min-h-[60px] sm:min-h-[80px]"
                  placeholder='groq> Create a chess mobile game with board, piece movement, turn management...'
                  rows={3}
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleGenerateCompleteApp}
                  disabled={isSynthesizing || !completeAppPrompt.trim()}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white text-[10px] sm:text-xs font-mono rounded shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all active:scale-95"
                >
                  {isSynthesizing ? (
                    <>
                      <Loader2 className="animate-spin" size={12} />
                      <span className="hidden sm:inline">Generating...</span>
                      <span className="sm:hidden">...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={12} />
                      <span>Execute</span>
                    </>
                  )}
                </button>
                <div className="flex gap-1">
                  {['ios', 'android', 'both'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setSelectedPlatform(p as any)}
                      className={`px-2 py-1 text-[9px] sm:text-[10px] font-mono rounded transition-all ${selectedPlatform === p
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                    >
                      {p === 'both' ? 'BOTH' : p.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Code Output - ENHANCED WITH SYNTAX HIGHLIGHTING */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-[#1e1e1e] min-h-0">
              {isSynthesizing ? (
                <div className="space-y-2 animate-pulse">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                    <div className="text-green-400 font-mono text-[10px] sm:text-xs">$ Connecting to Groq API...</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                    <div className="text-green-400 font-mono text-[10px] sm:text-xs">$ Generating code...</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></div>
                    <div className="text-yellow-400 font-mono text-[10px] sm:text-xs">$ Processing...</div>
                  </div>
                </div>
              ) : generatedCode ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                    <div className="text-green-400 font-mono text-[10px] sm:text-xs">$ Code generated successfully!</div>
                  </div>
                  <div className="relative">
                    <pre className="text-[9px] sm:text-xs font-mono text-white/90 bg-[#252526] p-3 sm:p-4 rounded-lg border border-white/10 overflow-x-auto shadow-inner">
                      <code className="block whitespace-pre-wrap break-words">{generatedCode}</code>
                    </pre>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedCode);
                        const event = new CustomEvent('showToast', {
                          detail: { message: 'Code copied!', type: 'success' }
                        });
                        window.dispatchEvent(event);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-white/10 hover:bg-white/20 rounded text-white/60 hover:text-white transition-all"
                      title="Copy code"
                    >
                      <Copy size={12} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-white/40 font-mono text-[10px] sm:text-xs leading-relaxed">
                  <div className="mb-2">// Enter a prompt above and press Ctrl+Enter or click Execute</div>
                  <div className="text-white/20 text-[9px]">// Example: "Create a chess mobile game"</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: MOBILE PREVIEW (5 columns) - RESPONSIVE */}
        <div className="lg:col-span-5 flex flex-col bg-[#1e1e1e] border border-white/10 rounded-lg overflow-hidden shadow-xl">
          {/* Mobile Preview Header */}
          <div className="bg-[#252526] px-3 sm:px-4 py-2 border-b border-white/5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Smartphone size={12} className="text-cyan-400" />
              <span className="text-[10px] sm:text-xs font-mono text-cyan-400">Mobile Preview</span>
            </div>
            <div className="text-[8px] font-mono text-white/40">{selectedPlatform.toUpperCase()}</div>
          </div>

          {/* Mobile Device Frame - PROPERLY CENTERED */}
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-[radial-gradient(#111_1px,transparent_1px)] bg-[size:20px_20px] min-h-[400px] lg:min-h-0">
            <div className="relative w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[200px] xl:max-w-[280px] h-[520px] sm:h-[600px] lg:h-[500px] xl:h-[560px] border-[10px] sm:border-[12px] border-[#0a0a0a] rounded-[36px] sm:rounded-[44px] bg-black overflow-hidden shadow-2xl mx-auto flex-shrink-0">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-5 sm:h-6 bg-[#0a0a0a] rounded-b-xl sm:rounded-b-2xl z-50"></div>

              {/* Mobile Screen Content - DRAG & DROP */}
              <div
                className={`h-full pt-10 sm:pt-12 pb-3 sm:pb-4 overflow-y-auto bg-gradient-to-b from-zinc-900 to-black custom-scroll transition-all ${draggedItem ? 'ring-2 ring-cyan-500/30' : ''
                  }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                }}
                onDrop={onDropOnCanvas}
              >
                {isSynthesizing ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-4 px-4">
                    <Loader2 className="animate-spin text-cyan-400" size={40} />
                    <div className="text-center">
                      <div className="text-base sm:text-lg font-black text-white mb-2">Generating...</div>
                      <div className="text-xs sm:text-sm font-mono text-white/60">Creating app</div>
                    </div>
                  </div>
                ) : generatedApp ? (
                  (() => {
                    const appNameLower = (generatedApp.appStructure?.appName || completeAppPrompt).toLowerCase();
                    const promptLower = completeAppPrompt.toLowerCase();

                    // Detect specific game/app types
                    const isCalculator = /calculat/i.test(promptLower) || /calculat/i.test(appNameLower) ||
                      generatedApp.features?.some((f: string) => /calculat/i.test(f));
                    const isChess = /chess/i.test(promptLower) || /chess/i.test(appNameLower);
                    const isSnake = /snake/i.test(promptLower) || /snake/i.test(appNameLower) ||
                      generatedApp.features?.some((f: string) => /snake/i.test(f));

                    // Use specialized previews for known games/apps
                    if (isChess) {
                      return <ChessGamePreview code={generatedCode} isGenerating={false} />;
                    } else if (isCalculator) {
                      return <CalculatorPreview code={generatedCode} isGenerating={false} />;
                    } else if (isSnake) {
                      return <SnakeGamePreview code={generatedCode} isGenerating={false} />;
                    } else {
                      // Use dynamic renderer for all other apps
                      return (
                        <DynamicAppPreview
                          screens={generatedApp.screens || []}
                          selectedScreenId={selectedScreen}
                          appName={generatedApp.appStructure?.appName || 'Generated App'}
                          onScreenSelect={(screenId) => setSelectedScreen(screenId)}
                        />
                      );
                    }
                  })()
                ) : appStructure.length > 4 ? (
                  // Show dragged components
                  <div className="p-2 sm:p-3 space-y-2">
                    {appStructure.slice(4).map((node) => (
                      <div
                        key={node.id}
                        draggable
                        onDragStart={(e) => onDragStart(e, node, 'hierarchy')}
                        className="p-2 bg-white/5 border border-white/10 rounded-lg cursor-move hover:border-cyan-500/30 transition-all"
                      >
                        <div className="text-[9px] font-mono text-cyan-400 mb-0.5">{node.type}</div>
                        <div className="text-xs text-white">{node.name}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`flex flex-col items-center justify-center h-full text-center p-4 sm:p-6 transition-all ${draggedItem ? 'border-2 border-dashed border-cyan-500/50 rounded-lg m-2' : ''}`}>
                    <div className="flex flex-col items-center justify-center">
                      <Smartphone size={40} className="text-white/20 mb-4" />
                      <div className="text-white/50 text-sm font-mono mb-1">Mobile Preview</div>
                      <div className="text-white/30 text-xs font-mono">
                        {draggedItem ? 'Drop component here' : 'Drag components from sidebar'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COMPACT PREMIUM HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 border-b border-white/5 pb-3 sm:pb-4">
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
            <span className="text-xs sm:text-sm font-black font-mono">GROQ_AI</span>
            <span className="text-[9px] font-mono text-white/40 hidden sm:inline">{appStructure.length} nodes</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const code = generatedCode || editedCode;
              if (code) {
                const blob = new Blob([code], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `app_${Date.now()}.${codeLanguage === 'typescript' ? 'tsx' : 'jsx'}`;
                a.click();
                URL.revokeObjectURL(url);
              }
            }}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-black text-[9px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-lg flex items-center gap-2"
            disabled={!generatedCode}
          >
            <Download size={12} />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* COMPACT DEVELOPMENT TABS */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 border-b border-white/5 pb-3 sm:pb-4 overflow-x-auto">
        {DEV_SECTIONS.map((section) => {
          const SectionIcon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                setGeneratedCode('');
                setSelectedTemplate(null);
                setCodeAnalysis('');
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 border transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 ${activeSection === section.id
                ? 'bg-white text-black border-white shadow-md'
                : 'border-white/10 text-white/40 hover:text-white hover:border-white/20'
                }`}
            >
              <SectionIcon size={12} className="sm:w-3.5 sm:h-3.5" />
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest whitespace-nowrap">{section.label}</span>
            </button>
          );
        })}
      </div>

      {/* COMPACT MAIN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 min-h-[500px]">

        {/* LEFT: COMPACT SIDEBAR (3 columns) */}
        <div className="lg:col-span-3 flex flex-col gap-3 sm:gap-4 order-2 lg:order-1">
          {/* Unified Explorer & Components */}
          <FuturisticCard title="BUILDER" accentColor={COLORS.cyan} className="flex-1 p-0 flex flex-col overflow-hidden min-h-[400px]">
            {/* Tabs for Explorer/Components */}
            <div className="flex border-b border-white/5">
              <button className="flex-1 px-3 py-2 text-[9px] font-black uppercase bg-white/5 border-r border-white/5">Explorer</button>
              <button className="flex-1 px-3 py-2 text-[9px] font-black uppercase text-white/40 hover:text-white">Components</button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scroll p-2 sm:p-3 space-y-1">
              {/* Project Structure */}
              <div className="mb-3">
                <div className="text-[8px] font-black text-white/30 uppercase mb-2 px-2">Project</div>
                {appStructure.map((node, idx) => (
                  <div
                    key={node.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, node, 'hierarchy')}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => onHierarchyDrop(e, idx)}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`group flex items-center gap-2 px-2 py-1.5 rounded transition-all cursor-pointer text-[9px] font-mono ${selectedNodeId === node.id
                      ? 'bg-cyan-500/10 text-white border-l-2 border-cyan-500'
                      : 'text-white/50 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    <GripVertical size={10} className="text-white/10 group-hover:text-white/30 cursor-grab" />
                    <span className="truncate flex-1">{node.name}</span>
                    <Trash2
                      size={9}
                      className="text-white/0 group-hover:text-red-400 transition-all"
                      onClick={(e) => { e.stopPropagation(); deleteNode(node.id); }}
                    />
                  </div>
                ))}
              </div>

              {/* Component Library - Compact Grid */}
              <div className="border-t border-white/5 pt-3">
                <div className="text-[8px] font-black text-white/30 uppercase mb-2 px-2">Components</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {componentLibrary.flatMap(group => group.items).slice(0, 12).map(item => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => onDragStart(e, item, 'library')}
                      className="p-2 bg-white/5 border border-white/5 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all cursor-grab active:cursor-grabbing rounded flex flex-col items-center text-center group/item"
                      title={item.label}
                    >
                      <item.icon size={12} className="text-white/30 group-hover/item:text-cyan-400 mb-1" />
                      <span className="text-[7px] font-bold text-white/40 truncate w-full">{item.label.split('_')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FuturisticCard>

          {/* Compact AI Templates */}
          <FuturisticCard title="TEMPLATES" accentColor={COLORS.green} className="h-48 sm:h-56 shrink-0 p-0 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto custom-scroll p-2 sm:p-3 space-y-1.5">
              {currentTemplates.slice(0, 4).map((template, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTemplateClick(template)}
                  disabled={isSynthesizing}
                  className={`w-full text-left p-2 border rounded transition-all text-[8px] font-mono ${selectedTemplate === template.label
                    ? 'bg-green-500/10 border-green-500/30 text-white'
                    : 'border-white/5 text-white/40 hover:border-green-500/20 hover:text-white hover:bg-white/5'
                    } disabled:opacity-50`}
                >
                  <div className="font-black uppercase mb-0.5">{template.label}</div>
                  <div className="text-white/30 line-clamp-1">{template.prompt.substring(0, 40)}...</div>
                </button>
              ))}
            </div>
          </FuturisticCard>
        </div>

        {/* CENTER: SECTION UI ONLY (6 columns) - REMOVED DUPLICATE GROQ SECTION */}
        <div className="lg:col-span-6 flex flex-col gap-3 sm:gap-4 order-1 lg:order-2">
          {/* Section-Specific UI */}
          {renderSectionContent()}

          {/* Generated Code Display - ENHANCED */}
          {generatedCode && (
            <FuturisticCard title="CODE" accentColor={COLORS.green} className="p-0 overflow-hidden max-h-[400px] flex flex-col">
              <div className="p-3 sm:p-4 bg-white/5 border-b border-white/10 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <Code2 size={12} className="text-green-400" />
                  <span className="text-[9px] font-black uppercase text-green-400">{codeLanguage.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyCode(editedCode || generatedCode)}
                    className="p-1.5 bg-white/5 border border-white/10 hover:border-green-500/40 text-white/60 hover:text-white transition-all rounded"
                    title="Copy"
                  >
                    <Copy size={12} />
                  </button>
                  <button
                    onClick={() => setShowCodeEditor(!showCodeEditor)}
                    className="p-1.5 bg-white/5 border border-white/10 hover:border-green-500/40 text-white/60 hover:text-white transition-all rounded"
                    title="Edit"
                  >
                    <Edit size={12} />
                  </button>
                  <div className="relative group/export">
                    <button className="p-1.5 bg-white/5 border border-white/10 hover:border-green-500/40 text-white/60 hover:text-white transition-all rounded">
                      <Download size={12} />
                    </button>
                    <div className="absolute top-full right-0 mt-1 bg-black border border-white/10 p-1 space-y-1 opacity-0 group-hover/export:opacity-100 pointer-events-none group-hover/export:pointer-events-auto transition-opacity z-50 min-w-[80px]">
                      <button onClick={() => exportCode('tsx')} className="block w-full text-left px-2 py-1 text-[8px] font-mono text-white/60 hover:text-white hover:bg-white/5">.tsx</button>
                      <button onClick={() => exportCode('jsx')} className="block w-full text-left px-2 py-1 text-[8px] font-mono text-white/60 hover:text-white hover:bg-white/5">.jsx</button>
                      <button onClick={() => exportCode('json')} className="block w-full text-left px-2 py-1 text-[8px] font-mono text-white/60 hover:text-white hover:bg-white/5">.json</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto custom-scroll p-3 sm:p-4 bg-[#0a0a0a] min-h-[200px] relative">
                {showCodeEditor ? (
                  <textarea
                    value={editedCode || generatedCode}
                    onChange={(e) => setEditedCode(e.target.value)}
                    className="w-full h-full min-h-[300px] bg-transparent border-none outline-none text-xs font-mono text-white resize-none focus:ring-0"
                    placeholder="Edit your code here..."
                  />
                ) : (
                  <div className="relative">
                    {/* Line numbers - only show if code exists */}
                    {(editedCode || generatedCode) && (
                      <div className="absolute left-0 top-0 text-[9px] sm:text-[10px] font-mono text-white/20 select-none pointer-events-none pr-3 border-r border-white/5 leading-relaxed">
                        {(editedCode || generatedCode).split('\n').map((_, i) => (
                          <div key={i} className="leading-relaxed">{i + 1}</div>
                        ))}
                      </div>
                    )}
                    <pre className={`text-[10px] sm:text-xs font-mono text-white/90 whitespace-pre-wrap break-words leading-relaxed ${(editedCode || generatedCode) ? 'pl-8 sm:pl-10' : ''}`}>
                      <code className="block">{(editedCode || generatedCode) || '// No code generated yet'}</code>
                    </pre>
                  </div>
                )}
              </div>
            </FuturisticCard>
          )}
        </div>
      </div>

    </div>
  );
};

export default ModuleA_Builder;

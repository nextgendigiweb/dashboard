
export type ColorAccent = 'cyan' | 'green' | 'blue' | 'gray';

export interface KPI {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
}

export interface DeploymentLog {
  id: string;
  timestamp: string;
  level: 'info' | 'error' | 'success';
  message: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'update' | 'warning';
  read: boolean;
  time: string;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
}

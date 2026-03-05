export interface TeamMember {
  [key: string]: unknown;
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'away' | 'offline';
  avatar: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  progress: number;
  team: string[];
  dueDate: string;
}

export interface DashboardStat {
  label: string;
  value: string;
  trend: number;
  trendLabel: string;
  icon: string;
}

export interface ActivityItem {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  { id: 1, name: 'Sarah Chen', email: 'sarah.chen@acme.io', role: 'Engineering Lead', department: 'Engineering', status: 'active', avatar: '' },
  { id: 2, name: 'Marcus Johnson', email: 'marcus.j@acme.io', role: 'Senior Designer', department: 'Design', status: 'active', avatar: '' },
  { id: 3, name: 'Aisha Patel', email: 'aisha.p@acme.io', role: 'Product Manager', department: 'Product', status: 'away', avatar: '' },
  { id: 4, name: 'David Kim', email: 'david.k@acme.io', role: 'Frontend Developer', department: 'Engineering', status: 'active', avatar: '' },
  { id: 5, name: 'Elena Volkov', email: 'elena.v@acme.io', role: 'Backend Developer', department: 'Engineering', status: 'offline', avatar: '' },
  { id: 6, name: 'James Wright', email: 'james.w@acme.io', role: 'QA Engineer', department: 'Engineering', status: 'active', avatar: '' },
  { id: 7, name: 'Maria Santos', email: 'maria.s@acme.io', role: 'UX Researcher', department: 'Design', status: 'active', avatar: '' },
  { id: 8, name: 'Alex Nguyen', email: 'alex.n@acme.io', role: 'DevOps Engineer', department: 'Engineering', status: 'away', avatar: '' },
  { id: 9, name: 'Olivia Brown', email: 'olivia.b@acme.io', role: 'Marketing Lead', department: 'Marketing', status: 'active', avatar: '' },
  { id: 10, name: 'Raj Mehta', email: 'raj.m@acme.io', role: 'Data Analyst', department: 'Analytics', status: 'active', avatar: '' },
  { id: 11, name: 'Lisa Tanaka', email: 'lisa.t@acme.io', role: 'Content Strategist', department: 'Marketing', status: 'offline', avatar: '' },
  { id: 12, name: 'Carlos Rivera', email: 'carlos.r@acme.io', role: 'Full Stack Developer', department: 'Engineering', status: 'active', avatar: '' },
];

export const PROJECTS: Project[] = [
  { id: 1, name: 'Platform Redesign', description: 'Complete UI/UX overhaul of the main platform with new design system', status: 'in-progress', progress: 68, team: ['Sarah Chen', 'Marcus Johnson', 'David Kim'], dueDate: '2026-04-15' },
  { id: 2, name: 'API v3 Migration', description: 'Migrate all services to the new REST API v3 with GraphQL support', status: 'in-progress', progress: 42, team: ['Elena Volkov', 'Alex Nguyen', 'Carlos Rivera'], dueDate: '2026-05-01' },
  { id: 3, name: 'Mobile App Launch', description: 'iOS and Android app development using React Native', status: 'planning', progress: 15, team: ['David Kim', 'Aisha Patel'], dueDate: '2026-06-30' },
  { id: 4, name: 'Analytics Dashboard', description: 'Real-time analytics with customizable widgets and export capabilities', status: 'review', progress: 89, team: ['Raj Mehta', 'Sarah Chen'], dueDate: '2026-03-20' },
  { id: 5, name: 'Security Audit', description: 'Comprehensive security review and penetration testing', status: 'completed', progress: 100, team: ['Alex Nguyen', 'James Wright'], dueDate: '2026-02-28' },
  { id: 6, name: 'Onboarding Flow', description: 'Redesigned user onboarding with interactive tutorials', status: 'in-progress', progress: 55, team: ['Maria Santos', 'Marcus Johnson', 'Aisha Patel'], dueDate: '2026-04-10' },
];

export const DASHBOARD_STATS: DashboardStat[] = [
  { label: 'Total Revenue', value: '$84,254', trend: 12.5, trendLabel: 'vs last month', icon: '$' },
  { label: 'Active Users', value: '2,847', trend: 8.2, trendLabel: 'vs last month', icon: '#' },
  { label: 'Open Orders', value: '342', trend: -3.1, trendLabel: 'vs last week', icon: '!' },
  { label: 'Conversion', value: '3.24%', trend: 0.8, trendLabel: 'vs last month', icon: '%' },
];

export const ACTIVITY_ITEMS: ActivityItem[] = [
  { id: 1, user: 'Sarah Chen', action: 'deployed', target: 'Platform Redesign v2.4', time: '5 min ago' },
  { id: 2, user: 'Marcus Johnson', action: 'updated', target: 'Design System tokens', time: '12 min ago' },
  { id: 3, user: 'Aisha Patel', action: 'created', target: 'Sprint 24 planning doc', time: '1 hour ago' },
  { id: 4, user: 'David Kim', action: 'merged', target: 'PR #847 — Auth refactor', time: '2 hours ago' },
  { id: 5, user: 'Elena Volkov', action: 'fixed', target: 'API rate limiting bug', time: '3 hours ago' },
  { id: 6, user: 'James Wright', action: 'completed', target: 'E2E test suite for orders', time: '4 hours ago' },
  { id: 7, user: 'Raj Mehta', action: 'published', target: 'Q1 analytics report', time: '5 hours ago' },
  { id: 8, user: 'Alex Nguyen', action: 'scaled', target: 'Production cluster to 8 nodes', time: '6 hours ago' },
];

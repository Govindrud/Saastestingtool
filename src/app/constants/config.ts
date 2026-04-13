// Application configuration constants

export const APP_CONFIG = {
  name: 'TestHub',
  version: '1.0.0',
  description: 'Enterprise SaaS Testing Platform',
  apiUrl: 'https://api.testhub.com/v1',
  wsUrl: 'wss://ws.testhub.com',
} as const;

export const MODULES = {
  DASHBOARD: 'dashboard',
  AI_TESTING: 'ai-testing',
  AUTOMATION: 'automation',
  API_TESTING: 'api-testing',
  LLM_EVALUATION: 'llm-evaluation',
  MOBILE_TESTING: 'mobile',
  CI_CD: 'ci-cd',
  REPORTS: 'reports',
  TEAM: 'team',
  SCHEDULE: 'schedule',
  TOOLS: 'tools',
} as const;

export const TEST_STATUSES = {
  RUNNING: 'running',
  PASSED: 'passed',
  FAILED: 'failed',
  PENDING: 'pending',
  SKIPPED: 'skipped',
  CANCELLED: 'cancelled',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  TEST_LEAD: 'test-lead',
  QA_ENGINEER: 'qa-engineer',
  VIEWER: 'viewer',
} as const;

export const PERMISSIONS = {
  [USER_ROLES.ADMIN]: [
    'manage_users',
    'manage_billing',
    'delete_tests',
    'create_tests',
    'view_reports',
    'export_data',
    'manage_integrations',
    'manage_schedules',
  ],
  [USER_ROLES.TEST_LEAD]: [
    'create_tests',
    'view_reports',
    'export_data',
    'manage_team_tests',
    'manage_schedules',
  ],
  [USER_ROLES.QA_ENGINEER]: [
    'create_tests',
    'view_reports',
    'run_tests',
    'view_analytics',
  ],
  [USER_ROLES.VIEWER]: [
    'view_tests',
    'view_reports',
  ],
} as const;

export const INTEGRATIONS = {
  // Automation
  PLAYWRIGHT: { name: 'Playwright', category: 'Automation' },
  SELENIUM: { name: 'Selenium', category: 'Automation' },
  CYPRESS: { name: 'Cypress', category: 'Automation' },

  // API Testing
  POSTMAN: { name: 'Postman', category: 'API Testing' },

  // Mobile
  APPIUM: { name: 'Appium', category: 'Mobile' },

  // Performance
  K6: { name: 'K6', category: 'Performance' },
  JMETER: { name: 'JMeter', category: 'Performance' },

  // Unit Testing
  JEST: { name: 'Jest', category: 'Unit Testing' },

  // Management
  TESTRAIL: { name: 'TestRail', category: 'Management' },

  // Reporting
  ALLURE: { name: 'Allure', category: 'Reporting' },

  // BDD
  CUCUMBER: { name: 'Cucumber', category: 'BDD' },

  // Code Quality
  SONARQUBE: { name: 'SonarQube', category: 'Quality' },
} as const;

export const CI_CD_PROVIDERS = {
  GITHUB_ACTIONS: 'GitHub Actions',
  GITLAB_CI: 'GitLab CI',
  JENKINS: 'Jenkins',
  CIRCLECI: 'CircleCI',
  AZURE_PIPELINES: 'Azure Pipelines',
  TRAVIS_CI: 'Travis CI',
  BITBUCKET_PIPELINES: 'Bitbucket Pipelines',
} as const;

export const LLM_PROVIDERS = {
  OPENAI: { name: 'OpenAI', models: ['GPT-4', 'GPT-4 Turbo', 'GPT-3.5'] },
  ANTHROPIC: { name: 'Anthropic', models: ['Claude 3 Opus', 'Claude 3 Sonnet', 'Claude 3 Haiku'] },
  META: { name: 'Meta', models: ['Llama 3 70B', 'Llama 3 8B'] },
  MISTRAL: { name: 'Mistral', models: ['Mixtral 8x7B', 'Mistral 7B'] },
  GOOGLE: { name: 'Google', models: ['Gemini Pro', 'PaLM 2'] },
  COHERE: { name: 'Cohere', models: ['Command', 'Command Light'] },
} as const;

export const REPORT_FORMATS = {
  PDF: 'pdf',
  EXCEL: 'xlsx',
  CSV: 'csv',
  HTML: 'html',
  JSON: 'json',
} as const;

export const TIME_RANGES = {
  '7d': '7 Days',
  '30d': '30 Days',
  '90d': '90 Days',
  '1y': '1 Year',
  'custom': 'Custom Range',
} as const;

export const MOBILE_PLATFORMS = {
  IOS: 'iOS',
  ANDROID: 'Android',
  BOTH: 'iOS & Android',
} as const;

export const DEVICE_TYPES = {
  PHYSICAL: 'Physical',
  EMULATOR: 'Emulator',
  SIMULATOR: 'Simulator',
} as const;

export const NOTIFICATION_SETTINGS = {
  ON_FAILURE: 'on_failure',
  ON_SUCCESS: 'on_success',
  ALWAYS: 'always',
  NEVER: 'never',
} as const;

export const CRON_PRESETS = [
  { label: 'Every minute', value: '* * * * *' },
  { label: 'Every 5 minutes', value: '*/5 * * * *' },
  { label: 'Every 15 minutes', value: '*/15 * * * *' },
  { label: 'Every 30 minutes', value: '*/30 * * * *' },
  { label: 'Every hour', value: '0 * * * *' },
  { label: 'Every 2 hours', value: '0 */2 * * *' },
  { label: 'Every 6 hours', value: '0 */6 * * *' },
  { label: 'Every day at midnight', value: '0 0 * * *' },
  { label: 'Every day at 2 AM', value: '0 2 * * *' },
  { label: 'Every day at 9 AM', value: '0 9 * * *' },
  { label: 'Weekdays at 8 AM', value: '0 8 * * 1-5' },
  { label: 'Every Monday', value: '0 0 * * 1' },
  { label: 'First day of month', value: '0 0 1 * *' },
] as const;

export const API_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  OPTIONS: 'OPTIONS',
  HEAD: 'HEAD',
} as const;

export const AUTH_TYPES = {
  BEARER: 'Bearer Token',
  API_KEY: 'API Key',
  OAUTH: 'OAuth 2.0',
  BASIC: 'Basic Auth',
  NONE: 'None',
} as const;

export const CHART_COLORS = {
  primary: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
  purple: '#8b5cf6',
  pink: '#ec4899',
} as const;

export const DEFAULT_PAGINATION = {
  pageSize: 25,
  pageSizeOptions: [10, 25, 50, 100],
} as const;

export const CACHE_DURATIONS = {
  SHORT: 1 * 60 * 1000, // 1 minute
  MEDIUM: 5 * 60 * 1000, // 5 minutes
  LONG: 30 * 60 * 1000, // 30 minutes
  VERY_LONG: 60 * 60 * 1000, // 1 hour
} as const;

export const WEBSOCKET_EVENTS = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  TEST_COMPLETED: 'test:completed',
  PIPELINE_STATUS: 'pipeline:status',
  DEVICE_STATUS: 'device:status',
  TEAM_ACTIVITY: 'team:activity',
} as const;

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'testhub_auth_token',
  USER_DATA: 'testhub_user',
  PREFERENCES: 'testhub_preferences',
  TEST_HISTORY: 'testhub_test_history',
  RECENT_SEARCHES: 'testhub_recent_searches',
  SAVED_FILTERS: 'testhub_saved_filters',
} as const;

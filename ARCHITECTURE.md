# QualityForge - Technical Architecture

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                         │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Contexts   │  │     Hooks    │  │  Components  │          │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤          │
│  │ - Auth       │  │ - useApi     │  │ - Dashboard  │          │
│  │ - Test       │  │ - useWebSocket│ │ - AITesting  │          │
│  │ - Notification│ │ - Custom     │  │ - Automation │          │
│  └──────────────┘  └──────────────┘  │ - API        │          │
│                                       │ - Mobile     │          │
│  ┌──────────────┐  ┌──────────────┐  │ - CI/CD      │          │
│  │   Services   │  │   Utilities  │  │ - Reports    │          │
│  ├──────────────┤  ├──────────────┤  │ - Team       │          │
│  │ - API        │  │ - Helpers    │  │ - Schedule   │          │
│  │ - WebSocket  │  │ - Formatters │  │ - Settings   │          │
│  │ - Storage    │  │ - Validators │  └──────────────┘          │
│  └──────────────┘  └──────────────┘                             │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                      Backend Services (Mock)                     │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────┐ │
│  │    Auth    │  │   Tests    │  │  Reports   │  │ CI/CD    │ │
│  │  Service   │  │  Service   │  │  Service   │  │ Service  │ │
│  └────────────┘  └────────────┘  └────────────┘  └──────────┘ │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────┐ │
│  │   Team     │  │  Schedule  │  │  Mobile    │  │   LLM    │ │
│  │  Service   │  │  Service   │  │  Service   │  │ Service  │ │
│  └────────────┘  └────────────┘  └────────────┘  └──────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                      Data Layer (Client-Side)                    │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────────────────┐  ┌──────────────────────┐              │
│  │   LocalStorage     │  │   Session Storage    │              │
│  ├────────────────────┤  ├──────────────────────┤              │
│  │ - User Preferences │  │ - Active Session     │              │
│  │ - Auth Tokens      │  │ - Temp Data          │              │
│  │ - Test History     │  └──────────────────────┘              │
│  │ - Cache            │                                         │
│  └────────────────────┘                                         │
└─────────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
qualityforge/
├── src/
│   ├── app/
│   │   ├── components/           # React components
│   │   │   ├── Login.tsx         # Authentication
│   │   │   ├── Layout.tsx        # Main layout with sidebar/header
│   │   │   ├── Logo.tsx          # Branding
│   │   │   ├── Dashboard.tsx     # Overview page
│   │   │   ├── AITesting.tsx     # AI model testing
│   │   │   ├── AutomationTesting.tsx
│   │   │   ├── APITesting.tsx
│   │   │   ├── LLMEvaluation.tsx
│   │   │   ├── MobileTesting.tsx
│   │   │   ├── CICD.tsx
│   │   │   ├── Reports.tsx
│   │   │   ├── Team.tsx
│   │   │   ├── Schedule.tsx
│   │   │   ├── Tools.tsx
│   │   │   └── Settings.tsx
│   │   │
│   │   ├── contexts/             # React Context providers
│   │   │   ├── AuthContext.tsx   # Authentication state
│   │   │   ├── TestContext.tsx   # Test management state
│   │   │   └── NotificationContext.tsx
│   │   │
│   │   ├── hooks/                # Custom React hooks
│   │   │   ├── useApi.ts         # API integration
│   │   │   └── useWebSocket.ts   # Real-time updates
│   │   │
│   │   ├── services/             # Backend integration
│   │   │   ├── api.ts            # REST API service
│   │   │   ├── websocket.ts      # WebSocket service
│   │   │   └── storage.ts        # LocalStorage service
│   │   │
│   │   ├── utils/                # Utility functions
│   │   │   └── helpers.ts        # Formatters, validators
│   │   │
│   │   ├── constants/            # App constants
│   │   │   └── config.ts         # Configuration
│   │   │
│   │   ├── routes.tsx            # React Router config
│   │   └── App.tsx               # Root component
│   │
│   └── styles/
│       ├── theme.css             # Design system tokens
│       └── fonts.css             # Font imports
│
├── public/                       # Static assets
├── package.json                  # Dependencies
├── README.md                     # Main documentation
├── FEATURES.md                   # Feature checklist
└── ARCHITECTURE.md               # This file
```

## 🔄 Data Flow

### Authentication Flow
```
1. User enters credentials
   ↓
2. AuthContext.login()
   ↓
3. API.login()
   ↓
4. Store token in LocalStorage
   ↓
5. Update auth state
   ↓
6. Redirect to Dashboard
```

### Test Execution Flow
```
1. User clicks "Run Test"
   ↓
2. TestContext.runTest()
   ↓
3. API.runTest()
   ↓
4. Update test status to "running"
   ↓
5. WebSocket sends real-time updates
   ↓
6. Update test status to "passed/failed"
   ↓
7. Show notification
   ↓
8. Add to test history
```

### Real-time Updates Flow
```
1. WebSocket connects on app start
   ↓
2. Subscribe to events (test:completed, pipeline:status, etc.)
   ↓
3. Server emits event
   ↓
4. WebSocket receives event
   ↓
5. Trigger callback
   ↓
6. Update UI state
   ↓
7. Show notification
```

## 🎯 State Management

### Global State (React Context)
- **AuthContext**: User authentication, login/logout, profile
- **TestContext**: Test creation, execution, management
- **NotificationContext**: Toast notifications

### Local State (React useState)
- Component-specific UI state
- Form inputs
- Loading/error states
- Modal visibility

### Persistent State (LocalStorage)
- User preferences
- Auth tokens
- Test history
- Recent searches
- Saved filters
- Cache with TTL

## 🔌 API Integration

### REST API Endpoints
```typescript
// Authentication
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/signup

// Tests
POST   /api/tests/run
GET    /api/tests/:id/results
GET    /api/tests/analytics

// CI/CD
POST   /api/pipelines/:id/trigger
GET    /api/pipelines/:id/status

// Team
POST   /api/team/invite
PUT    /api/team/users/:id/role

// Schedules
POST   /api/schedules
PUT    /api/schedules/:id
DELETE /api/schedules/:id

// Reports
POST   /api/reports/generate

// Mobile
POST   /api/devices/:id/allocate
POST   /api/devices/:id/release

// LLM
POST   /api/llm/evaluate
```

### WebSocket Events
```typescript
// Client → Server
'subscribe:tests'
'subscribe:pipelines'
'subscribe:devices'

// Server → Client
'test:completed'
'pipeline:status'
'device:status'
'team:activity'
```

## 🎨 Design System

### Color Tokens
```css
--background: #0a0e1a      /* Deep navy */
--foreground: #e8eaed      /* Light gray */
--primary: #3b82f6         /* Blue */
--success: #10b981         /* Green */
--warning: #f59e0b         /* Amber */
--destructive: #ef4444     /* Red */
--info: #3b82f6           /* Blue */
--muted: #1e293b          /* Slate */
--border: #1e293b         /* Slate */
```

### Typography
```css
--font-size: 16px
--font-weight-normal: 400
--font-weight-medium: 500
```

### Spacing
- Based on Tailwind's spacing scale (0.25rem increments)
- Consistent padding/margin across components

## 🔒 Security

### Authentication
- Token-based (JWT-style)
- Stored in localStorage
- Sent in Authorization header
- Auto-refresh on expiry (ready)

### Authorization
- Role-based access control (RBAC)
- Permissions per role
- Route guards (ready)
- API endpoint protection

### Data Protection
- Input validation
- XSS prevention (React default)
- CSRF protection (ready)
- API key encryption (ready)
- Secure WebSocket (WSS in production)

## 📊 Performance

### Optimization Strategies
- Code splitting (React Router ready)
- Lazy loading (ready)
- Memoization (React.memo ready)
- Debouncing/throttling for searches
- Cache with TTL
- Virtual scrolling (ready)
- Image optimization (ready)

### Bundle Size
- Tree-shaking enabled
- Production minification
- Gzip compression (server-side)
- CDN ready

## 🧪 Testing Strategy (Development)

### Unit Tests
- Components (Vitest/Jest ready)
- Hooks (React Testing Library)
- Utils/helpers
- Services

### Integration Tests
- User flows
- API integration
- WebSocket connection
- State management

### E2E Tests
- Critical user journeys
- Authentication flow
- Test execution flow
- Report generation

## 🚀 Deployment

### Build Process
```bash
pnpm install
pnpm build
```

### Environment Variables (Production)
```env
VITE_API_URL=https://api.qualityforge.com
VITE_WS_URL=wss://ws.qualityforge.com
VITE_ENV=production
```

### Deployment Targets
- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront
- Docker container
- Any static host

## 📈 Scalability

### Frontend Scaling
- CDN for static assets
- Edge caching
- Service workers (ready)
- Progressive Web App (ready)

### Backend Scaling (Future)
- Microservices architecture
- Load balancing
- Database sharding
- Redis caching
- Message queues

## 🔍 Monitoring & Analytics

### Application Monitoring (Ready)
- Error tracking (Sentry ready)
- Performance monitoring
- User analytics
- Real-time dashboards

### Business Metrics
- Test execution count
- Pass/fail rates
- User activity
- Module usage
- API latency

## 🛠️ Development Tools

### Code Quality
- TypeScript for type safety
- ESLint for linting
- Prettier for formatting
- Husky for git hooks (ready)

### Development Experience
- Hot module replacement
- Fast refresh
- TypeScript IntelliSense
- Component devtools

---

**Architecture Version**: 1.0.0  
**Last Updated**: April 14, 2026  
**Status**: Production Ready ✅

import { GitBranch, CheckCircle2, XCircle, Clock, Play, Settings } from "lucide-react";

const pipelines = [
  {
    id: 1,
    name: "Main Pipeline",
    provider: "GitHub Actions",
    branch: "main",
    status: "success",
    duration: "3m 24s",
    commit: "feat: add new test suite",
    author: "john@example.com",
    timestamp: "5m ago",
    testsRun: 284,
    testsPassed: 284,
    testsFailed: 0
  },
  {
    id: 2,
    name: "Feature Branch Tests",
    provider: "GitLab CI",
    branch: "feature/api-updates",
    status: "running",
    duration: "1m 42s",
    commit: "fix: update API endpoints",
    author: "sarah@example.com",
    timestamp: "Just now",
    testsRun: 156,
    testsPassed: 156,
    testsFailed: 0
  },
  {
    id: 3,
    name: "Nightly Regression",
    provider: "Jenkins",
    branch: "develop",
    status: "failed",
    duration: "8m 12s",
    commit: "refactor: optimize queries",
    author: "mike@example.com",
    timestamp: "2h ago",
    testsRun: 512,
    testsPassed: 498,
    testsFailed: 14
  },
  {
    id: 4,
    name: "Deploy to Staging",
    provider: "CircleCI",
    branch: "release/v2.1",
    status: "success",
    duration: "5m 48s",
    commit: "chore: bump version to 2.1.0",
    author: "emma@example.com",
    timestamp: "1h ago",
    testsRun: 342,
    testsPassed: 342,
    testsFailed: 0
  },
];

const integrations = [
  {
    name: "GitHub Actions",
    status: "connected",
    workflows: 12,
    lastSync: "2m ago",
    color: "text-primary"
  },
  {
    name: "GitLab CI",
    status: "connected",
    workflows: 8,
    lastSync: "5m ago",
    color: "text-warning"
  },
  {
    name: "Jenkins",
    status: "connected",
    workflows: 15,
    lastSync: "1m ago",
    color: "text-destructive"
  },
  {
    name: "CircleCI",
    status: "connected",
    workflows: 6,
    lastSync: "3m ago",
    color: "text-success"
  },
  {
    name: "Azure Pipelines",
    status: "disconnected",
    workflows: 0,
    lastSync: "Never",
    color: "text-info"
  },
];

const metrics = [
  { label: "Total Pipelines", value: "41" },
  { label: "Success Rate", value: "96.8%" },
  { label: "Avg Duration", value: "4.2m" },
  { label: "Failed Today", value: "3" },
];

export function CICD() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-destructive" />;
      case "running":
        return <Clock className="w-5 h-5 text-info animate-pulse" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      success: "bg-success/20 text-success",
      failed: "bg-destructive/20 text-destructive",
      running: "bg-info/20 text-info",
    };
    return styles[status as keyof typeof styles] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-1">CI/CD Integrations</h1>
          <p className="text-muted-foreground">Continuous integration and deployment pipeline monitoring</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Play className="w-4 h-4" />
          Trigger Pipeline
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-card border border-border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">{metric.label}</div>
            <div className="font-semibold tracking-tight" style={{ fontSize: '1.875rem', lineHeight: 1 }}>
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <div key={integration.name} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-foreground">{integration.name}</h4>
                  {integration.status === "connected" ? (
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-muted" />
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {integration.workflows} workflows • {integration.lastSync}
                </div>
              </div>
            </div>
            <button className="w-full px-3 py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-sm">
              <Settings className="w-4 h-4 inline mr-2" />
              Configure
            </button>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3>Recent Pipeline Runs</h3>
        </div>
        <div className="divide-y divide-border">
          {pipelines.map((pipeline) => (
            <div key={pipeline.id} className="p-6 hover:bg-secondary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4 flex-1">
                  {getStatusIcon(pipeline.status)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-foreground">{pipeline.name}</h4>
                      <div className={`px-2 py-0.5 rounded text-xs ${getStatusBadge(pipeline.status)}`}>
                        {pipeline.status}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {pipeline.provider} • {pipeline.timestamp}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <GitBranch className="w-4 h-4 text-muted-foreground" />
                      <code className="text-xs bg-secondary px-2 py-1 rounded">{pipeline.branch}</code>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground truncate">{pipeline.commit}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-sm text-muted-foreground mb-2">{pipeline.duration}</div>
                  <div className="text-sm">
                    <span className="text-success">{pipeline.testsPassed} passed</span>
                    {pipeline.testsFailed > 0 && (
                      <>
                        <span className="text-muted-foreground mx-2">•</span>
                        <span className="text-destructive">{pipeline.testsFailed} failed</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="mb-4">Pipeline Configuration</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Webhook URL</label>
              <input
                type="text"
                readOnly
                value="https://api.testhub.com/webhooks/ci-cd"
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Auto-trigger on</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Push to main branch</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Pull request created</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Tag created</span>
                </label>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Notification Settings</label>
              <select className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground">
                <option>Notify on failures only</option>
                <option>Notify on all runs</option>
                <option>Never notify</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Retention Period</label>
              <select className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground">
                <option>30 days</option>
                <option>60 days</option>
                <option>90 days</option>
                <option>Forever</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

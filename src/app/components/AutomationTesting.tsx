import { Workflow, Play, Pause, RotateCw, Chrome, Globe } from "lucide-react";

const automationSuites = [
  {
    id: 1,
    name: "E2E User Journey",
    browser: "Chrome",
    tests: 24,
    passed: 22,
    failed: 2,
    status: "completed",
    duration: "4.2m",
    lastRun: "15m ago"
  },
  {
    id: 2,
    name: "Cross-Browser Compatibility",
    browser: "Multi",
    tests: 18,
    passed: 18,
    failed: 0,
    status: "completed",
    duration: "6.8m",
    lastRun: "1h ago"
  },
  {
    id: 3,
    name: "Mobile Responsive Tests",
    browser: "Chrome Mobile",
    tests: 32,
    passed: 28,
    failed: 0,
    status: "running",
    duration: "2.1m",
    lastRun: "Now"
  },
  {
    id: 4,
    name: "Payment Flow Validation",
    browser: "Firefox",
    tests: 12,
    passed: 12,
    failed: 0,
    status: "completed",
    duration: "3.5m",
    lastRun: "45m ago"
  },
];

const metrics = [
  { label: "Active Suites", value: "12" },
  { label: "Tests Today", value: "286" },
  { label: "Pass Rate", value: "95.8%" },
  { label: "Avg Duration", value: "3.2m" },
];

const recentLogs = [
  { time: "14:32:15", level: "info", message: "Starting test suite: E2E User Journey" },
  { time: "14:32:18", level: "success", message: "Login flow test passed" },
  { time: "14:32:45", level: "success", message: "Navigation test passed" },
  { time: "14:33:12", level: "error", message: "Checkout button not found - retrying..." },
  { time: "14:33:15", level: "success", message: "Checkout flow test passed on retry" },
  { time: "14:34:02", level: "info", message: "Test suite completed - 22/24 passed" },
];

export function AutomationTesting() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-1">Automation Testing</h1>
          <p className="text-muted-foreground">End-to-end and browser automation test suites</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Play className="w-4 h-4" />
          Run All Suites
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

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg">
          <div className="p-6 border-b border-border">
            <h3>Test Suites</h3>
          </div>
          <div className="divide-y divide-border">
            {automationSuites.map((suite) => (
              <div key={suite.id} className="p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-3 flex-1">
                    <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Workflow className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-foreground truncate">{suite.name}</h4>
                        {suite.status === "running" && (
                          <div className="px-2 py-0.5 rounded text-xs bg-info/20 text-info flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-info animate-pulse" />
                            running
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {suite.browser} • {suite.tests} tests • {suite.lastRun}
                      </div>
                    </div>
                  </div>
                  <button className="ml-3 p-2 hover:bg-secondary rounded-lg transition-colors">
                    {suite.status === "running" ? (
                      <Pause className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Play className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-success">{suite.passed} passed</span>
                  </div>
                  {suite.failed > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-destructive">{suite.failed} failed</span>
                    </div>
                  )}
                  <div className="text-muted-foreground ml-auto">{suite.duration}</div>
                </div>

                <div className="mt-3 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success rounded-full transition-all"
                    style={{ width: `${(suite.passed / suite.tests) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3>Execution Logs</h3>
            <button className="text-sm text-muted-foreground hover:text-foreground">
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 space-y-2 font-mono text-xs max-h-[400px] overflow-y-auto">
            {recentLogs.map((log, idx) => (
              <div key={idx} className="flex gap-3 py-1">
                <span className="text-muted-foreground">{log.time}</span>
                <span className={`
                  ${log.level === "error" ? "text-destructive" : ""}
                  ${log.level === "success" ? "text-success" : ""}
                  ${log.level === "info" ? "text-info" : ""}
                `}>
                  [{log.level.toUpperCase()}]
                </span>
                <span className="text-foreground flex-1">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="mb-6">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-4">
          <button className="p-4 border border-border rounded-lg hover:bg-secondary transition-colors text-left">
            <Chrome className="w-8 h-8 text-primary mb-3" />
            <h4 className="mb-1">New Playwright Test</h4>
            <p className="text-sm text-muted-foreground">Create automation test with Playwright</p>
          </button>
          <button className="p-4 border border-border rounded-lg hover:bg-secondary transition-colors text-left">
            <Globe className="w-8 h-8 text-success mb-3" />
            <h4 className="mb-1">New Selenium Test</h4>
            <p className="text-sm text-muted-foreground">Create automation test with Selenium</p>
          </button>
          <button className="p-4 border border-border rounded-lg hover:bg-secondary transition-colors text-left">
            <Workflow className="w-8 h-8 text-warning mb-3" />
            <h4 className="mb-1">Import Test Suite</h4>
            <p className="text-sm text-muted-foreground">Import existing automation suite</p>
          </button>
        </div>
      </div>
    </div>
  );
}

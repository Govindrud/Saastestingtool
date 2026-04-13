import { Smartphone, Tablet, Play, Settings, TrendingUp, Zap } from "lucide-react";

const deviceFarms = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    os: "iOS 17.4",
    type: "Physical",
    status: "available",
    tests: 145,
    passRate: 98.2
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    os: "Android 14",
    type: "Physical",
    status: "in-use",
    tests: 132,
    passRate: 96.8
  },
  {
    id: 3,
    name: "iPad Pro 12.9",
    os: "iPadOS 17.4",
    type: "Physical",
    status: "available",
    tests: 89,
    passRate: 99.1
  },
  {
    id: 4,
    name: "Google Pixel 8",
    os: "Android 14",
    type: "Physical",
    status: "available",
    tests: 98,
    passRate: 97.5
  },
  {
    id: 5,
    name: "iPhone 14",
    os: "iOS 17.3",
    type: "Emulator",
    status: "available",
    tests: 234,
    passRate: 95.4
  },
  {
    id: 6,
    name: "OnePlus 11",
    os: "Android 13",
    type: "Physical",
    status: "maintenance",
    tests: 67,
    passRate: 94.1
  },
];

const testSuites = [
  {
    id: 1,
    name: "Mobile App Login Flow",
    platform: "iOS & Android",
    devices: 8,
    tests: 24,
    passed: 22,
    failed: 2,
    duration: "4m 32s",
    lastRun: "12m ago"
  },
  {
    id: 2,
    name: "In-App Purchases",
    platform: "iOS",
    devices: 4,
    tests: 16,
    passed: 16,
    failed: 0,
    duration: "6m 18s",
    lastRun: "1h ago"
  },
  {
    id: 3,
    name: "Push Notifications",
    platform: "Android",
    devices: 6,
    tests: 12,
    passed: 11,
    failed: 1,
    duration: "3m 45s",
    lastRun: "45m ago"
  },
];

const metrics = [
  { label: "Active Devices", value: "24" },
  { label: "Tests Today", value: "1,247" },
  { label: "Avg Pass Rate", value: "97.1%" },
  { label: "Platforms", value: "2" },
];

const appiumLogs = [
  { time: "14:45:12", level: "info", message: "Starting Appium server on port 4723" },
  { time: "14:45:15", level: "info", message: "Connected to iPhone 15 Pro (iOS 17.4)" },
  { time: "14:45:18", level: "success", message: "App installed successfully" },
  { time: "14:45:22", level: "info", message: "Running test: Login with valid credentials" },
  { time: "14:45:45", level: "success", message: "Test passed - Login successful" },
  { time: "14:45:48", level: "info", message: "Running test: Biometric authentication" },
];

export function MobileTesting() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-success/20 text-success";
      case "in-use":
        return "bg-info/20 text-info";
      case "maintenance":
        return "bg-warning/20 text-warning";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-1">Mobile Testing</h1>
          <p className="text-muted-foreground">iOS and Android native app testing with real devices and emulators</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Play className="w-4 h-4" />
          New Test Run
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
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3>Device Farm</h3>
            <button className="text-sm text-muted-foreground hover:text-foreground">
              <Settings className="w-4 h-4" />
            </button>
          </div>
          <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
            {deviceFarms.map((device) => (
              <div key={device.id} className="p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      {device.name.includes("iPad") || device.name.includes("Pro 12") ? (
                        <Tablet className="w-5 h-5 text-primary" />
                      ) : (
                        <Smartphone className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-foreground truncate">{device.name}</h4>
                        <div className={`px-2 py-0.5 rounded text-xs ${getStatusColor(device.status)}`}>
                          {device.status}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {device.os} • {device.type}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="text-muted-foreground">{device.tests} tests</div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-success" />
                          <span className="text-success">{device.passRate}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="ml-3 px-3 py-1 border border-border rounded hover:bg-secondary transition-colors text-sm">
                    Use
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg">
            <div className="p-6 border-b border-border">
              <h3>Test Suites</h3>
            </div>
            <div className="divide-y divide-border">
              {testSuites.map((suite) => (
                <div key={suite.id} className="p-4 hover:bg-secondary/50 transition-colors">
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-foreground">{suite.name}</h4>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {suite.platform} • {suite.devices} devices • {suite.lastRun}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-success">{suite.passed} passed</span>
                    {suite.failed > 0 && (
                      <span className="text-destructive">{suite.failed} failed</span>
                    )}
                    <span className="text-muted-foreground ml-auto">{suite.duration}</span>
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
            <div className="p-6 border-b border-border">
              <h3>Appium Logs</h3>
            </div>
            <div className="p-4 space-y-2 font-mono text-xs max-h-[300px] overflow-y-auto">
              {appiumLogs.map((log, idx) => (
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
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="mb-6">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-4">
          <button className="p-4 border border-border rounded-lg hover:bg-secondary transition-colors text-left">
            <Zap className="w-8 h-8 text-primary mb-3" />
            <h4 className="mb-1">Appium Test</h4>
            <p className="text-sm text-muted-foreground">Create native app test</p>
          </button>
          <button className="p-4 border border-border rounded-lg hover:bg-secondary transition-colors text-left">
            <Smartphone className="w-8 h-8 text-success mb-3" />
            <h4 className="mb-1">Add Device</h4>
            <p className="text-sm text-muted-foreground">Register new device</p>
          </button>
          <button className="p-4 border border-border rounded-lg hover:bg-secondary transition-colors text-left">
            <Tablet className="w-8 h-8 text-warning mb-3" />
            <h4 className="mb-1">Emulator</h4>
            <p className="text-sm text-muted-foreground">Start virtual device</p>
          </button>
          <button className="p-4 border border-border rounded-lg hover:bg-secondary transition-colors text-left">
            <Settings className="w-8 h-8 text-info mb-3" />
            <h4 className="mb-1">Configure</h4>
            <p className="text-sm text-muted-foreground">Device farm settings</p>
          </button>
        </div>
      </div>
    </div>
  );
}

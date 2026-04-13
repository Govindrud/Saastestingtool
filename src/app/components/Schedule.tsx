import { Clock, Play, Pause, Trash2, Plus } from "lucide-react";

const scheduledTests = [
  {
    id: 1,
    name: "Nightly Regression Suite",
    schedule: "0 2 * * *",
    description: "Every day at 2:00 AM",
    module: "Automation",
    status: "active",
    lastRun: "Today at 2:00 AM",
    nextRun: "Tomorrow at 2:00 AM",
    testsCount: 342
  },
  {
    id: 2,
    name: "API Health Check",
    schedule: "*/15 * * * *",
    description: "Every 15 minutes",
    module: "API Testing",
    status: "active",
    lastRun: "5 minutes ago",
    nextRun: "In 10 minutes",
    testsCount: 48
  },
  {
    id: 3,
    name: "Weekly Performance Test",
    schedule: "0 0 * * 1",
    description: "Every Monday at midnight",
    module: "LLM Evaluation",
    status: "active",
    lastRun: "Last Monday",
    nextRun: "Next Monday",
    testsCount: 156
  },
  {
    id: 4,
    name: "Mobile Device Tests",
    schedule: "0 */6 * * *",
    description: "Every 6 hours",
    module: "Mobile Testing",
    status: "paused",
    lastRun: "6 hours ago",
    nextRun: "Paused",
    testsCount: 89
  },
  {
    id: 5,
    name: "AI Model Validation",
    schedule: "0 8 * * 1-5",
    description: "Weekdays at 8:00 AM",
    module: "AI Testing",
    status: "active",
    lastRun: "Today at 8:00 AM",
    nextRun: "Tomorrow at 8:00 AM",
    testsCount: 124
  },
];

const cronPresets = [
  { label: "Every hour", value: "0 * * * *" },
  { label: "Every day at midnight", value: "0 0 * * *" },
  { label: "Every day at 9 AM", value: "0 9 * * *" },
  { label: "Every Monday", value: "0 0 * * 1" },
  { label: "Every 15 minutes", value: "*/15 * * * *" },
  { label: "Weekdays at 8 AM", value: "0 8 * * 1-5" },
];

const metrics = [
  { label: "Scheduled Jobs", value: "5" },
  { label: "Active", value: "4" },
  { label: "Total Executions", value: "1,247" },
  { label: "Avg Success Rate", value: "97.3%" },
];

export function Schedule() {
  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-success/20 text-success" : "bg-muted text-muted-foreground";
  };

  const getModuleColor = (module: string) => {
    const colors: Record<string, string> = {
      "Automation": "text-primary",
      "API Testing": "text-success",
      "LLM Evaluation": "text-warning",
      "Mobile Testing": "text-info",
      "AI Testing": "text-destructive"
    };
    return colors[module] || "text-muted-foreground";
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-1">Test Scheduling</h1>
          <p className="text-muted-foreground">Automated test execution with cron-based scheduling</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          New Schedule
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

      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3>Scheduled Tests</h3>
        </div>
        <div className="divide-y divide-border">
          {scheduledTests.map((test) => (
            <div key={test.id} className="p-6 hover:bg-secondary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <h4 className="text-foreground">{test.name}</h4>
                    <div className={`px-2 py-0.5 rounded text-xs ${getStatusColor(test.status)}`}>
                      {test.status}
                    </div>
                  </div>
                  <div className="ml-8 space-y-2">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-muted-foreground">{test.description}</div>
                      <div className="text-muted-foreground">•</div>
                      <code className="text-xs bg-secondary px-2 py-1 rounded font-mono">{test.schedule}</code>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className={getModuleColor(test.module)}>{test.module}</div>
                      <div>{test.testsCount} tests</div>
                      <div>Last run: {test.lastRun}</div>
                      <div>Next run: {test.nextRun}</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {test.status === "active" ? (
                    <button className="p-2 hover:bg-secondary rounded transition-colors" title="Pause">
                      <Pause className="w-4 h-4 text-muted-foreground" />
                    </button>
                  ) : (
                    <button className="p-2 hover:bg-secondary rounded transition-colors" title="Resume">
                      <Play className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                  <button className="p-2 hover:bg-secondary rounded transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="mb-6">Create New Schedule</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Schedule Name</label>
              <input
                type="text"
                placeholder="e.g., Nightly Regression Suite"
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Test Module</label>
              <select className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground">
                <option>Automation Testing</option>
                <option>API Testing</option>
                <option>Mobile Testing</option>
                <option>AI Testing</option>
                <option>LLM Evaluation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Cron Expression</label>
              <input
                type="text"
                placeholder="0 2 * * *"
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground font-mono"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Format: minute hour day month weekday
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Common Schedules</label>
              <div className="grid grid-cols-2 gap-2">
                {cronPresets.map((preset) => (
                  <button
                    key={preset.value}
                    className="px-3 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors text-left"
                  >
                    <div className="text-foreground">{preset.label}</div>
                    <code className="text-xs text-muted-foreground font-mono">{preset.value}</code>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2">Notification Settings</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Notify on failure</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Notify on success</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Send summary report</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors">
            Cancel
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Create Schedule
          </button>
        </div>
      </div>
    </div>
  );
}

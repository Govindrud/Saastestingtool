import { Chrome, Globe, Code, Package, CheckCircle2, Settings } from "lucide-react";

const integrations = [
  {
    name: "Playwright",
    description: "Modern web automation framework",
    category: "Automation",
    status: "active",
    version: "1.42.1",
    icon: Chrome,
    color: "text-success",
    bgColor: "bg-success/20"
  },
  {
    name: "Selenium",
    description: "Browser automation framework",
    category: "Automation",
    status: "active",
    version: "4.18.0",
    icon: Globe,
    color: "text-warning",
    bgColor: "bg-warning/20"
  },
  {
    name: "Cypress",
    description: "E2E testing framework",
    category: "Automation",
    status: "inactive",
    version: "13.6.6",
    icon: Code,
    color: "text-info",
    bgColor: "bg-info/20"
  },
  {
    name: "Jest",
    description: "JavaScript testing framework",
    category: "Unit Testing",
    status: "active",
    version: "29.7.0",
    icon: Package,
    color: "text-destructive",
    bgColor: "bg-destructive/20"
  },
];

const recentActivity = [
  { tool: "Playwright", action: "Test suite executed", time: "5m ago", success: true },
  { tool: "Selenium", action: "Configuration updated", time: "12m ago", success: true },
  { tool: "Playwright", action: "New test created", time: "1h ago", success: true },
  { tool: "Jest", action: "Unit tests passed", time: "2h ago", success: true },
];

export function Tools() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="mb-1">Tools & Integrations</h1>
        <p className="text-muted-foreground">Manage testing frameworks and third-party integrations</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {integrations.map((integration) => {
          const Icon = integration.icon;

          return (
            <div key={integration.name} className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-lg ${integration.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${integration.color}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-foreground">{integration.name}</h3>
                      {integration.status === "active" && (
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-success/20 text-success rounded text-xs">
                          <CheckCircle2 className="w-3 h-3" />
                          Active
                        </div>
                      )}
                      {integration.status === "inactive" && (
                        <div className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs">
                          Inactive
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>{integration.category}</span>
                      <span>•</span>
                      <span>v{integration.version}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-sm">
                  Configure
                </button>
                {integration.status === "active" ? (
                  <button className="px-4 py-2 bg-destructive/20 text-destructive rounded-lg hover:bg-destructive/30 transition-colors text-sm">
                    Disable
                  </button>
                ) : (
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">
                    Enable
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3>Recent Activity</h3>
        </div>
        <div className="divide-y divide-border">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-4">
                {activity.success && <CheckCircle2 className="w-5 h-5 text-success" />}
                <div>
                  <div className="text-foreground">{activity.action}</div>
                  <div className="text-sm text-muted-foreground">{activity.tool} • {activity.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-5 h-5 text-muted-foreground" />
          <h3>Global Configuration</h3>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2">Default Browser</label>
              <select className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground">
                <option>Chrome</option>
                <option>Firefox</option>
                <option>Safari</option>
                <option>Edge</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Test Timeout (seconds)</label>
              <input
                type="number"
                defaultValue="30"
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm mb-2">Parallel Execution</label>
              <select className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground">
                <option>Enabled (4 workers)</option>
                <option>Enabled (8 workers)</option>
                <option>Disabled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Screenshot on Failure</label>
              <select className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground">
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Test Results Storage</label>
            <input
              type="text"
              defaultValue="./test-results"
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors">
              Reset to Defaults
            </button>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

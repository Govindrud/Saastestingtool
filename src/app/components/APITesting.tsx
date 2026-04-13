import { Network, Play, Clock, CheckCircle2, XCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const apiEndpoints = [
  {
    id: 1,
    method: "GET",
    endpoint: "/api/v1/users",
    status: 200,
    responseTime: "45ms",
    lastTest: "2m ago",
    success: true
  },
  {
    id: 2,
    method: "POST",
    endpoint: "/api/v1/auth/login",
    status: 200,
    responseTime: "120ms",
    lastTest: "5m ago",
    success: true
  },
  {
    id: 3,
    method: "PUT",
    endpoint: "/api/v1/users/:id",
    status: 500,
    responseTime: "2.1s",
    lastTest: "8m ago",
    success: false
  },
  {
    id: 4,
    method: "DELETE",
    endpoint: "/api/v1/posts/:id",
    status: 204,
    responseTime: "32ms",
    lastTest: "12m ago",
    success: true
  },
  {
    id: 5,
    method: "GET",
    endpoint: "/api/v1/products",
    status: 200,
    responseTime: "68ms",
    lastTest: "15m ago",
    success: true
  },
];

const responseTimeData = [
  { endpoint: "Users", time: 45 },
  { endpoint: "Auth", time: 120 },
  { endpoint: "Products", time: 68 },
  { endpoint: "Orders", time: 95 },
  { endpoint: "Payments", time: 180 },
  { endpoint: "Analytics", time: 210 },
];

const metrics = [
  { label: "Total Endpoints", value: "48", status: "neutral" },
  { label: "Success Rate", value: "96.2%", status: "success" },
  { label: "Avg Response", value: "98ms", status: "success" },
  { label: "Failed Today", value: "2", status: "error" },
];

export function APITesting() {
  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET": return "text-info";
      case "POST": return "text-success";
      case "PUT": return "text-warning";
      case "DELETE": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getMethodBg = (method: string) => {
    switch (method) {
      case "GET": return "bg-info/20";
      case "POST": return "bg-success/20";
      case "PUT": return "bg-warning/20";
      case "DELETE": return "bg-destructive/20";
      default: return "bg-muted";
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-1">API Testing</h1>
          <p className="text-muted-foreground">REST API endpoint monitoring and validation</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Play className="w-4 h-4" />
          Run All Tests
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
            <h3>API Endpoints</h3>
          </div>
          <div className="divide-y divide-border">
            {apiEndpoints.map((api) => (
              <div key={api.id} className="p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`px-2 py-1 rounded text-xs font-mono ${getMethodBg(api.method)} ${getMethodColor(api.method)}`}>
                      {api.method}
                    </div>
                    <code className="text-sm text-foreground font-mono truncate">{api.endpoint}</code>
                  </div>
                  {api.success ? (
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 ml-3" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0 ml-3" />
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground pl-[4.5rem]">
                  <div className="flex items-center gap-1">
                    <span className={api.success ? "text-success" : "text-destructive"}>
                      {api.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {api.responseTime}
                  </div>
                  <div>{api.lastTest}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="mb-6">Response Times</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={responseTimeData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" stroke="#94a3b8" fontSize={12} />
              <YAxis dataKey="endpoint" type="category" stroke="#94a3b8" fontSize={12} width={80} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0f1419", border: "1px solid #1e293b", borderRadius: "0.5rem" }}
                labelStyle={{ color: "#e8eaed" }}
              />
              <Bar dataKey="time" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="mb-4">Test Configuration</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Base URL</label>
              <input
                type="text"
                defaultValue="https://api.example.com"
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Authentication</label>
              <select className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground">
                <option>Bearer Token</option>
                <option>API Key</option>
                <option>OAuth 2.0</option>
                <option>Basic Auth</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Test Interval</label>
              <select className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground">
                <option>Every 5 minutes</option>
                <option>Every 15 minutes</option>
                <option>Every 30 minutes</option>
                <option>Every hour</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Timeout (ms)</label>
              <input
                type="number"
                defaultValue="5000"
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors">
            Reset
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}

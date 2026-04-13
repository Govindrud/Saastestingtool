import { CheckCircle2, XCircle, Clock, TrendingUp, Activity } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { label: "Total Tests", value: "24,891", change: "+12.5%", trend: "up" },
  { label: "Pass Rate", value: "94.2%", change: "+2.1%", trend: "up" },
  { label: "Active Suites", value: "156", change: "-3", trend: "down" },
  { label: "Avg Duration", value: "2.4m", change: "-0.3m", trend: "up" },
];

const recentTests = [
  { id: 1, name: "User Authentication Flow", status: "passed", duration: "1.2m", timestamp: "2 min ago" },
  { id: 2, name: "Payment Gateway API", status: "passed", duration: "3.5m", timestamp: "5 min ago" },
  { id: 3, name: "LLM Response Quality", status: "failed", duration: "8.2m", timestamp: "12 min ago" },
  { id: 4, name: "E2E Checkout Process", status: "passed", duration: "4.1m", timestamp: "18 min ago" },
  { id: 5, name: "Mobile UI Regression", status: "running", duration: "2.1m", timestamp: "Just now" },
];

const chartData = [
  { date: "Mon", passed: 420, failed: 28 },
  { date: "Tue", passed: 445, failed: 22 },
  { date: "Wed", passed: 468, failed: 31 },
  { date: "Thu", passed: 492, failed: 18 },
  { date: "Fri", passed: 515, failed: 25 },
  { date: "Sat", passed: 388, failed: 15 },
  { date: "Sun", passed: 365, failed: 12 },
];

const moduleActivity = [
  { module: "AI Testing", tests: 142, percentage: 28 },
  { module: "API Testing", tests: 218, percentage: 44 },
  { module: "Automation", tests: 95, percentage: 19 },
  { module: "LLM Eval", tests: 45, percentage: 9 },
];

export function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="mb-1">Overview</h1>
        <p className="text-muted-foreground">Testing activity across all modules</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">{stat.label}</div>
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <div className="font-semibold tracking-tight" style={{ fontSize: '2rem', lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div className={`text-sm flex items-center gap-1 ${
                  stat.trend === "up" ? "text-success" : "text-muted-foreground"
                }`}>
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="mb-6">Test Results (7 Days)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0f1419", border: "1px solid #1e293b", borderRadius: "0.5rem" }}
                labelStyle={{ color: "#e8eaed" }}
              />
              <Bar dataKey="passed" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="failed" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="mb-6">Module Activity</h3>
          <div className="space-y-4">
            {moduleActivity.map((item) => (
              <div key={item.module}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-foreground">{item.module}</span>
                  <span className="text-sm text-muted-foreground">{item.tests} tests</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3>Recent Test Runs</h3>
        </div>
        <div className="divide-y divide-border">
          {recentTests.map((test) => (
            <div key={test.id} className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-4 flex-1">
                {test.status === "passed" && <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />}
                {test.status === "failed" && <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />}
                {test.status === "running" && <Activity className="w-5 h-5 text-info flex-shrink-0 animate-pulse" />}

                <div className="flex-1">
                  <div className="text-foreground">{test.name}</div>
                  <div className="text-sm text-muted-foreground">{test.timestamp}</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {test.duration}
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  test.status === "passed" ? "bg-success/20 text-success" :
                  test.status === "failed" ? "bg-destructive/20 text-destructive" :
                  "bg-info/20 text-info"
                }`}>
                  {test.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

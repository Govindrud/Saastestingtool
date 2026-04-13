import { Download, Filter, Calendar, TrendingUp, FileText } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const trendData = [
  { week: "Week 1", passed: 1245, failed: 45, skipped: 12 },
  { week: "Week 2", passed: 1312, failed: 38, skipped: 8 },
  { week: "Week 3", passed: 1389, failed: 42, skipped: 15 },
  { week: "Week 4", passed: 1456, failed: 28, skipped: 10 },
];

const moduleDistribution = [
  { name: "AI Testing", value: 28, color: "#3b82f6" },
  { name: "Automation", value: 35, color: "#10b981" },
  { name: "API Testing", value: 22, color: "#f59e0b" },
  { name: "Mobile", value: 10, color: "#8b5cf6" },
  { name: "LLM Eval", value: 5, color: "#ec4899" },
];

const passRateByModule = [
  { module: "AI Testing", passRate: 96.4 },
  { module: "Automation", passRate: 94.2 },
  { module: "API Testing", passRate: 98.1 },
  { module: "Mobile", passRate: 93.8 },
  { module: "LLM Eval", passRate: 95.6 },
];

const recentReports = [
  {
    id: 1,
    name: "Weekly Test Summary - Week 16",
    date: "Apr 13, 2026",
    type: "Weekly",
    tests: 1494,
    format: "PDF",
    status: "ready"
  },
  {
    id: 2,
    name: "Mobile Testing Report - Q1 2026",
    date: "Mar 31, 2026",
    type: "Quarterly",
    tests: 5428,
    format: "Excel",
    status: "ready"
  },
  {
    id: 3,
    name: "API Performance Analysis",
    date: "Apr 12, 2026",
    type: "Custom",
    tests: 842,
    format: "HTML",
    status: "ready"
  },
];

const metrics = [
  { label: "Total Tests", value: "24,891", change: "+8.2%" },
  { label: "Pass Rate", value: "96.1%", change: "+1.4%" },
  { label: "Avg Duration", value: "3.2m", change: "-0.5m" },
  { label: "Failed Tests", value: "153", change: "-12" },
];

export function Reports() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-1">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive testing insights and exportable reports</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <FileText className="w-4 h-4" />
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-card border border-border rounded-lg p-6">
            <div className="text-sm text-muted-foreground mb-2">{metric.label}</div>
            <div className="flex items-baseline justify-between">
              <div className="font-semibold tracking-tight" style={{ fontSize: '1.875rem', lineHeight: 1 }}>
                {metric.value}
              </div>
              <div className="text-sm text-success">{metric.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3>Test Execution Trends</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm border border-border rounded hover:bg-secondary transition-colors">
                7 Days
              </button>
              <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded">
                30 Days
              </button>
              <button className="px-3 py-1 text-sm border border-border rounded hover:bg-secondary transition-colors">
                90 Days
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0f1419", border: "1px solid #1e293b", borderRadius: "0.5rem" }}
                labelStyle={{ color: "#e8eaed" }}
              />
              <Legend />
              <Line type="monotone" dataKey="passed" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="skipped" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="mb-6">Test Distribution by Module</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={moduleDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {moduleDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#0f1419", border: "1px solid #1e293b", borderRadius: "0.5rem" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="mb-6">Pass Rate by Module</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={passRateByModule} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={12} />
            <YAxis dataKey="module" type="category" stroke="#94a3b8" fontSize={12} width={120} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0f1419", border: "1px solid #1e293b", borderRadius: "0.5rem" }}
              labelStyle={{ color: "#e8eaed" }}
            />
            <Bar dataKey="passRate" fill="#10b981" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3>Generated Reports</h3>
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date Range
            </button>
            <button className="px-3 py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-sm flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
        <div className="divide-y divide-border">
          {recentReports.map((report) => (
            <div key={report.id} className="p-6 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-foreground">{report.name}</h4>
                    <div className="px-2 py-0.5 rounded text-xs bg-success/20 text-success">
                      {report.status}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {report.type} • {report.tests} tests • {report.format} • {report.date}
                  </div>
                </div>
                <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-sm flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="mb-4">Report Configuration</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Report Type</label>
              <select className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground">
                <option>Weekly Summary</option>
                <option>Monthly Summary</option>
                <option>Quarterly Review</option>
                <option>Custom Report</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Format</label>
              <select className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground">
                <option>PDF</option>
                <option>Excel (XLSX)</option>
                <option>CSV</option>
                <option>HTML</option>
                <option>JSON</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Include Modules</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">All modules</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Failed tests only</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Include charts and graphs</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors">
            Preview
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Generate & Download
          </button>
        </div>
      </div>
    </div>
  );
}

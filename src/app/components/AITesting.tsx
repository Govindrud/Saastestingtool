import { Bot, Sparkles, Play, Settings, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const aiTests = [
  {
    id: 1,
    name: "Image Classification Accuracy",
    model: "ResNet-50",
    accuracy: "96.4%",
    status: "active",
    lastRun: "5m ago"
  },
  {
    id: 2,
    name: "NLP Sentiment Analysis",
    model: "BERT-base",
    accuracy: "94.2%",
    status: "active",
    lastRun: "12m ago"
  },
  {
    id: 3,
    name: "Object Detection Quality",
    model: "YOLO v8",
    accuracy: "91.8%",
    status: "paused",
    lastRun: "2h ago"
  },
  {
    id: 4,
    name: "Speech Recognition Test",
    model: "Whisper",
    accuracy: "97.1%",
    status: "active",
    lastRun: "8m ago"
  },
];

const performanceData = [
  { time: "00:00", accuracy: 92.1, latency: 125 },
  { time: "04:00", accuracy: 93.5, latency: 118 },
  { time: "08:00", accuracy: 94.8, latency: 112 },
  { time: "12:00", accuracy: 95.2, latency: 108 },
  { time: "16:00", accuracy: 96.1, latency: 105 },
  { time: "20:00", accuracy: 96.4, latency: 102 },
];

const metrics = [
  { label: "Active Models", value: "8", change: "+2" },
  { label: "Avg Accuracy", value: "95.3%", change: "+1.2%" },
  { label: "Total Predictions", value: "1.2M", change: "+15%" },
  { label: "Avg Latency", value: "105ms", change: "-12ms" },
];

export function AITesting() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-1">AI Model Testing</h1>
          <p className="text-muted-foreground">Automated testing and validation for machine learning models</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Play className="w-4 h-4" />
          Run New Test
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

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3>Model Performance Trends</h3>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-muted-foreground">Latency</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={performanceData}>
            <defs>
              <linearGradient id="accuracy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="latency" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0f1419", border: "1px solid #1e293b", borderRadius: "0.5rem" }}
              labelStyle={{ color: "#e8eaed" }}
            />
            <Area type="monotone" dataKey="accuracy" stroke="#3b82f6" fill="url(#accuracy)" strokeWidth={2} />
            <Area type="monotone" dataKey="latency" stroke="#f59e0b" fill="url(#latency)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3>Active AI Test Suites</h3>
          <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Configure
          </button>
        </div>
        <div className="divide-y divide-border">
          {aiTests.map((test) => (
            <div key={test.id} className="p-6 hover:bg-secondary/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-foreground">{test.name}</h4>
                      <div className={`px-2 py-0.5 rounded text-xs ${
                        test.status === "active" ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                      }`}>
                        {test.status}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Model: {test.model} • Last run: {test.lastRun}
                    </div>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-warning" />
                        <span className="text-sm">Accuracy: <span className="text-foreground font-medium">{test.accuracy}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="text-sm text-success">+2.1% this week</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

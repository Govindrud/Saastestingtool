import { Brain, Zap, Target, TrendingUp } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const llmModels = [
  {
    id: 1,
    name: "GPT-4",
    provider: "OpenAI",
    score: 94.2,
    accuracy: 96.1,
    latency: "1.2s",
    cost: "$0.03/1K",
    status: "active"
  },
  {
    id: 2,
    name: "Claude 3 Sonnet",
    provider: "Anthropic",
    score: 93.8,
    accuracy: 95.4,
    latency: "1.1s",
    cost: "$0.015/1K",
    status: "active"
  },
  {
    id: 3,
    name: "Llama 3 70B",
    provider: "Meta",
    score: 89.5,
    accuracy: 91.2,
    latency: "0.8s",
    cost: "$0.001/1K",
    status: "active"
  },
  {
    id: 4,
    name: "Mixtral 8x7B",
    provider: "Mistral",
    score: 87.3,
    accuracy: 89.8,
    latency: "0.6s",
    cost: "$0.0005/1K",
    status: "active"
  },
];

const radarData = [
  { metric: "Accuracy", gpt4: 96, claude: 95, llama: 91 },
  { metric: "Coherence", gpt4: 94, claude: 96, llama: 88 },
  { metric: "Relevance", gpt4: 95, claude: 94, llama: 90 },
  { metric: "Safety", gpt4: 93, claude: 97, llama: 85 },
  { metric: "Speed", gpt4: 85, claude: 87, llama: 92 },
];

const performanceTrend = [
  { day: "Mon", accuracy: 92.1, coherence: 90.5 },
  { day: "Tue", accuracy: 93.4, coherence: 91.8 },
  { day: "Wed", accuracy: 94.2, coherence: 93.2 },
  { day: "Thu", accuracy: 94.8, coherence: 94.1 },
  { day: "Fri", accuracy: 95.1, coherence: 94.5 },
];

const metrics = [
  { label: "Models Tested", value: "12" },
  { label: "Total Prompts", value: "8,429" },
  { label: "Avg Score", value: "91.2%" },
  { label: "Best Model", value: "GPT-4" },
];

export function LLMEvaluation() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-1">LLM Evaluation</h1>
          <p className="text-muted-foreground">Large language model performance testing and comparison</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <Target className="w-4 h-4" />
          New Evaluation
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
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="mb-6">Model Comparison</h3>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1e293b" />
              <PolarAngleAxis dataKey="metric" stroke="#94a3b8" fontSize={12} />
              <Radar name="GPT-4" dataKey="gpt4" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              <Radar name="Claude" dataKey="claude" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              <Radar name="Llama" dataKey="llama" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0f1419", border: "1px solid #1e293b", borderRadius: "0.5rem" }}
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">GPT-4</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-muted-foreground">Claude</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-muted-foreground">Llama</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="mb-6">Performance Trend</h3>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={performanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: "#0f1419", border: "1px solid #1e293b", borderRadius: "0.5rem" }}
                labelStyle={{ color: "#e8eaed" }}
              />
              <Line type="monotone" dataKey="accuracy" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="coherence" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3>Active Models</h3>
        </div>
        <div className="divide-y divide-border">
          {llmModels.map((model) => (
            <div key={model.id} className="p-6 hover:bg-secondary/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-foreground">{model.name}</h4>
                      <div className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                        {model.provider}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-6 mt-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Overall Score</div>
                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-foreground" style={{ fontSize: '1.25rem' }}>
                            {model.score}
                          </div>
                          <TrendingUp className="w-4 h-4 text-success" />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Accuracy</div>
                        <div className="text-sm text-foreground">{model.accuracy}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Avg Latency</div>
                        <div className="text-sm text-foreground flex items-center gap-1">
                          <Zap className="w-3 h-3 text-warning" />
                          {model.latency}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Cost</div>
                        <div className="text-sm text-foreground">{model.cost} tokens</div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-sm">
                  Run Test
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

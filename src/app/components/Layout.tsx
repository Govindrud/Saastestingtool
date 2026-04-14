import { Outlet, Link, useLocation } from "react-router";
import { Bot, Workflow, Network, Brain, Wrench, LayoutDashboard, Smartphone, GitBranch, FileText, Users, Clock, Settings, Bell, Search } from "lucide-react";
import { Logo } from "./Logo";

export function Layout() {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "AI Testing", path: "/ai-testing", icon: Bot },
    { name: "Automation", path: "/automation", icon: Workflow },
    { name: "API Testing", path: "/api-testing", icon: Network },
    { name: "LLM Evaluation", path: "/llm-evaluation", icon: Brain },
    { name: "Mobile Testing", path: "/mobile", icon: Smartphone },
    { name: "CI/CD", path: "/ci-cd", icon: GitBranch },
    { name: "Reports", path: "/reports", icon: FileText },
    { name: "Team", path: "/team", icon: Users },
    { name: "Schedule", path: "/schedule", icon: Clock },
    { name: "Tools & Integrations", path: "/tools", icon: Wrench },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <Logo className="w-8 h-8" />
            <div>
              <h1 className="font-bold tracking-tight text-foreground">QualityForge</h1>
              <p className="text-xs text-muted-foreground">Enterprise Testing</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
          <div className="px-3 py-2 text-xs text-muted-foreground mt-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span>All systems operational</span>
            </div>
            <div className="mt-2">v1.0.0</div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-border bg-card px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search tests, reports, or documentation..."
                  className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-border">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">JD</span>
                </div>
                <div className="text-sm">
                  <div className="text-foreground font-medium">John Doe</div>
                  <div className="text-xs text-muted-foreground">Admin</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

import { Outlet, Link, useLocation } from "react-router";
import { Bot, Workflow, Network, Brain, Wrench, LayoutDashboard } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "AI Testing", path: "/ai-testing", icon: Bot },
    { name: "Automation", path: "/automation", icon: Workflow },
    { name: "API Testing", path: "/api-testing", icon: Network },
    { name: "LLM Evaluation", path: "/llm-evaluation", icon: Brain },
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
          <h1 className="font-bold tracking-tight text-foreground">TestHub</h1>
          <p className="text-sm text-muted-foreground mt-1">Testing Platform</p>
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
          <div className="px-3 py-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span>All systems operational</span>
            </div>
            <div className="mt-2">v1.0.0</div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

import { Users, UserPlus, Shield, Mail, MoreVertical } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Admin",
    avatar: "SJ",
    status: "active",
    testsRun: 1247,
    lastActive: "Online now"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@company.com",
    role: "QA Engineer",
    avatar: "MC",
    status: "active",
    testsRun: 892,
    lastActive: "2 hours ago"
  },
  {
    id: 3,
    name: "Emma Williams",
    email: "emma.williams@company.com",
    role: "QA Engineer",
    avatar: "EW",
    status: "active",
    testsRun: 1034,
    lastActive: "5 minutes ago"
  },
  {
    id: 4,
    name: "James Rodriguez",
    email: "james.rodriguez@company.com",
    role: "Test Lead",
    avatar: "JR",
    status: "active",
    testsRun: 2145,
    lastActive: "1 hour ago"
  },
  {
    id: 5,
    name: "Lisa Anderson",
    email: "lisa.anderson@company.com",
    role: "QA Engineer",
    avatar: "LA",
    status: "inactive",
    testsRun: 543,
    lastActive: "2 days ago"
  },
];

const roles = [
  {
    name: "Admin",
    members: 1,
    permissions: ["Full access", "Manage users", "Manage billing", "Delete tests"],
    color: "text-destructive"
  },
  {
    name: "Test Lead",
    members: 1,
    permissions: ["Create tests", "View reports", "Manage team tests", "Export data"],
    color: "text-primary"
  },
  {
    name: "QA Engineer",
    members: 3,
    permissions: ["Create tests", "View reports", "Run tests", "View analytics"],
    color: "text-success"
  },
  {
    name: "Viewer",
    members: 0,
    permissions: ["View tests", "View reports"],
    color: "text-muted-foreground"
  },
];

const recentActivity = [
  { user: "Sarah Johnson", action: "Created new test suite: E2E Checkout", time: "10m ago" },
  { user: "Michael Chen", action: "Updated API test configuration", time: "25m ago" },
  { user: "Emma Williams", action: "Ran mobile test suite on iOS devices", time: "1h ago" },
  { user: "James Rodriguez", action: "Generated weekly performance report", time: "2h ago" },
  { user: "Sarah Johnson", action: "Added new team member: Alex Kumar", time: "3h ago" },
];

const metrics = [
  { label: "Team Members", value: "5" },
  { label: "Active Users", value: "4" },
  { label: "Total Tests Run", value: "5,861" },
  { label: "Avg Tests/User", value: "1,172" },
];

export function Team() {
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-primary/20 text-primary",
      "bg-success/20 text-success",
      "bg-warning/20 text-warning",
      "bg-info/20 text-info",
      "bg-destructive/20 text-destructive"
    ];
    return colors[name.charCodeAt(0) % colors.length];
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="mb-1">Team Management</h1>
          <p className="text-muted-foreground">Manage team members, roles, and permissions</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
          <UserPlus className="w-4 h-4" />
          Invite Member
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

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-card border border-border rounded-lg">
          <div className="p-6 border-b border-border">
            <h3>Team Members</h3>
          </div>
          <div className="divide-y divide-border">
            {teamMembers.map((member) => (
              <div key={member.id} className="p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${getAvatarColor(member.name)}`}>
                      {member.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-foreground">{member.name}</h4>
                        {member.status === "active" && (
                          <div className="w-2 h-2 rounded-full bg-success" />
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Mail className="w-3 h-3" />
                        {member.email}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {member.testsRun} tests run • {member.lastActive}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded text-sm ${
                      member.role === "Admin" ? "bg-destructive/20 text-destructive" :
                      member.role === "Test Lead" ? "bg-primary/20 text-primary" :
                      "bg-success/20 text-success"
                    }`}>
                      {member.role}
                    </div>
                    <button className="p-2 hover:bg-secondary rounded transition-colors">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg">
            <div className="p-6 border-b border-border">
              <h3>Roles & Permissions</h3>
            </div>
            <div className="divide-y divide-border">
              {roles.map((role) => (
                <div key={role.name} className="p-4 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className={`w-5 h-5 ${role.color}`} />
                    <div className="flex-1">
                      <h4 className="text-foreground">{role.name}</h4>
                      <div className="text-sm text-muted-foreground">{role.members} members</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    {role.permissions.slice(0, 3).map((permission, idx) => (
                      <div key={idx} className="text-xs text-muted-foreground">
                        • {permission}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg">
            <div className="p-6 border-b border-border">
              <h3>Recent Activity</h3>
            </div>
            <div className="divide-y divide-border max-h-[300px] overflow-y-auto">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="p-4 hover:bg-secondary/50 transition-colors">
                  <div className="text-sm text-foreground mb-1">{activity.action}</div>
                  <div className="text-xs text-muted-foreground">
                    {activity.user} • {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="mb-4">Invite New Member</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Email Address</label>
              <input
                type="email"
                placeholder="colleague@company.com"
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Role</label>
              <select className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground">
                <option>QA Engineer</option>
                <option>Test Lead</option>
                <option>Viewer</option>
                <option>Admin</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm mb-2">Personal Message (Optional)</label>
            <textarea
              rows={5}
              placeholder="Welcome to the team! Looking forward to working with you."
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground resize-none"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors">
            Cancel
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Send Invitation
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Bell, Shield, Palette, Key, Save } from 'lucide-react';
import { toast } from 'sonner';

export function Settings() {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'api', name: 'API Keys', icon: Key },
  ];

  const handleSave = async () => {
    const success = await updateProfile({ name: user?.name });
    if (success) {
      toast.success('Settings saved successfully');
    } else {
      toast.error('Failed to save settings');
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="col-span-3">
          {activeTab === 'profile' && (
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div>
                <h3 className="mb-4">Profile Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-2xl font-medium text-primary">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div>
                      <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-sm">
                        Change Avatar
                      </button>
                      <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue={user?.name}
                        className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        disabled
                        className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Role</label>
                    <input
                      type="text"
                      defaultValue={user?.role}
                      disabled
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground opacity-50 capitalize"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Bio</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about yourself..."
                      className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div>
                <h3 className="mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <div className="font-medium text-foreground">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">Receive notifications via email</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <div className="font-medium text-foreground">Test Completion</div>
                      <div className="text-sm text-muted-foreground">Notify when tests complete</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <div className="font-medium text-foreground">Test Failures</div>
                      <div className="text-sm text-muted-foreground">Notify when tests fail</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <div className="font-medium text-foreground">Pipeline Events</div>
                      <div className="text-sm text-muted-foreground">CI/CD pipeline status updates</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <div className="font-medium text-foreground">Team Activity</div>
                      <div className="text-sm text-muted-foreground">Updates from team members</div>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <div className="font-medium text-foreground">Weekly Reports</div>
                      <div className="text-sm text-muted-foreground">Weekly summary emails</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div>
                <h3 className="mb-4">Security Settings</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-4">Change Password</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm mb-2">Current Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">New Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground"
                        />
                      </div>
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <h4 className="mb-4">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <div className="font-medium text-foreground">2FA Status</div>
                        <div className="text-sm text-muted-foreground">Not enabled</div>
                      </div>
                      <button className="px-4 py-2 bg-success text-white rounded-lg hover:bg-success/90 transition-colors">
                        Enable 2FA
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <h4 className="mb-4">Active Sessions</h4>
                    <div className="space-y-3">
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-foreground">Current Session</div>
                            <div className="text-sm text-muted-foreground">Chrome on macOS • San Francisco, CA</div>
                          </div>
                          <div className="px-3 py-1 bg-success/20 text-success rounded text-sm">Active</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div>
                <h3 className="mb-4">Appearance</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm mb-3">Theme</label>
                    <div className="grid grid-cols-3 gap-4">
                      <button className="p-4 border-2 border-primary rounded-lg bg-secondary">
                        <div className="w-full h-24 bg-background rounded mb-2" />
                        <div className="text-sm font-medium">Dark</div>
                      </button>
                      <button className="p-4 border-2 border-border rounded-lg hover:border-muted-foreground">
                        <div className="w-full h-24 bg-white rounded mb-2" />
                        <div className="text-sm font-medium">Light</div>
                      </button>
                      <button className="p-4 border-2 border-border rounded-lg hover:border-muted-foreground">
                        <div className="w-full h-24 bg-gradient-to-br from-background to-white rounded mb-2" />
                        <div className="text-sm font-medium">Auto</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-3">Accent Color</label>
                    <div className="flex gap-3">
                      {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'].map((color) => (
                        <button
                          key={color}
                          className="w-10 h-10 rounded-lg border-2 border-border hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-t border-border">
                    <div>
                      <div className="font-medium text-foreground">Compact Mode</div>
                      <div className="text-sm text-muted-foreground">Reduce spacing and padding</div>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="bg-card border border-border rounded-lg p-6 space-y-6">
              <div>
                <h3 className="mb-4">API Keys</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-medium text-foreground">Production API Key</div>
                        <code className="text-sm text-muted-foreground font-mono">qf_prod_••••••••••••3x9k</code>
                      </div>
                      <button className="text-sm text-destructive hover:underline">Revoke</button>
                    </div>
                    <div className="text-xs text-muted-foreground">Created on Jan 15, 2026 • Last used 2 hours ago</div>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-medium text-foreground">Development API Key</div>
                        <code className="text-sm text-muted-foreground font-mono">qf_dev_••••••••••••7m2p</code>
                      </div>
                      <button className="text-sm text-destructive hover:underline">Revoke</button>
                    </div>
                    <div className="text-xs text-muted-foreground">Created on Dec 10, 2025 • Last used 5 days ago</div>
                  </div>

                  <button className="w-full py-2 border border-border rounded-lg hover:bg-secondary transition-colors">
                    + Generate New API Key
                  </button>
                </div>

                <div className="mt-6 p-4 bg-info/10 border border-info/20 rounded-lg">
                  <p className="text-sm text-info">
                    Keep your API keys secure and never share them publicly. Each key has full access to your account.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

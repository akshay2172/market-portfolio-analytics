import { Layout } from "@/components/Layout";
import { User, Bell, Shield, Wallet } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function Settings() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8 pb-10">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and notifications.</p>
        </div>

        <div className="grid gap-6">
          {/* Profile Section */}
          <section className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <User size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Profile Information</h3>
                <p className="text-sm text-muted-foreground">Update your personal details</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  defaultValue="Alex Trader"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  defaultValue="alex@example.com"
                />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </section>

          {/* Notifications */}
          <section className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                <Bell size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Notifications</h3>
                <p className="text-sm text-muted-foreground">Choose what updates you want to receive</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "Price Alerts", desc: "Get notified when assets move >5%" },
                { label: "Daily Summary", desc: "Receive a daily email with portfolio performance" },
                { label: "New Features", desc: "Be the first to know about new dashboard features" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-white">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={i === 0} />
                </div>
              ))}
            </div>
          </section>

          {/* Security */}
          <section className="glass-panel p-6 rounded-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Security</h3>
                <p className="text-sm text-muted-foreground">Protect your account</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-background/50 rounded-xl border border-border">
              <div>
                <p className="font-medium text-white">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">Enable</Button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

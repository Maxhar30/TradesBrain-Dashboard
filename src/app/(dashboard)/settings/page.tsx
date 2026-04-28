"use client";

import { useState } from "react";
import { Save, Building2, Bell, CreditCard, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    // TODO: PATCH /settings on api.tradesbrain.io
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-[#0C2340]">Settings</h1>
        <p className="text-sm text-[#64748B]">Manage your account and preferences.</p>
      </div>

      <Tabs defaultValue="company">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="company" className="gap-1.5">
            <Building2 className="h-4 w-4" />
            Company
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-1.5">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="team" className="gap-1.5">
            <Users className="h-4 w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Update your company details shown on invoices and quotes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label>Company Name</Label>
                  <Input defaultValue="Smith Trades LLC" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue="555-9000" type="tel" />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="admin@smithtrades.com" type="email" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Address</Label>
                  <Input defaultValue="500 Industrial Pkwy, Suite 10" />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input defaultValue="Springfield" />
                </div>
                <div className="space-y-2">
                  <Label>ZIP</Label>
                  <Input defaultValue="62701" />
                </div>
                <div className="space-y-2">
                  <Label>License Number</Label>
                  <Input defaultValue="LIC-2024-001" />
                </div>
                <div className="space-y-2">
                  <Label>Tax ID</Label>
                  <Input defaultValue="12-3456789" />
                </div>
              </div>
              <div className="pt-2">
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what events trigger email and push notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "New job assigned", description: "When a job is assigned to a technician" },
                { label: "Job completed", description: "When a technician marks a job as done" },
                { label: "Invoice paid", description: "When a customer pays an invoice" },
                { label: "Quote accepted", description: "When a customer accepts a quote" },
                { label: "Missed call", description: "When an inbound call is missed" },
                { label: "Overdue invoice", description: "When an invoice becomes overdue" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-1">
                  <div>
                    <p className="text-sm font-medium text-[#0C2340]">{item.label}</p>
                    <p className="text-xs text-[#64748B]">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:ring-2 peer-focus:ring-[#F97316] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#F97316]" />
                  </label>
                </div>
              ))}
              <Separator />
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save Preferences"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
              <CardDescription>
                Manage your plan, payment method, and invoices.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-[#0C2340] text-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Pro Plan</p>
                    <p className="text-sm text-slate-300">Up to 25 technicians · Unlimited jobs</p>
                  </div>
                  <p className="text-2xl font-bold">$149<span className="text-sm font-normal text-slate-300">/mo</span></p>
                </div>
                <Button variant="secondary" size="sm" className="mt-4">
                  Upgrade to Enterprise
                </Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-[#0C2340]">Payment Method</p>
                <div className="flex items-center gap-3 p-3 border border-[#E2E8F0] rounded-lg">
                  <div className="h-8 w-12 bg-slate-800 rounded flex items-center justify-center text-white text-xs font-bold">
                    VISA
                  </div>
                  <p className="text-sm text-[#64748B]">•••• •••• •••• 4242 — expires 12/27</p>
                </div>
                <Button variant="outline" size="sm">Update Payment Method</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Invite team members and manage their roles.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input placeholder="colleague@company.com" className="flex-1" type="email" />
                <Button>Invite</Button>
              </div>
              <Separator />
              {[
                { name: "Max Harrison", email: "maxhar30@gmail.com", role: "Owner" },
                { name: "Jamie Fox", email: "jamie@smithtrades.com", role: "Admin" },
                { name: "Dispatcher Team", email: "dispatch@smithtrades.com", role: "Dispatcher" },
              ].map((member) => (
                <div key={member.email} className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#1E3A5F] flex items-center justify-center text-white text-sm font-medium shrink-0">
                    {member.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#0C2340]">{member.name}</p>
                    <p className="text-xs text-[#64748B]">{member.email}</p>
                  </div>
                  <span className="text-xs bg-slate-100 text-[#64748B] px-2 py-1 rounded-full">
                    {member.role}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Update your password and enable two-factor authentication.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" placeholder="At least 8 characters" />
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Updating..." : "Update Password"}
              </Button>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#0C2340]">Two-Factor Authentication</p>
                  <p className="text-xs text-[#64748B]">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline" size="sm">Enable 2FA</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { PageHeading } from "@/components/dashboard/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/use-auth";
import { Bell, LogOut, ShieldCheck, User, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

function PreferenceRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div>
        <p className="text-sm font-medium text-white/85">{title}</p>
        <p className="mt-0.5 text-xs text-white/40">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

export default function Settings() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [digest, setDigest] = useState(true);
  const [alerts, setAlerts] = useState(true);
  const [weekly, setWeekly] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const initial = (user?.name?.[0] ?? user?.email?.[0] ?? "S").toUpperCase();

  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="Settings"
        title="Account & preferences"
        description="Manage your profile, plan, and the signals SignalForge watches for you."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Profile */}
        <Card className="border-white/8 bg-[#101014] shadow-none lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-white">
              <User className="size-4 text-blue-300" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-lg font-bold text-white">
                {initial}
              </span>
              <div className="min-w-0">
                <p className="truncate font-medium text-white">
                  {user?.name ?? "Guest researcher"}
                </p>
                <p className="truncate text-xs text-white/40">
                  {user?.email ?? "Anonymous session"}
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/6 bg-white/3 p-3 text-xs text-white/45">
              <ShieldCheck className="size-4 shrink-0 text-emerald-400" />
              Research data is private to your account.
            </div>
            <Button
              variant="outline"
              className="mt-4 w-full gap-2 border-white/12 bg-white/4 text-white/70 hover:bg-white/8"
              onClick={handleSignOut}
            >
              <LogOut className="size-4" />
              Sign out
            </Button>
          </CardContent>
        </Card>

        {/* Plan */}
        <Card className="border-white/8 bg-[#101014] shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-white">
              <Zap className="size-4 text-amber-300" />
              Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-white">Free</p>
                <p className="text-xs text-white/40">10 research credits / month</p>
              </div>
              <Badge className="border-blue-400/25 bg-blue-400/10 text-blue-300">Current</Badge>
            </div>
            <ul className="mt-4 space-y-2 border-t border-white/6 pt-4 text-xs text-white/50">
              <li>Opportunity scores & full research briefs</li>
              <li>7-day signal history</li>
              <li>Community support</li>
            </ul>
            <Button
              className="mt-5 w-full"
              onClick={() => navigate("/")}
            >
              Upgrade to Pro — $49/mo
            </Button>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="border-white/8 bg-[#101014] shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-white">
              <Bell className="size-4 text-cyan-300" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-white/6">
            <PreferenceRow
              title="Daily intelligence digest"
              description="An AI-written morning brief of ecosystem changes"
              checked={digest}
              onChange={setDigest}
            />
            <PreferenceRow
              title="Competitor alerts"
              description="Pricing changes and launches from your tracked set"
              checked={alerts}
              onChange={setAlerts}
            />
            <PreferenceRow
              title="Weekly market report"
              description="A deeper weekly summary of the categories you follow"
              checked={weekly}
              onChange={setWeekly}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

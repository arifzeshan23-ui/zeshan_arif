"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, Upload } from "lucide-react";
import api from "@/lib/api";

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get("/settings").then((res) => {
      if (res.data.data) setSettings(res.data.data);
    }).catch(() => {});
  }, []);

  const updateField = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try { await api.put("/settings", settings); alert("Settings saved!"); } catch { alert("Error saving settings"); } finally { setSaving(false); }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "images");
    try {
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      updateField(key, res.data.url);
    } catch { alert("Upload failed"); }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted text-sm">Manage site-wide settings and uploads</p>
      </div>

      <div className="glass rounded-2xl p-6 space-y-5">
        <h2 className="font-semibold">Profile Information</h2>

        <div>
          <label className="text-sm font-medium block mb-1">Profile Name</label>
          <Input value={settings.profile_name || "Zeeshan Arif"} onChange={(e) => updateField("profile_name", e.target.value)} />
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Profile Image</label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl">
              {settings.profile_image ? "✅" : "?"}
            </div>
            <label className="cursor-pointer">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-white/10 transition-all text-sm">
                <Upload className="w-4 h-4" />
                Upload Image
              </div>
              <input type="file" accept="image/*" hidden onChange={(e) => handleUpload(e, "profile_image")} />
            </label>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">CV Upload</label>
          <div className="flex items-center gap-3">
            {settings.cv_url && (
              <span className="text-xs text-green-400">CV uploaded</span>
            )}
            <label className="cursor-pointer">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-white/10 transition-all text-sm">
                <Upload className="w-4 h-4" />
                Upload CV (PDF)
              </div>
              <input type="file" accept=".pdf" hidden onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const formData = new FormData();
                formData.append("file", file);
                formData.append("folder", "cv");
                api.post("/upload", formData, {
                  headers: { "Content-Type": "multipart/form-data" },
                }).then((res) => updateField("cv_url", res.data.url))
                .catch(() => alert("Upload failed"));
              }} />
            </label>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 space-y-5">
        <h2 className="font-semibold">Social Media Links</h2>
        {["github", "linkedin", "twitter"].map((platform) => (
          <div key={platform}>
            <label className="text-sm font-medium block mb-1 capitalize">{platform} URL</label>
            <Input
              value={settings[`social_${platform}`] || ""}
              onChange={(e) => updateField(`social_${platform}`, e.target.value)}
              placeholder={`https://${platform}.com/...`}
            />
          </div>
        ))}
      </div>

      <Button onClick={handleSave} disabled={saving} className="w-full">
        <Save className="w-4 h-4 mr-2" />
        {saving ? "Saving..." : "Save All Settings"}
      </Button>
    </div>
  );
}

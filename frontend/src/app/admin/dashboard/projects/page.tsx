"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/admin/DataTable";
import FormModal from "@/components/admin/FormModal";
import api from "@/lib/api";

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [form, setForm] = useState({ title: "", description: "", tech_stack: "", github_url: "", live_url: "" });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      const res = await api.get("/projects?limit=100");
      setProjects(res.data.data);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditItem(null);
    setForm({ title: "", description: "", tech_stack: "", github_url: "", live_url: "" });
    setModalOpen(true);
  };

  const openEdit = (item: any) => {
    setEditItem(item);
    setForm({
      title: item.title,
      description: item.description || "",
      tech_stack: (item.tech_stack || []).join(", "),
      github_url: item.github_url || "",
      live_url: item.live_url || "",
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        tech_stack: form.tech_stack.split(",").map((s: string) => s.trim()).filter(Boolean),
      };
      if (editItem) {
        await api.put(`/projects/${editItem.id}`, payload);
      } else {
        await api.post("/projects", payload);
      }
      setModalOpen(false);
      load();
    } catch (e: any) {
      alert(e?.response?.data?.detail || "Error saving");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: any) => {
    if (!confirm(`Delete "${item.title}"?`)) return;
    try {
      await api.delete(`/projects/${item.id}`);
      load();
    } catch (e: any) {
      alert(e?.response?.data?.detail || "Error deleting");
    }
  };

  const columns = [
    { key: "title", label: "Title", sortable: true },
    { key: "tech_stack", label: "Tech Stack", render: (item: any) => (
      <div className="flex flex-wrap gap-1">
        {(item.tech_stack || []).slice(0, 3).map((t: string) => (
          <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
        ))}
      </div>
    )},
    { key: "featured", label: "Featured", render: (item: any) => item.featured ? "⭐ Yes" : "—" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Projects</h1>
      <DataTable columns={columns} data={projects} onEdit={openEdit} onDelete={handleDelete} onAdd={openCreate} loading={loading} />

      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? "Edit Project" : "New Project"} onSubmit={handleSave} loading={saving}>
        <div className="space-y-4">
          <div><label className="text-sm font-medium block mb-1">Title</label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div><label className="text-sm font-medium block mb-1">Description</label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div><label className="text-sm font-medium block mb-1">Tech Stack (comma separated)</label><Input value={form.tech_stack} onChange={(e) => setForm({ ...form, tech_stack: e.target.value })} placeholder="Python, FastAPI, Next.js" /></div>
          <div><label className="text-sm font-medium block mb-1">GitHub URL</label><Input value={form.github_url} onChange={(e) => setForm({ ...form, github_url: e.target.value })} /></div>
          <div><label className="text-sm font-medium block mb-1">Live URL</label><Input value={form.live_url} onChange={(e) => setForm({ ...form, live_url: e.target.value })} /></div>
          <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? "Saving..." : "Save"}</Button>
        </div>
      </FormModal>
    </div>
  );
}

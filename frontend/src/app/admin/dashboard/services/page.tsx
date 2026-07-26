"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/admin/DataTable";
import FormModal from "@/components/admin/FormModal";
import api from "@/lib/api";

export default function AdminServices() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [form, setForm] = useState({ title: "", description: "", features: "" });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try { const res = await api.get("/services?limit=100"); setItems(res.data.data); } catch {} finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditItem(null); setForm({ title: "", description: "", features: "" }); setModalOpen(true); };
  const openEdit = (item: any) => { setEditItem(item); setForm({ title: item.title, description: item.description || "", features: (item.features || []).join(", ") }); setModalOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...form, features: form.features.split(",").map((s: string) => s.trim()).filter(Boolean) };
      if (editItem) await api.put(`/services/${editItem.id}`, payload);
      else await api.post("/services", payload);
      setModalOpen(false); load();
    } catch (e: any) { alert(e?.response?.data?.detail || "Error saving"); } finally { setSaving(false); }
  };

  const handleDelete = async (item: any) => {
    if (!confirm(`Delete "${item.title}"?`)) return;
    try { await api.delete(`/services/${item.id}`); load(); } catch {}
  };

  const columns = [
    { key: "title", label: "Title", sortable: true },
    { key: "description", label: "Description", render: (item: any) => <span className="text-muted text-xs line-clamp-1">{item.description}</span> },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Services</h1>
      <DataTable columns={columns} data={items} onEdit={openEdit} onDelete={handleDelete} onAdd={openCreate} loading={loading} />
      <FormModal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? "Edit Service" : "New Service"}>
        <div className="space-y-4">
          <div><label className="text-sm font-medium block mb-1">Title</label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div><label className="text-sm font-medium block mb-1">Description</label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          <div><label className="text-sm font-medium block mb-1">Features (comma separated)</label><Input value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} placeholder="Feature 1, Feature 2" /></div>
          <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? "Saving..." : "Save"}</Button>
        </div>
      </FormModal>
    </div>
  );
}
